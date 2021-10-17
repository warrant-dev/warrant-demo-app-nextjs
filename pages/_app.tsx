import { WarrantProvider } from "@warrantdev/react-warrant-js";
import { createGlobalStyle } from "styled-components";

import NavBar from "../components/NavBar";

const GlobalStyle = createGlobalStyle`
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    height: 100%;
    font-family: Arial, Helvetica, sans-serif;
`;

function MyApp({ Component, pageProps }) {
    return <>
        <GlobalStyle/>
        <WarrantProvider clientKey="<replace_with_your_client_key>">
            <NavBar/>
            <Component {...pageProps}/>
        </WarrantProvider>
    </>;
}

export default MyApp;
