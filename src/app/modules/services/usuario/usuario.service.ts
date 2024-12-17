import { catchError, map, Observable, throwError } from "rxjs";
import { CadastroUsuario } from "./../../models/cadastro-usuario.model";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { ResponseCreateRepresentation } from "../../models/response-create.representation";

export interface CadastroUsuarioParcialCommand {
  nome: string;
	email: string;
	telefone: string;
	cpf: string;
}

export interface UsuarioFuncaoCommand{
  idUsuario: string;
  funcao: string;
}

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  private apiUrl = environment.apiUrl;



  constructor(private readonly httpClient: HttpClient) { }

  public cadastrarUsuario(cadastroUsuario: CadastroUsuario): Observable<any> {
    return this.httpClient
      .post<any>(`${this.apiUrl}/cadastrar-usuario`, cadastroUsuario)
      .pipe(
        map((resultCadrasto) => {
          return resultCadrasto.result;
        })
      );
  }

  public cadastrarUsuarioParcial(cadastroUsuario: CadastroUsuarioParcialCommand): Observable<ResponseCreateRepresentation> {
    return this.httpClient
      .post<any>(`${this.apiUrl}/cadastrar-usuario-parcial`, cadastroUsuario)
      .pipe(
        map((resultCadrasto) => {
          return resultCadrasto.result;
        })
      );
  }

  public logarUsuario(email: string, senha: string): Observable<any> {
    return this.httpClient
      .post<any>(
        `${this.apiUrl}/login`,
        { email, senha }

      )
      .pipe(
        map((resultCadrasto) => {
          return resultCadrasto.result;
        }),
        catchError((e) => {
          let msg = e.error.error;
          if (e.error.error === "Account already exists for this username.") {
            msg = "Já existe um usuário com esse e-mail";
          }
          return throwError(() => new Error(msg));
        })
      );
  }

  public alterarFuncaoUsuario(usuarioFuncaoCommand: UsuarioFuncaoCommand): Observable<ResponseCreateRepresentation> {
    return this.httpClient
      .post<ResponseCreateRepresentation>(
        `${this.apiUrl}/alterar-funcao-usuario`,
        usuarioFuncaoCommand
      )
      .pipe(
        map((resultNovoAgendamento: any) => {
          return resultNovoAgendamento.result;
        })
        
      );
  }

  public obterUsuario(idUsuario: string): Observable<CadastroUsuario> {
    return this.httpClient
      .post<CadastroUsuario>(
        `${this.apiUrl}/obter-usuario`,
        { idUsuario }
      )
      .pipe(
        map((resultUsuario: any) => {
          return resultUsuario.result;
        }),
        catchError((e) => {
          let msg = e.error.error;

          return throwError(() => new Error(msg));
        })
      );
  }

  public obterUsuarios(): Observable<Array<CadastroUsuario>> {
    return this.httpClient
      .post<any>(
        `${this.apiUrl}/obter-usuarios`,
        null
      )
      .pipe(
        map((resultUsuarios: any) => {
          return resultUsuarios.result;
        }),
        catchError((e) => {
          let msg = e.error.error;

          return throwError(() => new Error(msg));
        })
      );
  }

  public obterClientes(): Observable<Array<CadastroUsuario>> {
    return this.httpClient
      .post<Array<CadastroUsuario>>(
        `${this.apiUrl}/obter-clientes`,
        null
      )
      .pipe(
        map((resultUsuario: any) => {
          return resultUsuario.result;
        }),
        catchError((e) => {
          let msg = e.error.error;

          return throwError(() => new Error(msg));
        })
      );
  }

  public obterUsuarioAndEndereco(idUsuario: string): Observable<CadastroUsuario> {
    return this.httpClient
      .post<CadastroUsuario>(
        `${this.apiUrl}/obter-usuario-e-endereco`,
        { idUsuario }
      )
      .pipe(
        map((resultUsuarioAndEndereco: any) => {
          return resultUsuarioAndEndereco.result;
        }),
        catchError((e) => {
          let msg = e.error.error;

          return throwError(() => new Error(msg));
        })
      );
  }
}
