import request from "supertest";
import app from "../index.js";
import "../tests/testSetup.js";

describe("Numerical Controller Tests", () => {
  test("should add numerical data", async () => {
    const res = await request(app)
      .post("/num")
      .send({
        maths: 20,
        sid: 333
      });

    expect(res.statusCode).toBe(201);
  });

  test("should get numerical data", async () => {
    const res = await request(app)
      .post("/num/n")
      .send({ sid: 333, month: 1 });

    expect(res.statusCode).toBe(200);
  });

  test("should update numerical data", async () => {
    const res = await request(app)
      .put("/num")
      .send({ maths: 25, sid: 333 });

    expect(res.statusCode).toBe(200);
  });
});
