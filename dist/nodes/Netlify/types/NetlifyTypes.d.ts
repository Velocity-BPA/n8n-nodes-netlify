import type { IDataObject } from 'n8n-workflow';
export type NetlifyResource = 'site' | 'deploy' | 'form' | 'submission' | 'environmentVariable' | 'function' | 'build' | 'dnsZone' | 'hook' | 'deployKey' | 'member' | 'splitTest';
export interface NetlifyApiResponse {
    [key: string]: unknown;
}
export interface NetlifySite {
    id: string;
    name: string;
    custom_domain?: string;
    ssl_url?: string;
    url?: string;
    admin_url?: string;
    deploy_url?: string;
    build_settings?: {
        cmd?: string;
        dir?: string;
        functions_dir?: string;
        base?: string;
    };
    repo?: {
        provider?: string;
        repo_path?: string;
        branch?: string;
    };
    created_at?: string;
    updated_at?: string;
    published_deploy?: NetlifyDeploy;
    force_ssl?: boolean;
    password?: string;
}
export interface NetlifyDeploy {
    id: string;
    site_id: string;
    state: string;
    name?: string;
    url?: string;
    ssl_url?: string;
    admin_url?: string;
    deploy_url?: string;
    deploy_ssl_url?: string;
    screenshot_url?: string;
    review_url?: string;
    created_at?: string;
    updated_at?: string;
    published_at?: string;
    branch?: string;
    commit_ref?: string;
    commit_url?: string;
    title?: string;
    draft?: boolean;
    locked?: boolean;
    skipped?: boolean;
    build_id?: string;
    error_message?: string;
    log_access_attributes?: {
        type?: string;
        url?: string;
        endpoint?: string;
        path?: string;
        token?: string;
    };
}
export interface NetlifyForm {
    id: string;
    site_id: string;
    name: string;
    paths?: string[];
    submission_count?: number;
    fields?: IDataObject[];
    created_at?: string;
}
export interface NetlifySubmission {
    id: string;
    form_id: string;
    site_id: string;
    number?: number;
    email?: string;
    name?: string;
    first_name?: string;
    last_name?: string;
    company?: string;
    summary?: string;
    body?: string;
    data?: IDataObject;
    created_at?: string;
    human_fields?: IDataObject;
    ordered_human_fields?: Array<{
        name: string;
        value: string;
    }>;
}
export interface NetlifyEnvVar {
    key: string;
    scopes?: string[];
    values?: Array<{
        id?: string;
        value: string;
        context: string;
        context_parameter?: string;
    }>;
    is_secret?: boolean;
    updated_at?: string;
    updated_by?: {
        id?: string;
        full_name?: string;
        email?: string;
        avatar_url?: string;
    };
}
export interface NetlifyFunction {
    id: string;
    name: string;
    sha?: string;
}
export interface NetlifyBuild {
    id: string;
    deploy_id: string;
    sha?: string;
    done?: boolean;
    error?: string;
    created_at?: string;
}
export interface NetlifyDnsZone {
    id: string;
    name: string;
    errors?: string[];
    supported_record_types?: string[];
    user_id?: string;
    created_at?: string;
    updated_at?: string;
    records?: NetlifyDnsRecord[];
    dns_servers?: string[];
    account_id?: string;
    site_id?: string;
    account_slug?: string;
    account_name?: string;
    domain?: string;
    ipv6_enabled?: boolean;
    dedicated?: boolean;
}
export interface NetlifyDnsRecord {
    id: string;
    hostname: string;
    type: string;
    value: string;
    ttl?: number;
    priority?: number;
    dns_zone_id?: string;
    site_id?: string;
    flag?: number;
    tag?: string;
    managed?: boolean;
}
export interface NetlifyHook {
    id: string;
    site_id: string;
    type: string;
    event: string;
    data?: IDataObject;
    created_at?: string;
    updated_at?: string;
    disabled?: boolean;
}
export interface NetlifyDeployKey {
    id: string;
    public_key: string;
    created_at?: string;
}
export interface NetlifyMember {
    id: string;
    full_name?: string;
    email: string;
    avatar?: string;
    role?: string;
    connected_accounts?: IDataObject;
}
export interface NetlifySplitTest {
    id: string;
    site_id: string;
    name?: string;
    path?: string;
    branches?: Array<{
        branch: string;
        percentage: number;
    }>;
    active?: boolean;
    created_at?: string;
    updated_at?: string;
    unpublished_at?: string;
}
export interface NetlifyPaginationQuery {
    page?: number;
    per_page?: number;
}
export interface NetlifyApiError {
    code: number;
    message: string;
}
