# Bequia Forum API

This is a Express API built with a PostgreSQL Database and Knex Query Build. Custom built specficly for Bequia Forum App.

## Technologies

Node.js, Express, PostgreSQL, Knex, Nodemon

## Scripts

Start the application <br> `npm start`

Start nodemon for the application <br>`npm run dev`

Run the tests <br> `npm test`

Deploy to Heroku <br>`npm run deploy`
<br/>

# API Endpoisnts

## Sign Up <br/> path: /signUp

#### POST

endpoint: / <br/>
method: POST <br/>
requires: first_name, last_name, email, user_name and password

## Login <br/> path: /login

#### GET

endpoint: /verifyToken/:token<br/>
method: GET<br/>
requires: JWT Token<br/>

#### POST

endpoint: / <br/>
method: POST <br/>
required: password, email OR user_name<br/>

## Users<br />path: /users

#### GET

endpoint: /:id<br/>
method: GET<br/>
requires: user id<br/>
returns: all user data

endpoint: /userName/:id<br/>
method: GET<br/>
requires: user id<br/>
returns: user name

## Forum <br/> path: /forum

#### GET

endpoint: /catagories <br/>
method: GET <br/>
returns: All forum catagories<br/>

endpoint: /messageBoards<br/>
method: GET<br/>
returns: All Forum catagory sections<br/>

endpoint: /messageboards/get-board/:id<br/>
method: GET<br/>
require: board id
returns: Message board with matching id<br/>

endpoint: /messageboards/get-board-name/:id<br/>
method: GET<br/>
require: board id
returns: Message board name with matching id<br/>

endpoint: /messageboards/get-board-posts/:board_id<br/>
method: GET<br/>
require: board id
returns: All posts for message board with matching id<br/>

endpoint: /newestPosts<br/>
method: GET<br/>
returns: 8 Newest posts from entire site<br/>

endpoint: /get-user-posts/:user_id<br/>
method: GET<br/>
required: user id
returns: Get all posts by user with id<br/>

endpoint: /numOfThreads/:board_id<br/>
method: GET<br/>
required: board id
returns: Get count of number of posts for a board with id<br/>

endpoint: /messageboards/get-post-by-id/:id<br/>
method: GET<br/>
required: post id
returns: Get post by id<br/>

endpoint: /messageboards/:messageboard_section<br/>
method: GET<br/>
required: forum catagory id
returns: Get forum catagory by id<br/>

endpoint: /search/posts/:term<br/>
method: GET<br/>
required: search term
returns: Get all posts with term (entire site)<br/>

endpoint: /search/posts/:board_id/:term<br/>
method: GET<br/>
required: forum board id & search term
returns: Get all posts with term in specific forum board<br/>

endpoint: /likesTracker/:user_id/:post_id<br/>
method: GET<br/>
required: user id & post id
returns: check if user has liked a post<br/>

#### POST

endpoint: /addPost<br/>
method: POST<br/>
required: board_id, user_id, title, content & date_posted<br/>
action: adds forum post to DB if valid<br/>

endpoint: /post/addToTracker<br/>
method: POST<br/>
required: post id & user id<br/>
action: adds post and user id pairing to likes tracker table<br/>

#### PATCH

endpoint: /edit<br/>
method: PATCH<br/>
required: id, board_id, title or content
returns: Serialzed Updated post<br/>

endpoint: /post/addLike/:post_id<br/>
method: PATCH<br/>
required: post id
returns: adds to post like count<br/>

endpoint: /post/minusLike/:post_id<br/>
method: PATCH<br/>
required: post id
returns: subtracts from post like count<br/>

#### DELETE

endpoint: /posts/:post_id<br/>
method: DELETE<br/>
required: post id
action: deletes post from DB<br/>

endpoint: /post/deleteFromTracker<br/>
method: DELETE<br/>
required: post id & user id
action: removes post id and user id pairing from likes tracker<br/>

## Comments<br/> path: /comments

#### GET

endpoint: /:id<br/>
method: GET<br/>
required: post id
returns: Gets all comments for a post<br/>

endpoint: /count-coumments/:post_id<br/>
method: GET<br/>
required: post id
returns: Count of comments for a specific post<br/>

#### POST

endpoint: /addComment<br/>
method: POST<br/>
required: user_id, content, date_posted && post_id
action: Adds comment for post<br/>

#### DELETE

endpoint: /delete/:id<br/>
method: DELETE<br/>
required: comment id
action: Removes comment from DB<br/>

## Directory<br/> path: /directory

#### GET

endpoint: /<br/>
method: GET<br/>
returns: All directory listings<br/>

#### POST

endpoint: /addListing<br/>
method: POST<br/>
required: At least one of the following:
user_id,
first_name,
last_name,
address,
city,
country,
email,
phone,
website
action: Adds new directory listing<br/>

#### DELETE

endpoint: /delete/:listingId<br/>
method: DELETE<br/>
required: lisgint id
action: Deleted directory listing<br/>

## Events<br/>path: /events

#### GET

endpoint: /<br/>
method: GET<br/>
returns: All events<br/>

endpoint: /:event_id<br/>
method: GET<br/>
requires: event id
returns: Event by id<br/>

endpoint: /thisWeek/:today/:nextWeek<br/>
method: GET<br/>
requires: todays and 7 days from today (Date format '2019-10-23')
returns: All events occuring between today and 7 days from today<br/>

#### POST

endpoint: /addEvent<br/>
method: POST<br/>
requires: At least one of the following:
title,
location,
event_date,
event_time,
description,
user_id,
date_posted
action: Adds event to DB<br/>

#### PATCH

endpoint: /edit<br/>
method: PATCH<br/>
requires: At least one of the following:
id,
title,
location,
event_date,
event_time,
description,
user_id,
date_posted
action: Updates event content<br/>

#### DELETE

endpoint: /delete/:event_id<br/>
method: DELETE<br/>
requires: event id
action: Deletes Event Listing in DB<br/>

## JOBS<br/>path: /jobs

#### GET

endpoint: /catagories<br/>
method: GET<br/>
returns: All Job Catagories<br/>

endpoint: /listings-by-cat/:job_cat<br/>
method: GET<br/>
requires: job catagory id
returns: All listings for job catagory<br/>

endpoint: /listings/:id<br/>
method: GET<br/>
requires: job listing id
returns: Listings with matching id<br/>

#### POST

endpoint: /addJob<br/>
method: POST<br/>
requires: At least the following:
user_id,
job_cat,
title,
location,
description,
employment,
date_posted
action: Adds job listing to DB<br/>

#### PATCH

endpoint: /edit<br/>
method: PATCH<br/>
requires: At least listing id and one of the following:
user_id,
job_cat,
title,
location,
description,
contact_name,
contact_email,
website,
contact_phone,
employment,
date_posted
action: Updates job listing content<br/>

#### DELETE

endpoint: /delete/:id<br/>
method: PATCH<br/>
requires: listing id
action: Deletes job listing from DB<br/>

## Market Place <br/> path: /marketPlace

#### GET

endpoint: /catagories<br/>
method: GET<br/>
returns: All market place catagoroies<br/>

endpoint: /listings-by-cat/:market_place_cat<br/>
method: GET<br/>
requires: catagory id
returns: All listings for market place catagory<br/>

endpoint: /listings/:id<br/>
method: GET<br/>
requires: listing id
returns: Listing with matching ID<br/>

#### POST

endpoint: /addListing<br/>
method: POST<br/>
requires: At least the following:
market_place_cat,
user_id,
title,
description,
contact_name,
contact_email
action: Adds new market place listing to DB<br/>

#### PATCH

endpoint: /edit<br/>
method: PATCH<br/>
requires: At least one of the following:
id,
market_place_cat,
title,
description,
location,
price,
contact_name,
contact_email,
contact_phone
action: Updates market place listing in DB<br/>

#### DELETE

endpoint: /delete/:id<br/>
method: DELETE<br/>
requires: listing id
action: Deletes market place listing in DB<br/>

## Rentals<br/> path: /rentals

#### GET

endpoint: /catagories<br/>
method: GET<br/>
returns: All rentals catagoroies<br/>

endpoint: /catagories/:id<br/>
method: GET<br/>
requires: catagory id
returns: Catagory info<br/>

endpoint: /listings<br/>
method: GET<br/>
returns: All rental listing<br/>

endpoint: /listings/:id<br/>
method: GET<br/>
requires: listing id
returns: Listing with matching ID<br/>

endpoint: /listings-by-cat/:rental_cat<br/>
method: GET<br/>
requires: catagory id
returns: All listings for rental catagory<br/>

#### POST

endpoint: /addListing<br/>
method: POST<br/>
requires: At least the following:
renatle_cat,
user_id,
title,
description,
contact_name,
contact_email
action: Adds new rentals listing to DB<br/>

#### PATCH

endpoint: /edit<br/>
method: PATCH<br/>
requires: At least one of the following:
id,
rental_cat,
title,
description,
location,
price,
contact_name,
contact_email,
contact_phone
action: Updates rentals listing in DB<br/>

#### DELETE

endpoint: /delete/:id<br/>
method: DELETE<br/>
requires: listing id
action: Deletes rentals listing in DB<br/>
