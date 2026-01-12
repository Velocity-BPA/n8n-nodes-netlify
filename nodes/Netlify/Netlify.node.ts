/*
 * [Velocity BPA Licensing Notice]
 *
 * This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
 *
 * Use of this node by for-profit organizations in production environments
 * requires a commercial license from Velocity BPA.
 *
 * For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.
 */

import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

import {
	netlifyApiRequest,
	netlifyApiRequestAllItems,
	buildQueryFromFilters,
	logLicensingNotice,
} from './GenericFunctions';

import { siteOperations, siteFields } from './descriptions/SiteDescription';
import { deployOperations, deployFields } from './descriptions/DeployDescription';
import { formOperations, formFields } from './descriptions/FormDescription';
import { submissionOperations, submissionFields } from './descriptions/SubmissionDescription';
import { environmentVariableOperations, environmentVariableFields } from './descriptions/EnvironmentVariableDescription';
import { functionOperations, functionFields } from './descriptions/FunctionDescription';
import { buildOperations, buildFields } from './descriptions/BuildDescription';
import { dnsZoneOperations, dnsZoneFields } from './descriptions/DnsZoneDescription';
import { hookOperations, hookFields } from './descriptions/HookDescription';
import { deployKeyOperations, deployKeyFields } from './descriptions/DeployKeyDescription';
import { memberOperations, memberFields } from './descriptions/MemberDescription';
import { splitTestOperations, splitTestFields } from './descriptions/SplitTestDescription';

// Site operations handler
async function executeSiteOperation(
	context: IExecuteFunctions,
	index: number,
	operation: string,
): Promise<IDataObject | IDataObject[]> {
	if (operation === 'create') {
		const name = context.getNodeParameter('name', index) as string;
		const additionalFields = context.getNodeParameter('additionalFields', index) as IDataObject;

		const body: IDataObject = { name };

		if (additionalFields.account_slug) {
			body.account_slug = additionalFields.account_slug;
		}
		if (additionalFields.custom_domain) {
			body.custom_domain = additionalFields.custom_domain;
		}
		if (additionalFields.force_ssl !== undefined) {
			body.force_ssl = additionalFields.force_ssl;
		}
		if (additionalFields.password) {
			body.password = additionalFields.password;
		}
		if (additionalFields.repoProvider && additionalFields.repoPath) {
			body.repo = {
				provider: additionalFields.repoProvider,
				repo_path: additionalFields.repoPath,
				branch: additionalFields.repoBranch || 'main',
			};
		}

		return await netlifyApiRequest.call(context, 'POST', '/sites', body);
	}

	if (operation === 'get') {
		const siteId = context.getNodeParameter('siteId', index) as string;
		return await netlifyApiRequest.call(context, 'GET', `/sites/${siteId}`);
	}

	if (operation === 'getAll') {
		const returnAll = context.getNodeParameter('returnAll', index) as boolean;
		const filters = context.getNodeParameter('filters', index) as IDataObject;
		const query = buildQueryFromFilters(filters);

		if (returnAll) {
			return await netlifyApiRequestAllItems.call(context, 'GET', '/sites', {}, query);
		}

		const limit = context.getNodeParameter('limit', index) as number;
		query.per_page = limit;
		return await netlifyApiRequest.call(context, 'GET', '/sites', {}, query);
	}

	if (operation === 'update') {
		const siteId = context.getNodeParameter('siteId', index) as string;
		const updateFields = context.getNodeParameter('updateFields', index) as IDataObject;
		return await netlifyApiRequest.call(context, 'PATCH', `/sites/${siteId}`, updateFields);
	}

	if (operation === 'delete') {
		const siteId = context.getNodeParameter('siteId', index) as string;
		await netlifyApiRequest.call(context, 'DELETE', `/sites/${siteId}`);
		return { success: true };
	}

	if (operation === 'configure') {
		const siteId = context.getNodeParameter('siteId', index) as string;
		const buildSettings = context.getNodeParameter('buildSettings', index) as IDataObject;
		const processingSettings = context.getNodeParameter('processingSettings', index) as IDataObject;

		const body: IDataObject = {};
		if (Object.keys(buildSettings).length > 0) {
			body.build_settings = buildSettings;
		}
		if (Object.keys(processingSettings).length > 0) {
			body.processing_settings = processingSettings;
		}

		return await netlifyApiRequest.call(context, 'PATCH', `/sites/${siteId}`, body);
	}

	if (operation === 'restore') {
		const siteId = context.getNodeParameter('siteId', index) as string;
		return await netlifyApiRequest.call(context, 'POST', `/sites/${siteId}/restore`);
	}

	if (operation === 'enableSsl') {
		const siteId = context.getNodeParameter('siteId', index) as string;
		return await netlifyApiRequest.call(context, 'POST', `/sites/${siteId}/ssl`);
	}

	if (operation === 'provisionSsl') {
		const siteId = context.getNodeParameter('siteId', index) as string;
		return await netlifyApiRequest.call(context, 'POST', `/sites/${siteId}/ssl/provision`);
	}

	if (operation === 'unlink') {
		const siteId = context.getNodeParameter('siteId', index) as string;
		return await netlifyApiRequest.call(context, 'PUT', `/sites/${siteId}/unlink_repo`);
	}

	throw new NodeOperationError(context.getNode(), `Operation ${operation} not supported for site resource`);
}

// Deploy operations handler
async function executeDeployOperation(
	context: IExecuteFunctions,
	index: number,
	operation: string,
): Promise<IDataObject | IDataObject[]> {
	if (operation === 'create') {
		const siteId = context.getNodeParameter('siteId', index) as string;
		const additionalFields = context.getNodeParameter('additionalFields', index) as IDataObject;

		const body: IDataObject = {};
		if (additionalFields.branch) body.branch = additionalFields.branch;
		if (additionalFields.title) body.title = additionalFields.title;
		if (additionalFields.draft !== undefined) body.draft = additionalFields.draft;
		if (additionalFields.async !== undefined) body.async = additionalFields.async;
		if (additionalFields.framework) body.framework = additionalFields.framework;

		return await netlifyApiRequest.call(context, 'POST', `/sites/${siteId}/deploys`, body);
	}

	if (operation === 'get') {
		const deployId = context.getNodeParameter('deployId', index) as string;
		return await netlifyApiRequest.call(context, 'GET', `/deploys/${deployId}`);
	}

	if (operation === 'getAll') {
		const siteId = context.getNodeParameter('siteId', index) as string;
		const returnAll = context.getNodeParameter('returnAll', index) as boolean;
		const filters = context.getNodeParameter('filters', index) as IDataObject;
		const query = buildQueryFromFilters(filters);

		if (returnAll) {
			return await netlifyApiRequestAllItems.call(context, 'GET', `/sites/${siteId}/deploys`, {}, query);
		}

		const limit = context.getNodeParameter('limit', index) as number;
		query.per_page = limit;
		return await netlifyApiRequest.call(context, 'GET', `/sites/${siteId}/deploys`, {}, query);
	}

	if (operation === 'cancel') {
		const deployId = context.getNodeParameter('deployId', index) as string;
		return await netlifyApiRequest.call(context, 'POST', `/deploys/${deployId}/cancel`);
	}

	if (operation === 'lock') {
		const deployId = context.getNodeParameter('deployId', index) as string;
		return await netlifyApiRequest.call(context, 'POST', `/deploys/${deployId}/lock`);
	}

	if (operation === 'unlock') {
		const deployId = context.getNodeParameter('deployId', index) as string;
		return await netlifyApiRequest.call(context, 'POST', `/deploys/${deployId}/unlock`);
	}

	if (operation === 'publish') {
		const deployId = context.getNodeParameter('deployId', index) as string;
		return await netlifyApiRequest.call(context, 'POST', `/deploys/${deployId}/publish`);
	}

	if (operation === 'restore') {
		const deployId = context.getNodeParameter('deployId', index) as string;
		return await netlifyApiRequest.call(context, 'POST', `/deploys/${deployId}/restore`);
	}

	if (operation === 'getLog') {
		const deployId = context.getNodeParameter('deployId', index) as string;
		return await netlifyApiRequest.call(context, 'GET', `/deploys/${deployId}/log`);
	}

	throw new NodeOperationError(context.getNode(), `Operation ${operation} not supported for deploy resource`);
}

// Form operations handler
async function executeFormOperation(
	context: IExecuteFunctions,
	index: number,
	operation: string,
): Promise<IDataObject | IDataObject[]> {
	if (operation === 'get') {
		const formId = context.getNodeParameter('formId', index) as string;
		return await netlifyApiRequest.call(context, 'GET', `/forms/${formId}`);
	}

	if (operation === 'getAll') {
		const siteId = context.getNodeParameter('siteId', index) as string;
		const returnAll = context.getNodeParameter('returnAll', index) as boolean;

		if (returnAll) {
			return await netlifyApiRequestAllItems.call(context, 'GET', `/sites/${siteId}/forms`);
		}

		const limit = context.getNodeParameter('limit', index) as number;
		return await netlifyApiRequest.call(context, 'GET', `/sites/${siteId}/forms`, {}, { per_page: limit });
	}

	if (operation === 'delete') {
		const formId = context.getNodeParameter('formId', index) as string;
		await netlifyApiRequest.call(context, 'DELETE', `/forms/${formId}`);
		return { success: true };
	}

	if (operation === 'getSubmissions') {
		const formId = context.getNodeParameter('formId', index) as string;
		const returnAll = context.getNodeParameter('returnAll', index) as boolean;
		const filters = context.getNodeParameter('filters', index) as IDataObject;
		const query = buildQueryFromFilters(filters);

		if (returnAll) {
			return await netlifyApiRequestAllItems.call(context, 'GET', `/forms/${formId}/submissions`, {}, query);
		}

		const limit = context.getNodeParameter('limit', index) as number;
		query.per_page = limit;
		return await netlifyApiRequest.call(context, 'GET', `/forms/${formId}/submissions`, {}, query);
	}

	if (operation === 'enableSpamFilter') {
		const formId = context.getNodeParameter('formId', index) as string;
		return await netlifyApiRequest.call(context, 'PUT', `/forms/${formId}`, { spam_filter: true });
	}

	if (operation === 'disableSpamFilter') {
		const formId = context.getNodeParameter('formId', index) as string;
		return await netlifyApiRequest.call(context, 'PUT', `/forms/${formId}`, { spam_filter: false });
	}

	throw new NodeOperationError(context.getNode(), `Operation ${operation} not supported for form resource`);
}

// Submission operations handler
async function executeSubmissionOperation(
	context: IExecuteFunctions,
	index: number,
	operation: string,
): Promise<IDataObject | IDataObject[]> {
	if (operation === 'get') {
		const submissionId = context.getNodeParameter('submissionId', index) as string;
		return await netlifyApiRequest.call(context, 'GET', `/submissions/${submissionId}`);
	}

	if (operation === 'getAll') {
		const returnAll = context.getNodeParameter('returnAll', index) as boolean;
		const filters = context.getNodeParameter('filters', index) as IDataObject;
		const query = buildQueryFromFilters(filters);

		// Get either by form ID or site ID
		let endpoint = '/submissions';
		if (filters.formId) {
			endpoint = `/forms/${filters.formId}/submissions`;
			delete query.formId;
		} else if (filters.siteId) {
			endpoint = `/sites/${filters.siteId}/submissions`;
			delete query.siteId;
		}

		if (returnAll) {
			return await netlifyApiRequestAllItems.call(context, 'GET', endpoint, {}, query);
		}

		const limit = context.getNodeParameter('limit', index) as number;
		query.per_page = limit;
		return await netlifyApiRequest.call(context, 'GET', endpoint, {}, query);
	}

	if (operation === 'delete') {
		const submissionId = context.getNodeParameter('submissionId', index) as string;
		await netlifyApiRequest.call(context, 'DELETE', `/submissions/${submissionId}`);
		return { success: true };
	}

	if (operation === 'markSpam') {
		const submissionId = context.getNodeParameter('submissionId', index) as string;
		return await netlifyApiRequest.call(context, 'PUT', `/submissions/${submissionId}`, { spam: true });
	}

	if (operation === 'markHam') {
		const submissionId = context.getNodeParameter('submissionId', index) as string;
		return await netlifyApiRequest.call(context, 'PUT', `/submissions/${submissionId}`, { spam: false });
	}

	throw new NodeOperationError(context.getNode(), `Operation ${operation} not supported for submission resource`);
}

// Environment Variable operations handler
async function executeEnvironmentVariableOperation(
	context: IExecuteFunctions,
	index: number,
	operation: string,
): Promise<IDataObject | IDataObject[]> {
	const accountId = context.getNodeParameter('accountId', index) as string;
	const siteId = context.getNodeParameter('siteId', index, '') as string;

	const baseEndpoint = siteId
		? `/accounts/${accountId}/env?site_id=${siteId}`
		: `/accounts/${accountId}/env`;

	if (operation === 'create') {
		const key = context.getNodeParameter('key', index) as string;
		const value = context.getNodeParameter('value', index) as string;
		const additionalFields = context.getNodeParameter('additionalFields', index) as IDataObject;

		const values: IDataObject[] = [{
			value,
			context: additionalFields.context || 'all',
		}];

		if (additionalFields.contextParameter) {
			values[0].context_parameter = additionalFields.contextParameter;
		}

		const body: IDataObject[] = [{
			key,
			values,
			is_secret: additionalFields.isSecret || false,
		}];

		return await netlifyApiRequest.call(context, 'POST', baseEndpoint, body);
	}

	if (operation === 'get') {
		const key = context.getNodeParameter('key', index) as string;
		const endpoint = siteId
			? `/accounts/${accountId}/env/${key}?site_id=${siteId}`
			: `/accounts/${accountId}/env/${key}`;
		return await netlifyApiRequest.call(context, 'GET', endpoint);
	}

	if (operation === 'getAll') {
		const returnAll = context.getNodeParameter('returnAll', index) as boolean;

		if (returnAll) {
			return await netlifyApiRequest.call(context, 'GET', baseEndpoint);
		}

		const result = await netlifyApiRequest.call(context, 'GET', baseEndpoint);
		const limit = context.getNodeParameter('limit', index) as number;
		return Array.isArray(result) ? result.slice(0, limit) : result;
	}

	if (operation === 'update') {
		const key = context.getNodeParameter('key', index) as string;
		const updateFields = context.getNodeParameter('updateFields', index) as IDataObject;

		const body: IDataObject = {};
		if (updateFields.value) {
			body.value = updateFields.value;
		}
		if (updateFields.context) {
			body.context = updateFields.context;
		}
		if (updateFields.contextParameter) {
			body.context_parameter = updateFields.contextParameter;
		}

		const endpoint = siteId
			? `/accounts/${accountId}/env/${key}?site_id=${siteId}`
			: `/accounts/${accountId}/env/${key}`;
		return await netlifyApiRequest.call(context, 'PUT', endpoint, body);
	}

	if (operation === 'delete') {
		const key = context.getNodeParameter('key', index) as string;
		const endpoint = siteId
			? `/accounts/${accountId}/env/${key}?site_id=${siteId}`
			: `/accounts/${accountId}/env/${key}`;
		await netlifyApiRequest.call(context, 'DELETE', endpoint);
		return { success: true };
	}

	if (operation === 'setValue') {
		const key = context.getNodeParameter('key', index) as string;
		const value = context.getNodeParameter('value', index) as string;
		const envContext = context.getNodeParameter('context', index) as string;
		const contextParameter = context.getNodeParameter('contextParameter', index, '') as string;

		const body: IDataObject = {
			value,
			context: envContext,
		};

		if (contextParameter) {
			body.context_parameter = contextParameter;
		}

		const endpoint = siteId
			? `/accounts/${accountId}/env/${key}/value?site_id=${siteId}`
			: `/accounts/${accountId}/env/${key}/value`;
		return await netlifyApiRequest.call(context, 'PATCH', endpoint, body);
	}

	throw new NodeOperationError(context.getNode(), `Operation ${operation} not supported for environmentVariable resource`);
}

// Function operations handler
async function executeFunctionOperation(
	context: IExecuteFunctions,
	index: number,
	operation: string,
): Promise<IDataObject | IDataObject[]> {
	const siteId = context.getNodeParameter('siteId', index) as string;

	if (operation === 'get') {
		const functionName = context.getNodeParameter('functionName', index) as string;
		return await netlifyApiRequest.call(context, 'GET', `/sites/${siteId}/functions/${functionName}`);
	}

	if (operation === 'getAll') {
		const returnAll = context.getNodeParameter('returnAll', index) as boolean;

		if (returnAll) {
			return await netlifyApiRequestAllItems.call(context, 'GET', `/sites/${siteId}/functions`);
		}

		const limit = context.getNodeParameter('limit', index) as number;
		return await netlifyApiRequest.call(context, 'GET', `/sites/${siteId}/functions`, {}, { per_page: limit });
	}

	if (operation === 'invoke') {
		const functionName = context.getNodeParameter('functionName', index) as string;
		const payload = context.getNodeParameter('payload', index, {}) as IDataObject;

		// Function invocation goes through the site's URL, not the API
		// We need to get the site first to get its URL
		const site = await netlifyApiRequest.call(context, 'GET', `/sites/${siteId}`) as IDataObject;
		const siteUrl = site.ssl_url || site.url;

		// Invoke the function via the site's /.netlify/functions/ endpoint
		const credentials = await context.getCredentials('netlifyApi');
		const options = {
			method: 'POST' as const,
			headers: {
				'Authorization': `Bearer ${credentials.accessToken}`,
				'Content-Type': 'application/json',
			},
			uri: `${siteUrl}/.netlify/functions/${functionName}`,
			body: payload,
			json: true,
		};

		return await context.helpers.request(options);
	}

	if (operation === 'getLogs') {
		const functionName = context.getNodeParameter('functionName', index) as string;
		const filters = context.getNodeParameter('filters', index, {}) as IDataObject;
		const query = buildQueryFromFilters(filters);

		return await netlifyApiRequest.call(context, 'GET', `/sites/${siteId}/functions/${functionName}/log`, {}, query);
	}

	throw new NodeOperationError(context.getNode(), `Operation ${operation} not supported for function resource`);
}

// Build operations handler
async function executeBuildOperation(
	context: IExecuteFunctions,
	index: number,
	operation: string,
): Promise<IDataObject | IDataObject[]> {
	if (operation === 'get') {
		const buildId = context.getNodeParameter('buildId', index) as string;
		return await netlifyApiRequest.call(context, 'GET', `/builds/${buildId}`);
	}

	if (operation === 'getAll') {
		const siteId = context.getNodeParameter('siteId', index) as string;
		const returnAll = context.getNodeParameter('returnAll', index) as boolean;

		if (returnAll) {
			return await netlifyApiRequestAllItems.call(context, 'GET', `/sites/${siteId}/builds`);
		}

		const limit = context.getNodeParameter('limit', index) as number;
		return await netlifyApiRequest.call(context, 'GET', `/sites/${siteId}/builds`, {}, { per_page: limit });
	}

	if (operation === 'trigger') {
		const siteId = context.getNodeParameter('siteId', index) as string;
		const additionalFields = context.getNodeParameter('additionalFields', index) as IDataObject;

		const body: IDataObject = {};
		if (additionalFields.clear_cache) body.clear_cache = additionalFields.clear_cache;
		if (additionalFields.branch) body.branch = additionalFields.branch;

		return await netlifyApiRequest.call(context, 'POST', `/sites/${siteId}/builds`, body);
	}

	if (operation === 'cancel') {
		const buildId = context.getNodeParameter('buildId', index) as string;
		return await netlifyApiRequest.call(context, 'POST', `/builds/${buildId}/cancel`);
	}

	if (operation === 'retry') {
		const buildId = context.getNodeParameter('buildId', index) as string;
		return await netlifyApiRequest.call(context, 'POST', `/builds/${buildId}/retry`);
	}

	throw new NodeOperationError(context.getNode(), `Operation ${operation} not supported for build resource`);
}

// DNS Zone operations handler
async function executeDnsZoneOperation(
	context: IExecuteFunctions,
	index: number,
	operation: string,
): Promise<IDataObject | IDataObject[]> {
	if (operation === 'create') {
		const name = context.getNodeParameter('name', index) as string;
		const additionalFields = context.getNodeParameter('additionalFields', index) as IDataObject;

		const body: IDataObject = { name };
		if (additionalFields.account_slug) body.account_slug = additionalFields.account_slug;

		return await netlifyApiRequest.call(context, 'POST', '/dns_zones', body);
	}

	if (operation === 'get') {
		const zoneId = context.getNodeParameter('zoneId', index) as string;
		return await netlifyApiRequest.call(context, 'GET', `/dns_zones/${zoneId}`);
	}

	if (operation === 'getAll') {
		const returnAll = context.getNodeParameter('returnAll', index) as boolean;
		const filters = context.getNodeParameter('filters', index) as IDataObject;
		const query = buildQueryFromFilters(filters);

		if (returnAll) {
			return await netlifyApiRequestAllItems.call(context, 'GET', '/dns_zones', {}, query);
		}

		const limit = context.getNodeParameter('limit', index) as number;
		query.per_page = limit;
		return await netlifyApiRequest.call(context, 'GET', '/dns_zones', {}, query);
	}

	if (operation === 'delete') {
		const zoneId = context.getNodeParameter('zoneId', index) as string;
		await netlifyApiRequest.call(context, 'DELETE', `/dns_zones/${zoneId}`);
		return { success: true };
	}

	if (operation === 'getDnsRecords') {
		const zoneId = context.getNodeParameter('zoneId', index) as string;
		const returnAll = context.getNodeParameter('returnAll', index) as boolean;

		if (returnAll) {
			return await netlifyApiRequestAllItems.call(context, 'GET', `/dns_zones/${zoneId}/dns_records`);
		}

		const limit = context.getNodeParameter('limit', index) as number;
		return await netlifyApiRequest.call(context, 'GET', `/dns_zones/${zoneId}/dns_records`, {}, { per_page: limit });
	}

	if (operation === 'createDnsRecord') {
		const zoneId = context.getNodeParameter('zoneId', index) as string;
		const recordType = context.getNodeParameter('recordType', index) as string;
		const hostname = context.getNodeParameter('hostname', index) as string;
		const value = context.getNodeParameter('recordValue', index) as string;
		const additionalFields = context.getNodeParameter('additionalFields', index) as IDataObject;

		const body: IDataObject = {
			type: recordType,
			hostname,
			value,
		};

		if (additionalFields.ttl) body.ttl = additionalFields.ttl;
		if (additionalFields.priority) body.priority = additionalFields.priority;

		return await netlifyApiRequest.call(context, 'POST', `/dns_zones/${zoneId}/dns_records`, body);
	}

	if (operation === 'deleteDnsRecord') {
		const zoneId = context.getNodeParameter('zoneId', index) as string;
		const recordId = context.getNodeParameter('recordId', index) as string;
		await netlifyApiRequest.call(context, 'DELETE', `/dns_zones/${zoneId}/dns_records/${recordId}`);
		return { success: true };
	}

	throw new NodeOperationError(context.getNode(), `Operation ${operation} not supported for dnsZone resource`);
}

// Hook operations handler
async function executeHookOperation(
	context: IExecuteFunctions,
	index: number,
	operation: string,
): Promise<IDataObject | IDataObject[]> {
	if (operation === 'create') {
		const siteId = context.getNodeParameter('siteId', index) as string;
		const type = context.getNodeParameter('type', index) as string;
		const event = context.getNodeParameter('event', index) as string;

		const body: IDataObject = {
			type,
			event,
			data: {},
		};

		if (type === 'url') {
			(body.data as IDataObject).url = context.getNodeParameter('hookUrl', index) as string;
		} else if (type === 'email') {
			(body.data as IDataObject).email = context.getNodeParameter('hookEmail', index) as string;
		} else if (type === 'slack') {
			(body.data as IDataObject).url = context.getNodeParameter('slackUrl', index) as string;
		}

		return await netlifyApiRequest.call(context, 'POST', `/sites/${siteId}/hooks`, body);
	}

	if (operation === 'get') {
		const hookId = context.getNodeParameter('hookId', index) as string;
		return await netlifyApiRequest.call(context, 'GET', `/hooks/${hookId}`);
	}

	if (operation === 'getAll') {
		const siteId = context.getNodeParameter('siteId', index) as string;
		const returnAll = context.getNodeParameter('returnAll', index) as boolean;

		if (returnAll) {
			return await netlifyApiRequestAllItems.call(context, 'GET', `/sites/${siteId}/hooks`);
		}

		const limit = context.getNodeParameter('limit', index) as number;
		return await netlifyApiRequest.call(context, 'GET', `/sites/${siteId}/hooks`, {}, { per_page: limit });
	}

	if (operation === 'update') {
		const hookId = context.getNodeParameter('hookId', index) as string;
		const updateFields = context.getNodeParameter('updateFields', index) as IDataObject;

		const body: IDataObject = {};
		if (updateFields.event) {
			body.event = updateFields.event;
		}
		if (updateFields.url || updateFields.email || updateFields.slack_url) {
			body.data = {};
			if (updateFields.url) (body.data as IDataObject).url = updateFields.url;
			if (updateFields.email) (body.data as IDataObject).email = updateFields.email;
			if (updateFields.slack_url) (body.data as IDataObject).url = updateFields.slack_url;
		}

		return await netlifyApiRequest.call(context, 'PUT', `/hooks/${hookId}`, body);
	}

	if (operation === 'delete') {
		const hookId = context.getNodeParameter('hookId', index) as string;
		await netlifyApiRequest.call(context, 'DELETE', `/hooks/${hookId}`);
		return { success: true };
	}

	if (operation === 'enable') {
		const hookId = context.getNodeParameter('hookId', index) as string;
		return await netlifyApiRequest.call(context, 'POST', `/hooks/${hookId}/enable`);
	}

	if (operation === 'disable') {
		const hookId = context.getNodeParameter('hookId', index) as string;
		return await netlifyApiRequest.call(context, 'POST', `/hooks/${hookId}/disable`);
	}

	throw new NodeOperationError(context.getNode(), `Operation ${operation} not supported for hook resource`);
}

// Deploy Key operations handler
async function executeDeployKeyOperation(
	context: IExecuteFunctions,
	index: number,
	operation: string,
): Promise<IDataObject | IDataObject[]> {
	if (operation === 'create') {
		return await netlifyApiRequest.call(context, 'POST', '/deploy_keys');
	}

	if (operation === 'get') {
		const keyId = context.getNodeParameter('keyId', index) as string;
		return await netlifyApiRequest.call(context, 'GET', `/deploy_keys/${keyId}`);
	}

	if (operation === 'getAll') {
		const returnAll = context.getNodeParameter('returnAll', index) as boolean;

		if (returnAll) {
			return await netlifyApiRequestAllItems.call(context, 'GET', '/deploy_keys');
		}

		const limit = context.getNodeParameter('limit', index) as number;
		return await netlifyApiRequest.call(context, 'GET', '/deploy_keys', {}, { per_page: limit });
	}

	if (operation === 'delete') {
		const keyId = context.getNodeParameter('keyId', index) as string;
		await netlifyApiRequest.call(context, 'DELETE', `/deploy_keys/${keyId}`);
		return { success: true };
	}

	throw new NodeOperationError(context.getNode(), `Operation ${operation} not supported for deployKey resource`);
}

// Member operations handler
async function executeMemberOperation(
	context: IExecuteFunctions,
	index: number,
	operation: string,
): Promise<IDataObject | IDataObject[]> {
	const accountSlug = context.getNodeParameter('accountSlug', index) as string;

	if (operation === 'get') {
		const memberId = context.getNodeParameter('memberId', index) as string;
		return await netlifyApiRequest.call(context, 'GET', `/${accountSlug}/members/${memberId}`);
	}

	if (operation === 'getAll') {
		const returnAll = context.getNodeParameter('returnAll', index) as boolean;

		if (returnAll) {
			return await netlifyApiRequestAllItems.call(context, 'GET', `/${accountSlug}/members`);
		}

		const limit = context.getNodeParameter('limit', index) as number;
		return await netlifyApiRequest.call(context, 'GET', `/${accountSlug}/members`, {}, { per_page: limit });
	}

	if (operation === 'invite') {
		const email = context.getNodeParameter('email', index) as string;
		const role = context.getNodeParameter('role', index) as string;

		return await netlifyApiRequest.call(context, 'POST', `/${accountSlug}/members`, {
			email,
			role,
		});
	}

	if (operation === 'remove') {
		const memberId = context.getNodeParameter('memberId', index) as string;
		await netlifyApiRequest.call(context, 'DELETE', `/${accountSlug}/members/${memberId}`);
		return { success: true };
	}

	if (operation === 'updateRole') {
		const memberId = context.getNodeParameter('memberId', index) as string;
		const newRole = context.getNodeParameter('newRole', index) as string;

		return await netlifyApiRequest.call(context, 'PUT', `/${accountSlug}/members/${memberId}`, {
			role: newRole,
		});
	}

	throw new NodeOperationError(context.getNode(), `Operation ${operation} not supported for member resource`);
}

// Split Test operations handler
async function executeSplitTestOperation(
	context: IExecuteFunctions,
	index: number,
	operation: string,
): Promise<IDataObject | IDataObject[]> {
	const siteId = context.getNodeParameter('siteId', index) as string;

	if (operation === 'create') {
		const branchTests = context.getNodeParameter('branchTests', index) as IDataObject;
		const branches = (branchTests.branches as IDataObject[]) || [];

		const body: IDataObject = {
			branch_tests: branches.reduce((acc: IDataObject, item: IDataObject) => {
				acc[item.branch as string] = item.percentage;
				return acc;
			}, {}),
		};

		return await netlifyApiRequest.call(context, 'POST', `/sites/${siteId}/traffic_splits`, body);
	}

	if (operation === 'get') {
		const splitTestId = context.getNodeParameter('splitTestId', index) as string;
		return await netlifyApiRequest.call(context, 'GET', `/sites/${siteId}/traffic_splits/${splitTestId}`);
	}

	if (operation === 'getAll') {
		const returnAll = context.getNodeParameter('returnAll', index) as boolean;

		if (returnAll) {
			return await netlifyApiRequestAllItems.call(context, 'GET', `/sites/${siteId}/traffic_splits`);
		}

		const limit = context.getNodeParameter('limit', index) as number;
		return await netlifyApiRequest.call(context, 'GET', `/sites/${siteId}/traffic_splits`, {}, { per_page: limit });
	}

	if (operation === 'update') {
		const splitTestId = context.getNodeParameter('splitTestId', index) as string;
		const updateFields = context.getNodeParameter('updateFields', index) as IDataObject;

		const body: IDataObject = {};
		if (updateFields.branchTests) {
			const branchTests = updateFields.branchTests as IDataObject;
			const branches = (branchTests.branches as IDataObject[]) || [];
			body.branch_tests = branches.reduce((acc: IDataObject, item: IDataObject) => {
				acc[item.branch as string] = item.percentage;
				return acc;
			}, {});
		}

		return await netlifyApiRequest.call(context, 'PUT', `/sites/${siteId}/traffic_splits/${splitTestId}`, body);
	}

	if (operation === 'start') {
		const splitTestId = context.getNodeParameter('splitTestId', index) as string;
		return await netlifyApiRequest.call(context, 'POST', `/sites/${siteId}/traffic_splits/${splitTestId}/publish`);
	}

	if (operation === 'stop') {
		const splitTestId = context.getNodeParameter('splitTestId', index) as string;
		return await netlifyApiRequest.call(context, 'POST', `/sites/${siteId}/traffic_splits/${splitTestId}/unpublish`);
	}

	throw new NodeOperationError(context.getNode(), `Operation ${operation} not supported for splitTest resource`);
}

export class Netlify implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Netlify',
		name: 'netlify',
		icon: 'file:netlify.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Manage Netlify sites, deploys, forms, functions, and more',
		defaults: {
			name: 'Netlify',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'netlifyApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Build', value: 'build' },
					{ name: 'Deploy', value: 'deploy' },
					{ name: 'Deploy Key', value: 'deployKey' },
					{ name: 'DNS Zone', value: 'dnsZone' },
					{ name: 'Environment Variable', value: 'environmentVariable' },
					{ name: 'Form', value: 'form' },
					{ name: 'Function', value: 'function' },
					{ name: 'Hook', value: 'hook' },
					{ name: 'Member', value: 'member' },
					{ name: 'Site', value: 'site' },
					{ name: 'Split Test', value: 'splitTest' },
					{ name: 'Submission', value: 'submission' },
				],
				default: 'site',
			},
			...siteOperations,
			...siteFields,
			...deployOperations,
			...deployFields,
			...formOperations,
			...formFields,
			...submissionOperations,
			...submissionFields,
			...environmentVariableOperations,
			...environmentVariableFields,
			...functionOperations,
			...functionFields,
			...buildOperations,
			...buildFields,
			...dnsZoneOperations,
			...dnsZoneFields,
			...hookOperations,
			...hookFields,
			...deployKeyOperations,
			...deployKeyFields,
			...memberOperations,
			...memberFields,
			...splitTestOperations,
			...splitTestFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		// Log licensing notice once per node load
		logLicensingNotice(this);

		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: IDataObject | IDataObject[] = {};

				// Route to appropriate operation handler
				switch (resource) {
				case 'site':
					responseData = await executeSiteOperation(this, i, operation);
					break;
				case 'deploy':
					responseData = await executeDeployOperation(this, i, operation);
					break;
				case 'form':
					responseData = await executeFormOperation(this, i, operation);
					break;
				case 'submission':
					responseData = await executeSubmissionOperation(this, i, operation);
					break;
				case 'environmentVariable':
					responseData = await executeEnvironmentVariableOperation(this, i, operation);
					break;
				case 'function':
					responseData = await executeFunctionOperation(this, i, operation);
					break;
				case 'build':
					responseData = await executeBuildOperation(this, i, operation);
					break;
				case 'dnsZone':
					responseData = await executeDnsZoneOperation(this, i, operation);
					break;
				case 'hook':
					responseData = await executeHookOperation(this, i, operation);
					break;
				case 'deployKey':
					responseData = await executeDeployKeyOperation(this, i, operation);
					break;
				case 'member':
					responseData = await executeMemberOperation(this, i, operation);
					break;
				case 'splitTest':
					responseData = await executeSplitTestOperation(this, i, operation);
					break;
				default:
					throw new NodeOperationError(this.getNode(), `Resource ${resource} not supported`);
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData),
					{ itemData: { item: i } },
				);
				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: (error as Error).message }, pairedItem: { item: i } });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
