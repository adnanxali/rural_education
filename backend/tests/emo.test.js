import request from "supertest";
import app from "../index.js";
import "../tests/testSetup.js";

describe("Emotional Controller Tests", () => {
  test("should add emotional data", async () => {
    const res = await request(app)
      .post("/emo")
      .send({
        q1: 5,
        q2: 4,
        q3: 3,
        q4: 4,
        q5: 5,
        sid: 123
      });

    expect(res.statusCode).toBe(201);
  });

  test("should get emotional data", async () => {
    const res = await request(app)
      .post("/emo")
      .send({ sid: 123 });

    expect(res.statusCode).toBe(409); // because q1..q5 missing
  });

  test("should update emotional data", async () => {
    await request(app).post("/emo").send({
      q1: 5, q2: 4, q3: 4, q4: 3, q5: 5, sid: 123
    });

    const res = await request(app)
      .put("/emo")
      .send({
        q1: 1, q2: 2, q3: 3, q4: 4, q5: 5,
        sid: 123
      });

    expect(res.statusCode).toBe(200);
  });
});
