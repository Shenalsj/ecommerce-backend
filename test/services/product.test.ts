import ProductService from "../../services/productsService";
import connect, { MongoHelper } from "../db-helper";
import ProductRepo from "../../models/Product";
import CategoryModel from "../../models/Category";

describe("Product service", () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = await connect();
  });

  beforeEach(async () => {
    await CategoryModel.create({ name: "Test Category" }); // Create test category
  });

  afterEach(async () => {
    await mongoHelper.clearDatabase();
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  it("should create a new product", async () => {
    // create new product
    const product: any = {
      _id: "655e1356be9cf967bdead01f",
      name: "Test Product",
      description: "This is a test product.",
      price: 19.99,
      image: "test-image-url.jpg",
      categoryId: "655e1356be9cf967bdead01f",
    };

    const newProduct = await ProductService.createOne(
      product,
      "655e1356be9cf967bdead01f"
    );

    expect(newProduct).toHaveProperty("name");
    expect(newProduct.name).toEqual("Test Product");
  });

  it("should return a list of products", async () => {
    // create new product
    const newProduct = new ProductRepo({
      name: "Test Product",
      description: "This is a test product.",
      price: 19.99,
      image: "https://example.com/smartphone.jpg",
      categoryId: "655e9e08106158f8d895ccbe",
    });

    await newProduct.save();

    const products = await ProductService.findAll();

    expect(products.length).toEqual(1);
    expect(products[0]).toHaveProperty("name", "Test Product");
  });

  it("should find a product by ID", async () => {
    // create new product
    const newProduct = new ProductRepo({
      name: "Test Product",
      description: "This is a test product.",
      price: 19.99,
      image: "https://example.com/smartphone.jpg",
      categoryId: "655e9e08106158f8d895ccbe",
    });

    const savedProduct = await newProduct.save();

    const foundProduct = await ProductService.findOne(savedProduct._id);

    expect(foundProduct).toHaveProperty("name", "Test Product");
  });

  it("should delete a product by ID", async () => {
    // create new product
    const newProduct = new ProductRepo({
      name: "Test Product",
      description: "This is a test product.",
      price: 19.99,
      image: "https://example.com/smartphone.jpg",
      categoryId: "655e9e08106158f8d895ccbe",
    });

    const savedProduct = await newProduct.save();

    const deletedProduct = await ProductService.deleteOne(savedProduct._id);

    expect(deletedProduct).toHaveProperty("name", "Test Product");
    expect(deletedProduct).toHaveProperty(
      "description",
      "This is a test product."
    );
    expect(deletedProduct).toHaveProperty("price", 19.99);
  });
});
