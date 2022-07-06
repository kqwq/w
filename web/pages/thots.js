import React, { useEffect } from "react";
import { useRouter } from "next/router";

const RedirectPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/secret/thots");
  }, []);

  return <div>redirecting...</div>;
};

export default RedirectPage;
