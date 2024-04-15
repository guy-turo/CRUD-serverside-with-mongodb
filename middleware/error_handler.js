const { CustomAPIError } = require('../error/custom_error');
const errorHandlerMiddleWare = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message })
    }
    return res.status(500).json({ err: "Something went wrong, try again later " })
}

module.exports = errorHandlerMiddleWare