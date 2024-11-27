import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { environment } from "../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AgendamentoRepresentation } from "../../models/agendamento-representation.model";

export interface AgendamentoCommand {
  dataHora: string;
  idServicos: Array<String>;
  pagamento: {
    metodoPagamento: string;
    statusPagamento: string;
  };
  idFuncionario: string;
  idCliente: string;
}

@Injectable({
  providedIn: "root",
})
export class AgendamentoService {
  private apiUrl = environment.apiUrl;

  private headers = new HttpHeaders({
    "Content-Type": "application/json",
    "X-Parse-Application-Id": environment.appId,
    "X-Parse-REST-API-Key": environment.apiKey,
  });

  constructor(private httpClient: HttpClient) {}

  public obterAgendamentos(): Observable<Array<AgendamentoRepresentation>> {
    return this.httpClient
      .post<Array<AgendamentoRepresentation>>(
        `${this.apiUrl}/obter-agendamentos`,
        null,
        {
          headers: this.headers,
        }
      )
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
