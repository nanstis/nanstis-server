type DtoCompletionChoice = {
    index: number;
    message: {
        role: string;
        content: string;
    }
}

type DtoCompletion = {
    id: string;
    object: string;
    created: number;
    choices: DtoCompletionChoice[];
    finish_reason: string;
}

export type {DtoCompletion, DtoCompletionChoice}