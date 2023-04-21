import { createPayload } from "../../utils/randomGeoIPDateWithOffset";
import chinookUpdatePlaybackStatus from "./chinookUpdatePlaybackStatus";
import { CTX } from "../chinookPlay";

import getUserDetails from "./getUserDetails";
import chinookCreateNewPlayback from "./chinookCreateNewPlayback";
import chinookSetCurrentPreviousUserSong from "./chinookSetCurrentPreviousUserSong";

export default function chinookStopCurrentSong(ctx: CTX) {
  const { res, user_id } = ctx;

  getUserDetails(user_id!, res).then((responseFromFetchedUserDetails) => {
    const { playbackByCurrentlyPlaying } = responseFromFetchedUserDetails;

    if (playbackByCurrentlyPlaying) {
      const { status, updated_at, playback_length, song, playback_id } =
        playbackByCurrentlyPlaying;
      const { Milliseconds, TrackId } = song;

      // Init some basic data

      const {
        geo: { countryCode: playback_geo },
        playback_ip,
      } = createPayload();

      let newStatus;

      if (status === "playing") {
        const length =
          (new Date().getTime() - new Date(updated_at).getTime()) / 1000;
        const totalSongLength = Milliseconds / 1000;
        const percentage = length / totalSongLength;
        const totalPlaybackLength =
          playback_length + Math.round(percentage * 100);

        console.table({
          length,
          Milliseconds,
          percentage,
          totalPlaybackLength,
        });
        if (totalPlaybackLength >= 100) {
          newStatus = "played";

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
          ).then((d) => {
            res.status(200).json({ playback_id });
          });

          return;
        } else {
          newStatus = "stopped";
          console.log(totalPlaybackLength);
          chinookUpdatePlaybackStatus(
            {
              id: playback_id,
              playback: {
                status: newStatus,
                playback_length: totalPlaybackLength,
              },
            },
            res
          ).then((d) => {
            res.status(200).json({ playback_id });
          });
          return;
        }
      }

      if (status === "stopped") {
        res.status(200).json({ playback_id });
        return;
      }
    }
  });
}
