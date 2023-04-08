enum MethodValue {
    GET = 'GET',
    POST = 'POST',
}

export {MethodValue}

export type Method = keyof typeof MethodValue;

