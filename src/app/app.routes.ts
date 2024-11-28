import { AgendamentosComponent } from "./modules/pages/agendamentos/agendamentos.component";
import { Routes } from "@angular/router";
import { LoginComponent } from "./modules/pages/login/login.component";
import { CadastrarUsuarioComponent } from "./modules/pages/cadastrar-usuario/cadastrar-usuario.component";
import { HomeComponent } from "./modules/pages/home/home.component";
import { TestComponent } from "./modules/pages/test/test.component";
import { homeResolver } from "./modules/pages/home/home-resolver";

export const routes: Routes = [
  { path: "", component: LoginComponent, title: 'Login' },
  { path: "criar-conta", component: CadastrarUsuarioComponent, title: 'Criar conta' },
  {
    path: "inicio/:idUsuario",
    component: HomeComponent,
    resolve: { usuario: homeResolver },
    title: 'Início'
  },
  { path: "test", component: TestComponent },
  { path: "agendamentos", component: AgendamentosComponent, title: 'Agendamentos' },
];
