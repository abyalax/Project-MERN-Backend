import { responseAPI, responseData, responseInternalServerError, responseSuccess } from "../../utils/response.js";
import User from "../../models/schema/user.js";

export const addToCart = async (req, res) => {
    if (req.userId === undefined) return responseAPI(res, false, 403, "Need User ID");

    try {
        const user = await User.findById(req.userId);
        if (!user) return responseAPI(res, false, 404, "User not found");
        const { productId, quantity, price } = req.body;
        if (!productId || !quantity || !price) {
            console.log(req.body);
            return responseAPI(res, false, 400, "Invalid data");
        }
        const check = user.carts.find((cart) => (
            cart.productId.toString() === productId.toString()
        ))
        if (check) {
            check.quantity += quantity;
        } else {
            user.carts.push(req.body);
        }
        const response = await user.save();
        if (!response) return responseAPI(res, false, 400, "Failed add to cart");

        return responseData(res, response);
    } catch (error) {
        console.log(error);
        return responseInternalServerError(res);
    }
};

export const updateCart = async (req, res) => {
    if (req.userId === undefined) return responseAPI(res, false, 403, "Need User ID");
    try {
        const user = await User.findById(req.userId);
        if (!user) return responseAPI(res, false, 404, "User not found");
        const { productId, quantity, liked } = req.body.cart
        console.log(req.body);
        if (!productId || quantity === undefined || quantity < 1) {
            return responseAPI(res, false, 400, "Invalid data: productId and quantity are required");
        }
        const findCart = user.carts.find((cart) => (
            cart.productId.toString() === productId.toString()
        ));
        if (findCart) {
            findCart.quantity = quantity;
            if (liked !== undefined) {
                findCart.liked = liked;
            }
        } else {
            user.carts.push(req.body);
        }
        const response = await user.save();
        if (!response) return responseAPI(res, false, 400, "Failed to update cart");
        return responseSuccess(res)
    } catch (error) {
        console.log("Failed Update Cart: ", error);
        return responseInternalServerError(res);
    }
};

export const getCarts = async (req, res) => {
    if (req.userId === undefined) return responseAPI(res, false, 403, "Need User ID");
    try {
        const user = await User.findById(req.userId);
        if (!user) return responseAPI(res, false, 404, "User not found");
        const response = user.carts
        if (!response) return responseAPI(res, false, 400, "Failed to get cart");
        return responseData(res, response);
    } catch (error) {
        console.log(error);
        return responseInternalServerError(res);
    }
}

export const deleteCart = async (req, res) => {
    if (req.userId === undefined) return responseAPI(res, false, 403, "Need User ID, for access this routes");
    try {
        const user = await User.findById(req.userId);
        if (!user) return responseAPI(res, false, 404, "User not found");
        const { productId } = req.body;
        if (!productId) return responseAPI(res, false, 400, "Invalid data");
        const response = await User.updateOne(
            { _id: req.userId },
            { $pull: { carts: { productId: productId } } }
        )
        if (!response) return responseAPI(res, false, 400, "Failed delete cart");
        return responseSuccess(res)
    } catch (error) {
        console.log(error);
        return responseInternalServerError(res);
    }
};