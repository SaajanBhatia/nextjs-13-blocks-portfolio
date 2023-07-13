export interface HandlerConfig {
    requireAuth?: boolean;
}

export type Handler = (
    request: NextRequest,
    extraParams?: any
) => Promise<Response>;

export type SocialNav = {
    name: string,
    href: string
}