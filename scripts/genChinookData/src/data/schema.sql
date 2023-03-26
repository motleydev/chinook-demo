CREATE TABLE playbacks (
  playback_id UUID NOT NULL,
  playback_ip VARCHAR(255) NOT NULL,
  playback_geo CHAR(2) NOT NULL,
  song_id INTEGER NOT NULL,
  playback_date TIMESTAMP WITH TIME ZONE NOT NULL,
  playback_length FLOAT NOT NULL,
  PRIMARY KEY (playback_id)
);