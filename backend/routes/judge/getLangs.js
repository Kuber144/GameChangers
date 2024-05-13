import fetch from "node-fetch";
import express from "express";

const router = express.Router();

async function getSupportedLanguages() {
  const apiUrl = "https://judge0-ce.p.rapidapi.com/languages";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "65ad936127mshedf86edc75d8c1ep168abbjsncdd542314f0b",
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
  };
  try {
    const response = await fetch(apiUrl, options);
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
