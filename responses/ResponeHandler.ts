export class ResponseHandler {
    constructor(public code: number, public status: string,  public data: string, public message?: string) {
      this.code = code
      this.status =status
      this.message = message
      this.data = data
    }
    static resourceFetched(data: string, msg?: string) {
        if(!msg){
            return new ResponseHandler(200, "Success",  data)
        }
        return new ResponseHandler(200, "Success",  data, msg)
    }
    static resourceCreated(data: string, msg?: string,) {
        if(!msg){
            return new ResponseHandler(200, "Success",  data)
        }
      return new ResponseHandler(201, "Success",  data, msg)
    }
    static resourceUpdated(data: string, msg?: string) {
        if(!msg){
            return new ResponseHandler(200, "Success",  data)
        }
        return new ResponseHandler(200, "Success", data , msg)
    }
    static resourceDeleted(data: string, msg?: string) {
        if(!msg){
            return new ResponseHandler(200, "Success",  data)
        }
        return new ResponseHandler(200, "Success", data, msg)
    }
    static internalServerError(data?: string, msg?: string) {
        if (!msg) {
          return new ResponseHandler(500, "Internal Server Error", data || "Internal Server Error");
        }
        return new ResponseHandler(500, "Internal Server Error", data || "Internal Server Error", msg);
      }
  
  }
  