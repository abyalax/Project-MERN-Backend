import { responseInternalServerError, responseNotFound } from "../../utils/response.js";
import User from "../../models/schema/user.js";

const getUser = async (req, res) => {

    const { id } = req.params
    try {
        const user = await User.findById(id);
        if (!user) {
            return responseNotFound(res);
        }
        return responseData(res, user);

    } catch (err) {
        console.error(err);
        return responseInternalServerError(res)
    }
};

export { getUser }