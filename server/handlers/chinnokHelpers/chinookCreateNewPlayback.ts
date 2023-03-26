import { Response } from "express";
import fetchGraphQL from "./fetchGraphQL";

export default (variables: {}, res: Response) => {
  const query = /* GraphQL */ `
    mutation InsertPlayback($playback: playbacks_insert_input!) {
      insert_playbacks_one(object: $playback) {
        playback_id
        playback_ip
        playback_geo
        song_id
        playback_date
        playback_length
      }
    }
  `;

  const payload = { query, variables };

  return fetchGraphQL(payload, res).then((data) => {
    return data;
  });
};
