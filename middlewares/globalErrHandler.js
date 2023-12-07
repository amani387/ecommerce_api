export const globalerrhandler=(err,req,res,next)=>{
    //stack
    //message
    const stack=err?.stack;
    const statusCode=err?.statusCode ? err?.statusCode : 500;
    const message=err?.message;

    res.status(statusCode).json({
        stack,   
        message,
    });
}
export const notFound =(req,res,next)=>{
    const err=new Error(`Route ${req.originalUrl} not Found `);
    next(err)
}