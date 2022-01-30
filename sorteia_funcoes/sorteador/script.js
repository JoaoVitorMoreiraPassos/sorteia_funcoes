var fila = [];
let embaralha = () => {
    let quant = 0;
    let db_funcoes = JSON.parse(localStorage.getItem("db_funcoes"));
    for (let i in db_funcoes){
        for (let j = 0; j < db_funcoes[i].quantidade; j ++){
            fila.push(db_funcoes[i].nome);
            quant ++;
        }
    }
    for (let i = 0; i < quant * 1000; i ++){
        let n1, n2, aux;
        n1 = Math.floor(Math.random()*quant);
        n2 = Math.floor(Math.random()*quant);
        aux = fila[n1];
        fila[n1] = fila[n2];
        fila[n2] = aux;
    }
}

let finaliza = () => {
    let res = document.getElementById("resultados");
    res.classList = "hidde";
    inicia.classList = "active";
}

let mostrar = () => {
    let res = document.getElementById("resultado");
    res.innerHTML = fila.length > 0 ?`${fila[fila.length-1]}`: finaliza();
    fila.splice(fila.length-1, 1);
}
let limpar = () => {
    let res = document.getElementById("resultado");
    res.innerHTML = fila.length > 0 ? "O resultado aparecerá aqui.": finaliza();
}
//ouvidores
let inicia;
inicia = document.getElementById("iniciar");
document.getElementById("mostrar").addEventListener("click", mostrar);
document.getElementById("limpar").addEventListener("click", limpar);

document.getElementById("voltar").addEventListener("click", () => {
    window.location = "../index.html"
})

inicia.addEventListener("click", () => {
    embaralha();
    document.getElementById("resultados").classList = "active";
    document.getElementById("resultado").innerHTML = "O resultado aparecerá aqui.";
    inicia.classList = "hidde";
})
