import { ContaCorrente } from './ContaCorrente';
import test, { describe, beforeEach } from 'node:test';
import assert from 'node:assert';
import { Conta } from '../model/Conta';
import { ContaPoupanca } from './ContaPoupança';



describe('Classe Conta', () => {
  let conta: Conta;

  beforeEach(() => {
    conta = new Conta(12345, 1001, 'Teste', 1, 1000);
  });



  test('instancia certa', () => {
    assert.strictEqual(conta.numero, 12345);
    assert.strictEqual(conta.agencia, 1001);
    assert.strictEqual(conta.titular, 'Teste');
    assert.strictEqual(conta.tipo, 1);
    assert.strictEqual(conta.saldo, 1000);
  });



  test('depositar valor positivo', () => {
    console.log('Tentando depositar valor positivo...');
    console.log(`Saldo antes: R$ ${conta.saldo}`);
    const saldoAntes = conta.saldo;
    conta.depositar(500);
    console.log(`Saldo depois (depositado 500): R$ ${conta.saldo}`);
    assert.strictEqual(conta.saldo, saldoAntes + 500);
  });



  test('depositar valor <=0 não altera saldo', () => {
    console.log('Tentando depositar valor <= 0...');
    console.log(`Saldo antes: R$ ${conta.saldo}`);
    const saldoAntes = conta.saldo;
    conta.depositar(0);
    console.log(`Saldo depois: R$ ${conta.saldo}`);
    assert.strictEqual(conta.saldo, saldoAntes);
  });



  test('sacar valor aceito retorna true', () => {
    console.log('Tentando sacar valor aceito (dentro do saldo)...');
    console.log(`Saldo antes: R$ ${conta.saldo}`);
    const resultado = conta.sacar(200);
    console.log(`Saque de 200 realizado? ${resultado}`);
    console.log(`Saldo depois: R$ ${conta.saldo}`);
    assert.strictEqual(resultado, true);
    assert.strictEqual(conta.saldo, 800);
  });



  test('sacar valor > saldo retorna false', () => {
    console.log('Tentando sacar valor maior que o saldo...');
    console.log(`Saldo antes: R$ ${conta.saldo}`);
    const resultado = conta.sacar(2000);
    console.log(`Tentando sacar 2000. Resultado: ${resultado}`);
    console.log(`Saldo depois: R$ ${conta.saldo}`);
    assert.strictEqual(resultado, false);
    assert.strictEqual(conta.saldo, 1000);
  });



  test('sacar valor <=0 retorna false', () => {
    console.log('Tentando sacar valor <= 0...');
    console.log(`Saldo antes: R$ ${conta.saldo}`);
    const resultado = conta.sacar(0);
    console.log(`Tentando sacar 0. Resultado: ${resultado}`);
    console.log(`Saldo depois: R$ ${conta.saldo}`);
    assert.strictEqual(resultado, false);
    assert.strictEqual(conta.saldo, 1000);
  });



  // Instanciar objetos da Classe Conta

  const c1 = new Conta(1, 1234, 'Gabriela', 1, 100000.00);

  console.log('\n=== Conta corrente ===');
  c1.visualizar();
  console.log();

  console.log('Tentando sacar 100,00...');
  console.log('Sacar 100,00: ', c1.sacar(100.00));
  console.log('Saldo atual: R$', c1.saldo);

  console.log('\nTentando sacar 2.000.000,00 (valor indisponível)...');
  console.log('Sacar 2000000.00 : ', c1.sacar(2000000.00));
  console.log('Saldo atual: R$', c1.saldo);

  console.log('\nTentando sacar 0,00...');
  console.log('Sacar 0.00: ', c1.sacar(0));
  console.log('Saldo atual: R$', c1.saldo);

  console.log('\nTentando depositar valor negativo (-10.00)...');
  console.log('Depositar -10.00: ');
  c1.depositar(-10.00);
  console.log('Saldo atual: R$', c1.saldo);

  console.log('\nTentando depositar valor positivo (500.000,00)...');
  console.log('Depositar 500.000: ');
  c1.depositar(+500000.00);
  console.log('Saldo atual: R$', c1.saldo);



  // Teste Conta Corrente

  const cc1 = new ContaCorrente(2, 5678, 'Bianca', 1, 200000.00, 2000.00);

  console.log('\n=== Conta Corrente ===');
  cc1.visualizar();
  console.log();

  console.log('Tentando sacar 1000,00...');
  console.log('Sacar 1000,00: ', cc1.sacar(1000.00));
  console.log('Saldo atual: R$', cc1.saldo);

  console.log('\nTentando sacar 200.000,00 (valor maior que o limite)...');
  console.log('Sacar 200000.00 : ', cc1.sacar(200000.00));
  console.log('Saldo atual: R$', cc1.saldo);

  console.log('\nDepositando 500,00...');
  cc1.depositar(500.00);
  cc1.visualizar();



  // Teste Conta Poupança

  const contaPoup = new ContaPoupanca(
    1,
    5678,
    'Gabriela',
    2,
    150000.00,
    new Date(2006, 5, 13)
  );

  console.log('\n=== Conta Poupança ===');
  contaPoup.visualizar();
  console.log();

  console.log('Depositando 1000,00 na conta poupança...');
  contaPoup.depositar(1000);
  console.log('Novo saldo: R$', contaPoup.saldo);

  console.log('\nAplicando rendimento...');
  contaPoup.aplicarRendimento();
  console.log('Saldo após rendimento: R$', contaPoup.saldo);

  console.log('\nDados finais da conta poupança:');
  console.log(contaPoup.visualizar());

  contaPoup.depositar(1000);
  console.log('Saldo após depósito:', contaPoup.saldo);

  console.log('\nAplicando rendimento novamente...');
  contaPoup.aplicarRendimento();
  console.log('Saldo após tentativa de rendimento:', contaPoup.saldo);

  console.log('\nTentando sacar 1000,00 na conta poupança...');
  console.log('Sacar 1000,00: ', contaPoup.sacar(1000));
  console.log('Saldo após saque:', contaPoup.saldo);
});
