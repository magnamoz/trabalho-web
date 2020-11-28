class Cadastro {
    constructor() {
        this.cadastros = localStorage.getItem("tbCadastros") === null ? [] : JSON.parse(localStorage.getItem("tbCadastros"))
    }

    salva(cadastro) {
        if(document.getElementById('codigo').getAttribute('disabled')==='disabled'){
            this.apaga(cadastro.codigo) 
        }
        this.cadastros.push(cadastro)
        localStorage.setItem("tbCadastros", JSON.stringify(this.cadastros))
        alert('Cadastro efetuado!')
        this.limpa()
        return true
    }
    
    apaga(codigo) { 
        let index = this.cadastros.findIndex(cadastro => cadastro.codigo == codigo)      
        this.cadastros.splice(index, 1) 
        localStorage.setItem("tbCadastros", JSON.stringify(this.cadastros))
        cadastro.atualiza() 
     }
 
     limpa(){
         document.getElementById('codigo').value = ''
         document.getElementById('nome').value = ''
         document.getElementById('apelido').value = ''
         document.getElementById('rg').value = ''
         document.getElementById('email').value = ''
         document.getElementById('celular').value = ''
     }
 
     edita(cadastro){
         document.getElementById('codigo').setAttribute('disabled', 'disabled')
         document.getElementById('codigo').value = cadastro.codigo
         document.getElementById('nome').value = cadastro.nome
         document.getElementById('apelido').value = cadastro.apelido
         document.getElementById('rg').value = cadastro.rg
         document.getElementById('email').value = cadastro.email
         document.getElementById('celular').value = cadastro.celular
 
     }

    listar() {
        const cadastrados = this.cadastros.map((cadastro) => (
            `<tr>
                <td>${cadastro.codigo}</td>
                <td>${cadastro.nome}</td>
                <td>${cadastro.apelido}</td>
                <td><button id='apagar' onClick='cadastro.apaga(${cadastro.codigo})'>Apagar</button>
                    <button id='editar' onClick='cadastro.edita(${JSON.stringify(cadastro)})'>Editar</button>
                </td>    
            </tr>`
        ))
        return (`
        <table border='1' class='table'>
         <caption>Cadastrados</caption>
            <thead>
                <th>Codigo</th>
                <th>Nome</th>
                <th>Apelido</th>
                <th>Opções</th>
            </thead>
            <tbody>
            ${cadastrados}
            </tbody>
        </table>`
        )
    }

    atualiza(){     
        document.getElementById('cadastrados').innerHTML = cadastro.listar()
    }

}

const cadastro = new Cadastro()

document.getElementById('salvar').onclick = function () {
    const registro = {
        codigo: document.getElementById('codigo').value,
        nome: document.getElementById('nome').value,
        apelido: document.getElementById('apelido').value,
        rg: document.getElementById('rg').value,
        email: document.getElementById('email').value,
        celular: document.getElementById('celular').value
    }
    cadastro.salva(registro)

}

window.onload = function() {
    cadastro.atualiza()   
}