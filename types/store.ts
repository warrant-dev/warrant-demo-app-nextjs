import Item from "./item";

export default interface Store {
    id: number;
    userId: number;
    name: string;
    items: Item[];
}
