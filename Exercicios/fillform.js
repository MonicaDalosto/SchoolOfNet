const configs = {
  method: "GET"
}

// Criação das constantes para receber os elementos HTML que serão validados mais abaixo:
const form = document.getElementById('form');
const fullName = document.getElementById('fullName');
const birthday = document.getElementById('birthday')
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const cep = document.getElementById('cep');
const searchCep = document.getElementById('searchCep');
const street = document.getElementById('street');
const numberAddress = document.getElementById('numberAddress');
const district = document.getElementById('district');
const city = document.getElementById('city');
const state = document.getElementById('state');
const letter = document.getElementById('letter');
const capitalLetter = document.getElementById('capitalLetter');
const numberCharacter = document.getElementById('numberCharacter');
const specialCharacter = document.getElementById('specialCharacter');
const lengthPassword = document.getElementById('lengthPassword');

// Código para validação, consulta e autopreenchimento do Cep:
// Como eu alterei o type de Submit para Button, não precisa mais usar o preventDefault() da página nesse momento.
searchCep.addEventListener('click', () => { // o event é um parâmetro da arrow function
  search(); // chama a função de validação que vai ser escrita mais abaixo.
});

const search = async () => { // função assíncrona, pois depende de retorno externo à página.

  const cepValue = cep.value // constante recebe o value da constante cep, que recebeu acima o elemento html 'input cep'.
  
  try {
    if(!isValidCep(cepValue)) { // invoka a função de validação de cep mais abaixo, se não for válido...
      setError(cep, 'Informe um Cep válido!'); // chama a função setError(),
      swal('Erro!', 'Informe um Cep válido!', 'error'); // e dispara um alerta na tela com a mensagem de erro.
    } else {                                            // se o cep for válido...
      const result = await fetch(`https://ws.apicep.com/cep/${cepValue}.json`, configs) // executa o request na API externa usando fetch()
      const data = await result.json();

      if (data.status >= 400 && data.status < 500) { // valida pelo código do status se o retorno do request foi inválido...
        console.log(data)
        throw data.message // envia o value da message de retorno para catch
      }
      console.log(data)
      showResults(data) // se o retorno do request for válido, invoka a função showResults() com os dados retornados.
    }
  } catch (error) {
    console.log(error)
    if(error == 'Blocked by flood') { // valida o teor do erro para definir o tipo da mensagem exibida ao usuário. Validação feita pela message, pois é o valor recebido (de throw) pelo catch(error).
      swal('Erro!', 'Você excedeu o limite de solicitações. É necessário alterar o país da sua VPN!', 'error');
    } else {
      swal('Erro!', error, 'error');
    }
  }
}

// Código para adicionar o resultado da consulta Cep aos campos de endereço:
const showResults = (address) => {
  street.value = address.address
  if(street.value !== '') {
    validateStreet(street);
  }

  district.value = address.district
  if(district.value !== '') {
    validateDistrict(district);
  }

  city.value = address.city
  if(city.value !== '') {
    validateCity(city);
  }

  state.value = address.state
  if(state.value !== '') {
    validateState(state);
  }
}

// Código para validação do formulário:

// Essa função evita que o formulário seja submetido antes da validação ser realizada:
form.addEventListener('submit', event => { // o event é um parâmetro da arrow function
  event.preventDefault(); // para o comportamento padrão do sistema (enviar o formulário).

  submitInputs(); // chama a função de validação que vai ser escrita mais abaixo.
});

// Função que define o comportamento do campo do formulário em caso de erro na validação:
const setError = (element, message) => { // arrow function vai receber dois parâmetros, o 1º é a tag do campo preenchido e o 2º é a mensagem de erro a ser mostrada;
  const inputControl = element.parentElement; // a constante recebe o elemento pai do campo preenchido;
  const errorMessage = inputControl.querySelector('.errorMessage'); // a constante recebe o elemento com a classe .errorMessage dentro do elemento pai do campo preenchido;
  console.log(errorMessage);
  errorMessage.innerText = message; // o campo com a classe .errorMessage vai receber o valor recebido no segundo argumento da função;
  inputControl.classList.add('error'); // o elemento pai do campo preenchido irá receber a classe .error, que no CSS está estilizada com borda vermelha;
  inputControl.classList.remove('success'); // a classe .success será removida do elemento pai do campo preenchido.
  inputControl.classList.remove('underAge');
}


// Função que define o comportamento do campo do formulário em caso de validação positiva:
const setSuccess = (element) => { // arrow function com parâmetro element, o argumento será a tag do campo preenchido;
  const inputControl = element.parentElement; // a constante recebe o elemento pai do campo preenchido;
  const errorMessage = inputControl.querySelector('.errorMessage'); // a constante recebe o elemento com a classe .errorMessage dentro do elemento pai do campo preenchido;

  errorMessage.innerText = ''; // o campo com a classe .errorMessage vai receber valor em branco;
  inputControl.classList.add('success'); // o elemento pai do campo preenchido vai receber a classe .success, que no CSS está estilizada com borda verde;
  inputControl.classList.remove('error'); // a classe .error será removida do elemento pai do campo preenchido.
  inputControl.classList.remove('underAge');
}

const setUnderAge = (element, message) => {
  const inputControl = element.parentElement;
  const errorMessage = inputControl.querySelector('.errorMessage');
  console.log(errorMessage);
  errorMessage.innerText = message;
  inputControl.classList.add('underAge');
  inputControl.classList.remove('error');
  inputControl.classList.remove('success'); 
}

// Criaremos uma função de validação para cada input e a função de validação ao submeter vai validar as funções anteriores:

// Função para validar se o nome é válido:
const validateFullName = (element) => {
  const fullNameValue = element.value.trim();
  if(fullNameValue === '' || fullNameValue.lenght < 6) {
    setError(element, 'É necessário preencher o nome'); 
  } else {
    setSuccess(element);
    return true;
  }
}

fullName.onblur = () => {
  validateFullName(fullName);
}

function isOverAge(birthday) {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentDay = new Date().getDate();
  const birthdayYear = Number(birthday.split('-')[0]);
  const birthdayMonth = Number(birthday.split('-')[1]);
  const birthdayDay = Number(birthday.split('-')[2]);
  
  if(birthdayYear < 1900 || birthdayYear > currentYear) {
    return age = -1;
  } else if(currentYear - birthdayYear > 18 || ((currentYear - birthdayYear == 18) && (currentMonth - birthdayMonth > 0)) || ((currentYear - birthdayYear == 18) && (currentMonth - birthdayMonth == 0) && (currentDay - birthdayDay >= 0))) {
    return age = 1;
  } else {
    return age = 0
  }
}

const validateBirthday = (element) => {
  birthdayValue = element.value.trim();
  console.log(birthday);
  if(birthdayValue === '') {
    setError(element, 'É necessário informar a data de Nascimento'); 
  } else if(isOverAge(birthdayValue) == -1) {
    setError(element, 'O ano de nascimento informado é inválido');
  } else if(isOverAge(birthdayValue) == 0) {
    setUnderAge(element, 'Você é menor de idade. Peça a autorização dos seus pais para concluir o cadastro!'); 
  } else {
    setSuccess(element);
    return true;
  }
}

birthday.onblur = () => {
  validateBirthday(birthday);
}

// Funções para validar o e-mail válido:
function isValidEmail(email) {
  const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // a constante re (regular expression) é uma forma de validação dos caracteres do e-mail;
  return regexEmail.test(String(email).toLowerCase()); //Returns a Boolean value that indicates whether or not a pattern exists in a searched string.
}

const validateEmail = (element) => {
  const emailValue = element.value.trim();
  if(emailValue === '') { // Se o campo estiver vazio...
    setError(element, 'É necessário preencher um endereço de e-mail'); // chama a função setError()
  } else if(!isValidEmail(emailValue)) { // Se o campo estiver preenchido, mas não bater com o padrão verificado na função isValidEmail()...
    setError(element, 'Informe um endereço de e-mail válido!'); // chama a função setError()
  } else { // Se o campo passou nas validações acima...
    setSuccess(element); // chama a função setSuccess().
    return true;
  }
}

email.onblur = () => {
  validateEmail(email);
}

// Função para validar se a senha é válida, o padrão deve ser:
// ^	The password string will start this way;
// (?=.*[a-z])	The string must contain at least 1 lowercase alphabetical character;
// (?=.*[A-Z])	The string must contain at least 1 uppercase alphabetical character;
// (?=.*[0-9])	The string must contain at least 1 numeric character;
// (?=.*[!@#$%^&*])	The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict;
// (?=.{8,})	The string must be eight characters or longer;
// regex pattern = ("^(patternRequired)(sizeRequired)");
const isValidPassword = (password) => {
  const passwordValue = password.value;
  const regexPassword = new RegExp("(^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]))(?=.{8,}))");
  return regexPassword.test(passwordValue);
  
}

const validatePassword = (element) => {
  // Validação da senha, ainda falta comparar com o nome e com a data de nascimento:
  const passwordValue = element.value.trim();
  if(passwordValue === '' || !isValidPassword(element)) {
    setError(element, 'Informe uma senha válida!');
  } else if(email.value.trim() !== '' && passwordValue.toLowerCase().match(email.value.trim().toLowerCase())) {
    setError(element, 'Informe uma senha válida, diferente do seu e-mail!');
  } else if(fullName.value.trim() !== '' && passwordValue.toLowerCase().match(fullName.value.trim().toLowerCase())) {
    setError(element, 'Informe uma senha válida, diferente do seu nome!');
  } else {
    setSuccess(element);
    return true;
  }
}

// Código para quando o usuário clicar no campo Senha, mostrar o campo da Mensagem do padrão de senha:
password.onfocus = () => {
  document.getElementById('passwordMessage').style.display = "block";
}
// Código para ocultar o campo da Mensagem quando o usuário tirar o foco do campo Senha:
password.onblur = () => {
  document.getElementById('passwordMessage').style.display = "none";
  validatePassword(password);
  validateConfirmPassword(confirmPassword);
}
// Código para validar o que o usuário digita no campo Senha:
password.onkeyup = () => {
  // Validar letras minúsculas:
  const LowerCaseLetter = /[a-z]/g;
  if(password.value.match(LowerCaseLetter)) { // se a verificação for true...
    letter.classList.remove('invalid'); // remove a classe 'invalid' que tem a estilização na cor vermelha;
    letter.classList.add('valid'); // adiciona a classe 'valid' que tem a estilização na cor verde;
  } else {                          // se for false... inverte as classes.
    letter.classList.remove('valid');
    letter.classList.add('invalid');
  }
  // Validar letras maiúsculas:
  const UpperCaseLetter = /[A-Z]/g;
  if(password.value.match(UpperCaseLetter)) {
    capitalLetter.classList.remove('invalid');
    capitalLetter.classList.add('valid');
  } else {
    capitalLetter.classList.remove('valid');
    capitalLetter.classList.add('invalid');
  }
  // Validar número:
  const numberCharacterExists = /[0-9]/g;
  if(password.value.match(numberCharacterExists)) {
    numberCharacter.classList.remove('invalid');
    numberCharacter.classList.add('valid');
  } else {
    numberCharacter.classList.remove('valid');
    numberCharacter.classList.add('invalid');
  }
  // Validar Caractere Especial:
  const specialCharacterExists = /[!@#$%^&*]/g;
  if(password.value.match(specialCharacterExists)) {
    specialCharacter.classList.remove('invalid');
    specialCharacter.classList.add('valid');
  } else {
    specialCharacter.classList.remove('valid');
    specialCharacter.classList.add('invalid');
  }
  // Validar Comprimento de 8 caracteres: ^
  if(password.value.length >= 8) {
    lengthPassword.classList.remove('invalid');
    lengthPassword.classList.add('valid');
  } else {
    lengthPassword.classList.remove('valid');
    lengthPassword.classList.add('invalid');
  }
}

// Função para validar a confirmação da senha:
const validateConfirmPassword = (element) => {
  const confirmPasswordValue = element.value.trim();
  if(confirmPasswordValue === '') {
    setError(element, 'Confirme sua senha!');
  } else if(confirmPasswordValue !== password.value.trim()) {
    setError(element, 'As senhas informadas são diferentes!');
  } else { 
    setSuccess(element);
    return true;
  }
}

confirmPassword.onblur = () => {
  validateConfirmPassword(confirmPassword);
}

// Função para validar se o cep é válido (não dá pra usar o retorno da função search() porque o user pode alterar o número do campo)
const isValidCep = (cep) => {
  const regexCep = /^[0-9]{8}$/;
  return regexCep.test(String(cep));
}

const validateCep = (element) => {
  const cepValue = element.value.trim();
  if(isValidCep(cepValue)) {
    setSuccess(element);
    return true;
  } else {
    setError(element, 'Informe um Cep válido!');
  }
}

cep.onblur = () => {
  validateCep(cep);
}

// Função para validar se o campo logradouro está preenchido:
const validateStreet = (element) => {
  const streetValue = element.value.trim();
  if(streetValue === '' || streetValue.lenght < 3) {
    setError(element, 'Informe um endereço válido!');
  } else {
    setSuccess(element);
    return true;
  }
}

street.onblur = () => {
  validateStreet(street);
}

// Função para validar se o campo número do endereço está preenchido somente com números ou com s/n:
const isValidNumber = (numberAddress) => {
  const regexNumber = /^[0-9]{1,}$/;
  return regexNumber.test(String(number));
}

const validateNumberAddress = (element) => {
  const numberAddressValue = element.value.toLowerCase().trim();
  if (numberAddressValue === 's/n' || (isValidNumber && numberAddressValue > 0)) {
    setSuccess(element);
    return true;
  } else {
    setError(element, 'Informe um número ou s/n!');
  }
}

numberAddress.onblur = () => {
  validateNumberAddress(numberAddress);
}

const validateDistrict = (element) => {
  const districtValue = element.value.trim();
  if(districtValue === '' || districtValue.lenght < 3) {
    setError(element, 'Informe um bairro válido!');
  } else {
    setSuccess(element);
    return true;
  }
}

district.onblur = () => {
  validateDistrict(district)
}

const validateCity = (element) => {
  const cityValue = element.value.trim();
  if(cityValue === '' || cityValue.lenght < 3) {
    setError(element, 'Informe uma cidade válida!');
  } else {
    setSuccess(element);
    return true;
  }
}

city.onblur = () => {
  validateCity(city);
}

const validateState = (element) => {
  const stateValue = element.value.trim();
  if(stateValue === '' || stateValue.lenght < 3) {
    setError(element, 'Informe um estado válido!');
  } else {
    setSuccess(element);
    return true;
  }
}

state.onblur = () => {
  validateState(state);
}

// Função para limpar os campos do formulário, no futuro posso dividir a função em duas: uma para pegar os ids dos elementos e outra para limpar os campos. Com isso poderei invocar a função pegar os IDs em outras funções.
const cleanInputs = () => {
  const inputFields = document.getElementsByClassName("inputField");
  for (fieldElement of inputFields) {
    const inputElement = fieldElement;
    const inputControl = fieldElement.parentElement;
    const errorMessage = inputControl.querySelector('.errorMessage');
    inputElement.value = '';
    errorMessage.innerText = '';
    inputControl.classList.remove('success');
    inputControl.classList.remove('underAge');
  }
}

const validateClassError = () => {
  const errorMessageClass = document.getElementsByClassName("error");
  console.log('função executada');
  if(errorMessageClass.length > 0) {
    return true;
  }
}

// Função que fará a validação dos inputs e a submissão do formulário:
const submitInputs = () => {

  validateFullName(fullName);
  validateBirthday(birthday);
  validateEmail(email);
  validatePassword(password);
  validateConfirmPassword(confirmPassword);
  validateCep(cep);
  validateStreet(street);
  validateNumberAddress(numberAddress);
  validateDistrict(district);
  validateCity(city);
  validateState(state);

  if (validateClassError()) {
    console.log('Deu erro!');
    swal('Dados inválidos!', 'Verifique os campos em vermelho!', 'error');
  } else {
    console.log('Deu certo!')
    cleanInputs();
    swal('Feito!', 'Dados salvos com sucesso!', 'success');
  }
}
