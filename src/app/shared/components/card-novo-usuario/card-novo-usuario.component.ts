import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { CadastroUsuarioParcialCommand, UsuarioService } from '../../../modules/services/usuario/usuario.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-card-novo-usuario',
  standalone: true,
  imports: [
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    InputMaskModule,
    ToastModule,
    ButtonModule
  ],
  providers: [MessageService],
  templateUrl: './card-novo-usuario.component.html',
  styleUrl: './card-novo-usuario.component.css',
  encapsulation: ViewEncapsulation.None
})
export class CardNovoUsuarioComponent implements OnInit{

  @Input({required: true})
  public visibilidadeNovoCliente: boolean = false

  @Output() 
  public emitirVisibilidade = new EventEmitter<boolean>();

  public formNovoCliente!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly messageService: MessageService,
    private readonly usuarioService: UsuarioService
  ){}

  ngOnInit(): void {
    this.criarFormulario();
  }

  private criarFormulario(){
    this.formNovoCliente = this.fb.group({
      nome : this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required]),
      cpf : this.fb.control('', [Validators.required]),
      telefone: this.fb.control('', [Validators.required])
    });
  }

  public salvarCliente(){
    if(this.formNovoCliente.valid){
      const novoUsuarioCommand = this.configurarNovoClienteCommand();
      this.usuarioService.cadastrarUsuarioParcial(novoUsuarioCommand).subscribe({
        next: (novoCliente)=>{
          if(novoCliente){
          this.messageService.add({
              severity: "success",
              summary: "Oba!",
              detail: novoCliente.mensagem,
            });
          }
          this.fecharModal();
        },
        error: (error)=>{
          this.messageService.add({
            severity: "warn",
            summary: "Ops",
            detail: `${error}`,
          });
        }
      });
    } else {
      this.messageService.add({
        severity: "warn",
        summary: "Ops",
        detail: "Há campos em branco",
      });
    }
  }

  private configurarNovoClienteCommand(): CadastroUsuarioParcialCommand {
    const novoUsuarioCommand: CadastroUsuarioParcialCommand = {
      nome: this.formNovoCliente.value.nome,
      email: this.formNovoCliente.value.email,
      telefone: this.formNovoCliente.value.telefone,
      cpf: this.formNovoCliente.value.cpf,
    };

    return novoUsuarioCommand;

  }

  public fecharModal(){
    this.emitirVisibilidade.emit(false);
  }

}
