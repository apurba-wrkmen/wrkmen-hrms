import { useRoutes, type RouteObject } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import AuthProtected from "./AuthProtected";
import Dashboard from "./pages/Dashboard";

export const AppRouter = () => {
  const routes: RouteObject[] = [
   
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      element: <AuthProtected />,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
      ],
    },
  ];

  return useRoutes(routes);
};
