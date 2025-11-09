import request from "supertest";
import app from "../index.js";
import "../tests/testSetup.js";

describe("Login Controller Tests", () => {
  test("should handle invalid login (wrong username)", async () => {
    const res = await request(app)
      .post("/userauth/login")
      .send({
        username: "wrongUsername",
        password: "123456"
      });

    expect(res.body.message).toBe("User does not exists / Incorrect username");
    expect(res.body.access).toBeUndefined();
  });

  test("should login successfully", async () => {
    // create a valid user
    await request(app)
      .post("/userauth/signin")
      .send({
        username: "pranshu",
        email: "pranshu@gmail.com",
        password: "123456"
      });

    const res = await request(app)
      .post("/userauth/login")
      .send({
        username: "pranshu",
        password: "123456"
      });

    expect(res.body.access).toBe(true);
  });
});
