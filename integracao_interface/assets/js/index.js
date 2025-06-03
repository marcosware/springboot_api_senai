
    

  function GET() {
    fetch('http://localhost:8080/api/alunos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(response => response.json())
      .then(data => {
          addlinha(data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  function POST(nome, email) {
    fetch('http://localhost:8080/api/alunos', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({"nome":nome, "email":email})
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
      fetch(`http://localhost:8080/api/alunos/${id}`, {
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

    function PUT(id, nome, email) {
      fetch(`http://localhost:8080/api/alunos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"nome":nome, "email":email})
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
  function addlinha(dadosAPI){
      const tabela = document.getElementById('tableBody');
      dadosAPI.forEach(element => {   
        const linha = document.createElement('tr');
        //Adicionando HTML
        linha.innerHTML = `
          <tr>
          <td class="px-4 py-2 elementId">${element.id}</td>
              <td class="px-4 py-2 elementNome">${element.nome}</td>
              <td class="px-4 py-2 elementEmail">${element.email}</td>
              <td class="px-4 py-2">
              <button type="button" class="btn btn-danger" onclick="remover(this)">Remover</button>
              <button type="button" class="btn btn-warning" onclick="alterar(this)">Alterar</button>
              </td>
          </tr>
        `;
        
        tabela.appendChild(linha);
      });
    }

    //Cadastrar Novas pessoas do formulario
    function cadastrar(){
      event.preventDefault();
      const nome = document.getElementById('input_nome').value;
      const email = document.getElementById('input_email').value;
      if(nome && email){
        //Adicionando Linha com nosso Cadastro
        this.addlinha([{"nome":nome.trim(), "email":email.trim()}]);
        
        //Limpando os campos
        document.getElementById('input_nome').value = "";
        document.getElementById('input_email').value = "";

        //API POST  
        // POST(nome, email);
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
    function remover(dadosbotao){
      Swal.fire({
        icon: 'question',
        title: 'Você tem certeza?',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
      }).then((result) => {
        if (result.isConfirmed) {
            const id = dadosbotao.parentElement.closest('td');
            dadosbotao.parentElement.parentElement.remove();
            // DELETE(id);

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
          console.log("true");
          const nome = document.getElementById('input_nome').value;
          const email = document.getElementById('input_email').value;
          if(nome && email) {
            tableList.item(i).innerHTML = `
              <tr>
              <td class="px-4 py-2 elementId">${id}</td>
                  <td class="px-4 py-2 elementNome">${nome}</td>
                  <td class="px-4 py-2 elementEmail">${email}</td>
                  <td class="px-4 py-2">
                  <button type="button" class="btn btn-danger" onclick="remover(this)">Remover</button>
                  <button type="button" class="btn btn-warning" onclick="alterar(this)">Alterar</button>
                  </td>
              </tr>
            `;
            // PUT(id, nome, email);
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

