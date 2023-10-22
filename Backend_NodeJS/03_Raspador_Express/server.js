const http = require('http');
const express = require('express');
const path = require('path');

// modulos requeridos para raspador
const puppeteer = require('puppeteer');
const jsdom = require('jsdom');

const app = express();
app.use(express.json());
app.use(express.static("express")); // default URL for website

app.get('/', function(req,res){
  res.sendFile(path.join(__dirname+'/express/index.html')); //__dirname : It will resolve to your project folder.
});

app.get('/raspar', function(req, res){
  console.log("End point: Raspar");
  console.log("Sitio: ", req.query.rasparWeb);
  console.log("Buscar: ", req.query.rasparElementos);

  rasparSitio(req.query.rasparWeb,req.query.rasparElementos,res);
});

const server = http.createServer(app);
const port = 3000;
server.listen(port);
console.debug('Server listening on port ' + port);

// Funcion para raspar un sitio web
async function rasparSitio(sitio, elementos, res) {
  let cadenaHtml = "";

  try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      //const response = await page.goto('http://www.google.com/search?q=web+scraping+libros');
      const response = await page.goto(sitio);

      const pageBody = await response.text();

      const title = await page.title();
      console.log("Titulo:", title );

      const { window: {document}} = new jsdom.JSDOM(pageBody);

      cadenaHtml = "<!DOCTYPE html><html><head><style> table, th, td {  border: 1px solid black;  border-collapse: collapse; } </style><title>Raspador Web</title></head><body><h1>"+title+"</h1>";
      cadenaHtml = cadenaHtml + "<table><tr><th>Resultados</th></tr>";   
      //document.querySelectorAll('.g h3')
      document.querySelectorAll(elementos)
      .forEach(elem => 
        //console.log(elem.textContent)
        cadenaHtml = cadenaHtml + "<tr><td>" + elem.textContent + "</td></tr>"
        );

      cadenaHtml = cadenaHtml + "</table>";

      await browser.close();

      res.send(cadenaHtml);
  }
  catch(err) {
      console.log(err);
  }
}