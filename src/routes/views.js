import express from "express";
const router = express.Router();

router.get("/ventanilla", (req, res) => {
  if (!req.session.user) {
    res.redirect("/login", 302);
  }
  res.sendFile("ventanilla.html", { root: "src/public" });
});

router.get("/tv", (req, res) => {
  res.sendFile("tv.html", { root: "src/public" });
});

router.get("/lineup", (req, res) => {
  res.sendFile("lineup.html", { root: "src/public" });
});

router.get("*", (req, res) => {
  res.sendFile("404.html", { root: "src/public" });
});

export default router;