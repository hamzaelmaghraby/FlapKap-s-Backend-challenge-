import { Roles } from "@prisma/client";

export interface UserData {
    username: string;
    id: number;
    role: Roles;
}

declare module 'express' {
    export interface Request {
        user: UserData;
    }
}
