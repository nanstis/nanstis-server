type DtoModel = {
    id: string;
}

type DtoModels = {
    object: string,
    data: DtoModel[]
}


export type {DtoModels, DtoModel}