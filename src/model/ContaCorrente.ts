import { Colors } from "../util/Colors";
import { Conta } from "./Conta";

export class ContaCorrente extends Conta{
  getLimite() {
    throw new Error('Method not implemented.');
  }
  setLimite(arg0: number) {
    throw new Error('Method not implemented.');
  }
    //Atributos específicos de conta corrente
    private _limite: number;

    constructor(
        numero: number, 
        agencia: number, 
        titular: string, 
        tipo: number, 
        saldo: number,
        limite: number) {
            super(numero, agencia, titular, tipo, saldo);
        this._limite = limite;
    }

//Métodos get e set específico da conta corrente
	public get limite(): number {
		return this._limite;
	}

    public set limite(value: number) {
        this._limite = value;
    }

 // Método Sacar
    public sacar(valor: number): boolean {
        if (valor <= 0) {
            console.log(Colors.fg.red, "\nOperação Inválida! O valor deve ser maior que zero.", Colors.reset);
            return false;
        }

        if ( valor > (this.saldo + this._limite)) {
            console.log(
                Colors.fg.red, 
                "\nSaldo insuficiente!", 
                Colors.reset
            );
            return false;
        }

        this.saldo -= valor;
        return true;

    }
//polimorfismo
    public visualizar(): void {
        super.visualizar();
        console.log(`Limite da Conta: ${this._limite}`);
    }


}