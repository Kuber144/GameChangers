import React from "react";
import InputField from "../../models/inputField";
export default function JsSection({ index, handleInputChange, test }) {
  return (
    <>
      <div className="jsc">
        <InputField
          required
          id={`functionName${index}`}
          label="Function Name:"
          value={test.functionName}
          onChange={(e) =>
            handleInputChange(index, "functionName", e.target.value)
          }
        />
        <select
          required
          id={`testType${index}`}
          value={test.testType}
          onChange={(e) => handleInputChange(index, "testType", e.target.value)}
        >
          <option value="">Select Function Condition</option>
          <option value="output">Test Output</option>
          <option value="exists">Test Function Existence</option>
        </select>

        {test.testType === "output" && (
          <>
            <InputField
              required
              id={`numArguments${index}`}
              label="Number of Arguments:"
              type="number"
              value={test.numArguments}
              onChange={(e) =>
                handleInputChange(
                  index,
                  "numArguments",
                  e.target.value ? parseInt(e.target.value) : 0
                )
              }
            />
            {[...Array(parseInt(test.numArguments))].map((_, argIndex) => (
              <InputField
                required
                key={argIndex}
                id={`argument${argIndex}`}
                label={`Argument ${argIndex + 1}:`}
                value={test.arguments[argIndex] || ""}
                onChange={(e) =>
                  handleInputChange(index, "arguments", [
                    ...test.arguments.slice(0, argIndex),
                    e.target.value,
                    ...test.arguments.slice(argIndex + 1),
                  ])
                }
              />
            ))}
            <InputField
              required
              id={`expectedOutput${index}`}
              label="Expected Output:"
              value={test.expectedOutput}
              onChange={(e) =>
                handleInputChange(index, "expectedOutput", e.target.value)
              }
            />
          </>
        )}
      </div>
    </>
  );
}
