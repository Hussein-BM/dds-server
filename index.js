const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

app.post("/convert", upload.single("image"), (req, res) => {
  const input = req.file.path;

  exec(`texconv -f DXT5 -o uploads ${input}`, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Conversion failed");
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
