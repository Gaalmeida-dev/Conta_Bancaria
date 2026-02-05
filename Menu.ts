//importando
import {ContaCorrente} from './src/model/ContaCorrente';
import {Conta} from './src/model/Conta';
import leia from 'readline-sync';
import { ContaPoupanca } from './src/model/ContaPoupança';
import { Colors } from './src/util/Colors';



export function main() {
  let opcao: number;
  const contas: Conta[] = [];

  // estruturação
  while (true) {
    console.log(
      Colors.bg.black,
      Colors.fg.darkpurple,
                      '◎━━━━━━◎━━━━━━◎◎━━━━━━◎━━━━━━◎◎━━━━━━◎━━━━━━◎'
    );
    console.log('                         BANCO ZED                           ');
    console.log(`\n              👾 O banco da nova geracao                   `);
    console.log('                ━━━━━━━━━━━ ⟡ ━━━━━━━━━━━                  \n');
    console.log('1- Criar Conta                                               ');
    console.log('2- Listar todas as Contas                                     ');
    console.log('3- Buscar Conta por numero                                    ');
    console.log('4- Atualizar dados da Conta                                   ');
    console.log('5- Apagar Conta                                               ');
    console.log('6- Sacar                                                      ');
    console.log('7- Depositar                                                  ');
    console.log('8- Transferir valores entre Contas                            ');
    console.log('9- Buscar Conta por Titular                                   ');
    console.log('10- Fale com um de nossos Atendentes!                         ');
    console.log('0- Sair                                                       \n');
    console.log('◎━━━━━━◎━━━━━━◎◎━━━━━━◎━━━━━━◎◎━━━━━━◎━━━━━━◎\n', Colors.reset);


    opcao = leia.questionInt('Escolha uma opcao: ');

//laços e loops

    if (opcao === 0) break;

    switch (opcao) {
      case 1:
        const tipo = leia.questionInt(
          'Tipo de conta (1 - Conta Comum, 2 - Conta Corrente, 3 - Conta Poupanca): '
        );
        const titular = leia.question('Nome do Titular: ');
        const saldo = parseFloat(leia.question('Saldo inicial: '));

        let novaConta: Conta;

        if (tipo === 1) {
          const numero = contas.length + 1;
          novaConta = new Conta(numero, 1001, titular, 1, saldo);
          contas.push(novaConta);
        } else if (tipo === 2) {
          const limite = parseFloat(leia.question('Limite da Conta Corrente: '));
          const numero = contas.length + 1;
          novaConta = new ContaCorrente(numero, 1001, titular, 2, saldo, limite);
          contas.push(novaConta);
        } else if (tipo === 3) {
          const numero = contas.length + 1;
          const diaAniv = leia.questionInt('Dia do aniversario (1-31): ');
          const mesAniv = leia.questionInt('Mes do aniversário (1-12): ');
          const anoAniv = leia.questionInt('Ano de nascimento: ');
          const dataAniv = new Date(anoAniv, mesAniv - 1, diaAniv);

          novaConta = new ContaPoupanca(numero, 1001, titular, 3, saldo, dataAniv);
          contas.push(novaConta);
        } else {
          console.log(Colors.fg.red, 'Tipo de conta inválido!', Colors.reset);
          break;
        }

        console.log(
          Colors.fg.green,
          `Parabéns, ${titular}! Sua conta de número ${novaConta.numero} foi criada com sucesso!`,
          Colors.reset
        );
        break;

      case 2:
        if (contas.length === 0) {
          console.log('Naao achamos nenhuma conta no momento.');
        } else {
          contas.forEach((c) => {
            console.log(`#${c.numero}: ${c.titular} - Saldo: R$${c.saldo}`);
          });
        }
        break;

      case 3:
        const numBuscar = leia.questionInt('Numero da conta: ');
        const conta = contas.find((c) => c.numero === numBuscar);

        if (conta) {
          conta.visualizar();
        } else {
          console.log('Conta não encontrada!');
        }
        break;

      case 6:
        const numSacar = leia.questionInt('Numero da conta: ');
        const contaSacar = contas.find((c) => c.numero === numSacar);

        if (!contaSacar) {
          console.log('Conta não encontrada!');
          break;
        }

        const valorSacar = parseFloat(leia.question('Valor a sacar: '));
        const resultadoSacar = contaSacar.sacar(valorSacar);
        if (resultadoSacar) {
          console.log(
            Colors.fg.green,
            `Saque de R$${valorSacar.toFixed(2)} realizado com sucesso!`,
            Colors.reset
          );
        } else {
          console.log(Colors.fg.red, 'Saldo insuficiente ou valor inválido.', Colors.reset);
        }
        break;

      case 7:
        const numDepositar = leia.questionInt('Numero da conta: ');
        const contaDepositar = contas.find((c) => c.numero === numDepositar);

        if (!contaDepositar) {
          console.log('Conta não encontrada!');
          break;
        }

        const valorDepositar = parseFloat(leia.question('Valor a depositar: '));
        contaDepositar.depositar(valorDepositar);
        console.log(
          Colors.fg.green,
          `Depósito de R$${valorDepositar.toFixed(2)} realizado com sucesso!`,
          Colors.reset
        );
        break;

      case 9:
        const nomeTitular = leia.question('Nome do titular: ');
        const contasTitular = contas.filter(
          (c) => c.titular.toLowerCase().includes(nomeTitular.toLowerCase())
        );

        if (contasTitular.length === 0) {
          console.log('Nenhuma conta encontrada para esse titular.');
        } else {
          contasTitular.forEach((c) => {
            console.log(`#${c.numero}: ${c.titular} - Saldo: R$${c.saldo}`);
          });
        }
        break;

      case 10:
        console.log(
          Colors.fg.blue,
                   '\nFALE CONOSCO - BANCO ZED 👾',
          Colors.reset
        );
        console.log(' _________________________ ');

        const nome = leia.question('Seu nome: ');
        const email = leia.question('Seu email: ');
        const duvida = leia.question('Descreva sua duvida: ');

        console.log(' _________________________ ');
        console.log(
          Colors.fg.green,
          '✅ Mensagem enviada com sucesso!',
          Colors.reset
        );
        console.log('Um de nossos atendentes entrara em contato em breve.');
        console.log('Banco Zed agradece! 👾');
        console.log(' _________________________ \n');
        break;
      default:

        console.log(Colors.fg.red, 'Opcao invalida!', Colors.reset);
    }
    leia.question('\nPressione Enter...');
  }
  console.log('O Banco Zed agradece, volte sempre! 👾');
  console.log('\n ___________________________________');
  console.log('\n Projeto criado por Gabriela Almeida');
  console.log('Github: https://github.com/Gaalmeida-dev');
  console.log('Linkedin: https://www.linkedin.com/in/gabriela-almeida-escalera-dos-santos-27022b3a0/');
}



main();
 