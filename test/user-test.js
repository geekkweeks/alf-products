import supertest from "supertest";
import { web } from "../src/application/web.js";

describe("POST /api/users", function () {
  it("should be registered for the new user", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "alfanzah",
      password: "XCAS",
      name: "alfan zah",
    });
    var expect = chai.expect;

    // expect(result.status).toBe(200);
    expect(result.status).to.equal(200);
    // expected(result.body.data.password).toBeUndefined();
  });
});
