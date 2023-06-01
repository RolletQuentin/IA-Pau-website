import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { AuthContextProvider } from "./contexts/AuthContext";
import { ChallengeContextProvider } from "./contexts/ChallengeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <AuthContextProvider>
    <ChallengeContextProvider>
        <App />
    </ChallengeContextProvider>
    </AuthContextProvider>
);
