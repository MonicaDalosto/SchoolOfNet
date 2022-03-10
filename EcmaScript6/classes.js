class Pessoa {
  constructor(nome, altura, sexo) {
    this.nome = nome;
    this.altura = altura;
    this.sexo = sexo;
  }

  getAltura() {
    return this.altura;
  }
}

const pessoa = new Pessoa('luis carlos', '1.88', 'm');

console.log(pessoa);

console.log(pessoa.nome);
console.log(pessoa.getAltura());