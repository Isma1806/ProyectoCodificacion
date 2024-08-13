let textoInicial;
function codificar() {
    event.preventDefault();
    let textoInicial = document.getElementById('textoIngreso').value;
    let textoFinal = "";
    let indiceLlave=encontrarIndice(textoInicial.length);//busca el indice de la llave para colocar la llave
    let llave=Math.floor(Math.random() * 9);//genera un numero el cual va a ser la cantidad que se le va a sumar al equivalente de ese caracter en el codigo ascii
    for(let i=0;i<textoInicial.length;i++){
        if(i==indiceLlave){
            let stringLlave=llave+'';
            textoFinal+=String.fromCharCode(stringLlave.charCodeAt(0)+50);//inserta la llave en el texto para poder descodificarla
            //a esta llave se le suma 50 a su respectivo codigo ascii para que no sea tan evidente en el texto y camuflarlo con una letra comun
        }
        if(textoInicial[i]===" "){//si en el texto original hay un espacion, se le suma ese espacion al texto final
            textoFinal+=" ";
        }else{
            let asciiLetra=textoInicial[i].charCodeAt(0);//se obtiene el valor en asccii del caracter en esa posicion
            textoFinal+= String.fromCharCode(asciiLetra+llave);//se le suma la llave al valor ascii y se inserta el nuevo valor al texto final
        }
    }
    document.getElementById("textoIngreso").value="";
    document.getElementById("textoFinal").value =textoFinal; 
}

function descodificar(){
    event.preventDefault();
    textoInicial=document.getElementById('textoIngreso').value;
    let textoFinal="";
    let indiceLlave=encontrarIndice(textoInicial.length-1);//buscar el indice para extraer la llave,-1 por que al codificar se le inserta la llave, la cual no debe ir incluida al calcular el index
    let stringllave= textoInicial[indiceLlave];
    let llave=String.fromCharCode(stringllave.charCodeAt(0)-50);//se convierte de ascii a la llave
    for(let i=0;i<textoInicial.length;i++){
        if(textoInicial[i]===" "){//si en el texto original hay un espacio, se le suma ese espacion al texto final
            textoFinal+=" ";
        }else{
            if(i!=indiceLlave){
                let asciiLetra=textoInicial[i].charCodeAt(0);//se obtiene el valor en asccii del caracter en esa posicion
                textoFinal+= String.fromCharCode(asciiLetra-llave);//se le resta la llave al valor ascii y se inserta el nuevo valor al texto final
            }
        }
    }
    document.getElementById("textoIngreso").value="";
    document.getElementById("textoFinal").value=textoFinal;
}

function encontrarIndice(largoPalabra){
    //se buscara el maximo divisor de el largo de la cadena ya que en esa posisicon estara ubicada la llave, esta llave se usara para saber la distancia de la letra original a la nueva en el codigo ASCII
    // Comenzamos desde la mitad del número, ya que ningún divisor puede ser mayor que la mitad del número.
    for (let i = Math.floor(largoPalabra / 2); i >= 1; i--) {
        if (largoPalabra % i === 0) {
            return i; // El primer divisor encontrado es el máximo divisor (aparte de sí mismo).
        }
    }
    return 0;//si no hay un divisor, la llave estara en el primer caracter
}

function copiar(){
    event.preventDefault();
    let textoACopiar = document.getElementById('textoFinal').value;
    navigator.clipboard.writeText(textoACopiar).catch(function(error) {
        alert('No se pudo copiar el texto: ' + error);
    });
}