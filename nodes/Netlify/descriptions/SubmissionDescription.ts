/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const submissionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['submission'],
			},
		},
		options: [
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a submission',
				action: 'Delete a submission',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get submission details',
				action: 'Get a submission',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many submissions',
				action: 'Get many submissions',
			},
			{
				name: 'Mark as Ham',
				value: 'markHam',
				description: 'Mark submission as not spam (ham)',
				action: 'Mark submission as ham',
			},
			{
				name: 'Mark as Spam',
				value: 'markSpam',
				description: 'Mark submission as spam',
				action: 'Mark submission as spam',
			},
		],
		default: 'get',
	},
];

export const submissionFields: INodeProperties[] = [
	// ----------------------------------
	//         submission: get, delete, markSpam, markHam
	// ----------------------------------
	{
		displayName: 'Submission ID',
		name: 'submissionId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['submission'],
				operation: ['get', 'delete', 'markSpam', 'markHam'],
			},
		},
		description: 'The ID of the submission',
	},

	// ----------------------------------
	//         submission: getAll
	// ----------------------------------
	{
		displayName: 'Site ID',
		name: 'siteId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['submission'],
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
				resource: ['submission'],
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
				resource: ['submission'],
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
				resource: ['submission'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Form ID',
				name: 'form_id',
				type: 'string',
				default: '',
				description: 'Filter by form ID',
			},
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
