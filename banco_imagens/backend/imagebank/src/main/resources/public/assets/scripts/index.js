
    

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
              <button type="button" class="py-2 btn btn-outline-warning ${element.id}" onclick="alter(this)">Alterar</button>
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
          const name = document.getElementById('input_name').value;
          const url = document.getElementById('input_url').value;
          if(name && url) {
            tableList.item(i).innerHTML = `
            <tr>
                <td class="px-5 py-2 elementUrl"><img src="${url}" width="400" height="300"><br>
                <button type="button" class="py-2 btn btn-outline-danger" onclick="deleteLine(this)">Remover</button>
                <button type="button" class="py-2 btn btn-outline-warning ${id}" onclick="alter(this)">Alterar</button>
                <td class="align-middle px-2 py-2 elementName">${name}</td>
                </td>
            </tr>
          `;
            PUT(id, name, url);
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
      let id = dadosbotao.classList.item(3);
      let url = childList[0].firstElementChild.src;
      let name = childList[1].innerHTML;
      document.getElementById('input_name').value = name;
      document.getElementById('input_url').value = url;
      const add = document.getElementById('button_add');
      const form = add.parentElement.parentElement;
      const newButton = document.createElement("button");
      newButton.classList = "btn btn-outline-danger";
      newButton.innerHTML = "Cancelar";
      newButton.id = 'button_cancel';
      newButton.setAttribute("onclick", "cancelEdit()");
      add.parentElement.appendChild(newButton);
      add.className = `btn btn-outline-primary ${id}`;
      add.innerHTML = "Editar";
      add.id = 'button_edit';
      form.setAttribute("onsubmit", "edit()");
    }

    function cancelEdit() {
      document.getElementById('input_name').value = '';
      document.getElementById('input_url').value = '';
      const edit = document.getElementById('button_edit');
      const form = edit.parentElement.parentElement;
      edit.className = 'btn btn-outline-light';
      edit.innerHTML = "Adicionar";
      edit.id = 'button_add';
      form.setAttribute("onsubmit", "insert()");
      document.getElementById('button_cancel').remove();
      console.log(form.onsubmit.toString());
    }

