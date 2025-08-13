import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import JobEditContext from "./context/JobEditContext.jsx";
import AuthContext from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="269588069061-e4kdi6eh1fpjd7p41qa5ifqq75lbjjcs.apps.googleusercontent.com">
      <BrowserRouter>
        <AuthContext>
          <JobEditContext>
            <App />
          </JobEditContext>
        </AuthContext>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);
