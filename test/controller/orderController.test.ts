import request from "supertest";

import app from "../../";
import connect, { MongoHelper } from "../db-helper";
import { number, string } from "zod";

const BASE_URL = "/api/v1";
const ORDERS_URL = BASE_URL + "/orders";
const USERS_URL = BASE_URL + "/users";

describe("Order controller", () => {
  let mongoHelper: MongoHelper;
  let userId: string;

  beforeAll(async () => {
    mongoHelper = await connect();
    // create user
    const response = await request(app).post(USERS_URL).send({
      name: "Test cat",
      email: "test@g.com",
      password: "hello",
    });
    expect(response.statusCode).toBe(201);
    userId = response.body.data._id;
  }, 30000);

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  async function createOrder() {
    const response = await request(app).post(ORDERS_URL).send({
      userId: userId,
      date: "2011-10-05T14:48:00.000Z",
      totalAmount: 100,
    });
    expect(response.statusCode).toBe(201);
    return response;
  }

  it("Should create a order", async () => {
    // no orders
    // create orders
    // get and check orders
    await createOrder();

    //const ordersResponse = await request(app).get(ORDERS_URL);
    //expect(ordersResponse.body.data.length).toBe(1);
  });

  it("should get the order", async () => {
    // get a category
    const response = await createOrder();
    const orderId = response.body.data._id;
    const singleResponse = await request(app).get(ORDERS_URL + "/" + orderId);
    expect(singleResponse.body.data._id).toEqual(orderId);
  });

  it("should update the order", async () => {
    // update a category
    // create order
    // update
    // get and check
    const response = await createOrder();
    const orderId = response.body.data._id;
    const putResponse = await request(app)
      .put(ORDERS_URL + "/" + orderId)
      .send({
        totalAmount: 120,
      });

    expect(putResponse.body.data.totalAmount).toEqual(120);
  });

  it("should delete the order", async () => {
    // create order
    // delete order
    // get and check
    const response = await createOrder();
    const orderId = response.body.data._id;
    const deleteResponse = await request(app).delete(
      ORDERS_URL + "/" + orderId
    );
    expect(deleteResponse.body.data._id).toEqual(orderId);
  });
});
