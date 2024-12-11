import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { CardModule } from "primeng/card";
import { FieldsetModule } from "primeng/fieldset";
import { InputGroupModule } from "primeng/inputgroup";
import { InputGroupAddonModule } from "primeng/inputgroupaddon";
import { InputMaskModule } from "primeng/inputmask";
import { InputTextModule } from "primeng/inputtext";
import { PanelModule } from "primeng/panel";
import { PasswordModule } from "primeng/password";
import { RippleModule } from "primeng/ripple";
import { ToastModule } from "primeng/toast";
import { TooltipModule } from "primeng/tooltip";
import { CadastroUsuario } from "../../models/cadastro-usuario.model";
import { DatePipe, Location } from "@angular/common";
import { UsuarioService } from "../../services/usuario/usuario.service";
import { CepService } from "../../services/apiCep/cep.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-cadastrar-usuario",
  standalone: true,
  imports: [
    ButtonModule,
    FormsModule,
    InputMaskModule,
    CardModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    PasswordModule,
    TooltipModule,
    FieldsetModule,
    ReactiveFormsModule,
    CalendarModule,
    PanelModule,
    ToastModule,
    RippleModule,
  ],
  providers: [MessageService, DatePipe],
  templateUrl: "./cadastrar-usuario.component.html",
  styleUrl: "./cadastrar-usuario.component.css",
})
export class CadastrarUsuarioComponent implements OnInit {
  public formularioCadastro!: FormGroup;

  public showPassword: boolean = false;
  public ptbrConfiguracao: any;

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly messageService: MessageService,
    // private readonly datePipe: DatePipe,
    private readonly usuarioService: UsuarioService,
    private readonly cepService: CepService,
    private readonly location: Location
  ) {}

  ngOnInit(): void {
    this.criarFormulario();

    this.configurarLocaleData();
  }

  private criarFormulario(): void {
    this.formularioCadastro = this.fb.group({
      nome: this.fb.control("", [Validators.required]),
      cpf: this.fb.control("", [Validators.required]),
      ocupacao: this.fb.control("", [Validators.required]),
      dataNasc: this.fb.control("", [Validators.required]),
      email: this.fb.control("", [Validators.required, Validators.email]),
      senha: this.fb.control("", [Validators.required]),
      telefone: this.fb.control("", [Validators.required]),

      cep: this.fb.control("", [Validators.required]),
      endereco: this.fb.control("", [Validators.required]),
      numeroResidencia: this.fb.control("", [Validators.required]),
      bairro: this.fb.control("", [Validators.required]),
      complemento: this.fb.control("", [Validators.required]),
      cidade: this.fb.control("", [Validators.required]),
      estado: this.fb.control("", [Validators.required]),
      pais: this.fb.control(null, [Validators.required]),
    });
  }

  public configurarLocaleData(): void {
    this.ptbrConfiguracao = {
      firstDayOfWeek: 1,
      dayNames: [
        "Domingo",
        "Segunda",
        "Terça",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sábado",
      ],
      dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
      dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
      monthNames: [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ],
      monthNamesShort: [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
      ],
      today: "Hoje",
      clear: "Limpar",
    };
  }

  public fazerCadastro() {
    if (this.formularioCadastro.valid) {
      const cadastroUsuario: CadastroUsuario = this.setarObjetoUsuario();
      this.usuarioService.cadastrarUsuario(cadastroUsuario).subscribe({
        next: (retorno) => {
          console.log(retorno);
          if (retorno) {
            Swal.fire({
              title: "Ops!",
              text: "Você ainda não tem acesso a nossa tela",
              icon: "error"
            });
            this.location.back();
          }
        },
        error: (error) => {
          this.messageService.add({
            severity: "warn",
            summary: "Ops",
            detail: error,
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

  public setarObjetoUsuario(): CadastroUsuario {
    // const dataNascimento = this.datePipe.transform(
    //   this.formularioCadastro.value.dataNasc,
    //   "dd/MM/yyyy"
    // );


    return {
      usuario: {
        nome: this.formularioCadastro.value.nome,
        email: this.formularioCadastro.value.email,
        telefone: this.formularioCadastro.value.telefone,
        nasc: this.formularioCadastro.value.dataNasc,
        senha: this.formularioCadastro.value.senha,
        cpf: this.formularioCadastro.value.cpf,
        ocupacaoProfissional: this.formularioCadastro.value.ocupacao,
      },
      endereco: {
        cep: this.formularioCadastro.value.cep,
        endereco: this.formularioCadastro.value.endereco,
        numeroResidencia: this.formularioCadastro.value.numeroResidencia,
        bairro: this.formularioCadastro.value.bairro,
        complemento: this.formularioCadastro.value.complemento,
        cidade: this.formularioCadastro.value.cidade,
        estado: this.formularioCadastro.value.estado,
        pais: this.formularioCadastro.value.pais,
      },
    };
  }

  public irParaHome() {
    this.router.navigate(["/inicio"]);
  }

  public fazerLogin() {
    this.router.navigate(["/"]);
  }

  public recuperarSenha() {
    console.log("senha");
  }

  public mostrarSenha() {
    this.showPassword = !this.showPassword;
  }

  public buscarCep(cep: string) {
    cep = cep.replaceAll(".", "").replaceAll("-", "").replaceAll("_", "");

    if (cep.length === 8) {
      this.cepService.getDadosCep(cep).subscribe((retornoCep)=>{
        
        this.formularioCadastro.get('endereco')?.setValue(retornoCep.logradouro);
        this.formularioCadastro.get('bairro')?.setValue(retornoCep.bairro);
        this.formularioCadastro.get('complemento')?.setValue(retornoCep.complemento);
        this.formularioCadastro.get('cidade')?.setValue(retornoCep.localidade);
        this.formularioCadastro.get('estado')?.setValue(retornoCep.estado);
        this.formularioCadastro.get('pais')?.setValue('Brasil');
      });
    }
  }
}
