// Server Imports
import { GetServerSideProps } from "next";
import { getStore } from "../../../utils/stores";
import { getLoggedInUserId, warrant } from "../../../utils/auth";

// UI Imports
import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import PageWrapper from "../../../components/PageWrapper";
import StoreType from "../../../types/store";

export interface EditStoreProps {
    store: StoreType;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { storeId: storeIdParam } = context.params;
    const storeId = storeIdParam as string;

    if (!await warrant.isAuthorized("store", storeId, "editor", getLoggedInUserId(context.req).toString())) {
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
}

const EditStore: React.FunctionComponent<EditStoreProps> = ({ store }) => {
    const router = useRouter();
    const { storeId } = router.query;
    const [name, setName] = useState<string>(store.name);

    const handleNameUpdated = (event) => setName(event.target.value);

    const saveStore = useCallback(async (event) => {
        event.preventDefault();

        try {
            await fetch(`/api/stores/${storeId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name }),
            });

            router.push("/stores");
        } catch (e) {
            console.log("Error while updating store", e);
        }
    }, [name]);

    return <PageWrapper>
        <Title>Edit Store</Title>
        <EditForm onSubmit={saveStore}>
            <NameInput
                id="name"
                type="text"
                placeholder="Name"
                value={name}
                onChange={handleNameUpdated}
                required
            />
            <SubmitButton type="submit">Save</SubmitButton>
        </EditForm>
    </PageWrapper>;
};

const Title = styled.h2`
    text-align: center;
`;

const EditForm = styled.form`
    max-width: 350px;
    margin: auto;
    height: 100%;
`;

const NameInput = styled.input`
    width: 250px;
    font-size: 16px;
    height: 30px;
`;

const SubmitButton = styled.button`
    padding: 8px 12px;
    margin-left: 5px;
`;

export default EditStore;
