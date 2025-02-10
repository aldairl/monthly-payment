import { Request, Response as ExpressResponse } from 'express';

class Responses {
    public success(req: Request, res: ExpressResponse, data: any, status?: number,) {
        let statusCode = status || 200;
        let statusMessage = data || ''

        res.status(statusCode).send({
            success: true,
            body: statusMessage,
        })
    }

    public error(req: Request, res: ExpressResponse, error: any, status?: number) {
        let statusCode = status || 500;

        let statusMessage = error?.message || error || ''

        res.status(statusCode).send({
            success: false,
            error: statusMessage,
        })
    }
}

export const responses = new Responses();