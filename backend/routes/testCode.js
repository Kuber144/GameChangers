import express from "express";
import { testJS } from "../routes/testJS/testMain.js";
import { testHTML } from "../routes/testHTML/testMain.js";
import { TestData } from "../models/TestData.js";
import cheerio from "cheerio";
import { testCSS } from "../routes/testCSS/testMain.js";
const router = express.Router();

router.post("/testcode", async (req, res) => {
  const srcDoc = req.body.srcDOC;
  const js = req.body.js;
  const html = req.body.html;
  const jsonResponse = []; // Initialize JSON array to store responses
  try {
    const $ = cheerio.load(srcDoc);
    const title = req.body.title;
    const test = await TestData.findOne({ title: title });
    if (!test) {
      return res.status(404).json({ error: "Test not found" });
    }

    // Iterate over each test in the tests array
    for (let i = 0; i < test.tests.length; i++) {
      const testItem = test.tests[i];
      let testResponse;
      if (testItem.type === "html") {
        testResponse = testHTML($, testItem);
      } else if (testItem.type === "css") {
        testResponse = testCSS(srcDoc, testItem);
      } else if (testItem.type === "js") {
        testResponse = testJS(js, testItem);
      }
      jsonResponse.push(testResponse); // Append response to JSON array
    }

    // Send the JSON array response after all tests are completed
    return res.status(200).json(jsonResponse);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "An error occurred" });
  }
});

export default router;
