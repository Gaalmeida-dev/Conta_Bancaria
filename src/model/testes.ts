import test, { describe, beforeEach } from 'node:test';
import assert from 'node:assert';
import { Conta } from '../model/Conta';

describe('Classe Conta', () => {
  let conta: Conta;

  beforeEach(() => {
    conta = new Conta(12345, 1001, "Teste", 1, 1000);
  });

  test('instancia certa', () => {
    assert.strictEqual(conta.numero, 12345);
    assert.strictEqual(conta.agencia, 1001);
    assert.strictEqual(conta.titular, "Teste");
    assert.strictEqual(conta.tipo, 1);
    assert.strictEqual(conta.saldo, 1000);
  });

  test('depositar valor positivo', () => {
    const saldoAntes = conta.saldo;
    conta.depositar(500);
    assert.strictEqual(conta.saldo, saldoAntes + 500);
  });

  test('depositar valor <=0 não altera saldo', () => {
    const saldoAntes = conta.saldo;
    conta.depositar(0);
    assert.strictEqual(conta.saldo, saldoAntes);
  });

  test('sacar valor aceito retorna true', () => {
    const resultado = conta.sacar(200);
    assert.strictEqual(resultado, true);
    assert.strictEqual(conta.saldo, 800);
  });

  test('sacar valor > saldo retorna false', () => {
    const resultado = conta.sacar(2000);
    assert.strictEqual(resultado, false);
    assert.strictEqual(conta.saldo, 1000);
  });

  test('sacar valor <=0 retorna false', () => {
    const resultado = conta.sacar(0);
    assert.strictEqual(resultado, false);
    assert.strictEqual(conta.saldo, 1000);
  });
});



