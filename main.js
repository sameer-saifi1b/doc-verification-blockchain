const readline = require("readline");
const Blockchain = require("./blockchain/Blockchain");
const getFileHash = require("./utils/fileHash");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const blockchain = new Blockchain();

function menu() {
  console.log("\n📌 Blockchain Document Verification System");
  console.log("1. Add Document");
  console.log("2. Verify Document");
  console.log("3. Show Blockchain");
  console.log("4. Exit");

  rl.question("Enter choice: ", (choice) => {
    if (choice === "1") {
      rl.question("Enter document path: ", (path) => {
        const docHash = getFileHash(path);
        blockchain.addBlock(docHash);
        console.log("✅ Document added to blockchain!");
        menu();
      });
    } else if (choice === "2") {
      rl.question("Enter document path to verify: ", (path) => {
        const docHash = getFileHash(path);
        const found = blockchain.chain.some((block) => block.data === docHash);

        if (found) {
          console.log("✅ Document is Verified (Exists in Blockchain)");
        } else {
          console.log("❌ Document Not Found or Tampered!");
        }
        menu();
      });
    } else if (choice === "3") {
      blockchain.printChain();
      menu();
    } else if (choice === "4") {
      rl.close();
    } else {
      console.log("Invalid choice!");
      menu();
    }
  });
}

menu();
