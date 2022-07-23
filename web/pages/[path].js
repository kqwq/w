import React, { useEffect } from "react";
import { useRouter } from "next/router";

const RedirectPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (!router.asPath.includes("[")) {
      router.push(`/x/${router.asPath}`);
    }
  }, [router]);

  return <div>Redirecting... hang tight!</div>;
};

export default RedirectPage;
