import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { map, filter, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  

  public getEmp(){
    return this.httpClient.get(`http://dummy.restapiexample.com/api/v1/employees`);
  }
  public getOneEmp(id){
    return this.httpClient.get(`http://dummy.restapiexample.com/api/v1/employees`+id);
  }
  public addEmp(newEmp){
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.httpClient.post('http://dummy.restapiexample.com/api/v1/create',newEmp,{headers:headers}).pipe(map(res=>res));
  }
  public deleteEmp(id){
    return this.httpClient.delete('http://dummy.restapiexample.com/api/v1/delete/'+id).pipe(map(res=>res));
  }
  public updateEmp(newEmp){
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.httpClient.put('http://dummy.restapiexample.com/api/v1/update/'+newEmp.id,newEmp,{headers:headers}).pipe(map(res=>res));
  }

}
