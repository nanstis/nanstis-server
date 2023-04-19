interface ReqCompletion {
    model: string;
    messages: [{
        role: string;
        content: string;
    }]
}

export type {ReqCompletion}