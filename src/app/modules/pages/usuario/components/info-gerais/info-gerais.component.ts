import { Component, Input } from '@angular/core';
import { Usuario } from '../../../../models/usuario.model';

@Component({
  selector: 'app-info-gerais',
  standalone: true,
  imports: [],
  templateUrl: './info-gerais.component.html',
  styleUrl: './info-gerais.component.css'
})
export class InfoGeraisComponent {

  @Input()
  public usuario: Usuario | undefined;

}
