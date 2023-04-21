import { Response } from "express";
import fetchGraphQL from "./fetchGraphQL";

export enum PlayStatus {
  PLAYING = "playing",
  STOPPED = "stopped",
  PLAYED = "played",
}

type Song = {
  Milliseconds: number;
  TrackId: number;
};

type Playback = {
  playback_id: string;
  playback_date: string;
  status: PlayStatus;
  playback_length: number;
  updated_at: string;
  song: Song;
};

type PlaybackCurrentlyPlaying = Playback;

export type CurrentUserPlaybackState = {
  last_played: string;
  currently_playing: string;
  playbackByCurrentlyPlaying: PlaybackCurrentlyPlaying;
};

export default (user_id: string, res: Response) => {
  const query = /* GraphQL */ `
    query GetUser($id: Int!) {
      users_by_pk(id: $id) {
        last_played
        currently_playing
        playbackByCurrentlyPlaying {
          playback_id
          playback_date
          updated_at
          status
          playback_length
          track_info {
            TrackId
            Milliseconds
          }
        }
      }
    }
  `;

  const payload = { query, variables: { id: user_id } };

  return fetchGraphQL(payload, res).then((data): CurrentUserPlaybackState => {
    return data.users_by_pk;
  });
};
