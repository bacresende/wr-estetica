import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { environment } from "../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AgendamentoRepresentation } from "../../models/agendamento-representation.model";
import { AgendamentoReponseRepresentation } from "../../models/novo-agendamento.representation";

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

export interface AgendamentoStatusCommand{
  idAgendamento: string;
  status: string;
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

  constructor(private httpClient: HttpClient) { }

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
        map((resultAgendamentos: any) => {
          return resultAgendamentos.result;
        }),
        catchError((e) => {
          let msg = e.error.error;

          return throwError(() => new Error(msg));
        })
      );
  }

  public novoAgendamento(agendamentoCommand: AgendamentoCommand): Observable<AgendamentoReponseRepresentation> {
    return this.httpClient
      .post<AgendamentoReponseRepresentation>(
        `${this.apiUrl}/novo-agendamento`,
        agendamentoCommand,
        {
          headers: this.headers,
        }
      )
      .pipe(
        map((resultNovoAgendamento: any) => {
          return resultNovoAgendamento.result;
        }),
        catchError((e) => {
          let msg = e.error.error;

          return throwError(() => new Error(msg));
        })
      );
  }

  public alterarStatusAgendamento(agendamentoStatusCommand: AgendamentoStatusCommand): Observable<AgendamentoReponseRepresentation> {
    return this.httpClient
      .post<AgendamentoReponseRepresentation>(
        `${this.apiUrl}/alterar-status-agendamento`,
        agendamentoStatusCommand,
        {
          headers: this.headers,
        }
      )
      .pipe(
        map((resultNovoAgendamento: any) => {
          return resultNovoAgendamento.result;
        }),
        catchError((e) => {
          let msg = e.error.error;

          return throwError(() => new Error(msg));
        })
      );
  }
}
