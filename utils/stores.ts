import { writeFileSync } from "fs";

import Store from "../types/store";
import Item from "../types/item";

export const stores: Store[] = require("data/stores.json");

export function getStore(id: number): [Store, number] | [undefined, number] {
    let targetStore: Store;
    let index;

    for (index = 0; index < stores.length; index++) {
        const store = stores[index];
        if (store.id === id) {
            targetStore = store;
            break;
        }
    }

    return [targetStore, index];
}

export function saveStores(updatedStores: Store[]) {
    writeFileSync("data/stores.json", JSON.stringify(updatedStores, null, 4), "utf8");
}

export function getItem(store: Store, itemId: number): [Item, number] | [undefined, number] {
    let targetItem: Item;
    let index;

    for (index = 0; index < store.items.length; index++) {
        const item = store.items[index];
        if (item.id === itemId) {
            targetItem = item;
            break;
        }
    }

    return [targetItem, index];
}
