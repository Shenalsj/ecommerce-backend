import request from "supertest";


import OrderService from "../../services/orderService";
import userService from "../../services/userService";

import connect, { MongoHelper } from "../db-helper";
import OrderRepo from "../../models/Order";



describe("Order controller", () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = await connect(); 
  });

  afterEach(async () => {
    await mongoHelper.clearDatabase();
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  it("should create a new order", async () => {

    const usrObj:any = {
        _id: "655e1356be9cf967bdead01f", name: "Test cat" , email:"testcat@testcat.com", password: "1234"
     };
    const user:any = await userService.createOne(usrObj);
    const order: any = {
      _id: "655e1356be9cf967bdead01f",
      userId: "655e1356be9cf967bdead01f",
      totalAmount: 500,
    };
    const newOrder = await OrderService.createOne(order);

    expect(newOrder).toHaveProperty("_id");
    expect(newOrder.totalAmount).toEqual(500);
  });


  it("should update a new order", async () => {

    const usrObj:any = {
        _id: "655e1356be9cf967bdead01f", name: "Test cat" , email:"testcat@testcat.com", password: "1234"
     };
    const user:any = await userService.createOne(usrObj);
    const order: any = {
      _id: "655e1356be9cf967bdead01f",
      userId: "655e1356be9cf967bdead01f",
      totalAmount: 500,
    };

    await OrderService.createOne(order);

    const updatedorder: any = {
        _id: "655e1356be9cf967bdead01f",
        userId: "655e1356be9cf967bdead01f",
        totalAmount: 300,
      };

    const newOrder = await OrderService.updateOne("655e1356be9cf967bdead01f", updatedorder);
    if(newOrder){
    expect(newOrder).toHaveProperty("_id");
    expect(newOrder.totalAmount).toEqual(300);
    }
  })


  it("should delete a order", async () => {

    const usrObj:any = {
        _id: "655e1356be9cf967bdead01f", name: "Test cat" , email:"testcat@testcat.com", password: "1234"
     };
    const user:any = await userService.createOne(usrObj);
    const order: any = {
      _id: "655e1356be9cf967bdead01f",
      userId: "655e1356be9cf967bdead01f",
      totalAmount: 400,
    };

    await OrderService.createOne(order);

    const newOrder = await OrderService.deleteOne("655e1356be9cf967bdead01f");
    if(newOrder){
    expect(newOrder).toHaveProperty("_id");
    expect(newOrder.totalAmount).toEqual(400);
    }
  })

});