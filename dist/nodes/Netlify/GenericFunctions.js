"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.netlifyApiRequest = netlifyApiRequest;
exports.netlifyApiRequestAllItems = netlifyApiRequestAllItems;
exports.handleNetlifyError = handleNetlifyError;
exports.validateSiteId = validateSiteId;
exports.buildQueryFromFilters = buildQueryFromFilters;
exports.buildQueryString = buildQueryString;
exports.logLicensingNotice = logLicensingNotice;
const n8n_workflow_1 = require("n8n-workflow");
const BASE_URL = 'https://api.netlify.com/api/v1';
async function netlifyApiRequest(method, endpoint, body = {}, query = {}, uri, option = {}) {
    const options = {
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
    }
    catch (error) {
        throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
    }
}
async function netlifyApiRequestAllItems(method, endpoint, body = {}, query = {}) {
    const returnData = [];
    let page = 1;
    const perPage = 100;
    query.per_page = perPage;
    let responseData;
    do {
        query.page = page;
        responseData = (await netlifyApiRequest.call(this, method, endpoint, body, query));
        if (Array.isArray(responseData)) {
            returnData.push(...responseData);
        }
        else {
            break;
        }
        page++;
    } while (responseData.length === perPage);
    return returnData;
}
function handleNetlifyError(error) {
    if (error instanceof Error) {
        throw error;
    }
    throw new Error(`Netlify API Error: ${JSON.stringify(error)}`);
}
function validateSiteId(siteId) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    const slugRegex = /^[a-z0-9-]+$/i;
    return uuidRegex.test(siteId) || slugRegex.test(siteId);
}
function buildQueryFromFilters(filters) {
    const query = {};
    for (const [key, value] of Object.entries(filters)) {
        if (value !== undefined && value !== null && value !== '') {
            query[key] = value;
        }
    }
    return query;
}
function buildQueryString(params) {
    const query = {};
    for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== null && value !== '') {
            query[key] = value;
        }
    }
    return query;
}
let licensingNoticeLogged = false;
function logLicensingNotice(context) {
    if (!licensingNoticeLogged) {
        context.logger.warn('[Velocity BPA Licensing Notice] This n8n node is licensed under the Business Source License 1.1 (BSL 1.1). ' +
            'Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA. ' +
            'For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.');
        licensingNoticeLogged = true;
    }
}
