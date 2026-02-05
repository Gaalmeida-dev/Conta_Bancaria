//Importações
import { Conta } from "./src/model/Conta";
import { Colors } from "./src/util/Colors";
import leia from "readline-sync";

export function main() {
    let opcao: number;
    const contas: any[] = [];

    //Instanciar objetos da Classe Conta

    const c1 = new Conta(1, 1234, "Gabriela", 1, 100000.00);

    //console.log("O titular da conta é: ", c1.titular)
    //console.log("O saldo da conta é: ", c1.saldo )

    c1.visualizar();

    console.log("Sacar 100,00: ", c1.sacar(100.00));
    console.log("Sacar 200.000,00 : ", c1.sacar(2000000.00));
    console.log("Sacar 0.00: ");

    console.log("Depositar -10.00: "); 
    c1.depositar(-10.00);
    console.log("Depositar 500.000: ");
    c1.depositar(+500000.00)


//Estruturação

while (true) {
console.log(Colors.bg.black, Colors.fg.darkpurple,
            "◎━━━━━━◎━━━━━━◎◎━━━━━━◎━━━━━━◎◎━━━━━━◎━━━━━━◎");
console.log("                 BANCO ZED                        ");
console.log(`\n        👾 O banco da nova geração              `);
console.log("          ━━━━━━━━━━━ ⟡ ━━━━━━━━━━━              \n");
console.log("1- Criar Conta                                    ");
console.log("2- Listar todas as Contas                         ");
console.log("3- Buscar Conta por numero                        ");
console.log("4- Atualizar dados da Conta                       ");
console.log("5- Apagar Conta                                   ");
console.log("6- Sacar                                          ");
console.log("7- Depositar                                      ");
console.log("8- Transferir valores entre Contas                ");
console.log("9- Buscar Conta por Titular                       ");
console.log("10- Fale com um de nossos Atendentes!             ");
console.log("0- Sair                                           \n");
console.log("◎━━━━━━◎━━━━━━◎◎━━━━━━◎━━━━━━◎◎━━━━━━◎━━━━━━◎\n", Colors.reset);
    opcao = leia.questionInt("Escolha uma opcao: ");

    if (opcao === 0) break;

    switch (opcao) {
        case 1:
            const numero = contas.length + 1;
            const titular = leia.question("Nome do Titular: ");
            const saldo = parseFloat(leia.question("Saldo inicial: "));
               contas.push({numero, titular, saldo});

               console.log(Colors.fg.green, `Parabéns, ${titular}! Sua conta de numero ${numero} foi criada com sucesso!${Colors.reset}`);
               break;
        case 2:
           if (contas.length === 0) {
               console.log("Nenhuma Conta no momento.");
           } else {
               contas.forEach(c =>
                     console.log(`#${c.numero}: ${c.titular} - R$${c.saldo}`));
           }
           break;
           case 3:
                  const numBuscar = leia.questionInt("Numero da conta: ");
                  const conta = contas.find(c => c.numero === numBuscar);

                  if (conta) {
                      console.log(`Conta: ${conta.titular} - Saldo: R$${conta.saldo}`);
                  } else {
                      console.log("Conta não encontrada!");
                  }
              break;

            case 10:
    console.log(Colors.fg.blue, "\nFALE CONOSCO - BANCO ZED 👾", Colors.reset);
    console.log(" _________________________ ");
    
    const nome = leia.question("Seu nome: ");
    const email = leia.question("Seu email: ");
    const duvida = leia.question("Descreva sua duvida: ");
    
    console.log(" _________________________ ");
    console.log(Colors.fg.green, "✅ Mensagem enviada com sucesso!", Colors.reset);
    console.log("Um de nossos atendentes entrara em contato em breve.");
    console.log("Banco Zed agradece! 👾");
    console.log(" _________________________ \n");
    break;

           default:
                  console.log(Colors.fg.red, `Opcao invalida!${Colors.reset}`);
      }
      leia.question("\nPressione Enter...");
}
console.log("O Banco Zed agradece, volte sempre! 👾");
console.log("\n ___________________________________");
console.log("\n Projeto criado por Gabriela Almeida");
console.log("Github: https://github.com/Gaalmeida-dev");
console.log("Linkedin: https://www.linkedin.com/in/gabriela-almeida-escalera-dos-santos-27022b3a0/");

}

main();
