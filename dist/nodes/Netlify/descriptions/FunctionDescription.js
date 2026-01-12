"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.functionFields = exports.functionOperations = void 0;
exports.functionOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['function'],
            },
        },
        options: [
            {
                name: 'Get',
                value: 'get',
                description: 'Get function details',
                action: 'Get a function',
            },
            {
                name: 'Get Logs',
                value: 'getLogs',
                description: 'Get function invocation logs',
                action: 'Get function logs',
            },
            {
                name: 'Get Many',
                value: 'getAll',
                description: 'Get many functions for a site',
                action: 'Get many functions',
            },
            {
                name: 'Invoke',
                value: 'invoke',
                description: 'Invoke a function',
                action: 'Invoke a function',
            },
        ],
        default: 'get',
    },
];
exports.functionFields = [
    {
        displayName: 'Site ID',
        name: 'siteId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['function'],
            },
        },
        description: 'The ID of the site',
    },
    {
        displayName: 'Function Name',
        name: 'functionName',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['function'],
                operation: ['get', 'invoke', 'getLogs'],
            },
        },
        description: 'The name of the function',
    },
    {
        displayName: 'Payload',
        name: 'payload',
        type: 'json',
        default: '{}',
        displayOptions: {
            show: {
                resource: ['function'],
                operation: ['invoke'],
            },
        },
        description: 'JSON payload to send to the function',
    },
    {
        displayName: 'Options',
        name: 'options',
        type: 'collection',
        placeholder: 'Add Option',
        default: {},
        displayOptions: {
            show: {
                resource: ['function'],
                operation: ['invoke'],
            },
        },
        options: [
            {
                displayName: 'HTTP Method',
                name: 'method',
                type: 'options',
                options: [
                    { name: 'GET', value: 'GET' },
                    { name: 'POST', value: 'POST' },
                    { name: 'PUT', value: 'PUT' },
                    { name: 'DELETE', value: 'DELETE' },
                ],
                default: 'POST',
                description: 'HTTP method to use when invoking the function',
            },
            {
                displayName: 'Headers',
                name: 'headers',
                type: 'json',
                default: '{}',
                description: 'Additional headers to send with the request',
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
                resource: ['function'],
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
                resource: ['function'],
                operation: ['getAll'],
                returnAll: [false],
            },
        },
        description: 'Max number of results to return',
    },
    {
        displayName: 'Options',
        name: 'logOptions',
        type: 'collection',
        placeholder: 'Add Option',
        default: {},
        displayOptions: {
            show: {
                resource: ['function'],
                operation: ['getLogs'],
            },
        },
        options: [
            {
                displayName: 'Log Type',
                name: 'log_type',
                type: 'options',
                options: [
                    { name: 'All', value: '' },
                    { name: 'Error', value: 'error' },
                    { name: 'Info', value: 'info' },
                    { name: 'Warn', value: 'warn' },
                ],
                default: '',
                description: 'Filter by log type',
            },
        ],
    },
];
