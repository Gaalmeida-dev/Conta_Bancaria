import { Conta } from './Conta';

export class ContaPoupanca extends Conta {
  private taxaJuros: number = 0.5;
  private aniversario: Date; 

  constructor(
    numero: number,
    agencia: number,
    titular: string,
    tipo: number,
    saldo: number = 0,
    dataAniversario: Date 
  ) {
    super(numero, agencia, titular, tipo, saldo);
    this.aniversario = dataAniversario;
  }

  private diaDeRendimento(): boolean {
    const hoje = new Date();
    const diaHoje = hoje.getDate();
    const mesHoje = hoje.getMonth();
    const anoHoje = hoje.getFullYear();

    const diaAniv = this.aniversario.getDate();
    const mesAniv = this.aniversario.getMonth();
    const anoAniv = this.aniversario.getFullYear();

    // considerando mesmo dia do mês (aniversário mensal)
    return diaHoje === diaAniv && mesHoje === mesHoje && anoHoje === anoHoje;
  }

  aplicarRendimento(): void {
    if (this.diaDeRendimento()) {
      const juros = (this.saldo * this.taxaJuros) / 100;
      this.saldo += juros;
    }
  }

  sacar(valor: number): boolean {
    const hoje = new Date();
    const diaHoje = hoje.getDate();
    const diaAniv = this.aniversario.getDate();

    // se sacar antes do aniversário, não rende nada naquele mês
    if (diaHoje < diaAniv) {
    }

    return super.sacar(valor);
  }
}
