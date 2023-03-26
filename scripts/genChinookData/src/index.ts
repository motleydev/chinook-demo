import fs from "fs/promises";
import createPlaybacks from "./utils/createPlaybacks";
const path = "./src/data/tracks.json";

interface Playback {
  playback_id: string;
  playback_ip: string;
  playback_geo: string;
  song_id: number;
  playback_date: string;
  playback_length: number;
}

interface MyObj {
  TrackId: number;
  Milliseconds: number;
}

async function createAllPlaybacksFromFile(
  filename: string
): Promise<Playback[]> {
  const fileContents = await fs.readFile(filename, "utf-8");
  const arr = JSON.parse(fileContents) as MyObj[];

  let allPlaybacks: Playback[] = [];
  for (let obj of arr) {
    let playbacks = await createPlaybacks(obj);
    allPlaybacks.push(...playbacks);
  }
  return allPlaybacks;
}

function createInsertStatement(playback: Playback): string {
  return `INSERT INTO playbacks (playback_id, playback_ip, playback_geo, song_id, playback_date, playback_length)
            VALUES ('${playback.playback_id}', '${playback.playback_ip}', '${playback.playback_geo}', ${playback.song_id},
                    '${playback.playback_date}', ${playback.playback_length});`;
}

createAllPlaybacksFromFile(path)
  .then((playbacks) => {
    return playbacks.map(createInsertStatement);
  })
  .then((d) => {
    fs.writeFile("./src/data/playbacks.sql", d.join("\n"));
  });
