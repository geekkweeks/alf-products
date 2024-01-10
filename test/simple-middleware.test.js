import express from "express";
import request from "supertest";

const middlewareLogger = (req, res, next) => {
  console.info(`Request detail: ${req.method} ${req.originalUrl}`);
  next();
};

const app = express();

// register Middleware(must sequence)
app.use(middlewareLogger);

app.get("/", (req, res) => {
  res.send("Hi there");
});

// unit test
test("Test the app using middleware", async () => {
  const res = await request(app).get("/");
  expect(res.text).toBe("Hi there");
});
