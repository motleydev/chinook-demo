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

const createPayload = () => {
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

  const geo = randomGeo();
  const playback_ip = randomIp(geo);
  const playback_date = randomDate(geo.timezoneOffset);

  return { geo, playback_ip, playback_date };
};

export { createPayload };
