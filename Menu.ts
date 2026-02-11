import { ContaController } from "./repository/ContaController";
import { Conta } from "./src/model/Conta";
import { ContaCorrente } from "./src/model/ContaCorrente";
import { ContaPoupanca } from "./src/model/ContaPoupança";
import { Colors } from "./src/util/Colors";
import { Input } from "./src/util/Input";

const leia = Input;

// Cria um Objeto Global da Classe ContaController
const contas = new ContaController();

// Cria um array contendo os tipos de conta
const tipoContas = ["Conta Corrente", "Conta Poupanca"];

export function main() {

    let opcao: number;

  //Estruturação visual
  while (true) {
    console.log(
      Colors.bg.black,
      Colors.fg.darkpurple,
                             '◎━━━━━━◎━━━━━━◎◎━━━━━━◎━━━━━━◎◎━━━━━━◎━━━━━━◎       ');
    console.log('                              BANCO ZED                             ');
    console.log(`\n                   👾 O banco da nova geração                    `);
    console.log('                          ━━━━━━━━ ⟡ ━━━━━━━━                    \n');
    console.log('1- Criar Conta                                                     ');
    console.log('2- Listar todas as Contas                                          ');
    console.log('3- Buscar Conta por numero                                         ');
    console.log('4- Atualizar dados da Conta                                        ');
    console.log('5- Apagar Conta                                                    ');
    console.log('6- Sacar                                                           ');
    console.log('7- Depositar                                                       ');
    console.log('8- Transferir valores entre Contas                                 ');
    console.log('9- Buscar Conta por Titular                                        ');
    console.log('10- Fale com um de nossos Atendentes!                              ');
    console.log('0- Sair                                                          \n');
    console.log('◎━━━━━━◎━━━━━━◎◎━━━━━━◎━━━━━━◎◎━━━━━━◎━━━━━━◎\n', Colors.reset);

    opcao = leia.questionInt('Escolha uma opcao: ');

    //Laços e loops
    if (opcao === 0) break;
    executaOpcao(opcao);
    leia.question('\nPressione Enter...');
  }
  console.log('O Banco Zed agradece, volte sempre! 👾');
  console.log('\n ___________________________________');
  console.log('\n Projeto criado por Gabriela Almeida');
  console.log('Github: https://github.com/Gaalmeida-dev');
  console.log('Linkedin: https://www.linkedin.com/in/gabriela-almeida-escalera-dos-santos-27022b3a0/');
}

//Estruturação funções bancárias
function executaOpcao(opcao: number): void {
  const mapa: { [key: number]: (() => void) | undefined } = {
    1: criarConta,
    2: listarContas,
    3: buscarNum,
    4: atualizarConta,
    5: apagarConta,
    6: sacar,
    7: depositar,
    8: transferir,
    9: buscarTitular,
    10: atendimento,
  };
  const funcao = mapa[opcao];
  if (funcao) {
    funcao();
  } else {
    console.log(Colors.fg.red, 'Opcao invalida!', Colors.reset);
  }
}

function criarConta(): void {
  const tipo = leia.questionInt(
     'Tipo de conta (1 - Conta Inss, 2 - Conta Corrente, 3 - Conta Poupanca): '
    );
    const titular = leia.question('Nome do Titular: ');
    const saldo = parseFloat(leia.question('Saldo inicial: '));

    let novaConta: Conta;

    if (tipo === 1) {
      const numero = contas.gerarNumero();
      novaConta = new Conta(numero, 1001, titular, 1, saldo);
    } else if (tipo === 2) {
      const limite = parseFloat(leia.question('Limite da Conta Corrente: '));
      const numero = contas.gerarNumero();
      novaConta = new ContaCorrente(numero, 1001, titular, 2, saldo, limite);
    } else if (tipo === 3) {
      const numero = contas.gerarNumero();
      const diaAniv = leia.questionInt('Dia do aniversario (1-31): ');
      const mesAniv = leia.questionInt('Mes do aniversário (1-12): ');
      const anoAniv = leia.questionInt('Ano de nascimento: ');
      const dataAniv = new Date(anoAniv, mesAniv - 1, diaAniv);

      novaConta = new ContaPoupanca(numero, 1001, titular, 3, saldo, dataAniv);
    } else {
      console.log(Colors.fg.red, 'Tipo de conta inválido!', Colors.reset);
      return;
    }

    contas.cadastrar(novaConta);
    console.log(
      Colors.fg.green,
      `Parabens, ${titular}! Sua conta de numero ${novaConta.numero} foi criada com sucesso!`,
      Colors.reset
    );
}

function listarContas(): void {
  contas.listarTodas();
}

function buscarNum(): void {
  const numBuscar = leia.questionInt('Numero da conta: ');
  contas.procurarPorNumero(numBuscar);
}

function buscarTitular(): void {
  const nomeTitular = leia.question('Nome do titular: ');
  contas.procurarPorTitular(nomeTitular);
}

function sacar(): void {
  const numSacar = leia.questionInt('Numero da conta: ');
  const conta = contas.buscarNoArray(numSacar);

  if (!conta) {
    console.log('Conta nao encontrada!');
    return;
  }

  const valorSacar = parseFloat(leia.question('Valor a sacar: '));
  contas.sacar(numSacar, valorSacar);
}

function atualizarConta(): void {
  const numAtualizar = leia.questionInt('Numero da conta para atualizar: ');
  const conta = contas.buscarNoArray(numAtualizar);
  if (!conta) {
    console.log('Conta nao encontrada!');
    return;
  }
  console.log('Dados atuais da conta:');
  conta.visualizar();
  console.log('\nAtualizar dados:');
  const novoTitular = leia.question(`Nome do Titular (${conta.titular}): `) || conta.titular;

  let novoSaldo = conta.saldo;
  const inputSaldo = leia.question(
    `Saldo atual (${conta.saldo.toFixed(2)}): `
  );
  if (inputSaldo && !isNaN(parseFloat(inputSaldo))) {
    novoSaldo = parseFloat(inputSaldo);
  }

  // Atualizar Comum
  conta.titular = novoTitular;
  conta.saldo = novoSaldo;

  contas.atualizar(conta);

  console.log(
    Colors.fg.green,
    `Conta #${conta.numero} atualizada com sucesso!`,
    Colors.reset
  );
}

function depositar(): void {
  const numDepositar = leia.questionInt('Numero da conta: ');
  const conta = contas.buscarNoArray(numDepositar);

  if (!conta) {
    console.log('Conta nao encontrada!');
    return;
  }

  const valorDepositar = parseFloat(leia.question('Valor a depositar: '));
  contas.depositar(numDepositar, valorDepositar);

  console.log(
    Colors.fg.green,
    `Deposito de R$${valorDepositar.toFixed(2)} realizado com sucesso!`,
    Colors.reset
  );
}

function apagarConta(): void {
  const numApagar = leia.questionInt('Numero da conta para excluir: ');
  const conta = contas.buscarNoArray(numApagar);

  if (!conta) {
    console.log('Conta nao encontrada!');
    return;
  }

  console.log('Conta que será excluída:');
  conta.visualizar();

  const confirmacao = leia.question('\nConfirmar exclusao? (s/n): ').toLowerCase();

  if (confirmacao !== 's' && confirmacao !== 'sim') {
    console.log(Colors.fg.yellow, 'Exclusao cancelada.', Colors.reset);
    return;
  }

  contas.deletar(numApagar);

  console.log(
    Colors.fg.green,
    `Conta #${numApagar} apagada com sucesso!`,
    Colors.reset
  );
}

function transferir(): void {
  console.log('Numero da Conta de Origem: ');
  const numeroOrigem = leia.questionInt('');

  console.log('Numero da Conta de Destino: ');
  const numeroDestino = leia.questionInt('');

  const contaOrigem = contas.buscarNoArray(numeroOrigem);
  const contaDestino = contas.buscarNoArray(numeroDestino);

  if (!contaOrigem) {
    console.log(Colors.fg.red, 'Conta de origem nao encontrada!', Colors.reset);
    return;
  }

  if (!contaDestino) {
    console.log(Colors.fg.red, 'Conta de destino nao encontrada!', Colors.reset);
    return;
  }

  console.log('Valor a transferir: ');
  const valor = parseFloat(leia.question(''));

  contas.transferir(numeroOrigem, numeroDestino, valor);
}

function atendimento(): void {
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
}
main();