const configs = {
  method: "GET"
}

const results = document.getElementById('results')

const searchCep = (event) => {
  startPreloader()

  results.style.display = 'none'

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
    const data = await result.json()
    console.log(data)

    if (data.status === 404) {
      throw data.message
    }

    console.log(data)
    showResults(data)

  } catch (error) {
    console.log(error)
    swal('Erro!', error, 'error');
  }
  
  endPreloader()
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