import request from "supertest";
import app from "../index.js";
import "../tests/testSetup.js";

describe("Sign In Controller Tests", () => {
  test("should sign in successfully", async () => {
    const res = await request(app)
      .post("/userauth/signin")
      .send({
        username: "teacher1",
        email: "teacher1@gmail.com",
        password: "123456"   // meets minLen:6
      });

    expect(res.statusCode).toBe(200);
  });
});
