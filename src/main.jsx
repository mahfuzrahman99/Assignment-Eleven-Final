import React from "react";
import ReactDOM from "react-dom/client";

// import App from './App.jsx'
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routers/Router";
import AuthProvider from "./Provider/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PhotoProvider } from "react-photo-view";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <AuthProvider>
        <PhotoProvider>
          <RouterProvider router={router} />
        </PhotoProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
