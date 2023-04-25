type DtoModelPermission = {
    id: string;
    object: string;
    created: number;
    allow_create_engine: boolean;
    allow_sampling: boolean;
    allow_logprobs: boolean;
    allow_search_indices: boolean;
    allow_view: boolean;
    allow_fine_tuning: boolean;
    organization: string;
    group?: string;
    is_blocking: boolean;
}

type DtoModel = {
    id: string;
    permission: DtoModelPermission
}

type DtoModels = {
    object: string,
    data: DtoModel[]
}


export type {DtoModels, DtoModel}