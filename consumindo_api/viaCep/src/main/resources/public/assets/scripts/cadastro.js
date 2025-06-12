function fillForm(data) {
    document.getElementById('enderecoRegistro').value = data.logradouro;
    document.getElementById('numRegistro').value = data.complemento;
    document.getElementById('bairroRegistro').value = data.bairro;
    document.getElementById('cidadeRegistro').value = data.localidade;
    document.getElementById('estadoRegistro').value = data.uf;
}

const isNumber = (num) => /^[0-9]+$/.test(num);

const isCepValid = (cep) => cep.length == 8 && isNumber(cep);

async function searchCep() {
    const cep = document.getElementById('cepRegistro').value;
    const url = `https://viacep.com.br/ws/${cep}/json`;
    if(isCepValid(cep)) {
        fetch(url)
        .then(async (response) => {
            let data = await response.json();
            console.log(data);
            if(data.hasOwnProperty('erro')) {
                document.getElementById('enderecoRegistro').value = "CEP não encontrado!";
                clearForm(false);
            }
            else {
                fillForm(data);
            }
        })
    }
    else {
        document.getElementById('enderecoRegistro').value = "CEP não encontrado!";
        clearForm(false);
    }
}

document.getElementById('cepRegistro').addEventListener('focusout', searchCep);


function GET() {
    fetch('http://localhost:8080/funcionarios', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        
    })
    .catch(error => {
    console.log(error);
    });
}

function POST(nome, email, senha, cep, endereco, numero, bairro, cidade, estado) {
    fetch('http://localhost:8080/funcionarios', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({"nome":nome,
                                "email":email,
                                "senha":senha,
                                "cep":cep,
                                "endereco":endereco,
                                "numero":numero,
                                "bairro":bairro,
                                "cidade":cidade,
                                "estado":estado})
        })
        .then(response => response.json())
        .then(data => {
          console.log("Resposta da API:", data);
        })
        .catch(error => {
          console.error("Erro ao enviar dados:", error);
        })
  }

function clearForm(all) {
    if(all) {
        document.getElementById('nomeRegistro').value = '';
        document.getElementById('emailRegistro').value = '';
        document.getElementById('senhaRegistro').value = '';
        document.getElementById('cepRegistro').value = '';
        document.getElementById('enderecoRegistro').value = '';
    }
    document.getElementById('numRegistro').value = '';
    document.getElementById('bairroRegistro').value = '';
    document.getElementById('cidadeRegistro').value = '';
    document.getElementById('estadoRegistro').value = '';
}

function insert() {
      event.preventDefault();
      const nome = document.getElementById('nomeRegistro').value;
      const email = document.getElementById('emailRegistro').value;
      const senha = document.getElementById('senhaRegistro').value;
      const cep = document.getElementById('cepRegistro').value;
      const endereco = document.getElementById('enderecoRegistro').value;
      const numero = document.getElementById('numRegistro').value;
      const bairro = document.getElementById('bairroRegistro').value;
      const cidade = document.getElementById('cidadeRegistro').value;
      const estado = document.getElementById('estadoRegistro').value;
      if(nome && email && senha && cep && endereco
        && numero && bairro && cidade && estado) {
        clearForm(true);
        POST(nome, email, senha, cep, endereco, numero, bairro, cidade, estado);
        Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: 'Cadastro realizado com sucesso.',
            color: 'white',
            background: '#212529',
            confirmButtonColor: '#DC3746'
        });
    } else {
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Dados inválidos! Preencha todos os campos com dados válidos.',
          color: 'white',
          background: '#212529',
          confirmButtonColor: '#DC3746'
        });
    }
}