const express = require("express");
const multer = require("multer");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" });

app.post("/convert", upload.single("image"), (req, res) => {
  const input = req.file.path;

  exec(`texconv -f DXT5 -o uploads ${input}`, (err) => {
  if (err) {
    console.log(err);
    return res.status(500).send("error");
  }

    const output = path.join(
      "uploads",
      path.basename(input, path.extname(input)) + ".DDS"
    );

    res.download(output, () => {
      fs.unlinkSync(input);
      fs.unlinkSync(output);
    });
  });
});

app.listen(3000, () => console.log("Server running"));
