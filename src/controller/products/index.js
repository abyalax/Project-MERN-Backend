import { Product } from "../../models/schema/product.js";
import { responseAPI, responseData, responseInternalServerError } from "../../utils/response.js";
import queryString from "query-string";

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

export const getProductsByFilter = async (req, res) => {
    const query = queryString.parseUrl(req.url).query
    if (!query) return responseAPI(res, false, 404, "Query not found");

    const store = query.store;
    const category = query.category;

    if (store !== undefined) {
        try {
            const response = await Product.find({ nameStore: `${store}` });
            if (response.length === 0) return responseAPI(res, false, 404, "Products empty");
            return responseData(res, response);
        } catch (error) {
            console.error('Error fetching products:', error);
            return responseInternalServerError(res);
        }
    }

    if (category !== undefined) {
        try {
            const response = await Product.find({ category: `${category}` });
            if (response.length === 0) return responseAPI(res, false, 404, "Products empty");
            return responseData(res, response);
        } catch (error) {
            console.error('Error fetching products:', error);
            return responseInternalServerError(res);
        }
    }
    return responseAPI(res, false, 404, "Query not allowed");

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