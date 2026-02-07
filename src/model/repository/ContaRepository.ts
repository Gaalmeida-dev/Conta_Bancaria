import { Conta } from "../Conta";
export interface ContaRepository {

  //metodos do crud (create, read, update, delete)
  procurarPorNumero(numero: number): Conta | null;
  listarTodas(): Conta[];
  cadastrar(conta: Conta): void;
  atualizar(conta: Conta): void;
  deletar(numero: number): void;

  //metodos bancarios
  sacar(numero: number, valor: number): boolean;
  depositar(numero: number, valor: number): void;
  transferir(numeroOrigem: number, numeroDestino: number, valor: number): void;
}