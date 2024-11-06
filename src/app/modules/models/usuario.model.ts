export interface Usuario {
  nome: string;
  email: string;
  telefone: string;
  nasc: string;
  senha: string;
  cpf: string;
  ocupacaoProfissional: string;
  funcao?: "ADM" | "CLIENTE" | "FUNC";
}
