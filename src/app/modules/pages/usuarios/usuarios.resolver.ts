import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UsuarioService } from '../../services/usuario/usuario.service';

export const usuariosResolver: ResolveFn<any> = (route, state) => {
  const usuarioService = inject(UsuarioService);
  
  return usuarioService.obterUsuarios();
};
