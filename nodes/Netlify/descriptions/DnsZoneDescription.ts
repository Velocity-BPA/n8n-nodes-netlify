/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const dnsZoneOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['dnsZone'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a DNS zone',
				action: 'Create a DNS zone',
			},
			{
				name: 'Create DNS Record',
				value: 'createDnsRecord',
				description: 'Create a DNS record',
				action: 'Create a DNS record',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a DNS zone',
				action: 'Delete a DNS zone',
			},
			{
				name: 'Delete DNS Record',
				value: 'deleteDnsRecord',
				description: 'Delete a DNS record',
				action: 'Delete a DNS record',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get DNS zone details',
				action: 'Get a DNS zone',
			},
			{
				name: 'Get DNS Records',
				value: 'getDnsRecords',
				description: 'Get DNS records for zone',
				action: 'Get DNS records',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many DNS zones',
				action: 'Get many DNS zones',
			},
		],
		default: 'get',
	},
];

export const dnsZoneFields: INodeProperties[] = [
	// ----------------------------------
	//         dnsZone: create
	// ----------------------------------
	{
		displayName: 'Domain Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['dnsZone'],
				operation: ['create'],
			},
		},
		description: 'Domain name for the DNS zone',
	},
	{
		displayName: 'Account Slug',
		name: 'accountSlug',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['dnsZone'],
				operation: ['create'],
			},
		},
		description: 'Account slug to create the DNS zone under',
	},

	// ----------------------------------
	//         dnsZone: get, delete, getDnsRecords
	// ----------------------------------
	{
		displayName: 'Zone ID',
		name: 'zoneId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['dnsZone'],
				operation: ['get', 'delete', 'getDnsRecords', 'createDnsRecord'],
			},
		},
		description: 'The ID of the DNS zone',
	},

	// ----------------------------------
	//         dnsZone: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['dnsZone'],
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
				resource: ['dnsZone'],
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
				resource: ['dnsZone'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Account Slug',
				name: 'account_slug',
				type: 'string',
				default: '',
				description: 'Filter by account slug',
			},
		],
	},

	// ----------------------------------
	//         dnsZone: createDnsRecord
	// ----------------------------------
	{
		displayName: 'Record Type',
		name: 'recordType',
		type: 'options',
		required: true,
		options: [
			{ name: 'A', value: 'A' },
			{ name: 'AAAA', value: 'AAAA' },
			{ name: 'ALIAS', value: 'ALIAS' },
			{ name: 'CAA', value: 'CAA' },
			{ name: 'CNAME', value: 'CNAME' },
			{ name: 'MX', value: 'MX' },
			{ name: 'NS', value: 'NS' },
			{ name: 'SPF', value: 'SPF' },
			{ name: 'SRV', value: 'SRV' },
			{ name: 'TXT', value: 'TXT' },
		],
		default: 'A',
		displayOptions: {
			show: {
				resource: ['dnsZone'],
				operation: ['createDnsRecord'],
			},
		},
		description: 'Type of DNS record',
	},
	{
		displayName: 'Hostname',
		name: 'hostname',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['dnsZone'],
				operation: ['createDnsRecord'],
			},
		},
		description: 'Hostname for the record',
	},
	{
		displayName: 'Value',
		name: 'value',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['dnsZone'],
				operation: ['createDnsRecord'],
			},
		},
		description: 'Value for the record',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['dnsZone'],
				operation: ['createDnsRecord'],
			},
		},
		options: [
			{
				displayName: 'Priority',
				name: 'priority',
				type: 'number',
				default: 10,
				description: 'Priority for MX records',
			},
			{
				displayName: 'TTL',
				name: 'ttl',
				type: 'number',
				default: 3600,
				description: 'Time to live in seconds',
			},
		],
	},

	// ----------------------------------
	//         dnsZone: deleteDnsRecord
	// ----------------------------------
	{
		displayName: 'Zone ID',
		name: 'zoneId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['dnsZone'],
				operation: ['deleteDnsRecord'],
			},
		},
		description: 'The ID of the DNS zone',
	},
	{
		displayName: 'Record ID',
		name: 'recordId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['dnsZone'],
				operation: ['deleteDnsRecord'],
			},
		},
		description: 'The ID of the DNS record to delete',
	},
];
