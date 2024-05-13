import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import "./navbar.css";
import { SidebarData } from "./SidebarData";
import CenteredModal from "../modals/centeredModal";

function Navbar({ srcDOC, html, css, js }) {
  const [sidebar, setSidebar] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [testData, setTestData] = useState([]);
  const [testResults, setTestResults] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalBody, setModalBody] = useState("");

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  const handleTestSelection = (e) => {
    if (e.target.selectedIndex <= 0) {
      setSelectedTest(null);
      return;
    }
    setTestResults([]); // Clear test results when a new test is selected
    setSelectedTest(e.target.selectedIndex - 1);
  };

  const handleRunTest = async (selectedTestIndex) => {
    if (selectedTestIndex === null) return; // Return if no test is selected
    try {
      const title = testData[selectedTestIndex].title;
      const response = await fetch(
        "https://game-changers.vercel.app/test/testcode",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            srcDOC,
            html,
            css,
            js,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to run test on backend");
      }
      const responseData = await response.json();
      console.log([responseData]);
      setTestResults(responseData); // Set the test results separately
      // setTestData(testData);
    } catch (error) {
      console.error("Error running test on backend:", error);
    }
  };

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        const response = await fetch(
          "https://game-changers.vercel.app/api/fetchtest"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch test data");
        }
        const data = await response.json();
        console.log(data);
        setTestData(data);
      } catch (error) {
        console.error("Error fetching test data:", error);
      }
    };

    fetchTestData();
  }, []);
  const handleRedItemClick = (reason) => {
    setModalBody(reason);
    setModalShow(true);
  };
  return (
    <>
      <CenteredModal
        heading="Error"
        body={modalBody}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      {/*  THE MODAL FOR POPUP OVER HERE*/}
      <div className="navbar">
        <Link to="#" className="menu-bars">
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>
        <div className="create-button-container">
          <Link to="/create">
            <button className="create-button">Create Tests</button>
          </Link>
          <Link to="/delete">
            <button className="delete-button">Delete Tests</button>
          </Link>
        </div>
      </div>
      <nav className={sidebar ? "nav-menu open" : "nav-menu"}>
        <ul className="nav-menu-items">
          <li className="navbar-toggle" onClick={showSidebar}>
            <Link to="#" className="menu-bars">
              <AiIcons.AiOutlineClose />
            </Link>
          </li>
          {/* Render "Run Tests" button */}
          {SidebarData.map((item, index) => (
            <li key={index} className={item.cName}>
              <button onClick={() => handleRunTest(selectedTest)}>
                {item.icon}
                <span>{item.title}</span>
              </button>
            </li>
          ))}
          {/* Render dropdown for selecting tests */}
          <li className="nav-text">
            <select onChange={handleTestSelection}>
              <option value="">Select Test</option>
              {testData.map((item, index) => (
                <option key={index} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>
          </li>
          {/* Display selected test */}
          {selectedTest !== null && (
            <li className="nav-text">
              <div>
                <h3>Selected Test: {testData[selectedTest].title}</h3>
                {/* Render tests along with descriptions */}
                <ul>
                  {testData[selectedTest].tests.map((test, index) => (
                    <li
                      className={`nav-desc ${
                        testResults[index]?.pass === true
                          ? "green"
                          : testResults[index]?.pass === false
                          ? "red"
                          : ""
                      }`}
                      key={index}
                      onClick={() =>
                        test.pass
                          ? null
                          : testResults.length > 0 &&
                            handleRedItemClick(testResults[index].reason)
                      }
                    >
                      {test.description}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
