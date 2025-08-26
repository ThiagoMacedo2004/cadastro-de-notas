import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotasService {
  private BASE_PATH ='http://localhost/notinhas/php_notinhas/src/controller/NotasController.php';

  constructor(
    private _http: HttpClient
  ) {}


  public salvarLote(obj: any) {
    return this._http.post(this.BASE_PATH, obj).pipe(first())
  }

  public getLoteNotas() {
    return this._http.get(this.BASE_PATH, {
      params: {
        acao: 'getLoteNotas'
      }
    }).pipe(first())
  }

  public deletarNotas(idLote: any) {
    return this._http.delete(this.BASE_PATH, {
      params: {acao: 'deletarNotas', id: idLote }
    }).pipe(first())
  }

  public detalhesLote(idLote: any) {
    return this._http.get(this.BASE_PATH, {
      params: {
        acao: 'detalhesLote',
        idLote: idLote
      }
    }).pipe(first())
  }

  public salvarDatas(obj: any) {
    return this._http.post(this.BASE_PATH, obj).pipe(first())
  }

  public excel(obj: any) {
    return this._http.post(this.BASE_PATH, obj, {
      responseType: 'blob' as 'json'
    }).pipe(first())
  }

  public pdfRelatorio(obj: any) {
    return this._http.post(this.BASE_PATH, obj, {
      responseType: 'blob' as 'json'
    }).pipe(first())
  }

}
