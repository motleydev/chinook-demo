import { CTX } from "../chinookPlay";
import { createPayload } from "../../utils/randomGeoIPDateWithOffset";
import chinookCreateNewPlayback from "./chinookCreateNewPlayback";
import chinookSetCurrentPreviousUserSong from "./chinookSetCurrentPreviousUserSong";
import getUserDetails from "./getUserDetails";

export default (ctx: CTX) => {
  const { user_id, song_id, res } = ctx;

  getUserDetails(user_id!, res).then((responseFromFetchedUserDetails) => {
    const { playback_currently_playing, last_played } =
      responseFromFetchedUserDetails;
    if (playback_currently_playing) {
      const {
        geo: { countryCode: playback_geo },
        playback_ip,
      } = createPayload();

      let newStatus = "playing";

      chinookCreateNewPlayback(
        {
          playback: {
            playback_ip,
            playback_geo,
            user_id,
            song_id,
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
  });
};
