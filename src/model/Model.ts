import { Conta } from './Conta';
import { Colors } from '../util/Colors';

const conta1: Conta = new Conta(12345, 1001, "Gabriela Silva", 1, 1000);
const conta2: Conta = new Conta(67890, 1002, "João Santos", 2, 500);

console.log(Colors.fg.green, "==== CONTA 1 ====", Colors.reset);
conta1.visualizar();

console.log(Colors.fg.cyan, "Tentando sacar 200 da CONTA 1...", Colors.reset);
conta1.sacar(200);
console.log(Colors.fg.cyan, "Novo saldo após saque de 200 na CONTA 1:", Colors.reset);
conta1.visualizar();

console.log(Colors.fg.cyan, "Depositando 300 na CONTA 1...", Colors.reset);
conta1.depositar(300);
console.log(Colors.fg.cyan, "Novo saldo após depósito de 300 na CONTA 1:", Colors.reset);
conta1.visualizar();



console.log(Colors.fg.green, "\n==== CONTA 2 ====", Colors.reset);
conta2.visualizar();

console.log(Colors.fg.cyan, "Tentando sacar 600 da CONTA 2...", Colors.reset);
conta2.sacar(600);
console.log(Colors.fg.cyan, "Saldo final da CONTA 2:", Colors.reset);
conta2.visualizar();
