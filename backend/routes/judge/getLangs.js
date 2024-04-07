import fetch from "node-fetch";
import express from "express";

const router = express.Router();

async function getSupportedLanguages() {
  const apiUrl = "http://localhost:2358/languages";

  try {
    const response = await fetch(apiUrl);
    const languages = await response.json();
    return languages;
  } catch (error) {
    console.error("Error fetching supported languages:", error);
    throw new Error("Failed to fetch supported languages");
  }
}

router.get("/getlang", async (req, res) => {
  try {
    const languages = await getSupportedLanguages();
    console.log("erg");
    res.json(languages);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch supported languages" });
  }
});

export default router;
