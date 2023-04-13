import express from "express";
const router = express.Router();

const ventanilla = router.get("/ventanilla", (req, res) => {
  res.sendFile("ventanilla.html", { root: "src/public" });
});

const tv = router.get("/tv", (req, res) => {
  res.sendFile("tv.html", { root: "src/public" });
});

const lineup = router.get("/lineup", (req, res) => {
  res.sendFile("lineup.html", { root: "src/public" });
});

const err404 = router.get("*", (req, res) => {
  res.sendFile("404.html", { root: "src/public" });
});

export { ventanilla, tv, lineup, err404 };
