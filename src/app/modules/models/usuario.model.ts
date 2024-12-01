export interface Usuario {
  nome: string;
  email: string;
  telefone: string;
  nasc: string;
  senha: string;
  cpf: string;
  ocupacaoProfissional: string;
  preCadastro?: boolean;
  funcao?: "ADM" | "CLIENTE" | "FUNC";
  objectId?: string;
}
