import { Endereco } from "./endereco.model";
import { Usuario } from "./usuario.model";

export interface CadastroUsuario {
  usuario: Usuario;
  endereco?: Endereco;
}
