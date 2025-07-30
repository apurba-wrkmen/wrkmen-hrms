import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useUser } from "./hooks/useUser";

export default function AuthProtected() {
  const navigate = useNavigate();
  const { user, isPending } = useUser();
  useEffect(() => {
    if (!isPending && user === null) {
      const timeout = setTimeout(() => {
        navigate("/", { replace: true });
      }, 300); // Wait a bit to ensure state is stable
      return () => clearTimeout(timeout);
    }
  }, [isPending, user, navigate]);

  if (isPending) return <div>Loading...</div>;

  return <Outlet />;
}
