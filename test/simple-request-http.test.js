/*
this file is for testing purposes only. 
*/

import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
  res.send(`Hi ${req.query.name}`);
});

test("Test by using query parameter", async () => {
  const res = await request(app).get("/").query({ name: "Alfan" });
  expect(res.text).toBe("Hi Alfan");
});
