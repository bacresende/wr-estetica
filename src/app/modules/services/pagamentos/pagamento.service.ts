import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ResponseCreateRepresentation } from '../../models/response-create.representation';

export interface PagamentoStatusCommand{
  idPagamento: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {

  private apiUrl = environment.apiUrl;

  constructor(private readonly httpClient: HttpClient) { }

  public alterarStatusPagamento(pagamentoStatusCommand: PagamentoStatusCommand): Observable<ResponseCreateRepresentation> {
    return this.httpClient
      .post<ResponseCreateRepresentation>(
        `${this.apiUrl}/alterar-status-pagamento`,
        pagamentoStatusCommand
      )
      .pipe(
        map((resultNovoAgendamento: any) => {
          return resultNovoAgendamento.result;
        })
        
      );
  }
}
