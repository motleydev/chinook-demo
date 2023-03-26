import { Response } from "express";
import fetchGraphQL from "./fetchGraphQL";

export default (variables: {}, res: Response) => {
  const query = /* GraphQL */ `
    mutation UpdateSongs($previous: uuid!, $current: uuid!, $id: Int!) {
      update_users_by_pk(
        pk_columns: { id: $id }
        _set: { currently_playing: $current, last_played: $previous }
      ) {
        currently_playing
      }
    }
  `;

  const payload = { query, variables };

  return fetchGraphQL(payload, res).then((data) => {
    return data;
  });
};
