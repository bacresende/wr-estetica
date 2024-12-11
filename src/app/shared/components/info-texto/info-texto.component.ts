import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-texto',
  standalone: true,
  imports: [],
  templateUrl: './info-texto.component.html',
  styleUrl: './info-texto.component.css'
})
export class InfoTextoComponent {

  @Input({required: true})
  public texto: string = '';

}
