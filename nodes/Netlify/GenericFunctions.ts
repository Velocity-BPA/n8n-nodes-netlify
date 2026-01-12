/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IDataObject,
	IExecuteFunctions,
	IHookFunctions,
	IHttpRequestMethods,
	ILoadOptionsFunctions,
	IPollFunctions,
	IRequestOptions,
	IWebhookFunctions,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

const BASE_URL = 'https://api.netlify.com/api/v1';

/**
 * Make an authenticated request to the Netlify API
 */
export async function netlifyApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions | IWebhookFunctions | IPollFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject | IDataObject[] = {},
	query: IDataObject = {},
	uri?: string,
	option: IDataObject = {},
): Promise<IDataObject | IDataObject[]> {
	const options: IRequestOptions = {
		method,
		qs: query,
		uri: uri || `${BASE_URL}${endpoint}`,
		json: true,
	};

	if (Array.isArray(body) ? body.length > 0 : Object.keys(body).length > 0) {
		options.body = body;
	}

	if (Object.keys(option).length > 0) {
		Object.assign(options, option);
	}

	try {
		const credentials = await this.getCredentials('netlifyApi');
		options.headers = {
			Authorization: `Bearer ${credentials.accessToken}`,
			'Content-Type': 'application/json',
		};

		return await this.helpers.request(options);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}

/**
 * Make an authenticated request and return all paginated results
 */
export async function netlifyApiRequestAllItems(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	query: IDataObject = {},
): Promise<IDataObject[]> {
	const returnData: IDataObject[] = [];
	let page = 1;
	const perPage = 100;

	query.per_page = perPage;

	let responseData: IDataObject[];

	do {
		query.page = page;
		responseData = (await netlifyApiRequest.call(
			this,
			method,
			endpoint,
			body,
			query,
		)) as IDataObject[];

		if (Array.isArray(responseData)) {
			returnData.push(...responseData);
		} else {
			break;
		}

		page++;
	} while (responseData.length === perPage);

	return returnData;
}

/**
 * Handle error responses from the Netlify API
 */
export function handleNetlifyError(error: unknown): never {
	if (error instanceof Error) {
		throw error;
	}
	throw new Error(`Netlify API Error: ${JSON.stringify(error)}`);
}

/**
 * Validate a site ID format
 */
export function validateSiteId(siteId: string): boolean {
	// Netlify site IDs are UUIDs or slugs
	const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
	const slugRegex = /^[a-z0-9-]+$/i;
	return uuidRegex.test(siteId) || slugRegex.test(siteId);
}

/**
 * Build query string from filters
 */
export function buildQueryFromFilters(filters: IDataObject): IDataObject {
	const query: IDataObject = {};

	for (const [key, value] of Object.entries(filters)) {
		if (value !== undefined && value !== null && value !== '') {
			query[key] = value;
		}
	}

	return query;
}

/**
 * Build query string, filtering out undefined, null, and empty string values
 * but keeping false and zero values
 */
export function buildQueryString(params: IDataObject): IDataObject {
	const query: IDataObject = {};

	for (const [key, value] of Object.entries(params)) {
		// Keep the value if it's not undefined, null, or empty string
		// This explicitly keeps false and 0 values
		if (value !== undefined && value !== null && value !== '') {
			query[key] = value;
		}
	}

	return query;
}

/**
 * Log the Velocity BPA licensing notice (once per node load)
 */
let licensingNoticeLogged = false;

export function logLicensingNotice(context: IExecuteFunctions): void {
	if (!licensingNoticeLogged) {
		context.logger.warn(
			'[Velocity BPA Licensing Notice] This n8n node is licensed under the Business Source License 1.1 (BSL 1.1). ' +
			'Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA. ' +
			'For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.',
		);
		licensingNoticeLogged = true;
	}
}
