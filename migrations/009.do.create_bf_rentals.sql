CREATE TABLE IF NOT EXISTS bf_rentals(
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    rentalCat INTEGER REFERENCES bf_rental_cats(id) ON DELETE CASCADE,
    userId INTEGER REFERENCES bf_users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    location TEXT,
    price TEXT,
    contactName TEXT,
    contactEmail TEXT,
    contactPhone TEXT,
    airbnb TEXT,
    homeAway TEXT,
    bookingDOTcom TEXT,
    otherSite TEXT,
    dateposted DATE DEFAULT now() NOT NULL
)