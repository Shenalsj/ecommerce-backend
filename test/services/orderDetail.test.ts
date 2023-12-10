import OrderDetailService from "../../services/orderDetailService";
import userService from "../../services/userService";
import orderService from "../../services/orderService";
import categoryService from "../../services/categoryService";
import connect, { MongoHelper } from "../db-helper";
import productsService from "../../services/productsService";

describe("OrderDetail controller", () => {
  let mongoHelper: MongoHelper;
  let userId: string;
  let orderId: string;
  let categoryId: string;
  let productId: string;

  beforeAll(async () => {
    mongoHelper = await connect();
    const usrObj: any = {
      name: "Test cat",
      email: "testcat@testcat.com",
      password: "1234",
    };
    const user: any = await userService.createOne(usrObj);
    userId = user._id;
    const orderObj: any = {
      userId: userId,
      date: "2011-10-05T14:48:00.000Z",
      totalAmount: 100,
    };
    const order: any = await orderService.createOne(orderObj);
    orderId = order._id;
    const categoryObj: any = {
      name: " Test cat",
    };
    const category: any = await categoryService.createOne(categoryObj);
    categoryId = category._id;
    const productObj: any = {
      name: " Test cat",
      description: "Animal",
      price: 10.2,
      image: "google.com",
    };
    const product: any = await productsService.createOne(
      productObj,
      categoryId
    );
    productId = product._id;
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  async function createOrderDetail() {
    const orderDetail: any = {
      orderId: orderId,
      productId: productId,
      quantity: 120,
      priceAtPurchase: 200,
    };
    const newOrderDetail = await OrderDetailService.createOne(orderDetail);

    expect(newOrderDetail).toHaveProperty("_id");
    expect(newOrderDetail.quantity).toEqual(120);
    expect(newOrderDetail.priceAtPurchase).toEqual(200);
    return newOrderDetail;
  }

  it("should create a new orderDetail", async () => {
    await createOrderDetail();
  });

  it("should get one orderDetail", async () => {
    const orderDetail = await createOrderDetail();
    const id = orderDetail._id.toString();
    const fetchedOrderDetail = await OrderDetailService.findone(id);
    if (fetchedOrderDetail) {
      const newId = fetchedOrderDetail._id.toString();
      expect(newId).toBe(id);
    }
  });

  it("should update a new orderDetail", async () => {
    const orderDetail = await createOrderDetail();

    const updatedorderDetail: any = {
      quantity: 130,
    };
    const id = orderDetail._id.toString();
    const newOrderDetail = await OrderDetailService.findOneAndUpdate(
      id,
      updatedorderDetail
    );
    if (newOrderDetail) {
      expect(newOrderDetail).toHaveProperty("_id");
      expect(newOrderDetail.quantity).toEqual(130);
    }
  });

  it("should delete a order", async () => {
    const orderDetail = await createOrderDetail();
    const id = orderDetail._id.toString();
    const newOrderDetail = await OrderDetailService.findOneAndDelete(id);
    if (newOrderDetail) {
      expect(newOrderDetail).toHaveProperty("_id");
      expect(newOrderDetail.quantity).toEqual(120);
    }
  });
});
