import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { getUserByEmail, setLoggedInUserId, warrant } from "../../../utils/auth";

const handler = nc({
    onNoMatch: (req: NextApiRequest, res: NextApiResponse) => res.status(404),
})
    .post(async (req: NextApiRequest, res: NextApiResponse) => {
        const email = req.body.email;
        const [user, _] = getUserByEmail(email);

        if (!user) {
            res.status(401);
            return;
        }

        setLoggedInUserId(res, user.id);

        try {
            // Create a Warrant session token for the user
            const warrantSessionToken = await warrant.createSession(user.id.toString());

            // Return the Warrant session token to
            // the UI so we can use it to initialize
            // the Warrant React SDK.
            res.json({ warrantSessionToken });

            return;
        } catch (e) {
            console.log(e);
            res.status(500);
            return;
        }
    });

export default handler;
