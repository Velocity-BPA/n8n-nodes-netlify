"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hookFields = exports.hookOperations = void 0;
exports.hookOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['hook'],
            },
        },
        options: [
            {
                name: 'Create',
                value: 'create',
                description: 'Create a notification hook',
                action: 'Create a hook',
            },
            {
                name: 'Delete',
                value: 'delete',
                description: 'Delete a hook',
                action: 'Delete a hook',
            },
            {
                name: 'Disable',
                value: 'disable',
                description: 'Disable a hook',
                action: 'Disable a hook',
            },
            {
                name: 'Enable',
                value: 'enable',
                description: 'Enable a hook',
                action: 'Enable a hook',
            },
            {
                name: 'Get',
                value: 'get',
                description: 'Get hook details',
                action: 'Get a hook',
            },
            {
                name: 'Get Many',
                value: 'getAll',
                description: 'Get many hooks for a site',
                action: 'Get many hooks',
            },
            {
                name: 'Update',
                value: 'update',
                description: 'Update hook configuration',
                action: 'Update a hook',
            },
        ],
        default: 'get',
    },
];
exports.hookFields = [
    {
        displayName: 'Site ID',
        name: 'siteId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['hook'],
                operation: ['create', 'getAll'],
            },
        },
        description: 'The ID of the site',
    },
    {
        displayName: 'Type',
        name: 'type',
        type: 'options',
        required: true,
        options: [
            { name: 'Email', value: 'email' },
            { name: 'Slack', value: 'slack' },
            { name: 'URL', value: 'url' },
        ],
        default: 'url',
        displayOptions: {
            show: {
                resource: ['hook'],
                operation: ['create'],
            },
        },
        description: 'Type of notification hook',
    },
    {
        displayName: 'Event',
        name: 'event',
        type: 'options',
        required: true,
        options: [
            { name: 'Deploy Building', value: 'deploy_building' },
            { name: 'Deploy Created', value: 'deploy_created' },
            { name: 'Deploy Failed', value: 'deploy_failed' },
            { name: 'Deploy Locked', value: 'deploy_locked' },
            { name: 'Deploy Request Accepted', value: 'deploy_request_accepted' },
            { name: 'Deploy Request Pending', value: 'deploy_request_pending' },
            { name: 'Deploy Request Rejected', value: 'deploy_request_rejected' },
            { name: 'Deploy Unlocked', value: 'deploy_unlocked' },
            { name: 'Submission Created', value: 'submission_created' },
            { name: 'Split Test Activated', value: 'split_test_activated' },
            { name: 'Split Test Deactivated', value: 'split_test_deactivated' },
        ],
        default: 'deploy_created',
        displayOptions: {
            show: {
                resource: ['hook'],
                operation: ['create'],
            },
        },
        description: 'Event that triggers the hook',
    },
    {
        displayName: 'URL',
        name: 'hookUrl',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['hook'],
                operation: ['create'],
                type: ['url'],
            },
        },
        description: 'Webhook URL to call',
    },
    {
        displayName: 'Email',
        name: 'hookEmail',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['hook'],
                operation: ['create'],
                type: ['email'],
            },
        },
        description: 'Email address to notify',
    },
    {
        displayName: 'Slack Webhook URL',
        name: 'slackUrl',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['hook'],
                operation: ['create'],
                type: ['slack'],
            },
        },
        description: 'Slack incoming webhook URL',
    },
    {
        displayName: 'Hook ID',
        name: 'hookId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['hook'],
                operation: ['get', 'delete', 'enable', 'disable', 'update'],
            },
        },
        description: 'The ID of the hook',
    },
    {
        displayName: 'Update Fields',
        name: 'updateFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['hook'],
                operation: ['update'],
            },
        },
        options: [
            {
                displayName: 'Email',
                name: 'email',
                type: 'string',
                default: '',
                description: 'Email address for email hooks',
            },
            {
                displayName: 'Event',
                name: 'event',
                type: 'options',
                options: [
                    { name: 'Deploy Building', value: 'deploy_building' },
                    { name: 'Deploy Created', value: 'deploy_created' },
                    { name: 'Deploy Failed', value: 'deploy_failed' },
                    { name: 'Deploy Locked', value: 'deploy_locked' },
                    { name: 'Deploy Unlocked', value: 'deploy_unlocked' },
                    { name: 'Submission Created', value: 'submission_created' },
                ],
                default: 'deploy_created',
                description: 'Event that triggers the hook',
            },
            {
                displayName: 'Slack URL',
                name: 'slack_url',
                type: 'string',
                default: '',
                description: 'Slack webhook URL for Slack hooks',
            },
            {
                displayName: 'URL',
                name: 'url',
                type: 'string',
                default: '',
                description: 'Webhook URL for URL hooks',
            },
        ],
    },
    {
        displayName: 'Return All',
        name: 'returnAll',
        type: 'boolean',
        default: false,
        displayOptions: {
            show: {
                resource: ['hook'],
                operation: ['getAll'],
            },
        },
        description: 'Whether to return all results or only up to a given limit',
    },
    {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        typeOptions: {
            minValue: 1,
        },
        default: 50,
        displayOptions: {
            show: {
                resource: ['hook'],
                operation: ['getAll'],
                returnAll: [false],
            },
        },
        description: 'Max number of results to return',
    },
];
