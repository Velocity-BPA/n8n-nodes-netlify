"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Netlify = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const GenericFunctions_1 = require("./GenericFunctions");
const SiteDescription_1 = require("./descriptions/SiteDescription");
const DeployDescription_1 = require("./descriptions/DeployDescription");
const FormDescription_1 = require("./descriptions/FormDescription");
const SubmissionDescription_1 = require("./descriptions/SubmissionDescription");
const EnvironmentVariableDescription_1 = require("./descriptions/EnvironmentVariableDescription");
const FunctionDescription_1 = require("./descriptions/FunctionDescription");
const BuildDescription_1 = require("./descriptions/BuildDescription");
const DnsZoneDescription_1 = require("./descriptions/DnsZoneDescription");
const HookDescription_1 = require("./descriptions/HookDescription");
const DeployKeyDescription_1 = require("./descriptions/DeployKeyDescription");
const MemberDescription_1 = require("./descriptions/MemberDescription");
const SplitTestDescription_1 = require("./descriptions/SplitTestDescription");
async function executeSiteOperation(context, index, operation) {
    if (operation === 'create') {
        const name = context.getNodeParameter('name', index);
        const additionalFields = context.getNodeParameter('additionalFields', index);
        const body = { name };
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
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'POST', '/sites', body);
    }
    if (operation === 'get') {
        const siteId = context.getNodeParameter('siteId', index);
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'GET', `/sites/${siteId}`);
    }
    if (operation === 'getAll') {
        const returnAll = context.getNodeParameter('returnAll', index);
        const filters = context.getNodeParameter('filters', index);
        const query = (0, GenericFunctions_1.buildQueryFromFilters)(filters);
        if (returnAll) {
            return await GenericFunctions_1.netlifyApiRequestAllItems.call(context, 'GET', '/sites', {}, query);
        }
        const limit = context.getNodeParameter('limit', index);
        query.per_page = limit;
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'GET', '/sites', {}, query);
    }
    if (operation === 'update') {
        const siteId = context.getNodeParameter('siteId', index);
        const updateFields = context.getNodeParameter('updateFields', index);
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'PATCH', `/sites/${siteId}`, updateFields);
    }
    if (operation === 'delete') {
        const siteId = context.getNodeParameter('siteId', index);
        await GenericFunctions_1.netlifyApiRequest.call(context, 'DELETE', `/sites/${siteId}`);
        return { success: true };
    }
    if (operation === 'configure') {
        const siteId = context.getNodeParameter('siteId', index);
        const buildSettings = context.getNodeParameter('buildSettings', index);
        const processingSettings = context.getNodeParameter('processingSettings', index);
        const body = {};
        if (Object.keys(buildSettings).length > 0) {
            body.build_settings = buildSettings;
        }
        if (Object.keys(processingSettings).length > 0) {
            body.processing_settings = processingSettings;
        }
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'PATCH', `/sites/${siteId}`, body);
    }
    if (operation === 'restore') {
        const siteId = context.getNodeParameter('siteId', index);
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'POST', `/sites/${siteId}/restore`);
    }
    if (operation === 'enableSsl') {
        const siteId = context.getNodeParameter('siteId', index);
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'POST', `/sites/${siteId}/ssl`);
    }
    if (operation === 'provisionSsl') {
        const siteId = context.getNodeParameter('siteId', index);
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'POST', `/sites/${siteId}/ssl/provision`);
    }
    if (operation === 'unlink') {
        const siteId = context.getNodeParameter('siteId', index);
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'PUT', `/sites/${siteId}/unlink_repo`);
    }
    throw new n8n_workflow_1.NodeOperationError(context.getNode(), `Operation ${operation} not supported for site resource`);
}
async function executeDeployOperation(context, index, operation) {
    if (operation === 'create') {
        const siteId = context.getNodeParameter('siteId', index);
        const additionalFields = context.getNodeParameter('additionalFields', index);
        const body = {};
        if (additionalFields.branch)
            body.branch = additionalFields.branch;
        if (additionalFields.title)
            body.title = additionalFields.title;
        if (additionalFields.draft !== undefined)
            body.draft = additionalFields.draft;
        if (additionalFields.async !== undefined)
            body.async = additionalFields.async;
        if (additionalFields.framework)
            body.framework = additionalFields.framework;
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'POST', `/sites/${siteId}/deploys`, body);
    }
    if (operation === 'get') {
        const deployId = context.getNodeParameter('deployId', index);
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'GET', `/deploys/${deployId}`);
    }
    if (operation === 'getAll') {
        const siteId = context.getNodeParameter('siteId', index);
        const returnAll = context.getNodeParameter('returnAll', index);
        const filters = context.getNodeParameter('filters', index);
        const query = (0, GenericFunctions_1.buildQueryFromFilters)(filters);
        if (returnAll) {
            return await GenericFunctions_1.netlifyApiRequestAllItems.call(context, 'GET', `/sites/${siteId}/deploys`, {}, query);
        }
        const limit = context.getNodeParameter('limit', index);
        query.per_page = limit;
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'GET', `/sites/${siteId}/deploys`, {}, query);
    }
    if (operation === 'cancel') {
        const deployId = context.getNodeParameter('deployId', index);
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'POST', `/deploys/${deployId}/cancel`);
    }
    if (operation === 'lock') {
        const deployId = context.getNodeParameter('deployId', index);
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'POST', `/deploys/${deployId}/lock`);
    }
    if (operation === 'unlock') {
        const deployId = context.getNodeParameter('deployId', index);
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'POST', `/deploys/${deployId}/unlock`);
    }
    if (operation === 'publish') {
        const deployId = context.getNodeParameter('deployId', index);
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'POST', `/deploys/${deployId}/publish`);
    }
    if (operation === 'restore') {
        const deployId = context.getNodeParameter('deployId', index);
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'POST', `/deploys/${deployId}/restore`);
    }
    if (operation === 'getLog') {
        const deployId = context.getNodeParameter('deployId', index);
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'GET', `/deploys/${deployId}/log`);
    }
    throw new n8n_workflow_1.NodeOperationError(context.getNode(), `Operation ${operation} not supported for deploy resource`);
}
async function executeFormOperation(context, index, operation) {
    if (operation === 'get') {
        const formId = context.getNodeParameter('formId', index);
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'GET', `/forms/${formId}`);
    }
    if (operation === 'getAll') {
        const siteId = context.getNodeParameter('siteId', index);
        const returnAll = context.getNodeParameter('returnAll', index);
        if (returnAll) {
            return await GenericFunctions_1.netlifyApiRequestAllItems.call(context, 'GET', `/sites/${siteId}/forms`);
        }
        const limit = context.getNodeParameter('limit', index);
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'GET', `/sites/${siteId}/forms`, {}, { per_page: limit });
    }
    if (operation === 'delete') {
        const formId = context.getNodeParameter('formId', index);
        await GenericFunctions_1.netlifyApiRequest.call(context, 'DELETE', `/forms/${formId}`);
        return { success: true };
    }
    if (operation === 'getSubmissions') {
        const formId = context.getNodeParameter('formId', index);
        const returnAll = context.getNodeParameter('returnAll', index);
        const filters = context.getNodeParameter('filters', index);
        const query = (0, GenericFunctions_1.buildQueryFromFilters)(filters);
        if (returnAll) {
            return await GenericFunctions_1.netlifyApiRequestAllItems.call(context, 'GET', `/forms/${formId}/submissions`, {}, query);
        }
        const limit = context.getNodeParameter('limit', index);
        query.per_page = limit;
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'GET', `/forms/${formId}/submissions`, {}, query);
    }
    if (operation === 'enableSpamFilter') {
        const formId = context.getNodeParameter('formId', index);
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'PUT', `/forms/${formId}`, { spam_filter: true });
    }
    if (operation === 'disableSpamFilter') {
        const formId = context.getNodeParameter('formId', index);
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'PUT', `/forms/${formId}`, { spam_filter: false });
    }
    throw new n8n_workflow_1.NodeOperationError(context.getNode(), `Operation ${operation} not supported for form resource`);
}
async function executeSubmissionOperation(context, index, operation) {
    if (operation === 'get') {
        const submissionId = context.getNodeParameter('submissionId', index);
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'GET', `/submissions/${submissionId}`);
    }
    if (operation === 'getAll') {
        const returnAll = context.getNodeParameter('returnAll', index);
        const filters = context.getNodeParameter('filters', index);
        const query = (0, GenericFunctions_1.buildQueryFromFilters)(filters);
        let endpoint = '/submissions';
        if (filters.formId) {
            endpoint = `/forms/${filters.formId}/submissions`;
            delete query.formId;
        }
        else if (filters.siteId) {
            endpoint = `/sites/${filters.siteId}/submissions`;
            delete query.siteId;
        }
        if (returnAll) {
            return await GenericFunctions_1.netlifyApiRequestAllItems.call(context, 'GET', endpoint, {}, query);
        }
        const limit = context.getNodeParameter('limit', index);
        query.per_page = limit;
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'GET', endpoint, {}, query);
    }
    if (operation === 'delete') {
        const submissionId = context.getNodeParameter('submissionId', index);
        await GenericFunctions_1.netlifyApiRequest.call(context, 'DELETE', `/submissions/${submissionId}`);
        return { success: true };
    }
    if (operation === 'markSpam') {
        const submissionId = context.getNodeParameter('submissionId', index);
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'PUT', `/submissions/${submissionId}`, { spam: true });
    }
    if (operation === 'markHam') {
        const submissionId = context.getNodeParameter('submissionId', index);
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'PUT', `/submissions/${submissionId}`, { spam: false });
    }
    throw new n8n_workflow_1.NodeOperationError(context.getNode(), `Operation ${operation} not supported for submission resource`);
}
async function executeEnvironmentVariableOperation(context, index, operation) {
    const accountId = context.getNodeParameter('accountId', index);
    const siteId = context.getNodeParameter('siteId', index, '');
    const baseEndpoint = siteId
        ? `/accounts/${accountId}/env?site_id=${siteId}`
        : `/accounts/${accountId}/env`;
    if (operation === 'create') {
        const key = context.getNodeParameter('key', index);
        const value = context.getNodeParameter('value', index);
        const additionalFields = context.getNodeParameter('additionalFields', index);
        const values = [{
                value,
                context: additionalFields.context || 'all',
            }];
        if (additionalFields.contextParameter) {
            values[0].context_parameter = additionalFields.contextParameter;
        }
        const body = [{
                key,
                values,
                is_secret: additionalFields.isSecret || false,
            }];
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'POST', baseEndpoint, body);
    }
    if (operation === 'get') {
        const key = context.getNodeParameter('key', index);
        const endpoint = siteId
            ? `/accounts/${accountId}/env/${key}?site_id=${siteId}`
            : `/accounts/${accountId}/env/${key}`;
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'GET', endpoint);
    }
    if (operation === 'getAll') {
        const returnAll = context.getNodeParameter('returnAll', index);
        if (returnAll) {
            return await GenericFunctions_1.netlifyApiRequest.call(context, 'GET', baseEndpoint);
        }
        const result = await GenericFunctions_1.netlifyApiRequest.call(context, 'GET', baseEndpoint);
        const limit = context.getNodeParameter('limit', index);
        return Array.isArray(result) ? result.slice(0, limit) : result;
    }
    if (operation === 'update') {
        const key = context.getNodeParameter('key', index);
        const updateFields = context.getNodeParameter('updateFields', index);
        const body = {};
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
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'PUT', endpoint, body);
    }
    if (operation === 'delete') {
        const key = context.getNodeParameter('key', index);
        const endpoint = siteId
            ? `/accounts/${accountId}/env/${key}?site_id=${siteId}`
            : `/accounts/${accountId}/env/${key}`;
        await GenericFunctions_1.netlifyApiRequest.call(context, 'DELETE', endpoint);
        return { success: true };
    }
    if (operation === 'setValue') {
        const key = context.getNodeParameter('key', index);
        const value = context.getNodeParameter('value', index);
        const envContext = context.getNodeParameter('context', index);
        const contextParameter = context.getNodeParameter('contextParameter', index, '');
        const body = {
            value,
            context: envContext,
        };
        if (contextParameter) {
            body.context_parameter = contextParameter;
        }
        const endpoint = siteId
            ? `/accounts/${accountId}/env/${key}/value?site_id=${siteId}`
            : `/accounts/${accountId}/env/${key}/value`;
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'PATCH', endpoint, body);
    }
    throw new n8n_workflow_1.NodeOperationError(context.getNode(), `Operation ${operation} not supported for environmentVariable resource`);
}
async function executeFunctionOperation(context, index, operation) {
    const siteId = context.getNodeParameter('siteId', index);
    if (operation === 'get') {
        const functionName = context.getNodeParameter('functionName', index);
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'GET', `/sites/${siteId}/functions/${functionName}`);
    }
    if (operation === 'getAll') {
        const returnAll = context.getNodeParameter('returnAll', index);
        if (returnAll) {
            return await GenericFunctions_1.netlifyApiRequestAllItems.call(context, 'GET', `/sites/${siteId}/functions`);
        }
        const limit = context.getNodeParameter('limit', index);
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'GET', `/sites/${siteId}/functions`, {}, { per_page: limit });
    }
    if (operation === 'invoke') {
        const functionName = context.getNodeParameter('functionName', index);
        const payload = context.getNodeParameter('payload', index, {});
        const site = await GenericFunctions_1.netlifyApiRequest.call(context, 'GET', `/sites/${siteId}`);
        const siteUrl = site.ssl_url || site.url;
        const credentials = await context.getCredentials('netlifyApi');
        const options = {
            method: 'POST',
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
        const functionName = context.getNodeParameter('functionName', index);
        const filters = context.getNodeParameter('filters', index, {});
        const query = (0, GenericFunctions_1.buildQueryFromFilters)(filters);
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'GET', `/sites/${siteId}/functions/${functionName}/log`, {}, query);
    }
    throw new n8n_workflow_1.NodeOperationError(context.getNode(), `Operation ${operation} not supported for function resource`);
}
async function executeBuildOperation(context, index, operation) {
    if (operation === 'get') {
        const buildId = context.getNodeParameter('buildId', index);
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'GET', `/builds/${buildId}`);
    }
    if (operation === 'getAll') {
        const siteId = context.getNodeParameter('siteId', index);
        const returnAll = context.getNodeParameter('returnAll', index);
        if (returnAll) {
            return await GenericFunctions_1.netlifyApiRequestAllItems.call(context, 'GET', `/sites/${siteId}/builds`);
        }
        const limit = context.getNodeParameter('limit', index);
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'GET', `/sites/${siteId}/builds`, {}, { per_page: limit });
    }
    if (operation === 'trigger') {
        const siteId = context.getNodeParameter('siteId', index);
        const additionalFields = context.getNodeParameter('additionalFields', index);
        const body = {};
        if (additionalFields.clear_cache)
            body.clear_cache = additionalFields.clear_cache;
        if (additionalFields.branch)
            body.branch = additionalFields.branch;
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'POST', `/sites/${siteId}/builds`, body);
    }
    if (operation === 'cancel') {
        const buildId = context.getNodeParameter('buildId', index);
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'POST', `/builds/${buildId}/cancel`);
    }
    if (operation === 'retry') {
        const buildId = context.getNodeParameter('buildId', index);
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'POST', `/builds/${buildId}/retry`);
    }
    throw new n8n_workflow_1.NodeOperationError(context.getNode(), `Operation ${operation} not supported for build resource`);
}
async function executeDnsZoneOperation(context, index, operation) {
    if (operation === 'create') {
        const name = context.getNodeParameter('name', index);
        const additionalFields = context.getNodeParameter('additionalFields', index);
        const body = { name };
        if (additionalFields.account_slug)
            body.account_slug = additionalFields.account_slug;
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'POST', '/dns_zones', body);
    }
    if (operation === 'get') {
        const zoneId = context.getNodeParameter('zoneId', index);
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'GET', `/dns_zones/${zoneId}`);
    }
    if (operation === 'getAll') {
        const returnAll = context.getNodeParameter('returnAll', index);
        const filters = context.getNodeParameter('filters', index);
        const query = (0, GenericFunctions_1.buildQueryFromFilters)(filters);
        if (returnAll) {
            return await GenericFunctions_1.netlifyApiRequestAllItems.call(context, 'GET', '/dns_zones', {}, query);
        }
        const limit = context.getNodeParameter('limit', index);
        query.per_page = limit;
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'GET', '/dns_zones', {}, query);
    }
    if (operation === 'delete') {
        const zoneId = context.getNodeParameter('zoneId', index);
        await GenericFunctions_1.netlifyApiRequest.call(context, 'DELETE', `/dns_zones/${zoneId}`);
        return { success: true };
    }
    if (operation === 'getDnsRecords') {
        const zoneId = context.getNodeParameter('zoneId', index);
        const returnAll = context.getNodeParameter('returnAll', index);
        if (returnAll) {
            return await GenericFunctions_1.netlifyApiRequestAllItems.call(context, 'GET', `/dns_zones/${zoneId}/dns_records`);
        }
        const limit = context.getNodeParameter('limit', index);
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'GET', `/dns_zones/${zoneId}/dns_records`, {}, { per_page: limit });
    }
    if (operation === 'createDnsRecord') {
        const zoneId = context.getNodeParameter('zoneId', index);
        const recordType = context.getNodeParameter('recordType', index);
        const hostname = context.getNodeParameter('hostname', index);
        const value = context.getNodeParameter('recordValue', index);
        const additionalFields = context.getNodeParameter('additionalFields', index);
        const body = {
            type: recordType,
            hostname,
            value,
        };
        if (additionalFields.ttl)
            body.ttl = additionalFields.ttl;
        if (additionalFields.priority)
            body.priority = additionalFields.priority;
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'POST', `/dns_zones/${zoneId}/dns_records`, body);
    }
    if (operation === 'deleteDnsRecord') {
        const zoneId = context.getNodeParameter('zoneId', index);
        const recordId = context.getNodeParameter('recordId', index);
        await GenericFunctions_1.netlifyApiRequest.call(context, 'DELETE', `/dns_zones/${zoneId}/dns_records/${recordId}`);
        return { success: true };
    }
    throw new n8n_workflow_1.NodeOperationError(context.getNode(), `Operation ${operation} not supported for dnsZone resource`);
}
async function executeHookOperation(context, index, operation) {
    if (operation === 'create') {
        const siteId = context.getNodeParameter('siteId', index);
        const type = context.getNodeParameter('type', index);
        const event = context.getNodeParameter('event', index);
        const body = {
            type,
            event,
            data: {},
        };
        if (type === 'url') {
            body.data.url = context.getNodeParameter('hookUrl', index);
        }
        else if (type === 'email') {
            body.data.email = context.getNodeParameter('hookEmail', index);
        }
        else if (type === 'slack') {
            body.data.url = context.getNodeParameter('slackUrl', index);
        }
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'POST', `/sites/${siteId}/hooks`, body);
    }
    if (operation === 'get') {
        const hookId = context.getNodeParameter('hookId', index);
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'GET', `/hooks/${hookId}`);
    }
    if (operation === 'getAll') {
        const siteId = context.getNodeParameter('siteId', index);
        const returnAll = context.getNodeParameter('returnAll', index);
        if (returnAll) {
            return await GenericFunctions_1.netlifyApiRequestAllItems.call(context, 'GET', `/sites/${siteId}/hooks`);
        }
        const limit = context.getNodeParameter('limit', index);
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'GET', `/sites/${siteId}/hooks`, {}, { per_page: limit });
    }
    if (operation === 'update') {
        const hookId = context.getNodeParameter('hookId', index);
        const updateFields = context.getNodeParameter('updateFields', index);
        const body = {};
        if (updateFields.event) {
            body.event = updateFields.event;
        }
        if (updateFields.url || updateFields.email || updateFields.slack_url) {
            body.data = {};
            if (updateFields.url)
                body.data.url = updateFields.url;
            if (updateFields.email)
                body.data.email = updateFields.email;
            if (updateFields.slack_url)
                body.data.url = updateFields.slack_url;
        }
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'PUT', `/hooks/${hookId}`, body);
    }
    if (operation === 'delete') {
        const hookId = context.getNodeParameter('hookId', index);
        await GenericFunctions_1.netlifyApiRequest.call(context, 'DELETE', `/hooks/${hookId}`);
        return { success: true };
    }
    if (operation === 'enable') {
        const hookId = context.getNodeParameter('hookId', index);
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'POST', `/hooks/${hookId}/enable`);
    }
    if (operation === 'disable') {
        const hookId = context.getNodeParameter('hookId', index);
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'POST', `/hooks/${hookId}/disable`);
    }
    throw new n8n_workflow_1.NodeOperationError(context.getNode(), `Operation ${operation} not supported for hook resource`);
}
async function executeDeployKeyOperation(context, index, operation) {
    if (operation === 'create') {
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'POST', '/deploy_keys');
    }
    if (operation === 'get') {
        const keyId = context.getNodeParameter('keyId', index);
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'GET', `/deploy_keys/${keyId}`);
    }
    if (operation === 'getAll') {
        const returnAll = context.getNodeParameter('returnAll', index);
        if (returnAll) {
            return await GenericFunctions_1.netlifyApiRequestAllItems.call(context, 'GET', '/deploy_keys');
        }
        const limit = context.getNodeParameter('limit', index);
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'GET', '/deploy_keys', {}, { per_page: limit });
    }
    if (operation === 'delete') {
        const keyId = context.getNodeParameter('keyId', index);
        await GenericFunctions_1.netlifyApiRequest.call(context, 'DELETE', `/deploy_keys/${keyId}`);
        return { success: true };
    }
    throw new n8n_workflow_1.NodeOperationError(context.getNode(), `Operation ${operation} not supported for deployKey resource`);
}
async function executeMemberOperation(context, index, operation) {
    const accountSlug = context.getNodeParameter('accountSlug', index);
    if (operation === 'get') {
        const memberId = context.getNodeParameter('memberId', index);
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'GET', `/${accountSlug}/members/${memberId}`);
    }
    if (operation === 'getAll') {
        const returnAll = context.getNodeParameter('returnAll', index);
        if (returnAll) {
            return await GenericFunctions_1.netlifyApiRequestAllItems.call(context, 'GET', `/${accountSlug}/members`);
        }
        const limit = context.getNodeParameter('limit', index);
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'GET', `/${accountSlug}/members`, {}, { per_page: limit });
    }
    if (operation === 'invite') {
        const email = context.getNodeParameter('email', index);
        const role = context.getNodeParameter('role', index);
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'POST', `/${accountSlug}/members`, {
            email,
            role,
        });
    }
    if (operation === 'remove') {
        const memberId = context.getNodeParameter('memberId', index);
        await GenericFunctions_1.netlifyApiRequest.call(context, 'DELETE', `/${accountSlug}/members/${memberId}`);
        return { success: true };
    }
    if (operation === 'updateRole') {
        const memberId = context.getNodeParameter('memberId', index);
        const newRole = context.getNodeParameter('newRole', index);
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'PUT', `/${accountSlug}/members/${memberId}`, {
            role: newRole,
        });
    }
    throw new n8n_workflow_1.NodeOperationError(context.getNode(), `Operation ${operation} not supported for member resource`);
}
async function executeSplitTestOperation(context, index, operation) {
    const siteId = context.getNodeParameter('siteId', index);
    if (operation === 'create') {
        const branchTests = context.getNodeParameter('branchTests', index);
        const branches = branchTests.branches || [];
        const body = {
            branch_tests: branches.reduce((acc, item) => {
                acc[item.branch] = item.percentage;
                return acc;
            }, {}),
        };
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'POST', `/sites/${siteId}/traffic_splits`, body);
    }
    if (operation === 'get') {
        const splitTestId = context.getNodeParameter('splitTestId', index);
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'GET', `/sites/${siteId}/traffic_splits/${splitTestId}`);
    }
    if (operation === 'getAll') {
        const returnAll = context.getNodeParameter('returnAll', index);
        if (returnAll) {
            return await GenericFunctions_1.netlifyApiRequestAllItems.call(context, 'GET', `/sites/${siteId}/traffic_splits`);
        }
        const limit = context.getNodeParameter('limit', index);
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'GET', `/sites/${siteId}/traffic_splits`, {}, { per_page: limit });
    }
    if (operation === 'update') {
        const splitTestId = context.getNodeParameter('splitTestId', index);
        const updateFields = context.getNodeParameter('updateFields', index);
        const body = {};
        if (updateFields.branchTests) {
            const branchTests = updateFields.branchTests;
            const branches = branchTests.branches || [];
            body.branch_tests = branches.reduce((acc, item) => {
                acc[item.branch] = item.percentage;
                return acc;
            }, {});
        }
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'PUT', `/sites/${siteId}/traffic_splits/${splitTestId}`, body);
    }
    if (operation === 'start') {
        const splitTestId = context.getNodeParameter('splitTestId', index);
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'POST', `/sites/${siteId}/traffic_splits/${splitTestId}/publish`);
    }
    if (operation === 'stop') {
        const splitTestId = context.getNodeParameter('splitTestId', index);
        return await GenericFunctions_1.netlifyApiRequest.call(context, 'POST', `/sites/${siteId}/traffic_splits/${splitTestId}/unpublish`);
    }
    throw new n8n_workflow_1.NodeOperationError(context.getNode(), `Operation ${operation} not supported for splitTest resource`);
}
class Netlify {
    constructor() {
        this.description = {
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
                ...SiteDescription_1.siteOperations,
                ...SiteDescription_1.siteFields,
                ...DeployDescription_1.deployOperations,
                ...DeployDescription_1.deployFields,
                ...FormDescription_1.formOperations,
                ...FormDescription_1.formFields,
                ...SubmissionDescription_1.submissionOperations,
                ...SubmissionDescription_1.submissionFields,
                ...EnvironmentVariableDescription_1.environmentVariableOperations,
                ...EnvironmentVariableDescription_1.environmentVariableFields,
                ...FunctionDescription_1.functionOperations,
                ...FunctionDescription_1.functionFields,
                ...BuildDescription_1.buildOperations,
                ...BuildDescription_1.buildFields,
                ...DnsZoneDescription_1.dnsZoneOperations,
                ...DnsZoneDescription_1.dnsZoneFields,
                ...HookDescription_1.hookOperations,
                ...HookDescription_1.hookFields,
                ...DeployKeyDescription_1.deployKeyOperations,
                ...DeployKeyDescription_1.deployKeyFields,
                ...MemberDescription_1.memberOperations,
                ...MemberDescription_1.memberFields,
                ...SplitTestDescription_1.splitTestOperations,
                ...SplitTestDescription_1.splitTestFields,
            ],
        };
    }
    async execute() {
        (0, GenericFunctions_1.logLicensingNotice)(this);
        const items = this.getInputData();
        const returnData = [];
        const resource = this.getNodeParameter('resource', 0);
        const operation = this.getNodeParameter('operation', 0);
        for (let i = 0; i < items.length; i++) {
            try {
                let responseData = {};
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
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Resource ${resource} not supported`);
                }
                const executionData = this.helpers.constructExecutionMetaData(this.helpers.returnJsonArray(responseData), { itemData: { item: i } });
                returnData.push(...executionData);
            }
            catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
                    continue;
                }
                throw error;
            }
        }
        return [returnData];
    }
}
exports.Netlify = Netlify;
