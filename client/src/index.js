import React from "react";
import { render } from "react-dom";
import { StoreProvider } from "./store";
import "./index.css";
import App from "./App";

render(
    <StoreProvider>
        <App />
    </StoreProvider>,
    document.getElementById("root")
);
