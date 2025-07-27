
//METHOD-1(USING TRY- CATCH)
/*const asyncHandler = (func)=> async(req,res,next)=> {
     try {
        await func(req,res,next)
     } catch (error) {
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
     }
}*/

//isko bolte h higher order func mtlb ek func jo callback m b ek dusra func accept krleta h
// const asyncHandler= ()=>{}
// const asyncHandler= (func) => {
// ()=>{}
//    }
// const asyncHandler= (func)=> ()=>{}



//METHOD-2
//ye wala promise ko use krke kiya h 
const asyncHandler= (requestHandler)=> {
    return (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next)).
        catch((err) => next(err))
    }
}

export {asyncHandler}