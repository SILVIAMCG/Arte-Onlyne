//ESTE MIDDLEWARE ES PARA MANEJAR ERRORES

const notFound = (req, res, next) => {
    const error = new Error(`No encontrado - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
    
    //si el error viene de ID
    if(err.name === 'CastError' && err.kind === 'ObjectId'){
        message = 'ID no encontrado';
        statusCode = 404;
    }

    res.status(statusCode).json({
        message: message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
};

export {notFound, errorHandler};