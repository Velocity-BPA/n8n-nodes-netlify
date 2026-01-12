import type { IDataObject, IExecuteFunctions, IHookFunctions, IHttpRequestMethods, ILoadOptionsFunctions, IPollFunctions, IWebhookFunctions } from 'n8n-workflow';
export declare function netlifyApiRequest(this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions | IWebhookFunctions | IPollFunctions, method: IHttpRequestMethods, endpoint: string, body?: IDataObject | IDataObject[], query?: IDataObject, uri?: string, option?: IDataObject): Promise<IDataObject | IDataObject[]>;
export declare function netlifyApiRequestAllItems(this: IExecuteFunctions | ILoadOptionsFunctions, method: IHttpRequestMethods, endpoint: string, body?: IDataObject, query?: IDataObject): Promise<IDataObject[]>;
export declare function handleNetlifyError(error: unknown): never;
export declare function validateSiteId(siteId: string): boolean;
export declare function buildQueryFromFilters(filters: IDataObject): IDataObject;
export declare function buildQueryString(params: IDataObject): IDataObject;
export declare function logLicensingNotice(context: IExecuteFunctions): void;
