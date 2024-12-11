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
    TooltipModule
    
  ],
  providers: [DatePipe],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit{

  public usuarios: any | undefined;
  public visibilidadeNovoCliente: boolean = false;
  public loading: boolean = true;

  @ViewChild('dt2')
  dt2!: Table;


  constructor(
    private readonly route: ActivatedRoute,
    private readonly location: Location,
    private readonly router: Router

  ){}

  filterTable(event: Event){
    const input = event.target as HTMLInputElement
    const value = input.value;
    this.dt2.filterGlobal(value, 'contains')
  }
  ngOnInit(): void {
    this.usuarios = this.route.snapshot.data['usuarios'];
    console.log(this.usuarios);
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
      if (result.isConfirmed) {
        //Atualizar
        //this.alterarStatusAgendamento(agendamentoRep.agendamento.id, 'Finalizado');
        Swal.fire(`Usuário alterado para ${this.getStatusFuncaoPorExtenso(funcoes[0])}`, "", "success");
      } else if (result.isDenied) {
        //Deletar
        //this.alterarStatusAgendamento(agendamentoRep.agendamento.id, 'Excluído');
        Swal.fire(`Usuário alterado para ${this.getStatusFuncaoPorExtenso(funcoes[1])}`, "", "success");
      }
    });
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
