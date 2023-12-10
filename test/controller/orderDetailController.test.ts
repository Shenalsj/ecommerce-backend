import request from "supertest";

import app from "../../";
import connect, { MongoHelper } from "../db-helper";

const BASE_URL = "/api/v1";
const ORDERDETAILS_URL = BASE_URL + "/orderDetails";
const USERS_URL = BASE_URL + "/users";
const ORDERS_URL = BASE_URL + "/orders";
const CATEGORIES_URL = BASE_URL + "/categories";
const PRODUCTS_URL = BASE_URL + "/products";

describe("OrderDetail controller", () => {
  let mongoHelper: MongoHelper;
  let userId: string;
  let orderId: string;
  let categoryId: string;
  let productId: string;

  beforeAll(async () => {
    mongoHelper = await connect();
    // create user
    // create order
    // create category
    // create product
    const userResponse = await request(app).post(USERS_URL).send({
      name: "Test cat",
      email: "test@g.com",
      password: "hello",
    });
    expect(userResponse.statusCode).toBe(201);
    userId = userResponse.body.data._id;
    const orderResponse = await request(app).post(ORDERS_URL).send({
      userId: userId,
      date: "2011-10-05T14:48:00.000Z",
      totalAmount: 100,
    });
    expect(orderResponse.statusCode).toBe(201);
    orderId = orderResponse.body.data._id;
    const categoryResponse = await request(app).post(CATEGORIES_URL).send({
      name: " Test cat",
    });
    expect(categoryResponse.statusCode).toBe(201);
    categoryId = categoryResponse.body.data._id;
    const productResponse = await request(app).post(PRODUCTS_URL).send({
      name: " Test cat",
      description: "Animal",
      price: 10.2,
      image: "google.com",
      categoryId: categoryId,
    });
    expect(productResponse.statusCode).toBe(201);
    productId = productResponse.body.product._id;
  }, 60000);

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  async function createOrderDetail() {
    const response = await request(app).post(ORDERDETAILS_URL).send({
      orderId: orderId,
      productId: productId,
      quantity: 230,
      priceAtPurchase: 200,
    });
    expect(response.statusCode).toBe(201);
    return response;
  }

  it("Should create a orderDetail", async () => {
    // no orders
    // create orders
    // get and check orders
    await createOrderDetail();

    //const ordersResponse = await request(app).get(ORDERS_URL);
    //expect(ordersResponse.body.data.length).toBe(1);
  });

  it("should get the orderDetail", async () => {
    // get a category
    const response = await createOrderDetail();
    const orderDetailId = response.body.data._id;
    const singleResponse = await request(app).get(
      ORDERDETAILS_URL + "/" + orderDetailId
    );
    expect(singleResponse.body.data._id).toEqual(orderDetailId);
  });

  it("should update the orderDetail", async () => {
    // update a category
    // create order
    // update
    // get and check
    const response = await createOrderDetail();
    const orderDetailId = response.body.data._id;
    const putResponse = await request(app)
      .put(ORDERDETAILS_URL + "/" + orderDetailId)
      .send({
        orderId: orderId,
        productId: productId,
        quantity: 120,
        priceAtPurchase: 130,
      });

    expect(putResponse.body.data.quantity).toEqual(120);
    expect(putResponse.body.data.priceAtPurchase).toEqual(130);
  });

  it("should delete the orderDetail", async () => {
    // create orderDetail
    // delete orderDetail
    // get and checkDetail
    const response = await createOrderDetail();
    const orderDetailId = response.body.data._id;
    const deleteResponse = await request(app).delete(
      ORDERDETAILS_URL + "/" + orderDetailId
    );
    expect(deleteResponse.body.data._id).toEqual(orderDetailId);
  });
});
