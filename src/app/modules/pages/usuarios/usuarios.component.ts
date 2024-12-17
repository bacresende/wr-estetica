import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { CadastroUsuario } from '../../models/cadastro-usuario.model';
import { ButtonModule } from 'primeng/button';
import { CommonModule, DatePipe, Location } from '@angular/common';
import { CardNovoUsuarioComponent } from "../../../shared/components/card-novo-usuario/card-novo-usuario.component";
import { Table, TableModule } from 'primeng/table';
import { RippleModule } from 'primeng/ripple';
import { TagModule } from 'primeng/tag';
import { getStatusAgendamentoSeverity, getStatusFuncaoPorExtenso, getStatusFuncaoSeverity, getStatusPagamentoSeverity } from '../../../shared/obter-status';
import Swal from 'sweetalert2';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { InfoTextoComponent } from "../../../shared/components/info-texto/info-texto.component";
import { UsuarioFuncaoCommand, UsuarioService } from '../../services/usuario/usuario.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    ButtonModule,
    CardNovoUsuarioComponent,
    TableModule,
    CommonModule,
    TagModule,
    IconFieldModule,
    InputIconModule,
    MultiSelectModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    TooltipModule,
    InfoTextoComponent,
    ToastModule
],
  providers: [DatePipe, MessageService],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit{

  public usuarios!: CadastroUsuario[];
  public visibilidadeNovoCliente: boolean = false;
  public loading: boolean = true;

  @ViewChild('dt2')
  dt2!: Table;


  constructor(
    private readonly route: ActivatedRoute,
    private readonly location: Location,
    private readonly router: Router,
    private readonly usuarioService: UsuarioService,
    private messageService: MessageService,

  ){}

  filterTable(event: Event){
    const input = event.target as HTMLInputElement
    const value = input.value;
    this.dt2.filterGlobal(value, 'contains')
  }
  ngOnInit(): void {
    this.usuarios = this.route.snapshot.data['usuarios'];
    
    this.loading = false;
  }

  public getStatusFuncaoSeverity(status: string) {
    
    return getStatusFuncaoSeverity(status);
  }

  public alterarFuncao(usuarioRep: CadastroUsuario){
    console.log('alterado ' + usuarioRep.usuario.objectId);
    let funcoes: Array<string> = ['ADM', 'CLIENTE', 'FUNC']
    
    funcoes = funcoes.filter((funcao)=> funcao !== usuarioRep.usuario.funcao);
    

    Swal.fire({
      title: `<p>Qual função deseja inserir para o usuário ${usuarioRep.usuario.nome}?</p>`,   
       
      showConfirmButton: true,
      showDenyButton: true,
      denyButtonColor: 'green',
      showCancelButton: true,
      confirmButtonText: this.getStatusFuncaoPorExtenso(funcoes[0]),
      denyButtonText: this.getStatusFuncaoPorExtenso(funcoes[1]),
      cancelButtonText: "Voltar",
    }).then((result) => {

      if(result.isDismissed){
        return;
      }
      
      let funcao = '';
      if (result.isConfirmed) {
        //Atualizar
        funcao = funcoes[0];
      } else if (result.isDenied) {
        //Atualizar
        funcao = funcoes[1];
      }

      this.alterarStatusFuncaoUsuario(usuarioRep.usuario.objectId!, funcao);
    });
  }

  private alterarStatusFuncaoUsuario(idUsuario: string, funcao: string){
    const usuarioFuncaoCommand: UsuarioFuncaoCommand = {idUsuario, funcao};
    this.usuarioService.alterarFuncaoUsuario(usuarioFuncaoCommand).subscribe({
      next: (usuarioResponse) => {
        if (usuarioResponse) {
          
          this.obterUsuarios();

          this.messageService.add({
            severity: "success",
            summary: "Oba!",
            detail: usuarioResponse.mensagem,
          });

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

  private obterUsuarios(){
    this.usuarioService.obterUsuarios().subscribe((usuarios)=>{
      this.usuarios = usuarios;
    })
  }

  public voltar(): void {
    this.location.back();
  }

  public cadastrarCliente(){
    console.log('entrou');
    this.visibilidadeNovoCliente = true;
  }

  public fecharModal(visibilidade: boolean){
    console.log(`Event de fechar modal: ${visibilidade}`)
    this.visibilidadeNovoCliente = visibilidade;
    this.obterUsuarios();
  }

  public verUsuario(idUsuario: string){
    this.router.navigate(['/usuario', idUsuario]);
  }

  public showDialogOpcoes(usuarioRep: CadastroUsuario) {
    console.log(usuarioRep);

    Swal.fire({
      title: `<p>O que deseja realizar com o usuário ${usuarioRep.usuario.nome}?</p>`,    
      showConfirmButton: true,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Editar",
      denyButtonText: `Excluir`,
      cancelButtonText: "Voltar",
    }).then((result) => {
      if (result.isConfirmed) {
        //Atualizar
        //this.alterarStatusAgendamento(agendamentoRep.agendamento.id, 'Finalizado');
        Swal.fire("Usuário Editado!", "", "success");
      } else if (result.isDenied) {
        //Deletar
        //this.alterarStatusAgendamento(agendamentoRep.agendamento.id, 'Excluído');
        Swal.fire("Usuário excluído!", "", "error");
      }
    });
  }


    clear(table: Table) {
        table.clear();
    }

   public getStatusFuncaoPorExtenso(status: string) {
        return getStatusFuncaoPorExtenso(status);
    }


}
