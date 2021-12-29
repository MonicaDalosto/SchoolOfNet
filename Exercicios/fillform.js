// Código para consultar o Cep:

const configs = {
  method: "GET"
}

const searchCep = (event) => {

  search()

  // Stop event default
  event = event || window.event

  if (event.preventDefault){
    event.preventDefault()
  }

  // if (event.preventValue) {
  //   event.preventValue()
  // }
  
  return false

}

const search = async () => {

  const cep = document.getElementById('cep').value || '00000000'
  
  try {
    const result = await fetch(`https://ws.apicep.com/cep/${cep}.json`, configs)
    const data = await result.json();

    if (data.status === 404) {
      throw data.message
    }

    console.log(data)
    showResults(data)

  } catch (error) {
    console.log(error)
    swal('Erro!', error, 'error');
  }
}

const form = document.getElementById('form');
const fullName = document.getElementById('fullName')
const email = document.getElementById("email");
const cep = document.getElementById('cep')
const street = document.getElementById('street')
const number = document.getElementById('number')
const district = document.getElementById('district')
const city = document.getElementById('city')
const state = document.getElementById('state')

// Código para adicionar o resultado da consulta Cep aos campos de endereço:

const showResults = (address) => {
  street.value = address.address
  district.value = address.district
  city.value = address.city
  state.value = address.state
}

// Código para validação do formulário:

// Essa função evita que o formulário seja submetido antes da validação ser realizada:
form.addEventListener('submit', event => { // entender melhor a parte do 'e'...
  event.preventDefault(); // para o comportamento padrão do sistema (enviar o formulário).

  validateInputs(); // chama a função de validação que vai ser escrita mais abaixo.
});

// Função que define o comportamento do campo do formulário em caso de erro na validação:
const setError = (element, message) => { // arrow function vai receber dois parâmetros, o 1º é a tag do campo preenchido e o 2º é a mensagem de erro a ser mostrada;
  const inputControl = element.parentElement; // a constante recebe o elemento pai do campo preenchido;
  const errorDisplay = inputControl.querySelector('.errorMessage'); // a constante recebe o elemento com a classe .errorMessage dentro do elemento pai do campo preenchido;
  console.log(errorDisplay);
  errorDisplay.innerText = message; // o campo com a classe .errorMessage vai receber o valor recebido no segundo argumento da função;
  inputControl.classList.add('error'); // o elemento pai do campo preenchido irá receber a classe .error, que no CSS está estilizada com borda vermelha;
  inputControl.classList.remove('success'); // a classe .success será removida do elemento pai do campo preenchido.
}


// Função que define o comportamento do campo do formulário em caso de validação positiva:
const setSuccess = (element) => { // arrow function com parâmetro element, o argumento será a tag do campo preenchido;
  const inputControl = element.parentElement; // a constante recebe o elemento pai do campo preenchido;
  const errorDisplay = inputControl.querySelector('.errorMessage'); // a constante recebe o elemento com a classe .errorMessage dentro do elemento pai do campo preenchido;

  errorDisplay.innerText = ''; // o campo com a classe .errorMessage vai receber valor em branco;
  inputControl.classList.add('success'); // o elemento pai do campo preenchido vai receber a classe .success, que no CSS está estilizada com borda verde;
  inputControl.classList.remove('error'); // a classe .error será removida do elemento pai do campo preenchido.
}

// Função para validar o e-mail válido:
const isValidEmail = (email) => { // a arrow function vai validar se o e-mail digitado bate com a regex e retornar um boolean;
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // a constante re (regular expression) é uma forma de validação dos caracteres do e-mail;
  return re.test(String(email).toLowerCase()); //Returns a Boolean value that indicates whether or not a pattern exists in a searched string.
}

// Função para validar se o cep é válido (não dá pra usar o retorno da função search() porque o user pode alterar o número do campo)
const isValidCep = (cep) => {
  const numbers = /^[0-9]{8}$/;
  return numbers.test(String(cep));
}

// Função para validar se o campo número está preenchido somente com números ou com s/n:
const isValidNumber = (number) => {
  const numbers = /^[0-9]$/;
  return numbers.test(String(number));
}

// Função que fará a validação dos inputs:
const validateInputs = () => {
  const fullNameValue = fullName.value.trim(); // Cada constante receberá o valor digitado no campo, a função .trim() retira os espaços em branco do campo;
  const emailValue = email.value.trim();
  const cepValue = cep.value.trim();
  const streetValue = street.value.trim();
  const numberValue = number.value.toLowerCase().trim()
  const districtValue = district.value.trim();
  const cityValue = city.value.trim();
  const stateValue = state.value.trim();

  if(fullNameValue === '') {
    setError(fullName, 'É necessário preencher o nome'); 
  } else {
    setSuccess(fullName);
  }

  if(emailValue === '') { // Se o campo estiver vazio...
    setError(email, 'É necessário preencher um endereço de e-mail'); // chama a função setError()
  } else if(!isValidEmail(emailValue)) { // Se o campo estiver preenchido, mas não bater com o padrão verificado na função isValidEmail()...
    setError(email, 'Informe um endereço de e-mail válido!'); // chama a função setError()
  } else { // Se o campo passou nas validações acima...
    setSuccess(email); // chama a função setSuccess().
  }

  if(isValidCep(cepValue)) {
    setSuccess(cep);
  } else {
    setError(cep, 'Informe um Cep válido!');
  }

  if(streetValue === '') {
    setError(street, 'Informe um endereço válido!');
  } else {
    setSuccess(street);
  }

  if (numberValue === 's/n' || isValidNumber(numberValue)) {
    setSuccess(number);
  } else {
    setError(number, 'Informe um número ou s/n!');
  }

  if(districtValue === '') {
    setError(district, 'Informe um bairro válido!');
  } else {
    setSuccess(district);
  }

  if(cityValue === '') {
    setError(city, 'Informe uma cidade válida!');
  } else {
    setSuccess(city);
  }

  if(stateValue === '') {
    setError(state, 'Informe um estado válido!');
  } else {
    setSuccess(state);
  }
}

