import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./database/db.js";

dotenv.config();

const app = express()

//Middleware setup
app.use(express.json());

const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Hello World!')
})

//Importing routes. 
import userRoutes from './routes/user.js'
//Using the routes.
app.use('/api/', userRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    connectDB();
})