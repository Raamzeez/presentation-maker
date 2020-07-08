# Presentation Maker v0.1

Presentation Maker is a multi-user full-stack application that allows you to easily generate Google Slides presentation by providing a wikipedia article link. The presentations slides will be based on the sections of the wikipedia article and will include a summarized body of the section in the content of each of the slides.

### Requirements
- Node.js 12.18.0+
- MongoDB Community Edition


### Running the application

To run client:

`cd client && npm run start`

To run server:

`cd server && npm run start`

### Running MongoDB

To install on MacOS:

1. `brew tap mongodb/brew`
2. `brew install mongodb-community@4.2`

To start MongoDB on MacOS: 

`brew services start mongodb-community@4.2`