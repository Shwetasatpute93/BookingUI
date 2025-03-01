import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  url: string = 'https://services.11sportsteam.com/SearchReport_REST/index.php';
  // url: string = 'http://localhost/SearchReport_REST/index.php';
  //url: string = 'http://localhost/gbshse_REST/index.php';
  // url:string = 'https://s.11sportsteam.com/SearchReport_REST/index.php';

 constructor(private httpClient: HttpClient) { 
   
 }
 get(endpoint: string, params?: any, reqOpts?: any) {
   if (!reqOpts) {
     reqOpts = {
       params: new HttpParams()
     };
   }
   // Support easy query params for GET requests
   if (params) {
     reqOpts.params = new HttpParams();
     for (let k in params) {
       reqOpts.params = reqOpts.params.set(k, params[k]);
     }
   }
   return this.httpClient.get(this.url + '/' + endpoint, reqOpts);
 }
 post(endpoint: string, body: any,params?: any, reqOpts?: any) {
   if (!reqOpts) {
     reqOpts = {
       params: new HttpParams(),
     };
   }
   // Support easy query params for GET requests
   if (params) {
     reqOpts.params = new HttpParams();
     for (let k in params) {
       reqOpts.params = reqOpts.params.set(k, params[k]);
     }
   }
  // console.log("Body :"+JSON.stringify(body));
        return this.httpClient.post(this.url + endpoint, body, reqOpts);
    
    }
    put(endpoint: string, body: any, reqOpts?: any) {
    return this.httpClient.put(this.url + '/' + endpoint, body, reqOpts);
    }

    delete(endpoint: string, reqOpts?: any) {
    return this.httpClient.delete(this.url + '/' + endpoint, reqOpts);
    }

    patch(endpoint: string, body: any, reqOpts?: any) {
    return this.httpClient.patch(this.url + '/' + endpoint, body, reqOpts);
    }

}

