import { ServicoRepresentation } from "./servico.model";
import { Usuario } from "./usuario.model";

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
  metodoPagamento: 'Pix'|'Débito'|'Crédito'|'Dinheiro';
  status: 'Pago'|'Pendente'|'Estornado';
}
