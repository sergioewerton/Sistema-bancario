const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let saldo = 2500.0;
const limite = 1000.0;
let extrato = "";
let limiteSaque = 3;
let saquesRealizados = 0;

console.log(`
       ==========Menu============

      1 - Depositar
      2 - Sacar 
      0 - Sair

        Obrigado por usar nosso banco!
`);

function menu() {
  rl.question("Escolha uma opção: ", (input) => {
    const opcao = parseInt(input);
    if ([0, 1, 2].includes(opcao)) {
      switch (opcao) {
        case 1:
          rl.question("Digite o valor a ser depositado: ", (valorStr) => {
            const valor = parseFloat(valorStr);
            saldo = depositar(saldo, valor);
            console.log(`Seu novo saldo é: R$ ${saldo.toFixed(2)}`);
            rl.close();
          });
          break;

        case 2:
          rl.question("Digite o valor a ser sacado: ", (valorStr) => {
            const valor = parseFloat(valorStr);
            if (valor > saldo) {
              console.log("Saldo insuficiente!");
            } else if (valor > limite) {
              console.log("Valor acima do limite de saque!");
            } else {
              saldo -= valor;
              console.log(`Saque de R$ ${valor.toFixed(2)} realizado com sucesso!`);
              console.log(`Seu novo saldo é: R$ ${saldo.toFixed(2)}`);
            }
            rl.close();
          });
          break;

        case 0:
          console.log("Obrigado por usar nosso banco! Até logo!");
          rl.close();
          break;
      }
    } else {
      console.log("Opção inválida! Tente novamente.");
      menu(); // Reexibe o menu
    }
  });
}

function depositar(saldo, valor) {
  if (valor > 0) {
    saldo += valor;
    console.log(`Depósito de R$ ${valor.toFixed(2)} realizado com sucesso!`);
  } else {
    console.log("Valor inválido para depósito.");
  }
  return saldo;
}

menu(); // Inicia o menu
