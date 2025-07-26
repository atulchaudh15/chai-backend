//ye ek custom class bnayi h hmne jo error class ko extend krti h aur
//jo professional tareeke s api error response ko handle krti h 
class ApiError extends Error{
    constructor(
        statusCode,
        message= "Something went wrong",
        errors= [],
        stack= ""
    )
    {
      super(message)
      this.statusCode= statusCode
      this.data= null
      this.message= message
      this.success= false;
      this.errors= errors

      if(stack){
        this.stack= stack
      } else{
        Error.captureStackTrace(this, this.constructor)
      }

    }

}

export {ApiError}