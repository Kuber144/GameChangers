import express, { json } from "express";
import connectToMongo from "./db.js";
import cors from "cors";
import judgeRouterLang from "./routes/judge/getLangs.js";
import judgeRouterCode from "./routes/judge/executeCode.js";
import TestRoute from "./routes/testData.js";
import TestCode from "./routes/testCode.js"; //import api's
import bodyParser from "body-parser";
connectToMongo();
const app = express();

const PORT = process.env.PORT || 8000; //running on port 8000
app.use(cors()); //Apply cors
app.use(json({ limit: "25mb" })); // Parse JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.get("/", (req, res) => {
  res.send("Application is running!");
});
app.use("/judge", judgeRouterLang);
app.use("/judge", judgeRouterCode);
app.use("/api", TestRoute); // Adding and Fetching the test
app.use("/test", TestCode); //For testing the code
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export default app;
