import { Store } from "../../models/schema/store.js"
import User from "../../models/schema/user.js"
import { responseData, responseNotFound, responseInternalServerError } from "../../utils/response.js";

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

export { CreateStore }