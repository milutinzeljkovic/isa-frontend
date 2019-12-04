import axios from 'axios';
import browserHistory from '../history';
const baseDomain = 'http://localhost:8000';
const baseURL = `${baseDomain}/api`;


class Service {
    constructor(){
        this.client = axios.create({
            baseURL
        })
        this.setInterceptor();
        this.setResponseInterceptor();
    }
    setInterceptor = () => {
        this.client.interceptors.request.use(config => {        
        const token = window.localStorage.getItem("token");
    
        if (!!token) {
            Object.assign(config.headers, {
                Authorization: `Bearer ${token}`
            });
        }

        return config;
        });
      };
    setResponseInterceptor = () => {
        this.client.interceptors.response.use(function (response) {

            return response;
          }, function (error) {

            console.log(error.response.data.status);
            if(error.response.data.status === 'Authorization Token not found'){
                browserHistory.push('/login');
                return Promise.reject(error);
            }else if(error.response.data.status === 'Token is Expired'){
                console.log('istekao token');
                const token = window.localStorage.getItem("token");

                let config = {
                    headers: {
                      Authorization: `bearer ${token}`,
                    }
                  }
                  
                  let data = {
                    data: 'data'
                  }
                  
                  axios.post(`${baseURL}/auth/refresh/`, data, config).then((resp)=>{
                      console.log('novi token ', resp);
                      localStorage.setItem("token",resp.data.access_token);
                  })
                
            }
            return Promise.reject(error);
            
          });
    }
    
    attachHeaders(headers) {
        Object.assign(this.client.defaults.headers, headers);
    }

    detachHeader(headerKey) {
        delete this.client.defaults.headers[headerKey];
    }

    getApiClient() {
        return this.client;
    }
}

export default Service;