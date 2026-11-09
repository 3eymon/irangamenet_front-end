export interface PaginatedResponse<T> {
    results: T[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    }
}
export enum GameFilterOptions {
    all = "all",
    latest = "latest",
    free = "free",
}
export enum NewsFilterOptions {
    latest = "latest",
    popular = "popular",
    mostRead = "most-read",
    weeklyHighlight = "weekly-highlight"
}