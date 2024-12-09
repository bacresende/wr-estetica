import { catchError } from "rxjs";
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
import { CardModule } from "primeng/card";
import { InputGroupModule } from "primeng/inputgroup";
import { InputGroupAddonModule } from "primeng/inputgroupaddon";
import { InputMaskModule } from "primeng/inputmask";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { RippleModule } from "primeng/ripple";
import { ToastModule } from "primeng/toast";
import { TooltipModule } from "primeng/tooltip";
import { UsuarioService } from "../../services/usuario/usuario.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
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
    ToastModule,
    RippleModule,
    ReactiveFormsModule,
  ],
  providers: [MessageService],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent implements OnInit {
  public showPassword: boolean = false;
  public formularioLogin!: FormGroup;
  public loadingLogin: boolean = false;

  constructor(
    private readonly router: Router,
    private readonly messageService: MessageService,
    private readonly fb: FormBuilder,
    private readonly usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.criarFormulario();
  }

  public fazerCadastro() {
    this.router.navigate(["/criar-conta"]);
  }

  public fazerLogin() {
    if (this.formularioLogin.valid) {
      this.loadingLogin = true;
      const { email, senha } = this.formularioLogin.value;
      this.usuarioService.logarUsuario(email, senha).subscribe({
        next: (funcionario: { funcao: string; idUsuario: string }) => {
          if (funcionario) {
            if (funcionario.funcao === "ADM") {
              localStorage.setItem('idFuncionario', funcionario.idUsuario);
              this.irParaHome(funcionario.idUsuario);
            }else{
              Swal.fire({
                title: "Ops!",
                text: "Você ainda não tem acesso a nossa tela",
                icon: "error"
              });
            }
            this.loadingLogin = false;
          }
        },
        error: (error) => {
          this.loadingLogin = false;
          this.messageService.add({
            severity: "warn",
            summary: "Ops",
            detail: "Dados inválidos",
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

  private criarFormulario() {
    this.formularioLogin = this.fb.group({
      email: this.fb.control("", [Validators.required]),
      senha: this.fb.control("", [Validators.required]),
    });
  }

  public recuperarSenha() {
    console.log("senha");
  }

  public mostrarSenha() {
    this.showPassword = !this.showPassword;
  }

  public irParaHome(idUsuario: string) {
    this.router.navigate(["/inicio", idUsuario]);
  }
}
