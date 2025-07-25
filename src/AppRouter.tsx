import { useRoutes, type RouteObject } from "react-router-dom";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import AuthProtected from "./AuthProtected";
import Dashboard from "./pages/Dashboard";

export const AppRouter = () => {
  const routes: RouteObject[] = [
    {
      index: true,
      element: <Homepage />,
    },
    {
      path: "auth/login",
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
