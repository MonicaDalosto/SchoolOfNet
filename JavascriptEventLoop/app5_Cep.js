const configs = {
  method: "GET"
}

const results = document.getElementById('results')

const searchCep = (event) => {
  
  startPreloader()

  results.style.display = 'none'

  const cep = document.getElementById('cep').value || '00000000'
  
  fetch(`https://ws.apicep.com/cep/${cep}.json`, configs)
  .then(response => {
    return response.json()
  })
  .then(data => {
    console.log(data)

    if (data.status === 0) throw data.message

    showResults(data)
  
  })
  .catch(error => {
    console.log(error)

    swal('Erro!', error.toString(), 'error');
  })
  .finally(() => endPreloader())

  // Stop event default
  event = event || window.event
  if (event.preventDefault) event.preventDefault()
  if (event.preventValue) event.preventValue()
  return false

}

const showResults = (address) => {
  results.style.display = 'block'

  const html = `
  <ul class="list-group">
        <li class="list-group-item"><strong>Cep:</strong> ${address.code} </li>
        <li class="list-group-item"><strong>Rua:</strong> ${address.address} </li>
        <li class="list-group-item"><strong>Bairro:</strong> ${address.district} </li>
        <li class="list-group-item"><strong>Cidade:</strong> ${address.city} </li>
        <li class="list-group-item"><strong>Estado:</strong> ${address.state} </li>
        
  </ul>
  `
  results.innerHTML = html
}