import express from "express";
import cors from "cors";
import judgeRouterLang from "./routes/judge/getLangs.js";
import judgeRouterCode from "./routes/judge/executeCode.js";
import bodyParser from "body-parser";

const app = express();

const PORT = process.env.PORT || 8000; //running on port 8000
app.use(cors()); //Apply cors
app.use(bodyParser.json()); // Parse JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.get("/", (req, res) => {
  res.send("Application is running!");
});
app.use("/judge", judgeRouterLang);
app.use("/judge", judgeRouterCode);
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export default app;
