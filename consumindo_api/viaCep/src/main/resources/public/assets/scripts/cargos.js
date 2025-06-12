function GET() {
    fetch('http://localhost:8080/cargos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('tableBody').innerHTML = '';
        insertLine(data);
    })
    .catch(error => {
    console.log(error);
    });
}

GET();

function POST(nome, descricao) {
    fetch('http://localhost:8080/cargos', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "nome":nome,
            "descricao":descricao
            })
        })
    .then(response => response.json())
    .then(data => {
        console.log("Resposta da API:", data);
    })
    .catch(error => {
        console.error("Erro ao enviar dados:", error);
    })    
}

  
function DELETE(id) {
    fetch(`http://localhost:8080/cargos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log("Resposta da API:", data);
    })
    .catch(error => {
        console.error("Erro ao deletar dados:", error);
    })
}

function PUT(id, nome, descricao) {
    fetch(`http://localhost:8080/cargos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"nome":nome, "descricao":descricao})
    })
    .then(response => response.json())
    .then(data => {
        console.log("Resposta da API:", data);
    })
    .catch(error => {
        console.error("Erro ao deletar dados:", error);
    })
}

function clearForm() {
    document.getElementById('nomeCargo').value = '';
    document.getElementById('descCargo').value = '';
}

function insertLine(data){
    const table = document.getElementById('tableBody');
    data.forEach(element => {   
    const line = document.createElement('tr');
    line.innerHTML = `
          <tr>
          <td class="px-4 py-2 elementId">${element.id}</td>
              <td class="px-4 py-2 elementNome">${element.nome}</td>
              <td class="px-4 py-2 elementEmail">${element.descricao}</td>
              <td class="px-4 py-2">
              <button type="button" class="btn btn-danger" onclick="deleteLine(this)">Excluir</button>
              <button type="button" class="btn btn-warning" onclick="alter(this)">Editar</button>
              </td>
          </tr>
    `;    
    table.appendChild(line);
    });
}

function insert() {
      event.preventDefault();
      const nome = document.getElementById('nomeCargo').value;
      const descricao = document.getElementById('descCargo').value;
      if(nome && descricao) {
        this.insertLine([{"nome":nome.trim(), "descricao":descricao.trim()}]);
        clearForm();
        POST(nome, descricao);
        Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: 'Cargo cadastrado realizado com sucesso.',
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

function deleteLine(buttonData){
    Swal.fire({
        icon: 'question',
        title: 'Você tem certeza?',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
    })
    .then((result) => {
        if (result.isConfirmed) {
            const id = buttonData.parentElement.parentElement.firstElementChild.innerHTML;
            buttonData.parentElement.parentElement.remove();
            DELETE(id);
            Swal.fire('Confirmado!', '', 'success');
        } else {
          Swal.fire('Cancelado', '', 'info');
        }
    });
}
    
function edit() {
    event.preventDefault();
    const edit = document.getElementById('button_edit');
    let id = edit.classList.item(2);
    let tableList = document.getElementById('tableBody').children;
    for(let i = 0; i < tableList.length; i++) {
        let buttonId = tableList.item(i).children[0].children[3];
        console.log(tableList.item(i));
        console.log(buttonId);
        if(buttonId.classList.item(3) == id) {
            const nome = document.getElementById('nomeCargo').value;
            const descricao = document.getElementById('descCargo').value;
            if(nome && descricao) {
                tableList.item(i).innerHTML = `
                <tr>
                    <td class="px-4 py-2 elementId">${element.id}</td>
                    <td class="px-4 py-2 elementNome">${element.nome}</td>
                    <td class="px-4 py-2 elementEmail">${element.descricao}</td>
                    <td class="px-4 py-2">
                    <button type="button" class="btn btn-danger" onclick="deleteLine(this)">Excluir</button>
                    <button type="button" class="btn btn-warning" onclick="alter(this)">Editar</button>
                    </td>
                </tr>
                `;
                PUT(id, nome, descricao);
                i = tableList.length;
                cancelEdit();
            }
        }
    }
}

function alter(dadosbotao) {
    event.preventDefault();
    const childList = dadosbotao.parentElement.parentElement.children;
    console.log(childList.length);
    console.log(childList);
    let id = childList[0].innerHTML;
    let nome = childList[1].innerHTML;
    let descricao = childList[2].innerHTML;
    document.getElementById('nomeCargo').value = nome;
    document.getElementById('descCargo').value = descricao;
    const add = document.getElementById('button_add');
    const form = add.parentElement.parentElement;
    const newButton = document.createElement("button");
    newButton.classList = "btn btn-outline-light fw-bolder border-2";
    newButton.innerHTML = "Cancelar";
    newButton.id = 'button_cancel';
    newButton.setAttribute("onclick", "cancelEdit()");
    add.parentElement.appendChild(newButton);
    add.className = `btn btn-outline-warning ${id} fw-bolder border-2`;
    add.innerHTML = "Editar";
    add.id = 'button_edit';
    form.setAttribute("onsubmit", "edit()");
}

function cancelEdit() {
    clearForm();
    const edit = document.getElementById('button_edit');
    const form = edit.parentElement.parentElement;
    edit.className = 'btn btn-outline-light px-5 fw-bolder border-2';
    edit.innerHTML = "Cadastrar";
    edit.id = 'button_add';
    form.setAttribute("onsubmit", "insert()");
    document.getElementById('button_cancel').remove();
    console.log(form.onsubmit.toString());
}
