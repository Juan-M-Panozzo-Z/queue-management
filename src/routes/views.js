import express from "express";
const router = express.Router();

export const ventanilla = router.get("/ventanilla", (req, res) => {
  if (!req.session.user) {
    res.redirect("/login", 302);
  }
  res.sendFile("ventanilla.html", { root: "src/public" });
});

export const tv = router.get("/tv", (req, res) => {
  res.sendFile("tv.html", { root: "src/public" });
});

export const lineup = router.get("/lineup", (req, res) => {
  res.sendFile("lineup.html", { root: "src/public" });
});

export const err404 = router.get("*", (req, res) => {
  res.sendFile("404.html", { root: "src/public" });
});