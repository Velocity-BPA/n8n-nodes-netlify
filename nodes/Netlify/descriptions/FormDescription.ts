/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const formOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['form'],
			},
		},
		options: [
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a form',
				action: 'Delete a form',
			},
			{
				name: 'Disable Spam Filter',
				value: 'disableSpamFilter',
				description: 'Disable Akismet spam filtering',
				action: 'Disable spam filter for a form',
			},
			{
				name: 'Enable Spam Filter',
				value: 'enableSpamFilter',
				description: 'Enable Akismet spam filtering',
				action: 'Enable spam filter for a form',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get form details',
				action: 'Get a form',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many forms for a site',
				action: 'Get many forms',
			},
			{
				name: 'Get Submissions',
				value: 'getSubmissions',
				description: 'Get form submissions',
				action: 'Get form submissions',
			},
		],
		default: 'get',
	},
];

export const formFields: INodeProperties[] = [
	// ----------------------------------
	//         form: getAll
	// ----------------------------------
	{
		displayName: 'Site ID',
		name: 'siteId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['form'],
				operation: ['getAll'],
			},
		},
		description: 'The ID of the site',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['form'],
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
				resource: ['form'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},

	// ----------------------------------
	//         form: get, delete, enableSpamFilter, disableSpamFilter
	// ----------------------------------
	{
		displayName: 'Form ID',
		name: 'formId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['form'],
				operation: ['get', 'delete', 'enableSpamFilter', 'disableSpamFilter'],
			},
		},
		description: 'The ID of the form',
	},

	// ----------------------------------
	//         form: getSubmissions
	// ----------------------------------
	{
		displayName: 'Form ID',
		name: 'formId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['form'],
				operation: ['getSubmissions'],
			},
		},
		description: 'The ID of the form',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['form'],
				operation: ['getSubmissions'],
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
				resource: ['form'],
				operation: ['getSubmissions'],
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
				resource: ['form'],
				operation: ['getSubmissions'],
			},
		},
		options: [
			{
				displayName: 'State',
				name: 'state',
				type: 'options',
				options: [
					{ name: 'All', value: '' },
					{ name: 'Pending', value: 'pending' },
					{ name: 'Spam', value: 'spam' },
					{ name: 'Verified', value: 'verified' },
				],
				default: '',
				description: 'Filter submissions by state',
			},
		],
	},
];
