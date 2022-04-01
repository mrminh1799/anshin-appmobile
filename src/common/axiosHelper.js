import axios from "axios";
//console.log(localStorage.getItem("TokenLogin"))

//axios.defaults.headers.common['Authorization']= 'Bearer ' +localStorage.getItem("TokenLogin")
// let token = ""
// if(localStorage.getItem("userLogin")!==undefined && localStorage.getItem("userLogin")!==null){
//   token = JSON.stringify(localStorage.getItem("userLogin").accessToken);
// }

// console.log({token})



// let config = {
//   headers: {
//     Authorization: `Bearer ${token}`
//   }
// }

class axiosHelper {
  constructor() {
    const instance = axios.create();
    instance.interceptors.response.use(this.handlerSuccess, this.handlerError);
    this.instance = instance;
  }

  handlerSuccess(response) {
    return response;
  }

  handlerError(error) {
    return Promise.reject(error);
  }

  get(url) {
    return this.instance.get(url);
  }
  post(url, body) {
    return this.instance.post(url, body);
  }

  put(url, body) {
    return this.instance.put(url, body);
  }

  delete(url) {
    return this.instance.delete(url);
  }
}

export default new axiosHelper();