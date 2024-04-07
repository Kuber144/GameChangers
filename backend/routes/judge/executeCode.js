import express from "express";
import fetch from "node-fetch";

const router = express.Router();

// Function to execute code using Judge0CE API
async function executeCode(code, languageId, input) {
  const apiUrl =
    "http://localhost:2358/submissions/?base64_encoded=true&wait=true";

  const requestBody = {
    source_code: Buffer.from(code).toString("base64"),
    language_id: languageId,
    stdin: input,
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Failed to execute code: " + response.statusText);
    }
  } catch (error) {
    console.error("Error executing code:", error);
    return res.status(400).json({ error: "Failed to execute code" });
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
