import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { authorize } from "../../../utils/auth";
import { stores, getStore, saveStores } from "../../../utils/stores";

const authorization = nc()
    .post(authorize("store", "storeId", "editor"));

const handler = nc({
    onNoMatch: (req: NextApiRequest, res: NextApiResponse) => res.status(404),
})
    .use("/api/stores/:storeId", authorization)
    .get((req: NextApiRequest, res: NextApiResponse) => {
        const { storeId } = req.query;
        const [store, _] = getStore(parseInt(storeId as string));

        if (!store) {
            res.status(404).send("Not Found");
            return;
        }

        res.json(store);
    })
    .post(async (req: NextApiRequest, res: NextApiResponse) => {
        const storeId = req.query.storeId as string;
        const [store, index] = getStore(parseInt(storeId));
        if (!store) {
            res.status(404).send("Not Found");
            return;
        }

        let updatedStore = {...store};
        updatedStore.name = req.body.name;
        stores[index] = updatedStore;
        saveStores(stores);

        res.json(updatedStore);
    });

export default handler;
