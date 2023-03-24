# skintracker 💄

A skin care routine calendar I made as a final project for the Centraal Academy's (@ Mexico City) bootcamp.

### Setup

1. Clone this repository.
2. Run `yarn install`
3. Add an .env file to the root folder with the **_private variables_** \* containing your server's port number of preferance and the MONGODB uri of your cluster.

`PORT=*Your port number goes here. Ex. 3000`
<br/>
`MONGODB=*Your MONGODB uri goes here.*`

4. Run `npm start`

### For dev environment

1. Follow the regular setup steps from 1 to 3. 
2. Run `npm dev` to get the server and the client started with Nodemon and Webpack, respectively.
4. If changes on styling are needed, run `npm sass` and start editing on the `styles.scss` file.