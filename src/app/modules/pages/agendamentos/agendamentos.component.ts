import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { RatingModule } from "primeng/rating";
import { RippleModule } from "primeng/ripple";
import {
  TableModule,
  TableRowCollapseEvent,
  TableRowExpandEvent,
} from "primeng/table";
import { TagModule } from "primeng/tag";
import { ToastModule } from "primeng/toast";
import { AgendamentoService } from "../../services/agendamento-service/agendamento.service";
import Swal from "sweetalert2";
import { DialogModule } from "primeng/dialog";
import { InputGroupModule } from "primeng/inputgroup";
import { InputGroupAddonModule } from "primeng/inputgroupaddon";
import { InputTextModule } from "primeng/inputtext";
import { CalendarModule } from "primeng/calendar";
import { MultiSelectModule } from "primeng/multiselect";

export interface AgendamentoRepresentation {
  id: string;
  code: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  quantity: number;
  inventoryStatus: string;
  rating: number;
}

@Component({
  selector: "app-agendamentos",
  standalone: true,
  imports: [
    ButtonModule,
    RippleModule,
    ToastModule,
    TableModule,
    TagModule,
    RatingModule,
    CommonModule,
    FormsModule,
    DialogModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    CalendarModule,
    ReactiveFormsModule,
    MultiSelectModule,
  ],
  templateUrl: "./agendamentos.component.html",
  styleUrl: "./agendamentos.component.css",
})
export class AgendamentosComponent implements OnInit {
  agendamentos!: AgendamentoRepresentation[];
  agendamento2: AgendamentoRepresentation[] = [];
  dialogVisible: boolean = false;
  public cities: any[] = [];

  public visibilidadeNovoAgendamento: boolean = false;

  expandedRows = {};

  constructor(private agendamentoService: AgendamentoService) {
    
  }

  ngOnInit() {
    this.agendamentos = this.agendamentoService.obterAgendamentos();

    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },{ name: 'Istanbul', code: 'IST' },{ name: 'Istanbul', code: 'IST' },{ name: 'Istanbul', code: 'IST' },{ name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
  ];
  }


  getStatusSeverity(status: string) {
    switch (status) {
      case "PENDING":
        return "warning";
      case "DELIVERED":
        return "success";
      case "CANCELLED":
        return "danger";
    }

    return "info";
  }

  showDialog(agendamento: AgendamentoRepresentation[]) {
    this.dialogVisible = true;
    this.agendamento2 = agendamento;
  }

  public novoAgendamento() {
    this.visibilidadeNovoAgendamento = true;
  }

  public salvarAgendamento(){
    this.visibilidadeNovoAgendamento = false
  }
}
