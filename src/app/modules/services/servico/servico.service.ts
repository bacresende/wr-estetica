import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { environment } from "../../../../environments/environment";
import { ServicoRepresentation } from "../../models/servico.model";

@Injectable({
  providedIn: "root",
})
export class ServicoService {
  private apiUrl = environment.apiUrl;

  private headers = new HttpHeaders({
    "Content-Type": "application/json",
    "X-Parse-Application-Id": environment.appId,
    "X-Parse-REST-API-Key": environment.apiKey,
  });

  constructor(private httpClient: HttpClient) {}

  public obterServicos(): Observable<Array<ServicoRepresentation>> {
    return this.httpClient
      .post<Array<ServicoRepresentation>>(`${this.apiUrl}/obter-servicos`, null, {
        headers: this.headers,
      })
      .pipe(
        map((resultServicos: any) => {
          return resultServicos.result;
        }),
        catchError((e) => {
          let msg = e.error.error;

          return throwError(() => new Error(msg));
        })
      );
  }
}