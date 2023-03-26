import { Response } from "express";
import fetchGraphQL from "./fetchGraphQL";

export default (variables: {}, res: Response) => {
  const query = /* GraphQL */ `
    mutation updatePlayback($id: uuid!, $playback: playbacks_set_input) {
      update_playbacks_by_pk(
        pk_columns: { playback_id: $id }
        _set: $playback
      ) {
        playback_id
      }
    }
  `;

  const payload = { query, variables };

  return fetchGraphQL(payload, res).then((data) => {
    return data;
  });
};
