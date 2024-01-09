import supertest from "supertest";
import { web } from "../src/application/web.js";
import { prismaClient } from "../src/application/database.js";

describe("POST /api/users", function () {
  const usernameTest = "alfanTest";
  const nameTest = "alfantest test";
  afterEach(async () => {
    await prismaClient.user.deleteMany({
      where: {
        username: usernameTest,
      },
    });
  });
  it("should be registered for the new user", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: usernameTest,
      password: "XCAS",
      name: nameTest,
    });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe(usernameTest);
    expect(result.body.data.password).toBeUndefined();
  });

  // invalid testing
  it("Should be error with empty request", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "",
      password: "",
      name: "",
    });
    console.log("🚀 ~ unit test result ~ result:", result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});
