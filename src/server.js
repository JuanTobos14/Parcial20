const http = require("http");
const fs = require("fs/promises");
const path = require("path");

const PORT = 3000;
const PUBLIC_PATH = path.join(__dirname, "..");

const MIME_TYPES = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript"
};

const server = http.createServer(async (req, res) => {
    try {
        const pathname = req.url === "/" ? "/index.html" : req.url;
        const ext = path.extname(pathname);
        const filePath = path.join(PUBLIC_PATH, pathname);

        const content = await fs.readFile(filePath);

        res.writeHead(200, {
            "Content-Type": MIME_TYPES[ext] || "text/plain"
        });

        res.end(content);
    } catch (err) {
        res.writeHead(404, {
            "Content-Type": "text/plain"
        });

        res.end("404 - Archivo no encontrado");
    }
});

server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
