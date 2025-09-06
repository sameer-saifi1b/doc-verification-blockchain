async function addDocument() {
    const file = document.getElementById("addFile").files[0];
    if (!file) return alert("Select a file first");
  
    const formData = new FormData();
    formData.append("document", file);
  
    const res = await fetch("/add", {
      method: "POST",
      body: formData
    });
  
    const data = await res.json();
    document.getElementById("addResult").innerText = data.message + " | Hash: " + data.hash;
  }
  
  async function verifyDocument() {
    const file = document.getElementById("verifyFile").files[0];
    if (!file) return alert("Select a file first");
  
    const formData = new FormData();
    formData.append("document", file);
  
    const res = await fetch("/verify", {
      method: "POST",
      body: formData
    });
  
    const data = await res.json();
    document.getElementById("verifyResult").innerText = data.message;
    document.getElementById("verifyResult").className = data.verified
      ? "mt-2 text-sm text-green-600"
      : "mt-2 text-sm text-red-600";
  }
  
  async function showChain() {
    const res = await fetch("/chain");
    const data = await res.json();
    document.getElementById("chainResult").innerText = JSON.stringify(data, null, 2);
  }
  