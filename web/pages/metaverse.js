// Redirect to /x/metaverse

import React, { useEffect } from "react";
import { useRouter } from "next/router";

const RedirectPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("../x/metaverse");
  }, []);

  return <div>redirecting...</div>;
};

export default RedirectPage;
