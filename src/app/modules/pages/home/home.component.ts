import { Component, OnInit } from "@angular/core";
import { environment } from "../../../../environments/environment";
import Swal from "sweetalert2";
import { TableModule } from "primeng/table";
import { ChartModule } from "primeng/chart";
import { CardModule } from "primeng/card";
import { CommonModule } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { MenuModule } from "primeng/menu";
import { TagModule } from "primeng/tag";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ChartModule,
    TableModule,
    ButtonModule,
    MenuModule,
    TagModule,
  ],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent implements OnInit {
  lineChartData: any;
  orders!: any[];
  transactions!: any[];

  constructor(private readonly router: Router){}

  ngOnInit(): void {
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

  menuItems = [
    {
      label: "Agendamento",
      icon: "pi pi-pencil",
      command: () => this.agendamentos(),
    },
    {
      label: "Cadastrar cliente",
      icon: "pi pi-trash",
      command: () => this.agendamentos(),
    },
    {
      label: "Formulários",
      icon: "pi pi-info",
      command: () => this.agendamentos(),
    },
    { label: "Sair", icon: "pi pi-info", command: () => this.agendamentos() },
  ];

  public agendamentos() {
    this.router.navigate(['/agendamentos']);
  }

  public finalizarSessao(){
    alert('finalizada');
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
