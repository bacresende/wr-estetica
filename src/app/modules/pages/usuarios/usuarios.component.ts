import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { CadastroUsuario } from '../../models/cadastro-usuario.model';
import { ButtonModule } from 'primeng/button';
import { CommonModule, DatePipe, Location } from '@angular/common';
import { CardNovoUsuarioComponent } from "../../../shared/components/card-novo-usuario/card-novo-usuario.component";
import { TableModule } from 'primeng/table';
import { RippleModule } from 'primeng/ripple';
import { TagModule } from 'primeng/tag';
import { getStatusAgendamentoSeverity, getStatusFuncaoSeverity, getStatusPagamentoSeverity } from '../../../shared/obter-status';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [ButtonModule, CardNovoUsuarioComponent, TableModule, CommonModule, TagModule],
  providers: [DatePipe],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit{

  public usuarios: any | undefined;
  public visibilidadeNovoCliente: boolean = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly location: Location,
    private readonly router: Router

  ){}
  ngOnInit(): void {
    this.usuarios = this.route.snapshot.data['usuarios'];
    console.log(this.usuarios);
  }

  public getStatusFuncaoSeverity(status: string) {
    
    return getStatusFuncaoSeverity(status);
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

}
