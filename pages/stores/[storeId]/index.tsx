// Server Imports
import { GetServerSideProps } from "next";
import { getStore } from "../../../utils/stores";
import { getLoggedInUserId, warrant } from "../../../utils/auth";

// UI Imports
import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";
import { ProtectedComponent } from "@warrantdev/react-warrant-js";
import PageWrapper from "../../../components/PageWrapper";
import StoreType from "../../../types/store";

export interface StoreProps {
    store: StoreType;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { storeId: storeIdParam } = context.params;
    const storeId = storeIdParam as string;

    if (!await warrant.isAuthorized("store", storeId, "viewer", getLoggedInUserId(context.req).toString())) {
        return {
            redirect: {
                destination: "/stores",
                permanent: false,
            },
        };
    }

    const [store, _] = getStore(parseInt(storeId));
    return {
        props: {
            store,
        },
    };
};

const Store: React.FunctionComponent<StoreProps> = ({ store }) => {
    const router = useRouter();
    const { storeId } = router.query;

    if (!store) {
        return null;
    }

    return <PageWrapper>
        <StoreTitle>{store.name}</StoreTitle>
        <ProtectedComponent objectType="store" objectId={storeId as string} relation="editor">
            {<Link href={`/stores/${storeId}/edit`}><EditButton>Edit Store</EditButton></Link> as any}
        </ProtectedComponent>
        <ItemList>
            {store.items.map((item) => <Item key={item.id}>
                <Link href={`/stores/${storeId}/items/${item.id}`}><h3>{item.name} - ${item.price}</h3></Link>
                <p>{item.description}</p>
            </Item>)}
        </ItemList>
    </PageWrapper>;
};

const StoreTitle = styled.h2`
    text-align: center;
`;

const EditButton = styled.button`
    text-decoration: none;
    color: black;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 8px 12px;
    display: block;
    margin: 10px auto;

    &:hover {
        cursor: pointer;
    }
`;

const ItemList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;

    height: 100%;
`;

const Item = styled.div`
    min-width: 275px;
    max-width: 350px;

    border-radius: 5px;
    border: 1px solid gray;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

    padding: 0 15px;
`;

export default Store;
