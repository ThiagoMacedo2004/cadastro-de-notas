import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotasService {
  private BASE_PATH ='http://localhost/notinhas/php_notinhas/src/controller/NotasController.php';

  constructor(
    private _http: HttpClient
  ) {}


  public salvarLote(obj: any) {
    return this._http.post(this.BASE_PATH, obj)
  }

}
