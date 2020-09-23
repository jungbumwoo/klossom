import dotenv from "dotenv";
import "./db";
import app from "./app";
import "./models/Video";

dotenv.config();

import "./models/Video";
// import "./models/Comment";
import "./models/User";


const PORT = 3000;

const handleListening = () =>
  console.log(`✅  Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
