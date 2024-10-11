import { responseAPI, responseData, responseInternalServerError, responseNotFound } from "../../utils/response.js";
import { Store } from "../../models/schema/store.js";
import User from "../../models/schema/user.js";

const getUserStores = async (req, res) => {
  try {
    const response = await Store.find({ storeId: req.userId });
    if (!response) return responseNotFound(res);
    console.log("ID user: ", req.userId);

    console.log("Store own by user: ", response);
    return responseData(res, response);
  } catch (error) {
    console.error('Error fetching user stores:', error);
  }
}

const getUserStoresByID = async (req, res) => {
  const { storeId } = req.params
  console.log("ID Store", storeId);
  console.log("ID user: ", req.userId);

  try {
    if (req.userId === undefined) return responseAPI(res, false, 403 ,"Need User ID");
    if(storeId === undefined) return responseAPI(res, false, 404 ,"Need Store ID"); 
    const response = await Store.findById(storeId);
    if (!response) return responseAPI(res, false, 404, "Store not found");
    console.log("Store own by user: ", response);
    return responseData(res, response);
  } catch (error) {
    console.error('Error fetching user stores:', error);
  }
}



export { getUserStores, getUserStoresByID }