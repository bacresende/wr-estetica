import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { AgendamentosUsuarioComponent } from './components/agendamentos/agendamentos.component';
import { InfoGeraisComponent } from "./components/info-gerais/info-gerais.component";
import { ActivatedRoute } from '@angular/router';
import { CadastroUsuario } from '../../models/cadastro-usuario.model';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [
    ButtonModule, 
    TabViewModule, 
    CardModule, 
    TableModule, 
    ButtonModule,
    ToastModule, 
    InfoGeraisComponent, 
    AgendamentosUsuarioComponent
  ],
  providers: [MessageService],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit{

  public user: CadastroUsuario | undefined;
  

  constructor(private location: Location, private readonly route: ActivatedRoute) { }
  ngOnInit(): void {
    this.user = this.route.snapshot.data['usuario'];
    
    
  }

  public voltar(): void {
    this.location.back();
  }


}

