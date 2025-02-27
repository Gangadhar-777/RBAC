
export interface JWTPayload {
    sub: string;
    username: string;
    exp: number;
    iat: number;
    roles: string;
}