export const postApiValidation = (req, res, next) => {
    if (req.method !== 'POST') {
        return res.status(405).json({
            status: "failed",
            message: `${req.method} method not allowed on this route.`
        });
    }

    next(); // move to the next middleware or route handler
};

export const getApiValidation = (req, res, next) => {
    if (req.method !== 'GET') {
        return res.status(405).json({
            status: "failed",
            message: `${req.method} method not allowed on this route.`
        });
    }

    next(); // move to the next middleware or route handler
};