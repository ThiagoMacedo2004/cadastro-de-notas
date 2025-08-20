import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DespesasService {
  private BASE_PATH = 'http://localhost/notinhas/php_notinhas/src/controller/DespesasController.php';
  constructor(
    private _http: HttpClient
  ) { }

  public getDespesas() {
    return this._http.get<any>(this.BASE_PATH, {
      params: {
        acao: 'getDespesas'
      }
    }).pipe(first())
  }
}
