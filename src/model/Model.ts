import { Conta } from './Conta';
import { Colors } from '../util/Colors';

const conta1: Conta = new Conta(12345, 1001, "Gabriela Silva", 1, 1000);
const conta2: Conta = new Conta(67890, 1002, "João Santos", 2, 500);

console.log(Colors.fg.green, "====  CONTA 1 ====", Colors.reset);
conta1.visualizar();
conta1.sacar(200);
conta1.depositar(300);
conta1.visualizar();

console.log(Colors.fg.green, "\n==== CONTA 2 ====", Colors.reset);
conta2.visualizar();
conta2.sacar(600);
conta2.visualizar();