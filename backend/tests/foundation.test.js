import request from "supertest";
import app from "../index.js";
import "../tests/testSetup.js";

describe("Foundation Controller Tests", () => {
  test("should add foundation data", async () => {
    const res = await request(app)
      .post("/found")
      .send({
        speaking: 4,
        learning: 5,
        writing: 3,
        physicalInvolvement: 4,
        craft: 5,
        sid: 111
      });

    expect(res.statusCode).toBe(201);
  });

  test("should get foundation data", async () => {
    const res = await request(app)
      .post("/found/f")
      .send({ sid: 111, month: 1 });

    expect(res.statusCode).toBe(200);
  });

  test("should update foundation data", async () => {
    const res = await request(app)
      .put("/found")
      .send({
        speaking: 2,
        learning: 3,
        writing: 4,
        physicalInvolvement: 3,
        craft: 4,
        sid: 111
      });

    expect(res.statusCode).toBe(200);
  });
});
