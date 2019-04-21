-- psql -d DATABASE_NAME -U USERNAME -f tables.sql
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    deleted BOOLEAN,
    username TEXT,
    email TEXT,
    cookie_hash TEXT
);
CREATE TABLE IF NOT EXISTS authentication (
    id SERIAL PRIMARY KEY,
    email_hash TEXT,
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
    comments_count INTEGER,
    date_time TIMESTAMP,
    date DATE
);
CREATE TABLE IF NOT EXISTS comments(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    post_id INTEGER,
    deleted BOOLEAN,
    content TEXT
);
CREATE TABLE IF NOT EXISTS post_votes(
    id SERIAL PRIMARY KEY,
    voter_id INTEGER,
    post_id INTEGER,
    vote INTEGER
);
CREATE TABLE IF NOT EXISTS comment_votes (
    id SERIAL PRIMARY KEY,
    voter_id INTEGER,
    comment_id INTEGER,
    vote INTEGER   
);