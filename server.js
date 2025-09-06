const express = require("express");
const multer = require("multer");
const path = require("path");
const Blockchain = require("./blockchain/Blockchain");
const getFileHash = require("./utils/fileHash");

const app = express();
const PORT = 3000;

// Blockchain instance
const blockchain = new Blockchain();

// File upload config
const upload = multer({ dest: "uploads/" });

// Serve static frontend
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));


// Add Document API
app.post("/add", upload.single("document"), (req, res) => {
  const docPath = req.file.path;
  const docHash = getFileHash(docPath);
  blockchain.addBlock(docHash);
  res.send({ success: true, message: "Document added to blockchain!" });
});

// Verify Document API
app.post("/verify", upload.single("document"), (req, res) => {
  const docPath = req.file.path;
  const docHash = getFileHash(docPath);
  const found = blockchain.chain.some((block) => block.data === docHash);

  if (found) {
    res.send({ verified: true, message: "✅ Document is Verified" });
  } else {
    res.send({ verified: false, message: "❌ Document Not Found!" });
  }
});

// Show Blockchain API
app.get("/chain", (req, res) => {
  res.json(blockchain.chain);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
