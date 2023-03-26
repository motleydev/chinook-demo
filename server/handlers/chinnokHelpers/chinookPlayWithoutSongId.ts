import { createPayload } from "../../utils/randomGeoIPDateWithOffset";
import chinookUpdatePlaybackStatus from "./chinookUpdatePlaybackStatus";
import { CTX } from "../chinookPlay";

import getUserDetails from "./getUserDetails";
import chinookCreateNewPlayback from "./chinookCreateNewPlayback";
import chinookSetCurrentPreviousUserSong from "./chinookSetCurrentPreviousUserSong";

export default function chinookPlayWithoutSongId(ctx: CTX) {
  const { res, user_id } = ctx;

  getUserDetails(user_id!, res).then((responseFromFetchedUserDetails) => {
    const { playback_currently_playing, last_played } =
      responseFromFetchedUserDetails;

    if (playback_currently_playing) {
      const { status, updated_at, playback_length, song, playback_id } =
        playback_currently_playing;
      const { Milliseconds, TrackId } = song;

      // Init some basic data

      const {
        geo: { countryCode: playback_geo },
        playback_ip,
      } = createPayload();

      let newStatus;

      if (status === "playing") {
        // Don't do anything, the user is still playing the song.
        res.status(200).json({ playback_id });
        return;
      }

      if (status === "stopped") {
        const length =
          (new Date().getTime() - new Date(updated_at).getTime()) / 1000;
        const totalSongLength = Milliseconds / 1000;
        const percentage = length / totalSongLength;
        const totalPlaybackLength =
          playback_length + Math.round(percentage * 100);

        if (totalPlaybackLength >= 100) {
          newStatus = "played";

          chinookUpdatePlaybackStatus(
            {
              id: playback_id,
              playback: {
                status: newStatus,
              },
            },
            res
          ).then((d) => {
            newStatus = "playing";
            chinookCreateNewPlayback(
              {
                playback: {
                  playback_ip,
                  playback_geo,
                  user_id,
                  song_id: TrackId,
                  status: newStatus,
                },
              },
              res
            ).then((playbackResponse) => {
              chinookSetCurrentPreviousUserSong(
                {
                  id: user_id,
                  current: playbackResponse.insert_playbacks_one.playback_id,
                  previous: playback_currently_playing.playback_id,
                },
                res
              ).then((d) => {
                res.status(200).json({
                  playback_id:
                    playbackResponse.insert_playbacks_one.playback_id,
                });
              });
            });
          });

          return;

          // make a new playback
        } else {
          newStatus = "playing";

          chinookUpdatePlaybackStatus(
            {
              id: playback_id,
              playback: {
                status: newStatus,
              },
            },
            res
          ).then((d) => {
            res.status(200).json({ playback_id });
          });
          return;
        }
      }

      if (status === "played") {
        chinookCreateNewPlayback(
          {
            playback: {
              playback_ip,
              playback_geo,
              user_id,
              song_id: TrackId,
              status: newStatus,
            },
          },
          res
        ).then((playbackResponse) => {
          chinookSetCurrentPreviousUserSong(
            {
              id: user_id,
              previous: playback_currently_playing.playback_id,
              current: playbackResponse.insert_playbacks_one.playback_id,
            },
            res
          ).then((d) => {
            res.status(200).json({
              playback_id: playbackResponse.insert_playbacks_one.playback_id,
            });
          });
        });
      }
    } else {
      res.status(200).json({
        errors: [
          {
            message: "Can't play without a song_id",
          },
        ],
      });
      return;
    }
  });

  return true;
}
