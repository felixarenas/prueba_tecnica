export class CustomError extends Error {

    constructor (

        public readonly statuscode:number,
        public readonly message:string,
        public readonly data:any = null
    ){
        super(message)
    }

    static bandRequest(message:string) {
        return new CustomError(400, message)
    }

    static unAuthorized(message:string) {
        return new CustomError(401, message)
    }

    static forbidden(message:string) {
        return new CustomError(403, message)
    }

    static notFound(message:string) {
        return new CustomError(404, message)
    }

    static internalServer(message:string = 'Internal Server Error') {
        return new CustomError(500, message)
    }

    static success(message:string) {
        return new CustomError(200, message)
    }

    static successData(message:string, data:any) {
        return new CustomError(200, message, data)
    }
}