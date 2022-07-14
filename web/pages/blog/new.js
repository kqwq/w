import React, { useEffect } from "react";
import { useRouter } from "next/router";

const RedirectPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("../thots/new");
  }, []);

  return <div>redirecting...</div>;
};

export default RedirectPage;
