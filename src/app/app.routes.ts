import { AgendamentosComponent } from "./modules/pages/agendamentos/agendamentos.component";
import { Routes } from "@angular/router";
import { LoginComponent } from "./modules/pages/login/login.component";
import { CadastrarUsuarioComponent } from "./modules/pages/cadastrar-usuario/cadastrar-usuario.component";
import { HomeComponent } from "./modules/pages/home/home.component";
import { TestComponent } from "./modules/pages/test/test.component";
import { homeResolver } from "./modules/pages/home/home-resolver";
import { UsuarioComponent } from "./modules/pages/usuario/usuario.component";
import { usuarioResolver } from "./modules/pages/usuario/usuario.resolver";
import { UsuariosComponent } from "./modules/pages/usuarios/usuarios.component";
import { usuariosResolver } from "./modules/pages/usuarios/usuarios.resolver";

export const routes: Routes = [
  {
    title: 'Login',
    path: "",
    component: LoginComponent,
  },
  {
    title: 'Criar conta',
    path: "criar-conta",
    component: CadastrarUsuarioComponent,
  },
  {
    title: 'Início',
    path: "inicio/:idUsuario",
    component: HomeComponent,
    resolve: {
      usuario: homeResolver
    },
  },
  {
    path: "test",
    component: TestComponent
  },
  {
    title: 'Agendamentos',
    path: "agendamentos",
    component: AgendamentosComponent,
  },
  {
    title: 'Ver usuário',
    path: "usuario/:idUsuario",
    component: UsuarioComponent,
    resolve: {
      usuario: usuarioResolver
    }
  },

  {
    title: 'Ver usuários',
    path: "usuarios",
    component: UsuariosComponent,
    resolve: {
      usuarios: usuariosResolver
    }
  }
];


