const request = require("supertest");

const db = require("../models/index");
const app = require("../app");

let server, agent;

const login = async () => {
  await agent
    .post("/session")
    .send({ email: "test@user.com", password: "12345678" });
};

describe("first", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    server = app.listen(5000, () => {});
    agent = request.agent(server);
  });

  afterAll(async () => {
    await db.sequelize.close();
    server.close();
  });

  test("should first", () => {
    expect(1).toBe(1);
  });

  test("login required", async () => {
    const res = await agent.get("/home");
    expect(res.statusCode).toBe(302);
  });

  test("admin authentication page works", async () => {
    const res = await agent.get("/signup");
    expect(res.statusCode).toBe(200);
    const login = await agent.get("/login");
    expect(login.statusCode).toBe(200);
  });

  test("signup admin", async () => {
    const res = await agent.post("/users").send({
      name: "admin",
      email: "test@user.com",
      password: "12345678",
    });
    expect(res.statusCode).toBe(302);
  });

  test("create election", async () => {
    let count, newCount;
    const response = await agent.get("/election");
    count = response.body.elections.length;

    await agent.post("/election").send({
      name: "test election",
    });

    await agent.get("/election").then((data) => {
      newCount = data.body.elections.length;
    });
    expect(newCount).toBe(count + 1);
  });

  test("delete election", async () => {
    let count;
    const response = await agent.get("/election");
    count = response.body.elections.length;

    const electionID = response.body.elections[count - 1].id;

    const res = await agent.delete(`/election/${electionID}`);

    expect(res.statusCode).toBe(200);
  });

  test("signout admin", async () => {
    login();
    await agent.get("/signout");
    const res = await agent.get("/home");
    expect(res.statusCode).toBe(302);
  });
});
