import express from "express";
import fetch from "node-fetch";

const router = express.Router();

// Function to execute code using Judge0CE API
// async function executeCode(code, languageId, input) {
//   const apiUrl =
//     "http://localhost:2358/submissions/?base64_encoded=true&wait=true";

//   const requestBody = {
//     source_code: Buffer.from(code).toString("base64"),
//     language_id: languageId,
//     stdin: Buffer.from(input).toString("base64"),
//   };

//   try {
//     const response = await fetch(apiUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(requestBody),
//     });

//     if (response.ok) {
//       return await response.json();
//     } else {
//       throw new Error("Failed to execute code: " + response.statusText);
//     }
//   } catch (error) {
//     console.error("Error executing code:", error);
//     // return res.status(400).json({ error: "Failed to execute code" });
//   }
// }
async function executeCode(code, languageId, input) {
  const url =
    "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*";
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "65ad936127mshedf86edc75d8c1ep168abbjsncdd542314f0b",
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
    body: JSON.stringify({
      language_id: languageId,
      source_code: Buffer.from(code).toString("base64"),
      stdin: Buffer.from(input).toString("base64"),
    }),
  };

  try {
    const response = await fetch(url, options);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Failed to execute code: " + response.statusText);
    }
  } catch (error) {
    console.error("Error executing code:", error);
    throw new Error("Failed to execute code");
  }
}

// Route to handle code execution
router.post("/execute", async (req, res) => {
  console.log(req.body);
  const { code, languageId, input } = req.body;

  try {
    const output = await executeCode(code, languageId, input);
    res.json({ output });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to execute code" });
  }
});

export default router;
