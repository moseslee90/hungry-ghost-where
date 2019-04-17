CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    deleted BOOLEAN,
    username TEXT,
    cookie_hash TEXT
);
CREATE TABLE IF NOT EXISTS authentication (
    id SERIAL PRIMARY KEY,
    username_hash TEXT,
    password_hash TEXT
);
CREATE TABLE IF NOT EXISTS posts(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    deleted BOOLEAN,
    title TEXT,
    content TEXT,
    image_url TEXT,
    votes INTEGER,
    comments_number INTEGER
);
CREATE TABLE IF NOT EXISTS comments(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    post_id INTEGER,
    deleted BOOLEAN,
    content TEXT
);