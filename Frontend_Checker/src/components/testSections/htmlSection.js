import React from "react";
import InputField from "../../models/inputField";
export default function HtmlSection({ index, handleInputChange, test }) {
  return (
    <>
      <div className="htmlc">
        <label htmlFor={`htmlOption${index}`}>HTML Option:</label>
        <select
          id={`htmlOption${index}`}
          value={test.htmlOption}
          onChange={(e) =>
            handleInputChange(index, "htmlOption", e.target.value)
          }
          required
        >
          <option value="">Select Comparison Type</option>
          <option value="id">ID</option>
          <option value="class">Class</option>
          <option value="tag">Tag</option>
          <option value="attribute">Attribute</option>
          <option value="attribute-value">Attribute-Value</option>
          <option value="nth-child">Nth-child</option>
          <option value="attribute-exists">Attribute=exists</option>
          <option value="custom">Custom</option>
        </select>
        <InputField
          id={`htmlValue${index}`}
          label="HTML Value:"
          value={test.htmlValue}
          onChange={(e) =>
            handleInputChange(index, "htmlValue", e.target.value)
          }
        />
        <select
          id={`htmlCondition${index}`}
          value={test.htmlCondition}
          onChange={(e) =>
            handleInputChange(index, "htmlCondition", e.target.value)
          }
          required
        >
          <option value="">Select HTML Condition</option>
          <option value="exists">Exists</option>
          <option value="equals">Equals</option>
          <option value="contains">Contains</option>
          <option value="first">First Element</option>
          <option value="last">Last Element</option>
          <option value="justafter">Just After Element</option>
          <option value="justbefore">Just Before Element</option>
        </select>
        {test.htmlCondition !== "exists" &&
          test.htmlCondition !== "first" &&
          test.htmlCondition !== "last" && (
            <>
              {test.htmlCondition !== "exists" && (
                <>
                  <select
                    id={`htmlComparisonType${index}`}
                    value={test.htmlComparisonType}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "htmlComparisonType",
                        e.target.value
                      )
                    }
                    required
                  >
                    <option value="">Select Comparison Type</option>
                    <option value="id">ID</option>
                    <option value="class">Class</option>
                    <option value="tag">Tag</option>
                    <option value="attribute">Attribute</option>
                    <option value="attribute-value">Attribute-Value</option>
                    <option value="nth-child">Nth-child</option>
                    <option value="attribute-exists">Attribute=exists</option>
                    <option value="value">Value</option>
                    <option value="href">href</option>
                    <option value="src">src</option>
                    <option value="custom">Custom</option>
                  </select>
                  <InputField
                    id={`htmlValueToCompare${index}`}
                    label="Value to Compare:"
                    value={test.htmlValueToCompare}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "htmlValueToCompare",
                        e.target.value
                      )
                    }
                  />
                </>
              )}
            </>
          )}
      </div>
    </>
  );
}
