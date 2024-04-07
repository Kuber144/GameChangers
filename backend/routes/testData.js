import express from "express";
import { TestData } from "../models/TestData.js";

const router = express.Router();

// Router to get the test data and save it into the database
router.post("/addtest", async (req, res) => {
  try {
    const { title, tests } = req.body;

    // Check if a test with the same title already exists
    const existingTest = await TestData.findOne({ title });
    if (existingTest) {
      return res
        .status(400)
        .json({ error: "A test with the same title already exists" });
    }

    const formattedTests = tests.map((test) => ({
      // map the values into the correct formatting to be put into the model
      description: test.description,
      type: test.type,
      selector: test.selector,
      property: test.property,
      value: test.value,
      comparisonType: test.comparisonType,
      value2: test.value2,
      htmlOption: test.htmlOption,
      htmlValue: test.htmlValue,
      htmlCondition: test.htmlCondition,
      htmlValueToCompare: test.htmlValueToCompare,
      htmlComparisonType: test.htmlComparisonType,
      functionName: test.functionName,
      testType: test.testType,
      arguments: test.arguments,
      expectedOutput: test.expectedOutput,
      selectorType: test.selectorType,
      cssElement: test.cssElement,
      cssProperty: test.cssProperty,
      cssValue: test.cssValue,
    }));

    const testData = new TestData({
      title,
      tests: formattedTests,
    });

    await testData.save(); // Save the test into the database
    res.status(200).json({ message: "Data saved successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.get("/fetchtest", async (req, res) => {
  try {
    const allTests = await TestData.find(); //Send all of the tests back
    res.status(200).json(allTests);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occured while fetching the data" });
  }
});

// DELETE endpoint to delete a test by ID
router.delete("/deletetest/:id", async (req, res) => {
  try {
    const testId = req.params.id;

    // Find the test by ID and delete it
    const deletedTest = await TestData.findByIdAndDelete(testId);

    // If the test with the specified ID doesn't exist
    if (!deletedTest) {
      return res.status(404).json({ error: "Test not found" });
    }

    res.status(200).json({ message: "Test deleted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the test" });
  }
});

export default router;
