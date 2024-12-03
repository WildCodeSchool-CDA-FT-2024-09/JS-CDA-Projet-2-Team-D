import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import App from "./App.tsx";
import ManageUser from "./pages/administrator/user/ManageUser.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <h1>Home page</h1>,
      },
      {
        path: "administrator",
        element: <Outlet />,
        children: [
          {
            path: "user",
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <ManageUser />,
              },
            ],
          },
        ],
      },
      {
        path: "accountant",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <h1>Comptable</h1>,
          },
        ],
      },
      {
        path: "commission",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <h1>Responsable de commission</h1>,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
