import { Colors } from "../../util/Colors";
import { Conta } from "../Conta";
import { ContaRepository } from "./ContaRepository";

export class ContaController implements ContaRepository {
  private contas: Conta[] = [];

  //metodos do crud (create, read, update, delete)
  procurarPorNumero(numero: number): Conta | null {
    return this.contas.find((c) => c.numero === numero) || null;
  }

  listarTodas(): Conta[] {
    return this.contas;
  }

  cadastrar(conta: Conta): void {
    this.contas.push(conta);
  }

  atualizar(conta: Conta): void {
    const index = this.contas.findIndex((c) => c.numero === conta.numero);
    if (index !== -1) {
      this.contas[index] = conta;
    }
  }

  deletar(numero: number): void {
    this.contas = this.contas.filter((c) => c.numero !== numero);
  }

  //metodos bancarios
  sacar(numero: number, valor: number): boolean {
    const conta = this.procurarPorNumero(numero);
    return conta ? conta.sacar(valor) : false;
  }

  depositar(numero: number, valor: number): void {
    const conta = this.procurarPorNumero(numero);
    if (conta) {
      conta.depositar(valor);
    }
  }

  transferir(numeroOrigem: number, numeroDestino: number, valor: number): void {
    const contaOrigem = this.procurarPorNumero(numeroOrigem);
    const contaDestino = this.procurarPorNumero(numeroDestino);

    if (!contaOrigem || !contaDestino) {
      console.log("Conta(s) não encontrada(s)!");
      return;
    }

    if (contaOrigem.sacar(valor)) {
      contaDestino.depositar(valor);
      console.log(
        Colors.fg.green,
        `Transferência de R$${valor.toFixed(2)} realizada com sucesso!`,
        Colors.reset
      );
    } else {
      console.log(Colors.fg.red, "Transferência não realizada.", Colors.reset);
    }
  }

  // pesquisa extra
  buscarPorTitular(nome: string): Conta[] {
    return this.contas.filter(
      (c) => c.titular.toLowerCase().includes(nome.toLowerCase())
    );
  }
}