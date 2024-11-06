import { catchError, map, Observable, throwError } from "rxjs";
import { CadastroUsuario } from "./../../models/cadastro-usuario.model";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  private apiUrl = environment.apiUrl;

  constructor(private readonly httpClient: HttpClient) {}

  public cadastrarUsuario(cadastroUsuario: CadastroUsuario): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "X-Parse-Application-Id": environment.appId,
      "X-Parse-REST-API-Key": environment.apiKey,
    });

    return this.httpClient
      .post<any>(`${this.apiUrl}/cadastrar-usuario`, cadastroUsuario, {
        headers,
      })
      .pipe(map((resultCadrasto)=>{
        return resultCadrasto.result;
      }), catchError((e)=>{
        
        if(e.error.error === 'Account already exists for this username.'){
          return throwError(() => new Error('Já existe um usuário com esse e-mail'));
        }
        return throwError(() => new Error(e.error.error));
        
      }));
  }

  public logarUsuario(email: string, senha: string): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "X-Parse-Application-Id": environment.appId,
      "X-Parse-REST-API-Key": environment.apiKey,
    });

    return this.httpClient
      .post<any>(`${this.apiUrl}/login`, {email, senha}, {
        headers,
      })
      .pipe(map((resultCadrasto)=>{
        return resultCadrasto.result;
      }), catchError((e)=>{
        let msg = e.error.error;
        if(e.error.error === 'Account already exists for this username.'){
          msg = 'Já existe um usuário com esse e-mail';
          
        }
        return throwError(() => new Error(msg));
        
      }));
  }
}
