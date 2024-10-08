import { Product } from "../../models/schema/product.js";
import { responseAPI,responseData, responseInternalServerError } from "../../utils/response.js";

export const getAllProducts = async (req, res) => {
    try {
      const response = await Product.find()
      if (!response) return responseAPI(res, false, 404, "Products empty");
      return responseData(res, response);
    } catch (error) {
      console.error('Error fetching products:', error);
      return responseInternalServerError(res)
    }
  }

export const getProductsByStore = async (req, res) => {
    try {
        const response = await Product.find({ nameStore: req.body.nameStore });
        if (!response) return responseAPI(res, false, 404, "Products empty");
        return responseData(res, response);
    } catch (error) {
        console.error('Error fetching products:', error);
        return responseInternalServerError(res)
    }
}

export const getProductsByID = async (req, res) => {
    try {
        const response = await Product.findById(req.params.id);
        if (!response) return responseAPI(res, false, 404, "Products Not Found");
        return responseData(res, response);
    } catch (error) {
        console.error('Error fetching products:', error);
        return responseInternalServerError(res)
    }
}