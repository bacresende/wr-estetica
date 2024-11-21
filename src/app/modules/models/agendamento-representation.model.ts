import { ServicoRepresentation } from "./servico.model";

export interface AgendamentoRepresentation {
  agendamento: Agendamento;
  servicos: ServicoRepresentation[];
  cliente: Usuario;
  funcionario: Usuario;
}

export interface Agendamento {
  id: string;
  dataHora: string;
  status: string;
  pagamento: Pagamento;
}

export interface Pagamento {
  id: string;
  data: string;
  valor: number;
  metodoPagamento: string;
  status: string;
}

export interface Usuario {
  email: string;
  nome: string;
  preCadastro: boolean;
  telefone: string;
  nasc: string;
  cpf: string;
  ocupacaoProfissional: string;
  funcao: string;
  objectId: string;
}
