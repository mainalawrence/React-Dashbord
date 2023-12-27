import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import route from './routes/index.js'
import connect from "./Database/dbConnection.js"
import { dbBackup } from "./Database/databaseManagement.js";
import multer from 'multer';
import path from 'path'

// import bodyParser from 'bodyParser'
/* CONFIGURATION */
dotenv.config();
const app = express();

app.use(express.json());

app.use(helmet());
app.use(express.static('avatar'));
app.use(multer().single('avatar'));
// app.get('/static', express.static(path.join(__dirname, 'avatar')));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use("/",route);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
//connect to database
try {
  connect;
  dbBackup();
} catch (error) {
  console.log("Error :" + error.message);
}

app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
