class alunos{
    constructor(nome, grr, curso, semestre){
        this.nome = nome;
        this.grr = grr;
        this.curso = curso;
        this.semestre = semestre;
    }

    getNome(){
        return this.nome;
    }

    getGrr(){
        return this.grr;
    }

    getCurso(){
        return this.curso;
    }

    getSemestre(){
        return this.semestre;
    }

    setNome(nome){
        this.nome = nome;
    }

    setGrr(grr){
        this.grr = grr;
    }

    setCurso(curso){
        this.curso = curso;
    }

    setSemestre(semestre){
        this.semestre = semestre;
    }


}

class disciplinas{
    constructor(nome, codigo){
        this.nome = nome;
        this.codigo = codigo;
    }

    getNome(){
        return this.nome;
    }

    getCodigo(){
        return this.codigo;
    }

    setNome(nome){
        this.nome = nome;
    }

    setCodigo(codigo){
        this.codigo = codigo;
    }

}

fetch('alunos.xml')
  .then(response => response.text())
  .then(xmlString => {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    var xml2js = new XML2JS.Parser();
    xml2js.parseString(xmlDoc, function(err, result) {
      if (err) {
        console.error('Error:', err);
      } else {
        var json = JSON.stringify(result);
        console.log(json);
      }
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
