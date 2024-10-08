import { Store } from "../../models/schema/store.js"
import User from "../../models/schema/user.js"
import { Product } from "../../models/schema/product.js"
import { responseData, responseNotFound, responseInternalServerError, responseAPI, responseUnauthenticated } from "../../utils/response.js";

const CreateStore = async (req, res) => {
    try {
        const response = await Store.create({
            storeId: req.userId,
            ...req.body
        })
        if (!response) {
            return responseNotFound(res);
        }
        await User.findByIdAndUpdate(req.userId, { $addToSet: { stores: response._id } });
        console.log(response);
        return responseData(res, response);

    } catch (err) {
        console.error(err);
        return responseInternalServerError(res)
    }
};

const CreateProduct = async (req, res) => {
    if (!req.userId) return responseUnauthenticated(res);
    if (!req.body.nameStore) return responseAPI(res, false, 400, "Store name is required");
    try {
      const store = await Store.findOne({ store: req.body.nameStore });
      if (!store) return responseAPI(res, false, 404, "Store not found");
      const productData = {
        nameStore: req.body.nameStore,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        etalase: req.body.etalase,
        stock: req.body.stock,
        condition: req.body.condition,
        minOrder: req.body.minOrder,
        image: req.body.image,
      };
      const product = await Product.create(productData);
      if (!product) return responseAPI(res, false, 400, "Failed to create product");
      store.products.push({ProductID: product._id});
      const savedStore = await store.save();
      if (!savedStore) return responseAPI(res, false, 400, "Failed to save store with new product");
  
      // Kembalikan respon sukses dengan data produk
      return responseData(res, product);
      
    } catch (error) {
      console.log(error);
      return responseInternalServerError(res);
    }
  };
  


export { CreateStore, CreateProduct }