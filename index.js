const express = require("express");
const PdfPrinter = require("pdfmake");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const fonts = {
  Roboto: {
    normal: "fonts/Roboto-Regular.ttf",
    bold: "fonts/Roboto-Medium.ttf",
    italics: "fonts/Roboto-Italic.ttf",
    bolditalics: "fonts/Roboto-MediumItalic.ttf",
  },
};

// Conteudo do PDF
const docDefinition = {
  content: [{ text: "É isso cara" }],
};

const printer = new PdfPrinter(fonts);

app.get("/", (request, response) => {
  const pdfDoc = printer.createPdfKitDocument(docDefinition);

  pdfDoc.pipe(fs.createWriteStream("testpdf.pdf"));

  pdfDoc.end();

  return response.status(200).send(fs.createReadStream("testpdf.pdf"));
});

app.listen(3333);
