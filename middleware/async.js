const asyncWrapper = (fun) => {
    return async(req, res, next) => {
        try {
            await fun(req, res)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = asyncWrapper