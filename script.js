// Autor: Thales Carvalho
// Função: Realizar a leitura de um arquivo XML e exibir os dados em um objeto JavaScript

let disciplinas = document.getElementById("obrigatorias");

disciplinas.addEventListener("contextmenu", onContextMenu);
disciplinas.addEventListener("click", onClick);

// Função para exibir o menu de contexto
function onContextMenu(event) {
    event.preventDefault();
    let popupContent = `Histórico da disciplina ${event.target.id} - ${coursesObj[event.target.id].nome}: \n\n
    Frequência: ${coursesObj[event.target.id].frequencia} \n
    Média Final: ${coursesObj[event.target.id].mediaFinal} \n
    Ano: ${coursesObj[event.target.id].ano} \n
    `;
    alert(popupContent);
}

// Função para exibir o popup com as informações da disciplina
function onClick(event) {
    let popupContent = `Histórico da disciplina ${event.target.id} - ${coursesObj[event.target.id].nome}: \n\n
    Frequência: ${coursesObj[event.target.id].frequencia} \n
    Média Final: ${coursesObj[event.target.id].mediaFinal} \n
    Ano: ${coursesObj[event.target.id].ano} \n
    `;
    alert(popupContent);
}


// Realiza a leitura do arquivo XML
$(document).ready(function () {
    $('#pesquisar').click(function () {
        let grr = $('#inputGrr').val();

        $.ajax({
            type: "GET",
            url: "alunos.xml",
            dataType: "xml",
            success: function (xml) {
                window.coursesObj = {}; // Objeto JavaScript

                // Procura as materias do aluno no arquivo XML filtrando pelo GRR
                $(xml).find('ALUNO').each(function () {
                    let matrAluno = $(this).find('MATR_ALUNO').text();
                    
                    if (matrAluno === grr) {
                        let codAtivCurric = $(this).find('COD_ATIV_CURRIC').text();
                        let nomeAtivCurric = $(this).find('NOME_ATIV_CURRIC').text();
                        let situacao = $(this).find('SITUACAO').text();
                        let mediaFinal = $(this).find('MEDIA_FINAL').text();
                        let descr_estrutura = $(this).find('DESCR_ESTRUTURA').text();
                        let sigla = $(this).find('SIGLA').text();
                        let frequencia = $(this).find('FREQUENCIA').text();
                        let chTotal = $(this).find('CH_TOTAL').text();
                        let ano = $(this).find('ANO').text();
                        coursesObj[codAtivCurric] = {
                            "nome": nomeAtivCurric,
                            "situacao": situacao,
                            "sigla": sigla,
                            "mediaFinal": mediaFinal,
                            "frequencia": frequencia,
                            "descr_estrutura": descr_estrutura,
                            "chTotal": chTotal,
                            "ano": ano
                        };
                    }
                });

                console.log(coursesObj); // Exibe o objeto no console do navegador
                percorreArray(coursesObj); // Percorre o objeto e exibe as materias na tela 
            },
            error: function () {
                console.log('Ocorreu um erro ao processar o arquivo XML.');
            }
        });
    });

});

// Altera o nome do aluno na tela
function changeName(nomeAluno) {
    let nome = document.getElementById("nome");
    nome.innerHTML = nomeAluno;
}

function percorreArray(coursesObj) {
    // 
    for (let codAtivCurric in coursesObj) {
        let materia = coursesObj[codAtivCurric];
        changeColor(materia.sigla, codAtivCurric, coursesObj);
    }
}



// Modifica a cor da div "materia" de acordo com a situação do aluno
function changeColor(sigla, codAtivCurric, coursesObj) {
    let materia = document.getElementById(codAtivCurric);

    if (materia){     
           
        if (sigla === "Aprovado") {
            materia.style.backgroundColor = "#03C988";
        } else if (sigla === "Reprovado") {
            materia.style.backgroundColor = "#E94560";
        } else if (sigla === "Repr. Freq"){
            materia.style.backgroundColor = "#E94560";
        } else if (sigla === "Equivale") {
            materia.style.backgroundColor = "#FFE569";        
        } else if (sigla === "Matricula") {
            materia.style.backgroundColor = "#46C2CB";
        }
         else {
            materia.style.backgroundColor = "#FFFFFF";
            materia.style.color = "#000000";
        }
    }
    else{
        console.log("Materia não encontrada");
    }
}   