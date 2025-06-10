function fillForm(data) {
    document.getElementById('enderecoRegistro').value = data.logradouro;
    document.getElementById('numRegistro').value = data.complemento;
    document.getElementById('bairroRegistro').value = data.bairro;
    document.getElementById('cidadeRegistro').value = data.localidade;
    document.getElementById('estadoRegistro').value = data.uf;
}

async function searchCep() {
    const cep = document.getElementById('cepRegistro').value;
    const url = `https://viacep.com.br/ws/${cep}/json`;
    fetch(url)
    .then(async (response) => {
        let data = await response.json();
        console.log(data);
        fillForm(data);
    })
    // const data = await fetch(url);
    // const address = await data.json(); 
}

document.getElementById('cepRegistro').addEventListener('focusout', searchCep);