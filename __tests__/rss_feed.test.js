const { expect } = require("chai");
const request = require("supertest");
const { startServer, stopServer, app } = require("../app");

describe("GET /api/rss_feed", () => {
  it("should return a 200 OK status code and the list of RSS feed data", async () => {
    const res = await request(app).get("/api/rss_feed");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body[0]).toHaveProperty("title");
  });
});
