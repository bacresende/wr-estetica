import { Component, Input } from '@angular/core';
import { Usuario } from '../../../../models/usuario.model';
import { FieldsetModule } from 'primeng/fieldset';
import { CadastroUsuario } from '../../../../models/cadastro-usuario.model';
import { CommonModule } from '@angular/common';
import { getStatusFuncaoPorExtenso } from '../../../../../shared/obter-status';

@Component({
  selector: 'app-info-gerais',
  standalone: true,
  imports: [FieldsetModule, CommonModule],
  templateUrl: './info-gerais.component.html',
  styleUrl: './info-gerais.component.css'
})
export class InfoGeraisComponent {

  @Input()
  public usuarioRep: CadastroUsuario | undefined;

  public getStatusFuncaoPorExtenso(status: string){
    return getStatusFuncaoPorExtenso(status);
  }

}
