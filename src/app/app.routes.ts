import { AgendamentosComponent } from './modules/pages/agendamentos/agendamentos.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './modules/pages/login/login.component';
import { CadastrarUsuarioComponent } from './modules/pages/cadastrar-usuario/cadastrar-usuario.component';
import { HomeComponent } from './modules/pages/home/home.component';
import { TestComponent } from './modules/pages/test/test.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'criar-conta', component: CadastrarUsuarioComponent },
  {path: 'inicio', component: HomeComponent},
  {path: 'test', component: TestComponent},
  {path: 'agendamentos', component: AgendamentosComponent}
];
