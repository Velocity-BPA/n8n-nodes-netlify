"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetlifyTrigger = void 0;
const GenericFunctions_1 = require("./GenericFunctions");
class NetlifyTrigger {
    constructor() {
        this.description = {
            displayName: 'Netlify Trigger',
            name: 'netlifyTrigger',
            icon: 'file:netlify.svg',
            group: ['trigger'],
            version: 1,
            subtitle: '={{$parameter["event"]}}',
            description: 'Handle Netlify deploy and form events via webhooks',
            defaults: {
                name: 'Netlify Trigger',
            },
            inputs: [],
            outputs: ['main'],
            credentials: [
                {
                    name: 'netlifyApi',
                    required: true,
                },
            ],
            webhooks: [
                {
                    name: 'default',
                    httpMethod: 'POST',
                    responseMode: 'onReceived',
                    path: 'webhook',
                },
            ],
            properties: [
                {
                    displayName: 'Site ID',
                    name: 'siteId',
                    type: 'string',
                    required: true,
                    default: '',
                    description: 'The ID of the site to watch for events',
                },
                {
                    displayName: 'Event',
                    name: 'event',
                    type: 'options',
                    required: true,
                    options: [
                        {
                            name: 'Deploy Building',
                            value: 'deploy_building',
                            description: 'Deploy build started',
                        },
                        {
                            name: 'Deploy Created',
                            value: 'deploy_created',
                            description: 'Deploy created',
                        },
                        {
                            name: 'Deploy Failed',
                            value: 'deploy_failed',
                            description: 'Deploy failed',
                        },
                        {
                            name: 'Deploy Locked',
                            value: 'deploy_locked',
                            description: 'Deploy locked',
                        },
                        {
                            name: 'Deploy Request Accepted',
                            value: 'deploy_request_accepted',
                            description: 'Deploy request accepted',
                        },
                        {
                            name: 'Deploy Request Pending',
                            value: 'deploy_request_pending',
                            description: 'Deploy request pending',
                        },
                        {
                            name: 'Deploy Request Rejected',
                            value: 'deploy_request_rejected',
                            description: 'Deploy request rejected',
                        },
                        {
                            name: 'Deploy Unlocked',
                            value: 'deploy_unlocked',
                            description: 'Deploy unlocked',
                        },
                        {
                            name: 'Split Test Activated',
                            value: 'split_test_activated',
                            description: 'A/B test started',
                        },
                        {
                            name: 'Split Test Deactivated',
                            value: 'split_test_deactivated',
                            description: 'A/B test stopped',
                        },
                        {
                            name: 'Submission Created',
                            value: 'submission_created',
                            description: 'Form submission received',
                        },
                    ],
                    default: 'deploy_created',
                    description: 'The event to listen for',
                },
            ],
        };
        this.webhookMethods = {
            default: {
                async checkExists() {
                    var _a;
                    const webhookData = this.getWorkflowStaticData('node');
                    const webhookUrl = this.getNodeWebhookUrl('default');
                    const siteId = this.getNodeParameter('siteId');
                    const event = this.getNodeParameter('event');
                    try {
                        const hooks = await GenericFunctions_1.netlifyApiRequest.call(this, 'GET', `/sites/${siteId}/hooks`);
                        for (const hook of hooks) {
                            if (hook.type === 'url' &&
                                hook.event === event &&
                                ((_a = hook.data) === null || _a === void 0 ? void 0 : _a.url) === webhookUrl) {
                                webhookData.webhookId = hook.id;
                                return true;
                            }
                        }
                        return false;
                    }
                    catch {
                        return false;
                    }
                },
                async create() {
                    const webhookData = this.getWorkflowStaticData('node');
                    const webhookUrl = this.getNodeWebhookUrl('default');
                    const siteId = this.getNodeParameter('siteId');
                    const event = this.getNodeParameter('event');
                    const body = {
                        type: 'url',
                        event,
                        data: {
                            url: webhookUrl,
                        },
                    };
                    const response = await GenericFunctions_1.netlifyApiRequest.call(this, 'POST', `/sites/${siteId}/hooks`, body);
                    if (response.id) {
                        webhookData.webhookId = response.id;
                        return true;
                    }
                    return false;
                },
                async delete() {
                    const webhookData = this.getWorkflowStaticData('node');
                    if (webhookData.webhookId) {
                        try {
                            await GenericFunctions_1.netlifyApiRequest.call(this, 'DELETE', `/hooks/${webhookData.webhookId}`);
                        }
                        catch (error) {
                            return false;
                        }
                    }
                    delete webhookData.webhookId;
                    return true;
                },
            },
        };
    }
    async webhook() {
        const req = this.getRequestObject();
        const body = req.body;
        return {
            workflowData: [
                this.helpers.returnJsonArray(body),
            ],
        };
    }
}
exports.NetlifyTrigger = NetlifyTrigger;
