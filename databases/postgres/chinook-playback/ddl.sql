
CREATE EXTENSION pgcrypto;

CREATE TABLE playbacks (
  playback_id UUID NOT NULL DEFAULT gen_random_uuid(),
  playback_ip VARCHAR(255) NOT NULL,
  playback_geo CHAR(2) NOT NULL,
  song_id INTEGER NOT NULL,
  playback_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  playback_length FLOAT NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE NULL DEFAULT now(),
COLUMN status VARCHAR(50) DEFAULT 'played' NOT NULL;
  COLUMN user_id INTEGER,
  status VARCHAR NOT NULL DEFAULT 'played',
  PRIMARY KEY (playback_id)
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  last_played UUID,
  currently_playing UUID
);

ALTER TABLE playbacks
ADD CONSTRAINT fk_playbacks_user_id
    FOREIGN KEY (user_id)
    REFERENCES "users" (id)
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE users
ADD Constraint fk_users_last_played
    FOREIGN KEY (last_played)
    REFERENCES "playbacks" (playback_id)
    ON UPDATE CASCADE
    ON DELETE SET NULL;
ADD CONSTRAINT fk_users_currently_playing
    FOREIGN KEY (currently_playing)
    REFERENCES "playbacks" (playback_id)
    ON UPDATE CASCADE
    ON DELETE SET NULL;


CREATE FUNCTION playbacks_trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = NOW();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE
UPDATE ON playbacks
FOR EACH ROW
EXECUTE PROCEDURE playbacks_trigger_set_timestamp();"