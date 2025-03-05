# API-Social-Network

## Description

This project is a API that models a social network API. The purpose of this application is to serve as a mock api for a social network while also, showcasing my programming skills in TypeScript, MongoDB and Mongoose. It's a fantastic way to demonstrate the practical integration of APIs, and I highly encourage others try to build a similar project to practice and enhance their coding skills with nonSQL databases.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

- In order to copy the project start by coping the files by hand or downloading the project with ```git clone ``` command in your git terminal
- make sure you have [node js](https://nodejs.org/en) and the package manager that comes with it.
- run the following command in project folder terminal: ```npm i``` This will download all the needed dependencies for the project
- also make sure you have mongoDB database on same computer that is SocialNetworkDB or change the url in connection file of the project to match the mongoDB database you want to reach.

## Usage

- After youve got the project installed this far you can run the command ```npm run seed``` in project folder to seed the database with a couple of users. They won't have any thoughts, reactions, or friends at this point yet, but at least you won't have to start your database off from scratch. 
- Additionally this will reset your databse as well.
- Next run ```npm start ``` in your project terminal
- The database is set up so basically you can add users who have some info about them including a list of thoughts they have posted.
- These thoughts can have an array of reactions to them from other users.
-additionally the users all have id's and the users also have a friend list that can store a list of other users id's who are there friends.
- for better understanding of the fields in users and thoughts look at the files in model folder to get a better grasp.
- You can run various http request to your api to get and change data from your database with root http://localhost:3001 and the following request:
- GET /api/users to to get all users back.
- GET /api/users/:userId to get specific user databack.
- POST /api/users (info in json body) to create a new user.
- POST /api/users/:userId (info in json body) to update a user.
- DELETE /api/users/:userId to delete a user.
- POST /api/users/:userId/friends/:friendId to add friend to user in user id.
- DELETE /api/users/:userId/friends/:friendId to delete the friend using friendId from user listed in userId.
- GET /api/though to get all thoughts in database back.
- GET /api/though/:thoughId to get a specific thought back from api.
- POST /api/though (info in body of http) to create a new thought.
- PUT /api/though/:thoughId (info in body of http) to update a thought.
- DELETE /api/though/:thoughId to delete a thought from database.
- POST /api/thoughts/:thoughtId/reactions (info in http body) to create a reaction to a thought.
- DELETE /api/thoughts/:thoughtId/reactions/:reactionId to delete a reaction from a thought.
- Here's a walk-through video as a demonstration using Insomnia: [Click Here](https://drive.google.com/file/d/1sOX0yiGvM_4kPxhTxD-mYBJ6QgkWkubI/view?usp=sharing)

## Credits

Project Designer: Kalab Smith
- [K-Lab-Code](https://github.com/K-Lab-Code)
- [kalabsb@me.com](mailto:kalabsb@me.com)

## License

Distributed under the MIT License. See LICENSE.txt for more information.
