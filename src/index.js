import React from "react";
import { render } from "react-dom";
import { AuthProvider } from "@asgardeo/auth-react";
import App from "./App";

const Index = () => (
    <AuthProvider
        config={ {
            signInRedirectURL: "http://localhost:3000",
            signOutRedirectURL: "http://localhost:3000",
            clientID: "2PSp7XwfTALCPaFvy0OfST6ShTIa",
            baseUrl: "https://api.asgardeo.io/t/ramith",
            scope: [ "openid","profile" ]
        } }
    >
        <App></App>
    </AuthProvider>
);

render((<Index />), document.getElementById("root"));