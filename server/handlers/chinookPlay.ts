import { Request, Response } from "express";

import { HasuraAction } from "../server.dt";

import chinookPlayWithoutSongId from "./chinnokHelpers/chinookPlayWithoutSongId";
import chinookPlayWithSongId from "./chinnokHelpers/chinookPlayWithSongId";

export type CTX = { res: Response; user_id?: string; song_id?: string };

export default (req: Request, res: Response) => {
  console.log(req.body);
  const body = req.body as unknown;
  const reqBody = body as HasuraAction;
  let song_id = reqBody.input.song_id;
  const user_id = reqBody.session_variables["x-hasura-user-id"];

  const ctx: CTX = { res, user_id, song_id };

  if (!song_id) {
    if (!user_id) {
      // without a song_id or user_id, we can't do anything.
      res.status(200).json({
        errors: [
          {
            message: "No user_id provided",
          },
        ],
      });
    } else {
      // With a user_id but no song_id, we can update the user's last_played and currently_playing.
      chinookPlayWithoutSongId(ctx);
    }
  } else {
    // With a song_id, create a new playback.
    // Even triggers will update the user's last_played and currently_playing.
    chinookPlayWithSongId(ctx);
  }
};
