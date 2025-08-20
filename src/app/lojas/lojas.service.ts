import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LojasService {

  private BASE_PATH = 'http://localhost/notinhas/php_notinhas/src/controller/LojasController.php';
  constructor(
    private _http: HttpClient
  ) { }

  public getLojas() {
    return this._http.get<any>(this.BASE_PATH, {
      params: {
        acao: 'getLojas'
      }
    }).pipe(first())
  }
}
