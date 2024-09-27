
const responseAPI = (res, status, statusCode, message, data) => {
    return res.status(statusCode).json({
        status,
        statusCode,
        message,
        data
    })
}

const responseData = (res, data) => {
    return responseAPI(res, true, 200, 'success', data)
}

const responseMessage = (res, message) => {
    return responseAPI(res, true, 200, message)
}

const responseSuccess = (res) => {
    return responseAPI(res, true, 200, 'success')
}

const responseFailed = (res) => {
    return responseAPI(res, false, 400, 'failed')
}

const responseNotFound = (res) => {
    return responseAPI(res, false, 404, 'not found')
}

const responseDenied = (res) => {
    return responseAPI(res, false, 403, 'denied')
}

const responseMethodNotAllowed = (res) => {
    return responseAPI(res, false, 405, 'method not allowed')
}

const responseUnauthorized = (res) => {
    return responseAPI(res, false, 401, 'unauthorized')
}

const responseUnauthenticated = (res) => {
    return responseAPI(res, false, 401, 'unauthenticated')
}

const responseInternalServerError = (res) => {
    return responseAPI(res, false, 500, 'internal server error')
}

export {
    responseData, responseSuccess, responseNotFound, responseFailed,
    responseDenied, responseMethodNotAllowed, responseUnauthorized,
    responseUnauthenticated, responseInternalServerError, responseMessage
}
