
const inputTarefa = document.querySelector('.input-tarefa');
const inputDia = document.querySelector('.diaTarefa');
const tarefasTexto = document.querySelector('.lista');
const btnAdicionar = document.querySelector('#btn-tarefa');
const erros = document.querySelector('.erros');

const hoje = Date.now();


let tarefas = [

];

function exibirTarefas() {
    tarefas.sort(function (a, b) { return a.data - b.data });
    tarefasTexto.innerHTML = '';
    for (let indice in tarefas) {
        let tarefa = tarefas[indice];
        exibriUmaTarefa(indice, tarefa.nome, tarefa.data);

    };

}


function habilitarAdicionar() {

    if (!inputTarefa.value || !inputDia.value) {
        btnAdicionar.disabled = true;
        btnAdicionar.style.background = 'hsl(0, 0%, 50%)'
    } else {

        btnAdicionar.disabled = false;
        btnAdicionar.style.background = 'rgb(26, 52, 26)'
    }
}

inputTarefa.addEventListener('input', habilitarAdicionar);
inputDia.addEventListener('change', habilitarAdicionar);


function exibriUmaTarefa(indice, tarefa, data) {
    const dt = data.toLocaleDateString('pt-BR', {
        timeZone: 'UTC'
    });

    const span = document.createElement('span');
    span.innerHTML += ` ${dt} - ${tarefa}`;

    const li = document.createElement('li');

    li.appendChild(criarBotaoApagar(indice));
    li.appendChild(span);

    tarefasTexto.appendChild(li);

    inputTarefa.value = '';
    inputDia.value = '';
    habilitarAdicionar();
    inputTarefa.focus();
}

function valido(tarefa, data) {
    erros.innerHTML = '';

    if (!tarefa && !data) {
        erros.innerHTML += "<li>Entre com uma tarefa e sua data.</li>";

    } else if (!tarefa) {
        erros.innerHTML += "<li>Entre com uma tarefa.</li>";

    } else if (!data) {
        erros.innerHTML += "<li>Entre com a data da tarefa.</li>";

    }

    if (data.getTime() < hoje) {
        erros.innerHTML += "<li>A data da tarefa deve ser maior ou igual ao dia atual.</li>";

    }

    return erros.innerHTML === '';
}



function criarTarefa() {
    let tarefa = inputTarefa.value;
    let data = new Date(inputDia.value);

    if (valido(tarefa, data)) {
        tarefas.push({
            nome: tarefa,
            data: data
        });
        exibirTarefas();
    }
}















function criarBotaoApagar(indice) {

    const btnApagar = document.createElement('button');
    btnApagar.setAttribute('class', 'excluir'); // atributo setado 'class', e seu valor 'apagar' 

    btnApagar.addEventListener('click', function (e) {
        tarefas.splice(indice, 1);
        exibirTarefas();
    });

    return btnApagar;
}

exibirTarefas();