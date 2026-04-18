const express = require("express");
const multer = require("multer");
const cors = require("cors");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" });

app.post("/convert", upload.single("image"), async (req, res) => {
  try {
    const input = req.file.path;
    const output = input + ".png";

    // تحويل بسيط (نجرب أول)
    await sharp(input).png().toFile(output);

    res.download(output, () => {
      fs.unlinkSync(input);
      fs.unlinkSync(output);
    });

  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
});

app.get("/", (req, res) => {
  res.send("Server running ✅");
});

app.listen(3000, () => console.log("Server running"));
