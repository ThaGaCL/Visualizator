// Autor: Thales Carvalho
// Função: Realizar a leitura de um arquivo XML e exibir os dados em um objeto JavaScript
// Todo:
// 1. Exibir o nome do aluno na tela
// 2. Exibir as optativas - OK
// 3. Remover o uso da variavel global coursesObj 


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
    Período: ${coursesObj[event.target.id].periodo} \n
    `;
    alert(popupContent);
}

// Função para exibir o popup com as informações da disciplina
function onClick(event) {
    // Checa se é uma optativa
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
                        let periodo = $(this).find('PERIODO').text();
                        coursesObj[codAtivCurric] = {
                            "nome": nomeAtivCurric,
                            "situacao": situacao,
                            "sigla": sigla,
                            "mediaFinal": mediaFinal,
                            "frequencia": frequencia,
                            "descr_estrutura": descr_estrutura,
                            "chTotal": chTotal,
                            "ano": ano,
                            "periodo": periodo
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
    let opt = 1;
    for (let codAtivCurric in coursesObj) {
        let materia = coursesObj[codAtivCurric];

        if(materia.descr_estrutura === "Optativas" && opt <= 6){
            let optDivId = "OPT" + opt; // Cria o id da div OPTi
            changeColor(materia.sigla, optDivId, coursesObj, codAtivCurric); // Chama changeColor com o id da div OPTi  
            opt++;
        }
        if(materia.descr_estrutura === "Trabalho de Graduação I"){
            changeColor(materia.sigla, "TGI", coursesObj, codAtivCurric);
        }
        if(materia.descr_estrutura === "Trabalho de Graduação II"){
            changeColor(materia.sigla, "TGII", coursesObj, codAtivCurric);
        }
        else{
            changeColor(materia.sigla, codAtivCurric, coursesObj, codAtivCurric);
        }
    }
}



// Modifica a cor da div "materia" de acordo com a situação do aluno
function changeColor(sigla, codAtivCurric, coursesObj, codMateria) {
    let materia = document.getElementById(codAtivCurric);


    if (materia){     
        if(codAtivCurric.startsWith("OPT")){
            materia.innerHTML = codMateria + "(OPT)";
            materia.id = codMateria;
        }else if(codAtivCurric === "TGI"){
            materia.innerHTML = codMateria + "(TGI)";
            materia.id = codMateria;
        }else if(codAtivCurric === "TGII"){
            materia.innerHTML = codMateria + "(TGII)";
            materia.id = codMateria;
        }


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
