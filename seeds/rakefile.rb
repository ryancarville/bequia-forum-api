BEGIN;

TRUNCATE
users,
messageboard_sections,
messageboards,
messageboard_posts,
events,
job_cats,
jobs,
rental_cats,
rentals,
market_place_cats,
market_place,
directory
RESTART IDENTITY CASCADE;

INSERT INTO users
    (address, city, country, phone, website, first_name, last_name, email, user_name, password)
VALUES
    ('Chamua 6', 'Hunenberg', 'Switzerland', '+41791562329', 'https://www.beardystudios.com', 'Ryan', 'Carville', 'ryancarville@gmail.com', 'ryancarville', '$2y$12$s1uCWpyP3XerxdDlSIeDHOewEkZpXbc8iSk/5CitGklc18SmkNKj.'),
    (null, 'Bequia', 'Saint Vincent and The Grendines', null, null, 'Test', 'User', 'testUser@gmail.com', 'TestUser', '$2y$12$AKRE5tCKBkaa3wsye/Pw8.ESfNvS4mbZwtXSGswBfCxSWGVCy67SW');

INSERT INTO messageboard_sections
    (name)
VALUES
    ('Life on Bequia'),
    ('Help & Tips'),
    ('Activites'),
    ('Events'),
    ('Jobs'),
    ('Rentals'),
    ('Marekt Place'),
    ('Off-Topic'),
    ('Support');

INSERT INTO messageboards
    (messageboard_section, name, description)
VALUES
    (1, 'Daily Life', 'Got something to say about life on Bequia? If it does not fit in any other area, then maybe it will fit here.  No ads in this section please.'),
    (1, 'Bequia News', 'Local current news and polotics. No ads in this section please.'),
    (1, 'Busines and Entrepreneur', 'Information excahnge for self-employedd and business oriented users.  No ads in this section please.'),
    (1, 'Complaints Corner', 'Something really annoying you lately? Get it off your chest here.  If you are really offended, please look elsewhere,  o ads in this section please.'),
    (1, 'Introduction', 'Are you new to Bequia, or maybe just new to this forum.  Drop in here and introduce yourself.  No ads in this section please.'),
    (2, 'Permits/Visa/Governemnt', 'Work permits, residence permit and visa issues, dealing with governemnt. No ads in this section please.'),
    (2, 'General Housing', 'NO ADS IN HERE! Movers? Cleaners? You are buying and have questions?  What are your rights?  Basically anything housing related that is not a advert.'),
    (2, 'Food and Drink', 'Looking for some food and drink from home?  Or looking to make some Bequian dish you have seen or tried womewhere else? No ads in this section please.'),
    (2, 'Insurance', 'Health insurance, car insurance, any insurance related issues. No ads in this section please.'),
    (2, 'Banking/Finance/Taxation', 'Banking issues, tas issues, investments, etc. No ads in this section please.'),
    (2, 'TV/Internet/Telephone', 'Satellite TV discussions, internet acess, cable, telephone issues, Bequia related technology chat. No ads in this section please.'),
    (2, 'Education', 'From nursery school to university. No ads in this section please.'),
    (2, 'Family Matters/Health', 'Birth, death, marriage, divorce, doctors and medical advice, dentist etc. No ads in this section please.'),
    (2, 'Pet Corner', 'NO ADS IN HERE! Advice on importing, caring, homing, boarding and loving your pets.'),
    (2, 'Transportation/Driving', 'Drivers license issues, buying cars, getting around the island.  Anythign Bequia transport related. No ads in this section please.'),
    (2, 'Langaue Corner', 'Questions and answers for any and all language related issues. No ads in this section please.'),
    (2, 'Emploment', 'Rights at work, legal problems, employment conditions, contract etc. No ads in this section please.'),
    (2, 'Leaving Bequia', 'Info and advice on moving permanently away from the island. No ads in this section please.'),
    (2, 'Other/General', 'Question or tips about living on Bequia that do not seem to fit elsewhere. No ads in this section please.'),
    (3, 'Social Events', 'Events organized by the Bequai Forum community for the Bequia Forum Community.'),
    (3, 'Commercial Events', 'Public events which are of direct interest and relevance to the island life.'),
    (3, 'Concerts', 'Concerts and similar mass events that are open to the public. No sales, wanted or commercial ads in this section please.'),
    (3, 'Sports/Fitness/Beauty/Wellness', 'Life on Bequia for the more active among us. No ads in this section please.'),
    (3, 'Travel/ Day Trips/ Free Time', 'SVG only. Ideas, tips, questions. No ads in this section please.'),
    (3, 'Entertainment and Dinning', 'Concerts, bars, restaurants, cafes.  Questions and reviews. No ads in this section please.'),
    (4, 'Events', 'Events section of user posted events.'),
    (5, 'Jobs', 'Jobs section of user posted want/wanted ads.'),
    (6, 'Rentals', 'Rentals section of user posted items, vehicles and/or properties for rent.'),
    (7, 'Market Place', 'Market Place section of user posted items for sale.'),
    (8, 'Off-Topic', 'Topics not directly related to Bequia'),
    (9, 'Support', 'Questions and information relating to the use of the forum');

INSERT INTO messageboard_posts
    (board_id, user_id, title, content, date_posted, likes)
VALUES  
    (1, 2, 'Life in paradise!', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2019-07-13', 4),
    (4, 2, 'Another Post to fill out the site', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2019-09-29', 23),
    (2, 1, 'Post Post', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2019-08-02', 29),
    (5, 1, 'Who are You', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2019-10-28', 78),
    (5, 2, 'Filler content', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2019-08-15', 2),
    (2, 1, 'I am tired of typing', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2019-07-20', 3),
    (6, 1, 'When you can not feel your toes', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2019-10-02', 89),
    (7, 2, 'Who has a boat?', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2019-06-29', 9),
    (3, 1, 'Can we drink rum', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2019-08-23', 52),
    (3, 1, 'More and more tourist', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2019-07-19', 56),
    (2, 2, 'Huricane Alert', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2019-08-26', 95),
    (1, 2, 'Coconut health', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2019-05-29', 72),
    (1, 1, 'Hello from Mustique', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2019-08-20', 62),
    (4, 2, 'Why do you like sand', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2019-07-29', 21),
    (5, 2, 'Leaving for ever!', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2019-09-29', 92);
    
INSERT INTO comments
    (user_id, post_id, content)
VALUES
    (1,3,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor'),
    (1,2,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor'),
    (1,4,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor'),
    (2,2,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor'),
    (2,3,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor'),
    (2,1,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor'),
    (1,5,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor'),
    (2,5,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor'),
    (2,4,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor'),
    (1,1,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor'),
    (1,8,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor');

INSERT INTO events
    (user_id, title, location, description, event_date, event_time, date_posted)
VALUES
    (1, 'Hairouns on the beach!', 'Lower Bay', 'Join us for beers and lobsters on lower bay. Family friendly.', '2019-10-23', '16:00 - 22:00', '2019-10-12'),
    (2, 'Almond Tree Sing-A-Long', 'Almond Tree - Harbour', 'Meet under the Almond Tree for a sing-a-long!', '2019-10-29', '18:00 - 20:00', '2019-10-02'),
    (2, 'Fish Fry', 'Keegans Beach Bar', 'Come for our monthly firsh fry on the beach. Kids under 10 free!', '2019-10-20', '12:00 - until Late', '2019-10-14');

INSERT INTO job_cats
    (name, description, img_url)
VALUES
    ('Hospitality', 'Jobs in Hotel, Resturant, Bar, Cartering services.', '../icons/hospitality-icon.png'),
    ('Marine', 'Jobs in anything sea/sailing related.', '../icons/marine-icon.png'),
    ('Wellness/Beauty', 'Jobs related to the body thearpies, beauty and/or health.', '../icons/wellness-icon.png'),
    ('Professional Services', 'Jobs that require a high level of skill.  i.e. Architech, Finacial Services, Property Manager, etc.', '../icons/professional-icon.png'),
    ('Construction', 'Jobs in commercial and/or residential building. Labor skills only.', '../icons/construction-icon.png'),
    ('Special Skills', 'Jobs that do not fall under any other catagory.', '../icons/special-skills-icon.png');

INSERT INTO jobs
    (job_cat, user_id, title, description, employment, location, date_posted)
VALUES
    (1, 1, 'Looking for a Great Bar Tender', 'Bequia Beach Hotel is looking for a Seasonal bar tender for this high season.  Great pay and schdules.', 'Seasonal', 'Bequia Beach Hotel', '2019-09-28'),
    (2, 2, 'Captian Needed', 'Octopus Charter Yacth needs a new skipper.  Are you a seasoned sailor?  Come join our crew!', 'Full Time', 'Octopus Yacth', '2019-10-02');

INSERT INTO rental_cats
    (name, description, img_path)
VALUES
    ('Apartment', 'By Owner or Company', '../icons/JPEG/apartment.png'),
    ('House', 'By Owner or Company', '../icons/JPEG/house.jpg'),
    ('Boat', 'By Owner or Company', '../icons/JPEG/boat.jpg'),
    ('Car', 'By Owner or Company', '../icons/JPEG/car.jpg'),
    ('Tools', 'By Owner', '../icons/JPEG/tools.jpg'),
    ('Sporting/Beach Equipment', 'By Owner', '../icons/JPEG/sporting.jpg'),
    ('Miscelaneous', 'Everything else', '../icons/JPEG/misc.png');

INSERT INTO rentals 
    (rental_cat, user_id, title, description, location, contact_name, contact_email, contact_phone, airbnb, homeaway, booking_dot_com, other_site)
VALUES
    (2, 1, 'Calabash Villa - Luxury Home', 'Entire home for rent.  Finished to the highest standard.  Amazing Ocean views and private pool.','Upper Cammel - Bequia', 'Ryan Carville', 'ryancarville@gmail.com', '+410791562329', 'https://www.airbnb.com', null, null, null),
    (1, 2, 'Sea Shells Apartment', '2 bedroom apartment with beach access.  Lovely, quiet area.','Lower Bay', 'Susan Lutz', 'susanLutz@gmail.com', '+17084569087', null, 'https://www.homeaway.com', null, 'https://www.bequia-apartmnet.com'),
    (3, 1 , '35ft Power Boat', 'Gorgoues and powerful speeed boat for rent.  Can hire a driver at additional expense.', 'Saint Vincent', 'Michael Baptise', 'mBoat@aol.com', '+17082345398', null, null, null, 'https://www.michaeltours.com');

INSERT INTO market_place_cats
    (name, description, img_path)
VALUES
    ('Items for Sale', 'Sell whatever you like.', '../icons/JPEG/for-sale.png'),
    ('Items Wanted', 'Looking to buy something? Post it here.', '../icons/JPEG/items-wanted.png'),
    ('Cars/Trucks/Boats/Bikes', 'All engine based vheicles only.', '../icons/JPEG/vehicle-for-sale.png'),
    ('Free Stuff', 'Not worth selling?  Just give it away.', '../icons/JPEG/free-stuff.png'),
    ('Property For Sale', 'Properties for sale.', '../icons/JPEG/property-for-sale.png'),
    ('Property Wanted', 'Looking to buy or rent a property? Look no further.', '../icons/JPEG/property-looking.png');

INSERT INTO market_place
    (market_place_cat, user_id, title, description, location, price, contact_name, contact_email, contact_phone)
VALUES
    (1, 1, 'Swim Suits', 'Hundreds of quality swim ware items for sale.', 'Bequia Harbour', '10/ea.', 'Ryan Carville', 'ryancarville@gmail.com', '+410791456789'),
    (3, 2, 'Jeep Wrangler', '2010 Red Jeep Wrangler CY with 10" lift.', 'Spring - Bequia', '22,459', 'Mike Busard', 'bigMike@aol.com', '+17082349846');

INSERT INTO directory
    (user_id, first_name, last_name, address, city, state, country, email, phone, website)
VALUES
    (1, 'Ryan', 'Carville', 'Chamau 6','Hunenberg', 'Zug', 'Switzerland','ryancarville@gmail.com', '+41701562329', 'https://www.beardystudios.com'),
    (2, 'Test', 'User','291 Test User Lane','San Francisco', 'CA', 'USA','testUser@gmail.com', null, null);
COMMIT;