export function testJS(js, test) {
  try {
    console.log("Test:", test);
    const functionName = test.functionName;
    const expectedOutput = test.expectedOutput;
    const args = test.arguments;
    const checkType = test.testType;

    const functionRegex = new RegExp(`function\\s+${functionName}\\s*\\(`);
    const match = js.match(functionRegex); // Check if the function exists using regex

    if (!match) {
      //in case the function does not exist
      return {
        pass: false,
        reason: `Function '${functionName}' not found`,
      };
    }

    console.log(`Function '${functionName}' found`);
    if (checkType === "exists") {
      //in case testcase is only to check if the function exists
      return {
        pass: true,
        reason: `Function '${functionName}' exists`,
      };
    }
    if (checkType === "output") {
      const functionIndex = match.index; //get the function index
      const endIndex = js.indexOf("(", functionIndex); //where the arguments start
      const functionName = js.slice(functionIndex + 9, endIndex); //get the function name
      const signatureEndIndex = js.indexOf(")", functionIndex); //where the arguments end
      const signature = js.slice(endIndex + 1, signatureEndIndex); //get the function signature
      const argsPassed = signature.split(",").map((arg) => arg.trim()); //get the arguments
      let ll = argsPassed.length;
      if (argsPassed.length === 1 && argsPassed[0] === "") {
        ll = 0;
      }
      if (ll !== args.length) {
        //in case the number of arguments in test dont match with the function
        return {
          pass: false,
          reason: "Arguments Mismatch",
        };
      }

      // console.log("Function Name:", functionName);
      // console.log("Function Arguments:", argsPassed);

      const startIndex = js.indexOf("{", functionIndex); //where the function starts
      const endingIndex = js.indexOf("}", startIndex); //where the function ends
      const functionBody = js.slice(startIndex + 1, endingIndex); // the whole function

      const testFunction = new Function(...argsPassed, functionBody); // create a dummy function to test the functions output
      const output = testFunction(...args); //get the output of the function
      console.log("Output:", output);

      const isPass = output == expectedOutput;
      console.log(isPass);
      return {
        pass: isPass ? true : false,
        reason: isPass
          ? "All cases passed"
          : `Expected '${expectedOutput}' but got '${output}'`,
      };
    }
    return {
      // in case of error
      pass: false,
      reason: "Invalid check type. Please inform the instructor",
    };
  } catch (error) {
    return {
      pass: false,
      reason: `An error occurred: ${error.message}`,
    };
  }
}
