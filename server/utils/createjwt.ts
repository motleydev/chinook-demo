import jwt from "jsonwebtoken";

interface Claims {
  "https://hasura.io/jwt/claims": {
    "x-hasura-user-id": string;
    "x-hasura-role": string;
    "x-hasura-default-role": string;
    "x-hasura-allowed-roles": string[];
  };
}

export default function createJwt(userId: string): string {
  const secret =
    "a-super-long-secret-that-should-really-be-changed-but-hey-this-is-a-demo";

  const claims: Claims = {
    "https://hasura.io/jwt/claims": {
      "x-hasura-user-id": userId,
      "x-hasura-role": "user",
      "x-hasura-default-role": "user",
      "x-hasura-allowed-roles": ["user"],
    },
  };

  const options: jwt.SignOptions = {
    expiresIn: "1h",
    algorithm: "HS256",
  };

  return jwt.sign(claims, secret, options);
}
