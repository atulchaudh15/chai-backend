//ye ek custom class bnayi h hmne jo
//jo professional tareeeke s api response ko handle krti h 
class ApiResponse{
    constructor(statusCode,data,message= "Success"){
        this.statusCode= statusCode
        this.data= data
        this.message= message
        this.success= statusCode < 400
    }
}