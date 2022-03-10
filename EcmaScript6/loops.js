// let array = [1, 2, 3, 4, 5, 6];
let array = [
  {
    first_name: 'luiz',
    last_name: 'carlos'
  },
  {
    first_name: 'pedro',
    last_name: 'silva'
  },
  {
    first_name: 'ana',
    last_name: 'souza'
  },
  {
    first_name: 'maria',
    last_name: 'joana'
  }
];

let obj = {
  first_name: 'luiz',
  last_name: 'carlos'
};

// FOR... IN...: retorna o índice/propriedade(keys);

// Para Arrays: o 'i' receberá o índice do array, para retornar os valores do array é necessário executar 'array[i]';
for (let i in array) {
  console.log(i, array[i]); 
}

// Para Array de Objetos: eu teria que fazer dois For...In... para retornar somente os valores:
for (let i in array) {      // o primeiro 'i' receberá o índice de 'array';
  let obj = array[i];       // o let 'obj' será um objeto que receberá o object de cada posição do array;
  for (let i in obj) {      // o segundo For...In... será de 'obj' e o 'i' receberá as propriedades dele;
    console.log(i, obj[i]); // o 'obj[i]' retorna os valores de cada propriedade dos objetos dentro do Array;
  }
}

// Para Objetos: o 'i' receberá a propriedade/keys do object, para retornar os valores do object é necessário executar 'obj[i]';
for (let i in obj) {
  console.log(i, obj[i]);
}

// FOR... OF...: retorna o valor de cada índice do array;

// Para Arrays: o 'value' receberá o valor de cada índice do array;
for (let value of array) {
  console.log(value);
}

// Para Objetos(objects): o código precisa de uma linha de código a mais:
// e mesmo assim, a  let 'keys' vai ser um array que receberá as propriedades/keys do objeto 'obj'...
let keys = Object.keys(obj); 
for(let key of keys) {
  console.log(obj[key]); // e para retornar os valores de 'obj' é necessário executar 'obj[key]';
}
// Consideração minha... Parece ser mais simples utilizar For...In... para o caso de object.
