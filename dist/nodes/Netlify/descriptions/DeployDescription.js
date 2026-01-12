"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployFields = exports.deployOperations = void 0;
exports.deployOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['deploy'],
            },
        },
        options: [
            {
                name: 'Cancel',
                value: 'cancel',
                description: 'Cancel a deploy',
                action: 'Cancel a deploy',
            },
            {
                name: 'Create',
                value: 'create',
                description: 'Create a new deploy',
                action: 'Create a deploy',
            },
            {
                name: 'Get',
                value: 'get',
                description: 'Get deploy details',
                action: 'Get a deploy',
            },
            {
                name: 'Get Log',
                value: 'getLog',
                description: 'Get deploy build log',
                action: 'Get deploy log',
            },
            {
                name: 'Get Many',
                value: 'getAll',
                description: 'Get many deploys for a site',
                action: 'Get many deploys',
            },
            {
                name: 'Lock',
                value: 'lock',
                description: 'Lock deploy (prevent auto-publishing)',
                action: 'Lock a deploy',
            },
            {
                name: 'Publish',
                value: 'publish',
                description: 'Publish a deploy to production',
                action: 'Publish a deploy',
            },
            {
                name: 'Restore',
                value: 'restore',
                description: 'Restore a previous deploy',
                action: 'Restore a deploy',
            },
            {
                name: 'Unlock',
                value: 'unlock',
                description: 'Unlock deploy',
                action: 'Unlock a deploy',
            },
        ],
        default: 'get',
    },
];
exports.deployFields = [
    {
        displayName: 'Site ID',
        name: 'siteId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['deploy'],
                operation: ['create', 'getAll'],
            },
        },
        description: 'The ID of the site',
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['deploy'],
                operation: ['create'],
            },
        },
        options: [
            {
                displayName: 'Async',
                name: 'async',
                type: 'boolean',
                default: false,
                description: 'Whether to use async deploy for large sites',
            },
            {
                displayName: 'Branch',
                name: 'branch',
                type: 'string',
                default: '',
                description: 'Git branch to deploy',
            },
            {
                displayName: 'Draft',
                name: 'draft',
                type: 'boolean',
                default: false,
                description: 'Whether to create as draft deploy',
            },
            {
                displayName: 'Framework',
                name: 'framework',
                type: 'string',
                default: '',
                description: 'Framework auto-detection override',
            },
            {
                displayName: 'Title',
                name: 'title',
                type: 'string',
                default: '',
                description: 'Deploy title/message',
            },
        ],
    },
    {
        displayName: 'Deploy ID',
        name: 'deployId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['deploy'],
                operation: ['get', 'cancel', 'lock', 'unlock', 'publish', 'restore', 'getLog'],
            },
        },
        description: 'The ID of the deploy',
    },
    {
        displayName: 'Return All',
        name: 'returnAll',
        type: 'boolean',
        default: false,
        displayOptions: {
            show: {
                resource: ['deploy'],
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
                resource: ['deploy'],
                operation: ['getAll'],
                returnAll: [false],
            },
        },
        description: 'Max number of results to return',
    },
    {
        displayName: 'Filters',
        name: 'filters',
        type: 'collection',
        placeholder: 'Add Filter',
        default: {},
        displayOptions: {
            show: {
                resource: ['deploy'],
                operation: ['getAll'],
            },
        },
        options: [
            {
                displayName: 'Branch',
                name: 'branch',
                type: 'string',
                default: '',
                description: 'Filter by branch name',
            },
            {
                displayName: 'Deploy Previews',
                name: 'deploy-previews',
                type: 'boolean',
                default: false,
                description: 'Whether to include deploy previews',
            },
            {
                displayName: 'Production',
                name: 'production',
                type: 'boolean',
                default: false,
                description: 'Whether to show only production deploys',
            },
            {
                displayName: 'State',
                name: 'state',
                type: 'options',
                options: [
                    { name: 'All', value: '' },
                    { name: 'Building', value: 'building' },
                    { name: 'Enqueued', value: 'enqueued' },
                    { name: 'Error', value: 'error' },
                    { name: 'New', value: 'new' },
                    { name: 'Pending Review', value: 'pending_review' },
                    { name: 'Processing', value: 'processing' },
                    { name: 'Ready', value: 'ready' },
                    { name: 'Uploading', value: 'uploading' },
                ],
                default: '',
                description: 'Filter by deploy state',
            },
        ],
    },
];
