import crypto from "crypto";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function validateContentPassword(attemptPassword) {
  const hash = crypto
    .createHash("sha256")
    .update("kqwq_website_salt_" + attemptPassword)
    .digest("hex");
  let a = hash;
  let b = process.env.NEXT_PUBLIC_CONTENT_PASSWORD_HASH;
  // console.log(a, b, a.length, b.length);
  await sleep(Math.random() * 100); // timing attack safe
  return a === b;
}

export { validateContentPassword };
