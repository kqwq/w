import crypto from "crypto";

function validateAdminPassword(req) {
  if (!req.headers?.["authorization"]) return false;
  let attemptAdminPass = Buffer.from(req.headers["authorization"]); // Yes I know this isn't the usual implementation but I want to be more sweet and simple
  let correctPassword = Buffer.from(process.env.ADMIN_PASSWORD_HASH);
  return crypto.timingSafeEqual(attemptAdminPass, correctPassword);
}

export { validateAdminPassword };
