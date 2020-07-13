declare namespace Express {
    interface Request {
        user?: {
            iat: number
            sub: string
        }
    }
}