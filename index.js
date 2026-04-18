const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" });

app.post("/convert", upload.single("image"), (req, res) => {
  const input = req.file.path;

  // تجربة فقط (يرجع نفس الصورة)
  res.download(input);
});

app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

app.listen(3000, () => console.log("Server running"));
