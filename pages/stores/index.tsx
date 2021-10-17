// Server Imports
import { GetServerSideProps } from "next";
import { WARRANT_IGNORE_ID } from "@warrantdev/warrant-node";
import { stores as storeData } from "../../utils/stores";
import { getLoggedInUserId, warrant } from "../../utils/auth";

// UI Imports
import React from "react";
import styled from "styled-components";
import Link from "next/link";
import PageWrapper from "../../components/PageWrapper";
import StoreType from "../../types/store";

export interface StoresProps {
    stores: StoreType[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    if (!await warrant.isAuthorized("store", WARRANT_IGNORE_ID, "viewer", getLoggedInUserId(context.req).toString())) {
        console.log("User does not have access to view stores");

        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    return {
        props: {
            stores: storeData,
        },
    };
};

const Stores: React.FunctionComponent<StoresProps> = ({ stores }) => {
    if (stores.length === 0) {
        return null;
    }

    return <PageWrapper>
        <StoreList>
            <h2>Stores</h2>
            {stores.map((store) => <Link href={`/stores/${store.id}`} key={store.id}>
                <Store><h3>{store.name} - {store.items.length} Items</h3></Store>
            </Link>)}
        </StoreList>
    </PageWrapper>;
};

const StoreList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;

    height: 100%;
`;

const Store = styled.div`
    min-width: 350px;

    border-radius: 5px;
    border: 1px solid gray;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

    padding: 0 15px;

    &:hover {
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }
`;

export default Stores;
