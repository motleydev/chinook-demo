import { Request, Response } from "express";

import { HasuraAction } from "../server.dt";

import chinookStopCurrentSong from "./chinnokHelpers/chinookStopCurrentSong";

export type CTX = { res: Response; user_id?: string };

export default (req: Request, res: Response) => {
  console.log(req.body);
  const body = req.body as unknown;
  const reqBody = body as HasuraAction;
  const user_id = reqBody.session_variables["x-hasura-user-id"];

  const ctx: CTX = { res, user_id };

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
    chinookStopCurrentSong(ctx);
  }
};
