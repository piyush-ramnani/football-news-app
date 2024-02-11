# football-news-app

## Features

- User Login and Register
- Allows users to post about football news like articles
- Users can view other user's posts, upvote or downvote on them.
- Users can also comment on other users' posts.
- The app will display the most popular/trending topics.
- Each topic page will show a summary of all related posts with their authors and number of likes/dislikes.
- There is an admin dashboard where admins can add new categories for topics (if needed) as well as manage existing ones. They can also delete any unwanted content.
- A search bar for quick searching through all posted content.

## Technologies Used:

- ReactJS
- Node.js & Express server
- MongoDB database (using Mongoose ODM)

## Backend

- User login and create-post Schema created [backend/db/db.js]
- z validation for user registration input and post created [backend/validation]
- user routes created [backend/routes/userRouter.js]
