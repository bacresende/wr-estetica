import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import Swal from 'sweetalert2';
import { getStatusAgendamentoSeverity, getStatusPagamentoSeverity } from '../../../../../shared/obter-status';
import { AgendamentoRepresentation } from '../../../../models/agendamento-representation.model';
import { ServicoRepresentation } from '../../../../models/servico.model';
import { AgendamentoService, AgendamentoStatusCommand } from '../../../../services/agendamento-service/agendamento.service';

@Component({
  selector: 'app-agendamentos-usuario',
  standalone: true,
  imports: [CardModule, TableModule, RippleModule, CommonModule, TagModule, ButtonModule, DialogModule, ToastModule],
  providers: [MessageService],
  templateUrl: './agendamentos.component.html',
  styleUrl: './agendamentos.component.css'
})
export class AgendamentosUsuarioComponent implements OnInit {

  agendamentosRep!: AgendamentoRepresentation[];
  servicosAgendados: Array<ServicoRepresentation> = [];
  dialogVisible: boolean = false;

  @Input({ required: true })
  public idUsuario: string | undefined; 

    constructor(private agendamentoService: AgendamentoService, private messageService: MessageService,) { }

  ngOnInit(): void {
    this.obterAgendamentosUsuario();
  }



  public getStatusAgendamentoSeverity(status: string) {

    return getStatusAgendamentoSeverity(status);

  }

  public getStatusPagamentoSeverity(status: string) {

    return getStatusPagamentoSeverity(status);
  }

  showDialog(servicos: Array<ServicoRepresentation>) {
    this.dialogVisible = true;
    this.servicosAgendados = servicos;
  }

  showDialogOpcoes(agendamentoRep: AgendamentoRepresentation) {
    console.log(agendamentoRep);

    Swal.fire({
      title: "O que deseja realizar com esse agendamento?",
      showConfirmButton: true,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Finalizar agendamento",
      denyButtonText: `Excluir`,
      cancelButtonText: "Voltar",
    }).then((result) => {
      if (result.isConfirmed) {
        //Atualizar
        this.alterarStatusAgendamento(agendamentoRep.agendamento.id, 'Finalizado');
        Swal.fire("Agendamento Finalizado!", "", "success");
      } else if (result.isDenied) {
        //Deletar
        this.alterarStatusAgendamento(agendamentoRep.agendamento.id, 'Excluído');
        Swal.fire("Agendamento excluído!", "", "error");
      }
    });
  }

  private alterarStatusAgendamento(idAgendamento: string, status: string) {
    const agendamentoStatusCommand: AgendamentoStatusCommand = {
      idAgendamento,
      status
    }
    this.agendamentoService.alterarStatusAgendamento(agendamentoStatusCommand).subscribe({
      next: (agendamentoRes) => {
        if (agendamentoRes) {
          this.obterAgendamentosUsuario();
        }
      },
      error: (error) => {
        this.messageService.add({
          severity: "warn",
          summary: "Ops",
          detail: `${error}`,
        });
      },
    });

  }

  private obterAgendamentosUsuario() {
    this.agendamentoService.obterAgendamentosUsuario(this.idUsuario!).subscribe({
      next: (agendamentos) => {
        if (agendamentos) {
          this.agendamentosRep = agendamentos;
          console.log(this.agendamentosRep);
        }
      },
      error: (error) => {
        this.messageService.add({
          severity: "warn",
          summary: "Ops",
          detail: `${error}`,
        });
      },
    });
  }

}
