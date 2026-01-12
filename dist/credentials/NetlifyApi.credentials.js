"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetlifyApi = void 0;
class NetlifyApi {
    constructor() {
        this.name = 'netlifyApi';
        this.displayName = 'Netlify API';
        this.documentationUrl = 'https://docs.netlify.com/api/get-started/';
        this.properties = [
            {
                displayName: 'Access Token',
                name: 'accessToken',
                type: 'string',
                typeOptions: {
                    password: true,
                },
                default: '',
                required: true,
                description: 'Personal Access Token from Netlify Dashboard (User Settings > Applications > Personal access tokens)',
            },
        ];
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    Authorization: '=Bearer {{$credentials.accessToken}}',
                },
            },
        };
        this.test = {
            request: {
                baseURL: 'https://api.netlify.com/api/v1',
                url: '/user',
                method: 'GET',
            },
        };
    }
}
exports.NetlifyApi = NetlifyApi;
