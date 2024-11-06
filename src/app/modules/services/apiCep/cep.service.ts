import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

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
  private apiUrl = "https://viacep.com.br/ws";
  constructor(private readonly http: HttpClient) {}

  public getDadosCep(cep: string): Observable<CepRepresentation> {
    const apiCep = `${this.apiUrl}/${cep}/json/`;

    return this.http.get<CepRepresentation>(apiCep);
  }
}
