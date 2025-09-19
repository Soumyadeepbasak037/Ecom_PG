const fs = require("fs");
const path = require("path");
const multer = require("multer");
const csv = require("csv-parser");

const upload = multer({ dest: "uploads/" });

function bulkProductUpload(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const products = [];
  const filePath = path.join(__dirname, req.file.path);

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (row) => {
      // required object { name: 'Laptop', price: '50000', stock: '20', category: 'Electronics' }
      products.push({
        name: row.name,
        price: parseFloat(row.price),
        stock: parseInt(row.stock),
        category: row.category,
        description: row.description || "",
      });
    })
    .on("end", async () => {
      //Insety into db

      fs.unlinkSync(filePath);
      res.json({
        message: "Bulk upload successful",
        count: products.length,
        products,
      });
    })
    .on("error", (err) => {
      console.error(err);
      res.status(500).json({ message: "Error processing file" });
    });
}

module.exports = { upload, bulkProductUpload };
