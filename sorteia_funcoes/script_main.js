let funcao = {
    nome: "",
    quantidade: 0
}

let getNameRealTime = () => {
    funcao.nome = document.getElementById("funcao").value.toUpperCase();
}

let getQuantRealTime = () => {
    funcao.quantidade = document.getElementById("quantidade").value;
}
let toAtualiza = (index) => {
    document.querySelector("#atualiza").classList = "active";
    document.querySelector("#cadastro").classList = "hidde";
    document.querySelector("#tabela").classList = "hidde";
    document.getElementById("nova_funcao").value = JSON.parse(localStorage.getItem("db_funcoes"))[index].nome.toLowerCase();
    document.getElementById("nova_quantidade").value = JSON.parse(localStorage.getItem("db_funcoes"))[index].quantidade;
    document.getElementById("nova_quantidade").focus();
    let btn = document.createElement("button");
    btn.id = "atualiza_button";
    btn.innerHTML = "Atualizar";
    document.getElementById("formulario").appendChild(btn)
    document.getElementById("atualiza_button").addEventListener("click",() => {
        atualizar(index);
    });
}
let toCadastro = () => {
    document.querySelector("#atualiza").classList = "hidde";
    document.querySelector("#cadastro").classList = "active";
    document.querySelector("#tabela").classList = "active";
    document.getElementById("formulario").removeChild(document.getElementById("atualiza_button"));
    atualizaTabela();
}
let atualizaTabela = () => {
    let dates = JSON.parse(localStorage.getItem("db_funcoes"));
    let tbody = document.getElementById("linhas");
    tbody.innerHTML = ""
    for (let i in dates){
        let tr = document.createElement("tr");
        let td_nome = document.createElement("td");
        let td_quantidade = document.createElement("td");
        let td_acoes = document.createElement("td");
        let btn_atualiza = document.createElement("button");
        btn_atualiza.addEventListener("click", () => {
            toAtualiza(i);
        })
        btn_atualiza.innerText = "Edit";
        btn_atualiza.id = "edit";
        let btn_deleta = document.createElement("button");
        btn_deleta.addEventListener("click", () => {
            deletar(i);
        })
        btn_deleta.innerText = "Del";
        btn_deleta.id = "del"
        td_nome.innerHTML = dates[i].nome.toLowerCase();
        td_quantidade.innerHTML = dates[i].quantidade;
        td_acoes.appendChild(btn_atualiza);
        td_acoes.appendChild(btn_deleta);
        tr.appendChild(td_nome);
        tr.appendChild(td_quantidade);
        tr.appendChild(td_acoes);
        tbody.appendChild(tr);
    }
}
let inserir = () => {
    let rep = false, i;
    let db_funcoes = JSON.parse(localStorage.getItem("db_funcoes")) ?? [];
    //Verifica se nome passado eh valido.
    if(funcao.nome == ""){
        alert("insira um nome valido!");
    }else{
        //Verifica se o bd ja possui registros.

        //verifica se a funcao ja esta registrada no bd.
        for(i in db_funcoes){
            if(db_funcoes[i].nome == funcao.nome){
                rep = true;
                alert("funcão já existe, tente atualizar ou deletar!");
                break;
            }
        }
        //Se a funcao ainda nao estiver no bd, faz o registro dela. 
        if(!rep){
            //Verifica se a quantidade eh valida
            if(funcao.quantidade < 1 || funcao.quantidade == ""){
                funcao.quantidade = 1;
                alert("Quantidade alterada para 1!");
            }
            //Retira espaços inuteis
            if(funcao.nome[funcao.nome.length-1] == " "){
                funcao.nome = funcao.nome.trim();
            }
            //Registra a funcao no bd
            db_funcoes.push(funcao);
            localStorage.setItem("db_funcoes", JSON.stringify(db_funcoes));
            //Limpa os inputs
            document.getElementById("funcao").value = "";
            document.getElementById("quantidade").value = "";
            getQuantRealTime()
            document.getElementById("funcao").focus();

            //Atualiza a tabela
            atualizaTabela();
        }
    }
}

let deletar = (index) => {
    console.log(index);
    let db_funcoes = JSON.parse(localStorage.getItem("db_funcoes"));
    db_funcoes.splice(index,1);
    //Realoca o bd com os registros atualizados
    localStorage.setItem("db_funcoes", JSON.stringify(db_funcoes));
    //Limpa os inputs
    document.getElementById("funcao").value = "";
    document.getElementById("quantidade").value = "";
    //Atualiza a tabela
    atualizaTabela();
}

let atualizar = (index) => {
    console.log(index);
    let db_funcoes = JSON.parse(localStorage.getItem("db_funcoes"));
    let nova_funcao = document.getElementById("nova_funcao").value.toUpperCase().trim();
    for(let i in db_funcoes){
        if(i != index){
            if(db_funcoes[i].nome == nova_funcao){
                alert("Essa função já existe!")
                document.getElementById("nova_funcao").focus();
                return;
            }
        }
    }
    db_funcoes[index].nome = document.getElementById("nova_funcao").value.toUpperCase().trim();
    db_funcoes[index].quantidade = document.getElementById("nova_quantidade").value;
    localStorage.setItem("db_funcoes", JSON.stringify(db_funcoes));
    toCadastro();
}
//ouvidores
document.getElementById("inserir").addEventListener("click", inserir);
document.getElementById("fechar").addEventListener("click", () => {
    toCadastro();
})
document.getElementById("funcao").addEventListener("keyup", getNameRealTime);
document.getElementById("quantidade").addEventListener("keyup", getQuantRealTime);
document.getElementById("terminou").addEventListener("click", () => {
    window.location = "./sorteador/sorteador.html";
});
document.getElementById("body").addEventListener("load", atualizaTabela());