import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useUserId = () => {
  const { data: session } = useSession();

  const [userId, setUserId] = useState("");
  useEffect(() => {
    if (!session || !session.user) return;
    setUserId(session.user.id);
  }, [session]);

  return userId;
};
