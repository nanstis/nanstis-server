interface ReqQuestion {
    model: string;
    messages: [{
        role: string;
        content: string;
    }]
}

export {ReqQuestion}