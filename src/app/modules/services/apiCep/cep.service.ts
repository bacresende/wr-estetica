import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

export interface CepRepresentation {
  cep: string;
  logradouro: string;
  complemento: string;
  unidade: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

@Injectable({
  providedIn: "root",
})
export class CepService {
  private apiUrl = environment.apiUrl;

  constructor(private readonly httpClient: HttpClient) {}

  public getDadosCep(cep: string): Observable<CepRepresentation> {
    return this.httpClient
      .post<CepRepresentation>(
        `${this.apiUrl}/cep-api`,
        {cep}
      )
      .pipe(
        map((cepResponse: any) => {
          return cepResponse.result;
        })
      );
  }




  // private apiUrl = "https://viacep.com.br/ws";
  // constructor(private readonly http: HttpClient) {}

  // public getDadosCep(cep: string): Observable<CepRepresentation> {
  //   const apiCep = `${this.apiUrl}/${cep}/json/`;

  //   return this.http.get<CepRepresentation>(apiCep);
  // }
}
