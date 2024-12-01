import { CommonModule, DatePipe, Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MessageService } from "primeng/api";
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from "primeng/autocomplete";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { InputGroupModule } from "primeng/inputgroup";
import { InputGroupAddonModule } from "primeng/inputgroupaddon";
import { InputMaskModule } from "primeng/inputmask";
import { InputTextModule } from "primeng/inputtext";
import { MultiSelectModule } from "primeng/multiselect";
import { RatingModule } from "primeng/rating";
import { RippleModule } from "primeng/ripple";
import {
  TableModule
} from "primeng/table";
import { TagModule } from "primeng/tag";
import { ToastModule } from "primeng/toast";
import { TooltipModule } from "primeng/tooltip";
import Swal from "sweetalert2";
import { AgendamentoRepresentation } from "../../models/agendamento-representation.model";
import { CadastroUsuario } from "../../models/cadastro-usuario.model";
import { ServicoRepresentation } from "../../models/servico.model";
import {
  AgendamentoCommand,
  AgendamentoService,
  AgendamentoStatusCommand,
} from "../../services/agendamento-service/agendamento.service";
import { ServicoService } from "../../services/servico/servico.service";
import { UsuarioService } from "../../services/usuario/usuario.service";
import { getStatusAgendamentoSeverity, getStatusPagamentoSeverity } from "../../../shared/obter-status";
import { Router } from "@angular/router";

@Component({
  selector: "app-agendamentos",
  standalone: true,
  imports: [
    ButtonModule,
    RippleModule,
    ToastModule,
    TooltipModule,
    TableModule,
    TagModule,
    RatingModule,
    CommonModule,
    FormsModule,
    DialogModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    CalendarModule,
    ReactiveFormsModule,
    MultiSelectModule,
    InputMaskModule,
    AutoCompleteModule,
    DropdownModule,
  ],
  providers: [MessageService, DatePipe],
  templateUrl: "./agendamentos.component.html",
  styleUrl: "./agendamentos.component.css",
})
export class AgendamentosComponent implements OnInit {
  agendamentosRep!: AgendamentoRepresentation[];
  servicosAgendados: Array<ServicoRepresentation> = [];
  dialogVisible: boolean = false;
  public servicos: Array<ServicoRepresentation> = [];
  public visibilidadeNovoAgendamento: boolean = false;
  clientes: Array<CadastroUsuario> | undefined;
  clientesFiltrados!: Array<CadastroUsuario>;
  formNovoAgendamento!: FormGroup;

  public metodosPagamentos = [
    { name: "Pix", code: "PIX" },
    { name: "Débito", code: "DEB" },
    { name: "Crédito", code: "CRE" },
    { name: "Dinheiro", code: "DIN" },
  ];

  public statusPagamentos = [
    { name: "Pago", code: "PAG" },
    { name: "Pendente", code: "PEN" },
    { name: "Estornado", code: "EST" },
  ];

  constructor(
    private agendamentoService: AgendamentoService,
    private servicoService: ServicoService,
    private usuarioService: UsuarioService,
    private messageService: MessageService,
    private location: Location,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.obterAgendamentos();

    this.criarFormulario();
  }

  private criarFormulario() {
    this.formNovoAgendamento = this.fb.group({
      clienteSelecionado: this.fb.control(null, [Validators.required]),
      dataAgendamento: this.fb.control(null, [Validators.required]),
      servicosSelecionado: this.fb.control(null, [Validators.required]),
      metodoPagamento: this.fb.control(null, [Validators.required]),
      statusPagamento: this.fb.control(null, [Validators.required]),
    });
  }

  filterCountry(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.clientes as any[]).length; i++) {
      let country = (this.clientes as any[])[i];
      if (
        country.usuario.nome.toLowerCase().indexOf(query.toLowerCase()) == 0
      ) {
        filtered.push(country);
      }
    }

    this.clientesFiltrados = filtered;
  }

  private obterAgendamentos() {
    this.agendamentoService.obterAgendamentos().subscribe({
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

  private obterClientes() {
    this.usuarioService.obterClientes().subscribe({
      next: (clientes) => {
        if (clientes) {
          this.clientes = clientes;
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

  private obterServicos() {
    this.servicoService.obterServicos().subscribe({
      next: (servicos) => {
        if (servicos) {
          this.servicos = servicos;
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

  public novoAgendamento() {
    this.obterClientes();
    this.obterServicos();
    this.visibilidadeNovoAgendamento = true;
  }

  public salvarAgendamento() {
    this.validarPreenchimentoCliente();
    if (this.formNovoAgendamento.valid) {
      console.log(this.formNovoAgendamento.value);

      //fazendo aqui
      const agendamentoCommand = this.configurarCommand();

      this.agendamentoService.novoAgendamento(agendamentoCommand).subscribe({
        next: (novoAgendamento) => {
          if (novoAgendamento) {
            console.log(novoAgendamento);
            this.obterAgendamentos();
            this.limparFormulario();
            this.visibilidadeNovoAgendamento = false;

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


    } else {
      this.messageService.add({
        severity: "warn",
        summary: "Ops",
        detail: "Há campos em branco",
      });
    }
  }

  private limparFormulario() {
    this.formNovoAgendamento.reset();
    this.formNovoAgendamento.markAllAsTouched();
  }

  private validarPreenchimentoCliente() {
    const { clienteSelecionado } = this.formNovoAgendamento.value;

    const usuarioRecebido =
      clienteSelecionado?.usuario?.nome ?? clienteSelecionado;
    const clienteValido = this.clientes?.find(
      (usuario) => usuario.usuario.nome === usuarioRecebido
    );

    if (!clienteValido) {
      console.log("usuário inválido");
      this.messageService.add({
        severity: "warn",
        summary: "Ops",
        detail: "Usuário inválido",
      });
    }
    this.formNovoAgendamento.get("clienteSelecionado")?.setValue(clienteValido);

  }

  private configurarCommand(): AgendamentoCommand {
    const servicosRepresentation: Array<ServicoRepresentation> =
      this.formNovoAgendamento.value.servicosSelecionado;

    const idServicos = servicosRepresentation.map((servico) => servico.id);

    const agendamentoCommand: AgendamentoCommand = {
      dataHora: this.formNovoAgendamento.value.dataAgendamento.toISOString(),
      idServicos: idServicos,
      pagamento: {
        metodoPagamento: this.formNovoAgendamento.value.metodoPagamento.name,
        statusPagamento: this.formNovoAgendamento.value.statusPagamento.name,
      },
      idFuncionario: localStorage.getItem("idFuncionario") ?? "",
      idCliente:
        this.formNovoAgendamento.value.clienteSelecionado.usuario.objectId,
    };

    return agendamentoCommand;
  }

  private alterarStatusAgendamento(idAgendamento: string, status: string) {
    const agendamentoStatusCommand: AgendamentoStatusCommand = {
      idAgendamento,
      status
    }
    this.agendamentoService.alterarStatusAgendamento(agendamentoStatusCommand).subscribe({
      next: (agendamentoRes) => {
        if (agendamentoRes) {
          this.obterAgendamentos();
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

  public verUsuario(idUsuario: string){
    this.router.navigate(['/usuario', idUsuario]);
  }

  public voltar(): void {
    this.location.back();
  }
}
