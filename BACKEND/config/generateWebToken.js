import jwt from "jsonwebtoken";

export const generateWebToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    process.env.SECRET_KEY_FOR_JWT,
    {
      expiresIn: "100d",
    }
  );
};
