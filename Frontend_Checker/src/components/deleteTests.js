import React, { useState, useEffect } from "react";
import "./deleteTests.css";

export default function TestList() {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    // Fetch tests data from API when component mounts
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const response = await fetch(
        "https://game-changers.vercel.app/api/fetchtest"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch tests");
      }
      const testsData = await response.json();
      setTests(testsData);
    } catch (error) {
      console.error("Error fetching tests:", error.message);
    }
  };

  const handleDeleteTest = async (testId) => {
    try {
      const response = await fetch(
        `https://game-changers.vercel.app/api/deletetest/${testId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete test");
      }
      // Remove the deleted test from the state
      setTests(tests.filter((test) => test._id !== testId));
      console.log("Test deleted successfully!");
    } catch (error) {
      console.error("Error deleting test:", error.message);
    }
  };

  return (
    <div className="test-list-container">
      <h2>Test List</h2>
      <ul>
        {tests.map((test) => (
          <li key={test._id}>
            <span>{test.title}</span>
            <button onClick={() => handleDeleteTest(test._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
