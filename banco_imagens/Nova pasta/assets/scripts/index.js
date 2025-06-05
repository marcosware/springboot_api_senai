
    

  function GET() {
    fetch('http://localhost:8080/api/imagens', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(response => response.json())
      .then(data => {
          insertLine(data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  function POST(name, url) {
    fetch('http://localhost:8080/api/imagens', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({"name":name, "url":url})
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
      fetch(`http://localhost:8080/api/imagens/${id}`, {
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

    function PUT(id, name, url) {
      fetch(`http://localhost:8080/api/imagens/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"nome":name, "url":url})
      })
      .then(response => response.json())
      .then(data => {
        console.log("Resposta da API:", data);
      })
      .catch(error => {
        console.error("Erro ao deletar dados:", error);
      })
  }

  // GET();
  
  //Adicionar Linha na Tabela
  function insertLine(data){
      const table = document.getElementById('tableBody');
      data.forEach(element => {   
        const line = document.createElement('tr');
        //Adicionando HTML
        line.innerHTML = `
          <tr>
              <td class="px-5 py-2 elementUrl"><img src="${element.url}" width="400" height="300"><br>
              <button type="button" class="py-2 btn btn-outline-danger" onclick="deleteLine(this)">Remover</button>
              <button type="button" class="py-2 btn btn-outline-warning" onclick="alterar(this)">Alterar</button>
              <td class="align-middle px-2 py-2 elementName">${element.name}</td>
              </td>
          </tr>
        `;
        
        table.appendChild(line);
      });
    }

    //Cadastrar Novas pessoas do formulario
    function insert(){
      event.preventDefault();
      const name = document.getElementById('input_name').value;
      const url = document.getElementById('input_url').value;
      if(name && url){
        //Adicionando Linha com nosso Cadastro
        this.insertLine([{"name":name.trim(), "url":url.trim()}]);
        
        //Limpando os campos
        document.getElementById('input_name').value = "";
        document.getElementById('input_url').value = "";

        //API POST  
        POST(name, url);
    ''

          Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: 'Cadastro feito com sucesso'
          });
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Falta dados para cadastar'
        });
      }
    }

    //Remover Alguma Linha da tabela
    function deleteLine(buttonData){
      Swal.fire({
        icon: 'question',
        title: 'Você tem certeza?',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
      }).then((result) => {
        if (result.isConfirmed) {
            const id = buttonData.parentElement.closest('td');
            buttonData.parentElement.parentElement.remove();
            DELETE(id);

          Swal.fire('Confirmado!', '', 'success');
        } else {
          Swal.fire('Cancelado', '', 'info');
        }
      });

    }
    
    function editar() {
      event.preventDefault();
      const edit = document.getElementById('button_edit');
      let id = edit.classList.item(2);
      let tableList = document.getElementById('tableBody').children;
      for(let i = 0; i < tableList.length; i++) {
        if(tableList.item(i).firstElementChild.innerHTML == id) {
          const name = document.getElementById('input_name').value;
          const url = document.getElementById('input_url').value;
          if(name && url) {
            tableList.item(i).innerHTML = `
              <tr>
              <td class="px-4 py-2 elementId">${id}</td>
                  <td class="px-4 py-2 elementName">${name}</td>
                  <td class="px-4 py-2 elementUrl">${url}</td>
                  <td class="px-4 py-2">
                  <button type="button" class="btn btn-danger" onclick="remover(this)">Remover</button>
                  <button type="button" class="btn btn-warning" onclick="alterar(this)">Alterar</button>
                  </td>
              </tr>
            `;
            PUT(id, name, url);
            i = tableList.length;
            cancelarEdicao();
          }
        }
      }
    }

    function alterar(dadosbotao) {
      event.preventDefault();
      const childList = dadosbotao.parentElement.parentElement.children;
      console.log(childList.length);
      let id = childList[0].innerHTML;
      let nome = childList[1].innerHTML;
      let email = childList[2].innerHTML;
      document.getElementById('input_nome').value = nome;
      document.getElementById('input_email').value = email;
      const add = document.getElementById('button_add');
      const form = add.parentElement.parentElement;
      const newButton = document.createElement("button");
      newButton.classList = "btn btn-danger";
      newButton.innerHTML = "Cancelar";
      newButton.id = 'button_cancel';
      newButton.setAttribute("onclick", "cancelarEdicao()");
      add.parentElement.appendChild(newButton);
      add.className = `btn btn-success ${id}`;
      add.innerHTML = "Editar";
      add.id = 'button_edit';
      form.setAttribute("onsubmit", "editar()");
    }

    function cancelarEdicao() {
      document.getElementById('input_nome').value = '';
      document.getElementById('input_email').value = '';
      const edit = document.getElementById('button_edit');
      const form = edit.parentElement.parentElement;
      edit.className = 'btn btn-primary';
      edit.innerHTML = "Adicionar";
      edit.id = 'button_add';
      form.setAttribute("onsubmit", "cadastrar()");
      document.getElementById('button_cancel').remove();
      console.log(form.onsubmit.toString());
    }

