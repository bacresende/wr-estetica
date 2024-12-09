import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MenuItem, MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { MenuModule } from "primeng/menu";
import { TableModule } from "primeng/table";
import { TagModule } from "primeng/tag";
import { ToastModule } from "primeng/toast";
import { CardNovoUsuarioComponent } from "../../../shared/components/card-novo-usuario/card-novo-usuario.component";
import { CadastroUsuario } from "../../models/cadastro-usuario.model";
import { CadastroUsuarioParcialCommand, UsuarioService } from "../../services/usuario/usuario.service";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    MenuModule,
    TagModule,
    
    ToastModule,
    CardNovoUsuarioComponent
],
  providers: [MessageService],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent implements OnInit {
  lineChartData: any;
  orders!: any[];
  transactions!: any[];
  public usuario!: CadastroUsuario;
  public visibilidadeNovoCliente: boolean = false;

  public menuItems: MenuItem[] = [
    {
      label: "Ver usuários",
      icon: "pi pi-user",
      command: () => this.verUsuarios(),
    },
    {
      label: "Agendamento",
      icon: "pi pi-calendar-clock",
      command: () => this.agendamentos(),
    },
    {
      label: "Cadastrar cliente",
      icon: "pi pi-user-plus",
      command: () => this.cadastrarCliente(),
    },
    {
      label: "Formulários",
      icon: "pi pi-align-justify",
      command: () => null,
      disabled: true,
      
    },
    { label: "Sair", icon: "pi pi-sign-out", command: () => this.finalizarSessao() },
  ];
  

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder,
    

  ) {}

  ngOnInit(): void {
    this.usuario = this.route.snapshot.data["usuario"];

    

    

    // Swal.fire({
    //   title: "Top demais!",
    //   text: "Em breve teremos mais coisas por aqui!",
    //   icon: "success",
    // });

    this.lineChartData = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
      datasets: [
        {
          label: "Sales",
          data: [100, 200, 300, 400, 500, 600, 700, 800],
          borderColor: "#3498db",
          fill: false,
        },
      ],
    };

    this.transactions = [
      {
        id: "T123",
        customer: "Alice",
        date: "2024-10-10",
        amount: 120,
        status: "Completado",
      },
      {
        id: "T124",
        customer: "Bob",
        date: "2024-10-11",
        amount: 80,
        status: "Pendente",
      },
      {
        id: "T125",
        customer: "Charlie",
        date: "2024-10-12",
        amount: 200,
        status: "Não pago",
      },
    ];
  }

  

  

  public verUsuarios() {
    this.router.navigate(["/usuarios"]);
  }
  
  public agendamentos() {
    this.router.navigate(["/agendamentos"]);
  }

  public cadastrarCliente(){
    console.log('entrou');
    this.visibilidadeNovoCliente = true;
  }

  public fecharModal(visibilidade: boolean){
    console.log(`Event de fechar modal: ${visibilidade}`)
    this.visibilidadeNovoCliente = visibilidade;
  }

  

  public finalizarSessao() {
    this.router.navigate(['']);
  }

  getSeverity(status: string) {
    switch (status) {
      case "Finalizado":
        return "success";
      case "Pendente":
        return "warning";
      case "Não pago":
        return "danger";
      default:
        return "success";
    }
  }
}
