import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useUser } from "./hooks/useUser";

export default function AuthProtected() {
  const navigate = useNavigate();
  const { user, isPending } = useUser();

  useEffect(() => {
    if (!isPending && user === null) {
      navigate("/auth/login", { replace: true });
    }
  }, [isPending, user, navigate]);

  if (isPending) return <div>Loading...</div>;

  return <Outlet />;
}
