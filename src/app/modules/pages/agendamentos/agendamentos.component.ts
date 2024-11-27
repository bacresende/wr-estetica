import { CommonModule, DatePipe, Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { RatingModule } from "primeng/rating";
import { RippleModule } from "primeng/ripple";
import {
  TableModule,
  TableRowCollapseEvent,
  TableRowExpandEvent,
} from "primeng/table";
import { TagModule } from "primeng/tag";
import { ToastModule } from "primeng/toast";
import {
  AgendamentoCommand,
  AgendamentoService,
} from "../../services/agendamento-service/agendamento.service";
import { DialogModule } from "primeng/dialog";
import { InputGroupModule } from "primeng/inputgroup";
import { InputGroupAddonModule } from "primeng/inputgroupaddon";
import { InputTextModule } from "primeng/inputtext";
import { CalendarModule } from "primeng/calendar";
import { MultiSelectModule } from "primeng/multiselect";
import { InputMaskModule } from "primeng/inputmask";
import { ServicoService } from "../../services/servico/servico.service";
import { MessageService } from "primeng/api";
import { ServicoRepresentation as ServicoRepresentation } from "../../models/servico.model";
import { AgendamentoRepresentation } from "../../models/agendamento-representation.model";
import { RouterModule } from "@angular/router";
import Swal from "sweetalert2";
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from "primeng/autocomplete";
import { TooltipModule } from "primeng/tooltip";
import { UsuarioService } from "../../services/usuario/usuario.service";
import { CadastroUsuario } from "../../models/cadastro-usuario.model";
import { FieldsetModule } from "primeng/fieldset";
import { DropdownModule } from "primeng/dropdown";

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
  clienteSelecionado: CadastroUsuario | undefined;
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
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.obterAgendamentos();
    this.obterClientes();
    this.obterServicos();
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

  getStatusSeverity(status: string) {
    switch (status) {
      case "Ativo":
        return "warning";
      case "Finalizado":
        return "success";
      case "Cancelado":
        return "danger";
    }

    return "info";
  }

  showDialog(servicos: Array<ServicoRepresentation>) {
    this.dialogVisible = true;
    this.servicosAgendados = servicos;
  }

  showDialogOpcoes(agendamentoRep: AgendamentoRepresentation) {
    console.log(agendamentoRep);

    Swal.fire({
      title: "O que deseja realizar com esse agendamento?",
      showConfirmButton: false,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Atualizar",
      denyButtonText: `Excluir`,
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        //Atualizar
        Swal.fire("Atualizado!", "", "success");
      } else if (result.isDenied) {
        //Deletar
        Swal.fire("Agendamento excluído", "", "error");
      }
    });
  }

  public novoAgendamento() {
    this.visibilidadeNovoAgendamento = true;
  }

  public salvarAgendamento() {
    this.validarPreenchimentoCliente();
    if (this.formNovoAgendamento.valid) {
      console.log(this.formNovoAgendamento.value);

      //fazendo aqui
      this.configurarCommand();

      this.visibilidadeNovoAgendamento = false;
    } else {
      this.messageService.add({
        severity: "warn",
        summary: "Ops",
        detail: "Há campos em branco",
      });
    }
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
      this.clienteSelecionado = undefined;
      return;
    }

    this.formNovoAgendamento.patchValue({
      clienteSelecionado: clienteValido
    });
  }

  private configurarCommand(): AgendamentoCommand {
    const servicosRepresentation: Array<ServicoRepresentation> =
      this.formNovoAgendamento.value.servicosSelecionado;

      const idServicos = servicosRepresentation.map((servico)=> servico.id);

    const agendamentoCommand: AgendamentoCommand = {
      dataHora: this.formNovoAgendamento.value.dataAgendamento,
      idServicos: idServicos,
      pagamento: {
        metodoPagamento: this.formNovoAgendamento.value.metodoPagamento.name,
        statusPagamento: this.formNovoAgendamento.value.statusPagamento.name,
      },
      idFuncionario: localStorage.getItem("idFuncionario") ?? "",
      idCliente: this.formNovoAgendamento.value.clienteSelecionado.usuario.objectId,
    };

    return agendamentoCommand;
  }

  public voltar(): void {
    this.location.back();
  }
}
