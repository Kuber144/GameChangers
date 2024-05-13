import React, { useState } from "react";
import testModel from "../models/testModel";
import InputField from "../models/inputField";
import JsSection from "./testSections/jsSection";
import HtmlSection from "./testSections/htmlSection";
import CssSection from "./testSections/cssSection";
import "./createTests.css";
export default function CreateTests() {
  const [testName, setTestName] = useState("");
  const [tests, setTests] = useState([testModel()]);

  const handleInputChange = (index, field, value) => {
    const newTests = [...tests];
    newTests[index][field] = value;
    setTests(newTests);
  };

  const handleAddTest = () => {
    setTests([...tests, { ...testModel() }]);
  };

  const handleRemoveTest = (index) => {
    const newTests = [...tests];
    newTests.splice(index, 1);
    setTests(newTests);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if no tests are added
    if (tests.length === 0) {
      alert("Please add at least one test before submitting.");
      return;
    }

    const formattedTests = {
      title: testName,
      tests: tests.map((test) => ({
        description: test.description,
        type: test.type,
        selector: test.selector,
        property: test.property,
        value: test.value,
        value2: test.value2,
        comparisonType: test.comparisonType,
        htmlOption: test.htmlOption,
        htmlValue: test.htmlValue,
        htmlCondition: test.htmlCondition,
        htmlValueToCompare: test.htmlValueToCompare,
        htmlComparisonType: test.htmlComparisonType,
        functionName: test.functionName,
        testType: test.testType,
        numArguments: test.numArguments,
        arguments: test.arguments,
        expectedOutput: test.expectedOutput,
        selectorType: test.selectorType,
        cssElement: test.cssElement,
        cssProperty: test.cssProperty,
        cssValue: test.cssValue,
      })),
    };
    console.log("Formatted Tests:", formattedTests);
    // Reset form fields
    try {
      const response = await fetch(
        "https://game-changers.vercel.app/api/addtest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedTests),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to save tests");
      }
      console.log("Tests saved successfully!");
      alert("Tests Saved Successfully");
      setTestName("");
      setTests([testModel()]);
    } catch (error) {
      console.log(error.message);
      alert("ERROR:", error.message);
    }
  };

  return (
    <>
      <div className="create-tests-container">
        <h2>Create Tests</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="testName">Test Name:</label>
            <input
              type="text"
              id="testName"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              required
            />
          </div>
          {tests.map((test, index) => (
            <div className="test-desc" key={index}>
              <InputField
                id={`description${index}`}
                label="Test Description:"
                value={test.description}
                onChange={(e) =>
                  handleInputChange(index, "description", e.target.value)
                }
              />
              <label htmlFor={`type${index}`}>Test Type:</label>
              <select
                id={`type${index}`}
                value={test.type}
                onChange={(e) =>
                  handleInputChange(index, "type", e.target.value)
                }
                required
              >
                <option value="">Select Test Type</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="js">JavaScript</option>
              </select>
              {test.type === "css" && (
                <CssSection
                  index={index}
                  test={test}
                  handleInputChange={handleInputChange}
                />
              )}
              {test.type === "html" && (
                <HtmlSection
                  index={index}
                  test={test}
                  handleInputChange={handleInputChange}
                />
              )}
              {test.type === "js" && (
                <JsSection
                  index={index}
                  handleInputChange={handleInputChange}
                  test={test}
                />
              )}
              <button type="button" onClick={() => handleRemoveTest(index)}>
                Remove Test
              </button>
            </div>
          ))}
          <button className="add-test" type="button" onClick={handleAddTest}>
            Add Test
          </button>
          <button type="submit">Create Tests</button>
        </form>
      </div>
    </>
  );
}
