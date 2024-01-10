import express from "express";
import request from "supertest";

const middlewareLogger = (req, res, next) => {
  console.info(`Request detail: ${req.method} ${req.originalUrl}`);
  next();
};

const apiKeyMiddleware = (req, res, next) => {
  console.log(req.query);
  if (req.query.apiKey) next();
  else res.status(401).end();
};

const app = express();

// register Middleware(must sequence)
app.use(middlewareLogger);
app.use(apiKeyMiddleware);

app.get("/", (req, res) => {
  res.send("Hi there");
});

// unit test
test("Test the app using middleware", async () => {
  const res = await request(app).get("/").query({ apiKey: "1234" });
  expect(res.text).toBe("Hi there");
});
