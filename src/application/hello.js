/*
this file is for testing purposes only. 
*/

import express from "express";

const app = express();

app.get("/", (req, res) => {
  console.log(req);
  res.send("hi tampan");
});

app.get("/product/:productId", (req, res) => {
  console.log(req.params);
  res.send("hi product");
});

app.get("/product/:productId/category/:categoryId", (req, res) => {
  console.log(req.params);
  res.send("hi product");
});

app.listen("5000", () => {
  console.log("hi there");
});
