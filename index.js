app.post("/convert", upload.single("image"), (req, res) => {
  const input = req.file.path;

  // تجربة فقط
  res.download(input);
});
