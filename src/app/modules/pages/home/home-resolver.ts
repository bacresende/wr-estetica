import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UsuarioService } from '../../services/usuario/usuario.service';

export const homeResolver: ResolveFn<any> = (route, state) => {
  const idUsuario = route.params['idUsuario'];
  if(!idUsuario){
    return;
  }

  const usuarioService = inject(UsuarioService);


  
  return usuarioService.obterUsuario(idUsuario);
};
