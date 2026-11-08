// Minimal static server for testing Hearth on this PC or a phone on the same Wi-Fi.
// Run: node serve.js   then open http://<this-pc-ip>:5173
const http = require("http"), fs = require("fs"), path = require("path");
const root = path.join(__dirname, "app"), port = process.env.PORT || 5173;
const types = { ".html":"text/html", ".js":"text/javascript", ".json":"application/manifest+json", ".svg":"image/svg+xml", ".png":"image/png" };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p.endsWith("/")) p += "index.html";
  const file = path.normalize(path.join(root, p));
  if (!file.startsWith(root)) { res.writeHead(403); return res.end(); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end("Not found"); }
    res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream", "Cache-Control": "no-cache" });
    res.end(data);
  });
}).listen(port, "0.0.0.0", () => console.log(`Hearth running at http://localhost:${port}`));
