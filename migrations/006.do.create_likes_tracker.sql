CREATE TABLE IF NOT EXISTS likes_tracker(
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL ,
    post_id INTEGER REFERENCES messageboard_posts(id) ON DELETE CASCADE NOT NULL
)