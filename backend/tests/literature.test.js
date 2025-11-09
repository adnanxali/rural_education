import request from "supertest";
import app from "../index.js";
import "../tests/testSetup.js";

describe("Literature Controller Tests", () => {
  test("should add literature data", async () => {
    const res = await request(app)
      .post("/lit")
      .send({
        english: 4,
        hindi: 3,
        marathi: 5,
        sid: 222
      });

    expect(res.statusCode).toBe(201);
  });

  test("should get literature data", async () => {
    const res = await request(app)
      .post("/lit/l")
      .send({ sid: 222, month: 1 });

    expect(res.statusCode).toBe(200);
  });

  test("should update literature data", async () => {
    const res = await request(app)
      .put("/lit")
      .send({
        english: 5,
        hindi: 4,
        marathi: 3,
        sid: 222
      });

    expect(res.statusCode).toBe(200);
  });
});
