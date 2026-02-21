import dotenv from 'dotenv'
dotenv.config({ path: './.env' })
console.log("env imported from env file: ", process.env.username)
console.log("Start my backend with nodemon");
