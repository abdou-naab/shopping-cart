import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Join from "./components/Join.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import Shop from "./components/Shop/Shop.jsx";
import DataProvider from "./Data.jsx";
import Cart from "./components/Shop/Cart.jsx";
import Game from "./components/Shop/Game.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "join", element: <Join /> },
      { path: "shop", element: <Shop /> },
      { path: "shop/:slug", element: <Game /> },
      { path: "cart", element: <Cart /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  </React.StrictMode>
);
