import { Response } from "express";

export default async function fetchGraphQL(
  requestBody: { query: string; variables: {} },
  res: Response
) {
  return fetch("http://localhost:8080/v1/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": "myadminsecretkey",
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.errors) {
        console.error(data.errors);
        res.status(500).send("GraphQL error");
      } else {
        return data.data;
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Server error");
    });
}
