export function getStatusAgendamentoSeverity(status: string) {
    switch (status) {
      case "Ativo":
        return "success";
      case "Finalizado":
        return "info";
      case "Cancelado":
        return "warning";
      case "Excluído":
        return "danger";
    }

    return "info";
  }

  export function getStatusPagamentoSeverity(status: string) {
    switch (status) {
      case "Pago":
        return "success";
      case "Pendente":
        return "danger";
      case "Estornado":
        return "info";
    }

    return "info";
  }

  export function getStatusFuncaoSeverity(status: string) {
    switch (status) {
      case "CLIENTE":
        return "success";
      case "ADM":
        return "info";
      case "FUNC":
        return "warning";
    }

    return "info";
  }