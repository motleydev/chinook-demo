import { v4 as uuidv4 } from "uuid";

type Playback = {
  playback_id: string;
  playback_ip: string;
  playback_geo: string;
  song_id: number;
  playback_date: string;
  playback_length: number;
};

export default function createPlaybacks(input: {
  TrackId: number;
  Milliseconds: number;
}): Playback[] {
  const playbackCount = Math.floor(Math.random() * 10) + 20;

  const geos = [
    { countryCode: "US", timezoneOffset: -5 },
    { countryCode: "UK", timezoneOffset: 0 },
    { countryCode: "JP", timezoneOffset: 9 },
    { countryCode: "IN", timezoneOffset: 5.5 },
    { countryCode: "CA", timezoneOffset: -8 },
    { countryCode: "AU", timezoneOffset: 10 },
    { countryCode: "BR", timezoneOffset: -3 },
    { countryCode: "CN", timezoneOffset: 8 },
    { countryCode: "FR", timezoneOffset: 1 },
    { countryCode: "DE", timezoneOffset: 1 },
    { countryCode: "RU", timezoneOffset: 3 },
    { countryCode: "IT", timezoneOffset: 1 },
    { countryCode: "ZA", timezoneOffset: 2 },
    { countryCode: "MX", timezoneOffset: -6 },
    { countryCode: "ES", timezoneOffset: 1 },
    { countryCode: "KR", timezoneOffset: 9 },
    { countryCode: "SE", timezoneOffset: 1 },
    { countryCode: "NL", timezoneOffset: 1 },
    { countryCode: "AR", timezoneOffset: -3 },
  ];

  const randomGeo = () => geos[Math.floor(Math.random() * geos.length)];

  const randomIp = (geo: { countryCode: string }) => {
    return (
      Math.floor(Math.random() * 256) +
      "." +
      Math.floor(Math.random() * 256) +
      "." +
      Math.floor(Math.random() * 256) +
      "." +
      Math.floor(Math.random() * 256) +
      "/" +
      geo.countryCode
    );
  };

  const randomDate = (offset: number) => {
    const now = new Date();
    const fiveYearsAgo = new Date(
      now.getFullYear() - 5,
      now.getMonth(),
      now.getDate()
    );
    const randomDate = new Date(
      fiveYearsAgo.getTime() +
        Math.random() * (now.getTime() - fiveYearsAgo.getTime())
    );
    randomDate.setMinutes(
      randomDate.getMinutes() + randomDate.getTimezoneOffset() + offset * 60
    );
    return randomDate.toISOString();
  };

  const playbacks: Playback[] = [];

  for (let i = 0; i < playbackCount; i++) {
    const geo = randomGeo();
    const playback_ip = randomIp(geo);
    const playback_date = randomDate(geo.timezoneOffset);

    playbacks.push({
      playback_id: uuidv4(),
      playback_ip,
      playback_geo: geo.countryCode,
      song_id: input.TrackId,
      playback_date,
      playback_length:
        (input.Milliseconds * (Math.random() * 0.99 + 0.01)) / 1000,
    });
  }

  return playbacks;
}
