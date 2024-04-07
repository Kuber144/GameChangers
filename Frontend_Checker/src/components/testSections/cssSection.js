import React from "react";
import InputField from "../../models/inputField";
export default function CssSection({ index, handleInputChange, test }) {
  return (
    <>
      <div className="cssc">
        <label htmlFor={`selectorType${index}`}>Selector Type:</label>
        <select
          id={`selectorType${index}`}
          value={test.selectorType}
          onChange={(e) =>
            handleInputChange(index, "selectorType", e.target.value)
          }
          required
        >
          <option value="">Select Selector Type</option>
          <option value="id">ID</option>
          <option value="class">Class</option>
          <option value="tag">Tag</option>
          <option value="attribute">Attribute</option>
          <option value="custom">Custom</option>
        </select>
        <InputField
          id={`cssElement${index}`}
          label="CSS Element:"
          value={test.cssElement}
          onChange={(e) =>
            handleInputChange(index, "cssElement", e.target.value)
          }
        />
        <InputField
          id={`cssProperty${index}`}
          label="CSS Property:"
          value={test.cssProperty}
          onChange={(e) =>
            handleInputChange(index, "cssProperty", e.target.value)
          }
        />
        <InputField
          id={`cssValue${index}`}
          label="CSS Value:"
          value={test.cssValue}
          onChange={(e) => handleInputChange(index, "cssValue", e.target.value)}
        />
        <select
          id={`comparisonType${index}`}
          value={test.comparisonType}
          onChange={(e) =>
            handleInputChange(index, "comparisonType", e.target.value)
          }
          required
        >
          <option value="">Select Comparison Type</option>
          <option value="equals">Equal to</option>
          <option value="below">Below</option>
          <option value="above">Above</option>
          <option value="between">In Between</option>
        </select>
        {test.comparisonType === "between" && (
          <>
            <InputField
              id={`cssValue2${index}`}
              label="Less Than:"
              value={test.value2}
              type="number"
              onChange={(e) =>
                handleInputChange(index, "value2", e.target.value)
              }
            />
          </>
        )}
      </div>
    </>
  );
}
