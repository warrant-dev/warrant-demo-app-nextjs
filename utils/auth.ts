import type { IncomingMessage } from "http";
import type { NextApiResponse } from "next";
import { Client as Warrant } from "@warrantdev/warrant-node";
import { createMiddleware } from "@warrantdev/warrant-express-middleware";
import cookie from "cookie";

import User from "../types/user";

let users: User[] = require("../data/users.json");

//
// Authorization
//
export const warrant = new Warrant("<replace_with_your_api_key>");
export const authorize = createMiddleware({
    clientKey: "<replace_with_your_api_key>",
    getUserId: (req) => getLoggedInUserId(req).toString(),
    getParam: (req, paramName) => req.query[paramName] as string,
    onAuthorizeFailure: (req, res) => res.status(401).send("Unauthorized"),
})

//
// Authentication
//
export function setLoggedInUserId(res: NextApiResponse, userId: number): void {
    res.setHeader("Set-Cookie", cookie.serialize("userId", userId.toString(), { path: '/' }));
}

export function getLoggedInUserId(req: IncomingMessage): number | null {
    const cookies = cookie.parse(req.headers.cookie || '');
    const userIdString = cookies.userId;

    if (userIdString) {
        return parseInt(userIdString);
    }

    return null;
}

export function getUserByEmail(email: string): [User, number] | [undefined, number] {
    let targetUser: User;
    let index;

    for (index = 0; index < users.length; index++) {
        const user = users[index];
        if (user.email === email) {
            targetUser = user;
            break;
        }
    }

    return [targetUser, index];
}
