import { Injectable } from '@angular/core';
import { Message } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  public mensagem: Message[] | undefined = [{ severity: 'info', detail: 'msg' }];
  constructor() { }


  public addMensagem(severity: string = 'info', msg: string){
    this.mensagem = [{ severity: severity, detail: msg }];

    setTimeout(() => {
      this.limparMensagem();
    }, 600);
  }

  public limparMensagem(){
    this.mensagem = undefined;
  }
}
