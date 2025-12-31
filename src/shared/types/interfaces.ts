export interface IBackendFieldError {
    field: string
    message: string
}

export interface BackendErrors {
    errors: IBackendFieldError[]
}

export interface IBackendErrorResponse {
    detail: BackendErrors | string
}

export interface IRefreshResponse {
    access_token: string
    type: "Bearer"
}

export interface IPaginatedBackendResponse<T> {
    count: number
    page: number
    page_size: number
    data: T[]
}

export interface ImagePathResponse {
    path: string
}


export interface IValidationError {
    field: string;
    message: string;
}
