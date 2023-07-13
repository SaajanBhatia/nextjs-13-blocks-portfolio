export type CreateBlockReq = {
    headline: String | undefined | null
    description?: String | undefined | null
    url?: String | undefined | null
    icon?: String | undefined | null
}

export type UpdateBlockReq = {
    headline?: String | undefined | null
    description?: String | undefined | null
    url?: String | undefined | null
    icon?: String | undefined | null
}