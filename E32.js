// PROCEDIMIENTO GENERAL DE LA PRUEBA CHI-CUADRADA
import { Tabla_Poisson } from './Tabla_Poisson.js';
/* FUNCIONES */
function Has_Decimals(numero) {
    let Round_Down = Math.floor(numero);
    let Round_Up = Math.ceil(numero);

    return numero != Round_Down && numero != Round_Up;
}

function Calcular_Factorial(numero){
    if (numero == 0 || numero == 1) {
        return 1;
    } else if (numero < 0) {
        return "No se puedes Calcular el facotiral de un numero negativo.";
    } else {
        let factorial = 1;
        for (let i = 2; i <= numero; i++) {
            factorial= factorial * i;
        }
        return factorial;
    }
} 
function Capturar_Data_Prueba_Chi_Cuadrado() {
    let Array_Data = [];
    let Cadena = (document.getElementById("Data").value).toString();
    console.log(typeof Cadena)
    let Cont = 0;
    const indiceEspacio = Cadena.indexOf(' ');
    let indice_cadena = 0;
    let subcadena = "";
    do{
        if (indiceEspacio != -1){
            subcadena = Cadena.substring(0, indiceEspacio);
            Cadena = Cadena.substring(indiceEspacio);
            if (Cadena[0] == " ") {
                Cadena = Cadena.substring(1);
            } else if (Cadena[1] == ""){
                console.log(`[${subcadena}]`,typeof Cadena)
            }
        } else {
            //console.log(`[${Cadena}]`)
        }
        Array_Data.push(Number(subcadena)); 
        Cont++;
    }while(Cadena != "");
    return Array_Data;
}

function Mostrar_Data_Prueba_Chi_Cuadrado() {
    let Array_Data = Capturar_Data_Prueba_Chi_Cuadrado();
    var Contenedor_TV = document.getElementById("Contenedor_Tabla_Form");
    Contenedor_TV.innerHTML = "";

    var Tabla = document.createElement("table");
    Tabla.className = "Tabla_View";
    Tabla.border = "1";

    var Cuerpo_Tabla = document.createElement("tbody");
    Cuerpo_Tabla.className = "Cuerpo_Tabla";

    for (let i=0; i<Array_Data.length; i++) {
        if(i % 10 == 0){
            const Fila = document.createElement("tr");
            Cuerpo_Tabla.appendChild(Fila);
        }

        var Celda_Dato = document.createElement("td");
        Celda_Dato.textContent = Array_Data[i];

        var Filas = Cuerpo_Tabla.getElementsByTagName("tr");
        Filas[Filas.length - 1].appendChild(Celda_Dato);
    }

    Tabla.appendChild(Cuerpo_Tabla);
    Contenedor_TV.appendChild(Tabla);

    return Array_Data;
}

function Mostrar_Resultados_Prueba_Chi_Cuadrado(){
    var elementoAEliminar = document.getElementById("Contenedor_Resultados");

    // Verifica si el elemento existe antes de intentar eliminarlo
    if (elementoAEliminar) {
        elementoAEliminar.remove(); // Elimina el elemento del DOM
    }
    /* PASO 01:*/
    // OBTENER AL MENOS 30 DATOS DE LA VARIABLE ALEATORIA
    let Array_Data = Capturar_Data_Prueba_Chi_Cuadrado();

    
    var Contenedor_FONDO =document.getElementById("FONDO");
    
    var Contenedor_Resultados = document.createElement("div");
    Contenedor_Resultados.className = "Contenedor_Resultados";
    Contenedor_Resultados.id = "Contenedor_Resultados"
    //Contenedor_Resultados.innerHTML = "";

    var Titulo_Contenedor = document.createElement("h2");
    Titulo_Contenedor.textContent = "RESULTADOS";
    
    Contenedor_Resultados.appendChild(Titulo_Contenedor);

    /* PASO 02:*/
    // CALCULAR MEDIA MUESTRAL
    let suma = 0;
    for (let i = 0; i < Array_Data.length; i++) {
        suma = suma + Array_Data[i];
    }
    let Media_M = (suma/Array_Data.length).toFixed(3);
    //console.log(`M: ${Media_M}, S: ${suma}, L: ${Array_Data.length}`)
    var Contenedor_MyV = document.createElement("div");
    Contenedor_MyV.className = "Contenedor_MyV";

    var Contenedor_Media = document.createElement("div");
    Contenedor_Media.className = "Contenedor_Media";
    //Contenedor_Media.innerHTML = "";
    var Etiqueta_Media = document.createElement("h3");
    Etiqueta_Media.className = "Etiqueta_Paso_M";
    Etiqueta_Media.textContent = "Media muestral"
    var Media_Resultado = document.createElement("h3");
    Media_Resultado.className = "Resultado_Paso_M";
    Media_Resultado.textContent = `${Media_M}`;
    Contenedor_Media.appendChild(Etiqueta_Media);
    Contenedor_Media.appendChild(Media_Resultado);

    // CALCULAR VARIANZA MUESTRAL
    let Suma_V = 0;
    for ( let i = 0; i < Array_Data.length; i++) {
        Suma_V = Suma_V + Math.pow(Array_Data[i] - Media_M,2);
    }
    let Varianza_M = (Suma_V/(Array_Data.length - 1)).toFixed(2);
    //console.log(`V: ${Varianza_M}, S: ${Suma_V}, L: ${Array_Data.length}`)

    var Contenedor_Varianza = document.createElement("div");
    Contenedor_Varianza.className = "Contenedor_Varianza";
    //Contenedor_Varianza.innerHTML = "";
    var Etiqueta_Varianza = document.createElement("h3");
    Etiqueta_Varianza.className = "Etiqueta_Paso_V";
    Etiqueta_Varianza.textContent = "Varianza muestral";
    var Varianza_Resultado = document.createElement("h3");
    Varianza_Resultado.className = "Resultado_Paso_V";
    Varianza_Resultado.textContent = `${Varianza_M}`;

    Contenedor_Varianza.appendChild(Etiqueta_Varianza);
    Contenedor_Varianza.appendChild(Varianza_Resultado);

    Contenedor_MyV.appendChild(Contenedor_Media);
    Contenedor_MyV.appendChild(Contenedor_Varianza);

    Contenedor_Resultados.appendChild(Contenedor_MyV);

    /* PASO 03: */
    // DEFINIR LOS INTERVALOS (NO SE MUESTRA)
    let Array_Intervals = Definir_Intervalos_Prueba_Chi_Cuadrado(1,Array_Data);
    let Array_Labels = Definir_Intervalos_Prueba_Chi_Cuadrado(2,Array_Data);
    // CALCULAR LAS OCURRENCIAS (NO SE MUESTRA)
    let Oi = Calcular_Ocurrencias_Prueba_Chi_Cuadrado(Array_Intervals,Array_Data);
    // CREAR EL HISTOGRAMA
    var Contenedor_Histograma = document.createElement("div");
    Contenedor_Histograma.className = "Contenedor_Histograma";
    var Histogram =  Crear_Histograma_Prueba_Chi_Cuadrado(Definir_Intervalos_Prueba_Chi_Cuadrado(2,Array_Data),Oi,Contenedor_Histograma);
    if (Histogram) {
        Contenedor_Histograma.appendChild(Histogram);
    }
    Contenedor_Resultados.appendChild(Contenedor_Histograma);
    /* PASO 04: */
    let m = Cantidad_Intervalos(Array_Data);
    let p = Calcular_Probabilidad_Poisson(Array_Labels,m,Media_M);
    /* PASO 05: */
    let E = Crear_Frecuencia_Esperada_Prueba_Chi_Cuadrado(1,Array_Data,p,m);
    let SE = Crear_Frecuencia_Esperada_Prueba_Chi_Cuadrado(2,Array_Data,p,m);

    /* PASO 06: */
    let Error = Estimar_Estadistico_Prueba_Chicuadrado(1,E,m,Oi);
    let Estadistico_Prueba = Estimar_Estadistico_Prueba_Chicuadrado(2,E,m,Oi);
    
    //let H0, H1 , Lambda = Math.round(Media_M);
    
    // IMPRIMIR TABLA DE CALCULOS DE LA PRUEBA DE CHI-CUADRADO
    let Matrix_PCC = Mostrar_Tabla_Prueba_Chi_Cuadrado(Array_Labels,Oi,p,E,Error,m,SE,Estadistico_Prueba);

    var Contenedor_TCPCC = document.createElement("div");
    Contenedor_TCPCC.className = "Contenedor_TCPCC";
    
    var Tabla_TPCC = document.createElement("table");
    Tabla_TPCC.className = "Tabla_TPCC";

    var THead_TPCC = document.createElement("th");
    var filaEncabezado = document.createElement("tr");
    filaEncabezado.className = "filaEncabezado";

    var celdaEncabezado1 = document.createElement("th");
    celdaEncabezado1.className = "celdaEncabezado";
    celdaEncabezado1.textContent = "Intervalo";
    filaEncabezado.appendChild(celdaEncabezado1);
    var celdaEncabezado2 = document.createElement("th");
    celdaEncabezado2.className = "celdaEncabezado";
    celdaEncabezado2.textContent = "Oi";
    filaEncabezado.appendChild(celdaEncabezado2);
    var celdaEncabezado3 = document.createElement("th");
    celdaEncabezado3.className = "celdaEncabezado";
    celdaEncabezado3.textContent = "p(x)";
    filaEncabezado.appendChild(celdaEncabezado3);
    var celdaEncabezado4 = document.createElement("th");
    celdaEncabezado4.className = "celdaEncabezado";
    celdaEncabezado4.textContent = "Ei";
    filaEncabezado.appendChild(celdaEncabezado4);
    var celdaEncabezado5 = document.createElement("th");
    celdaEncabezado5.className = "celdaEncabezado";
    celdaEncabezado5.textContent = "Error";
    filaEncabezado.appendChild(celdaEncabezado5);

    THead_TPCC.appendChild(filaEncabezado);

    var TBody_TPCC = document.createElement("tbody");

    for (let i=0 ; i<m + 1 ; i++) {
       var filaDatos = document.createElement("tr");
       filaDatos.className = "filaDatos";
       for (let j=0 ; j<5 ; j++) {
        var celdaDatos = document.createElement("td");
        celdaDatos.className = "celdaDatos";
        celdaDatos.textContent = `${Matrix_PCC[i][j]}`;
        filaDatos.appendChild(celdaDatos);
       }

       TBody_TPCC.appendChild(filaDatos);
    }

    Tabla_TPCC.appendChild(THead_TPCC);
    Tabla_TPCC.appendChild(TBody_TPCC);

    Contenedor_TCPCC.appendChild(Tabla_TPCC);
    //Continua ...


    Contenedor_Resultados.appendChild(Contenedor_TCPCC);
    /* PASO 07: */
    // INGRESAR GRADOS Y ALPHA

    var Contenedor_GyA = document.createElement("div");
    Contenedor_GyA.className = "Contenedor_GyA"; 

    // GRADOS
    var Contenedor_Grados = document.createElement("div");
    Contenedor_Grados.className = "Contenedor_Grados";

    var Label_Grados = document.createElement("h3");
    Label_Grados.className = "Label_Grados";
    Label_Grados.textContent = "Grados: ";
    var Input_Grados = document.createElement("Input");
    Input_Grados.className = "Input_Grados";
    Input_Grados.id = "Input_Grados";
    Input_Grados.type = "number";
    Input_Grados.textContent = "0";
    Input_Grados.value = 0;

    Contenedor_Grados.appendChild(Label_Grados);
    Contenedor_Grados.appendChild(Input_Grados);

    // ALPHA
    var Contenedor_Alpha = document.createElement("div");
    Contenedor_Alpha.className = "Contenedor_Alpha";

    var Label_Alpha = document.createElement("h3");
    Label_Alpha.className = "Label_Alpha";
    Label_Alpha.textContent = "Alpha: ";
    var Input_Alpha = document.createElement("Input");
    Input_Alpha.className = "Input_Alpha";
    Input_Alpha.id = "Input_Alpha";
    Input_Alpha.type = "number";
    Input_Alpha.textContent = "0";
    Input_Alpha.value = 0;

    Contenedor_Alpha.appendChild(Label_Alpha);
    Contenedor_Alpha.appendChild(Input_Alpha);

    Contenedor_GyA.appendChild(Contenedor_Grados);
    Contenedor_GyA.appendChild(Contenedor_Alpha);

    Contenedor_Resultados.appendChild(Contenedor_GyA);

    // BOTON DE SIGUIENTE PASO
    var Contenedor_Boton_SP = document.createElement("div");
    Contenedor_Boton_SP.className = "Contenedor_Boton_SP";
    
    var Btn_SP = document.createElement("button");
    Btn_SP.className = "Btn_SP";
    Btn_SP.type = "button";
    Btn_SP.textContent = "Siguiente paso";

    Contenedor_Boton_SP.appendChild(Btn_SP);
    
    Contenedor_Resultados.appendChild(Contenedor_Boton_SP);

    Btn_SP.addEventListener('click', (event) => {

        let gradito = document.getElementById("Input_Grados").value;
        let alphita = document.getElementById("Input_Alpha").value;
        let Nivel_Critico = Determinar_Nivel_Critico(gradito,alphita);
        console.log(Determinar_Nivel_Critico(10,0.05));

        let elementoEliminar = document.getElementById("Contenedor_EPyNC");

        // Verifica si el elemento existe antes de intentar eliminarlo
        if (elementoEliminar) {
            elementoEliminar.remove(); // Elimina el elemento del DOM
        }
        var Contenedor_EPyNC = document.createElement("div");
        Contenedor_EPyNC.className = "Contenedor_EPyNC";
        Contenedor_EPyNC.id = "Contenedor_EPyNC";
        // VALOR ESTADISTICO DE PRUEBA
        var Contenedor_Estadistico_Prueba = document.createElement("div");
        Contenedor_Estadistico_Prueba.className = "Contenedor_Estadistico_Prueba";
        
        var Etiqueta_Estadistico_Prueba = document.createElement("h3");
        Etiqueta_Estadistico_Prueba.className = "Etiqueta_Estadistico_Prueba";
        Etiqueta_Estadistico_Prueba.textContent = "Estadistio de Prueba";
        var Resultado_Estadistico_Prueba = document.createElement("h3");
        Resultado_Estadistico_Prueba.className = "Input_Estadistico_Prueba";
        Resultado_Estadistico_Prueba.textContent = `${Estadistico_Prueba.toFixed(4)}`;

        Contenedor_Estadistico_Prueba.appendChild(Etiqueta_Estadistico_Prueba);
        Contenedor_Estadistico_Prueba.appendChild(Resultado_Estadistico_Prueba);

        // NIVEL CRITICO - VALOR DE TABLA
        var Contenedor_Nivel_Critico = document.createElement("div");
        Contenedor_Nivel_Critico.className = "Contenedor_Nivel_Critico";
        
        var Etiqueta_Nivel_Critico = document.createElement("h3");
        Etiqueta_Nivel_Critico.className = "Etiqueta_Nivel_Critico";
        Etiqueta_Nivel_Critico.textContent = "Valor de tabla";
        var Resultado_Nivel_Critico = document.createElement("h3");
        Resultado_Nivel_Critico.className = "Resultado_Nivel_Critico";
        Resultado_Nivel_Critico.textContent = `${Nivel_Critico}`;

        Contenedor_Nivel_Critico.appendChild(Etiqueta_Nivel_Critico);
        Contenedor_Nivel_Critico.appendChild(Resultado_Nivel_Critico);

        Contenedor_EPyNC.appendChild(Contenedor_Estadistico_Prueba);
        Contenedor_EPyNC.appendChild(Contenedor_Nivel_Critico);

        Contenedor_Resultados.appendChild(Contenedor_EPyNC);
    });

    
    /* PASO 08: */

    Contenedor_FONDO.appendChild(Contenedor_Resultados);
}

function Mostrar_Tabla_Prueba_Chi_Cuadrado(Array_Labels,Oi,p,E,Error,m,SE,Estadistico_Prueba) {
    let Matrix_PCC = [];

    for(let i=0; i<m ; i++) {
        Matrix_PCC.push([Array_Labels[i],Oi[i],p[i],E[i],Error[i]]);
    }

    let S_Oi = 0, S_p = 0, S_E = 0, S_Error = 0;

    for (let i=0; i<m ; i++){
        S_Oi = S_Oi + Oi[i], 
        S_p = S_p + p[i], 
        // S_E = S_E + E[i], 
        S_Error = S_Error + Error[i];
    }

    //Matrix_PCC.push(["Total",S_Oi,Math.ceil(S_p),Math.ceil(SE),Estadistico_Prueba.toFixed(2)]);
    Matrix_PCC.push(["Total",S_Oi,S_p.toFixed(2),Math.ceil(SE),Estadistico_Prueba.toFixed(2)]);
    return Matrix_PCC;
}

function Cantidad_Intervalos(Array_Data) {
    let m = Math.round(Math.sqrt(Array_Data.length));
    //m=11;//Recuerda quitarlo antes de presentar ALERT!!!!!!!!!!!!!!!!!
    /*MODIFIC*/m=4;
    return m;
}

function Definir_Intervalos_Prueba_Chi_Cuadrado(opcion,Array_Data) {
    // DEFINIR LOS INTERVALOS
        //let m = Math.round(Math.sqrt(Array_Data.length));
        let m=4;
        //let m = Math.sqrt(Array_Data.length);
        
    // NUEVA FORMA
        //Hallar la amplitud de intervalo
        let Dato_Max = 0;
        let Dato_Min = 100;
        for (let i = 0; i < Array_Data.length; i++ ){
            if (Array_Data[i] >= Dato_Max) {
                Dato_Max = Array_Data[i];
            }
            if (Array_Data[i] <= Dato_Min){
                Dato_Min = Array_Data[i];
            }
        }
        console.log(`MAX: ${Dato_Max}, MIN: ${Dato_Min}`);
        
        let h = Number(((Dato_Max - Dato_Min) / m).toFixed(4));
        /*MODIFIC*/h=1;
        console.log(`h: ${h}, m: ${m}`);
    // En el problemase busca del minimo al maximo
    let Array_Intervals = [];
    let Array_Labels = []; // Etiquetas del Histograma
    //let Interval_Max = Number(Dato_Min.toFixed(2)), Interval_Min=0;
    let Interval_Min = Dato_Min;
    let Interval_Max = Interval_Min + h;
    Array_Intervals.push([Number((Interval_Min).toFixed(2)),Number((Interval_Max).toFixed(2))]);
    Array_Labels.push([Interval_Min,`${(Interval_Max).toFixed(2)}`]);
    console.log(`${0} -> I Min: ${Interval_Min}, I Max: ${Interval_Max}`);
    
    for (let i = 1 ; i < m ; i++) {
        Interval_Min = Interval_Max;
        Interval_Max = Interval_Max + h;
        console.log(`${i} -> I Min: ${Interval_Min.toFixed(2)}, I Max: ${Interval_Max.toFixed(2)}`);
        if (i != m-1) {
            Array_Intervals.push([Number((Interval_Min).toFixed(4)),Number((Interval_Max).toFixed(4))]);
            Array_Labels.push([`${(Interval_Min).toFixed(2)}`,`${(Interval_Max).toFixed(2)}`]);
        }
        else {
            Array_Intervals.push([Number((Interval_Min).toFixed(2)),Number((Interval_Max).toFixed(2))]);
            Array_Labels.push([`${(Interval_Min).toFixed(2)}`,`∞`]);
        }
    }

    // FORMA ACTUAL
    console.log("ANTIGUA FORMA");
/*
    Interval_Min = 0;
    Interval_Max = Dato_Min;
    console.log(`I Min: ${Interval_Min}, I Max: ${Interval_Max}`);

    Array_Intervals.push([Interval_Min,Interval_Max]);
    Array_Labels.push([`${Interval_Min}`,`${Interval_Max}`])
    //m = 11; //Recuerda quitarlo antes de presentar ALERT!!!!!!!!!!!!!!!!!
    // Si son enteros se comienza del siguiente
    for (let i = 1 ; i < m  ; i++){
        Interval_Min = Interval_Max;
        Interval_Max = Interval_Max + h;
        console.log(`I Min: ${Interval_Min}, I Max: ${Interval_Max}`);
        if (i != m-1) {
            Array_Intervals.push([Interval_Min,Interval_Max]);
            Array_Labels.push([`${Interval_Min + 1}`,`${Interval_Max}`]);
        }
        else {
            Array_Intervals.push([Interval_Min,Interval_Max]);
            Array_Labels.push([`${Interval_Min}`,`∞`]);
        }
    }*/
    console.log("AI:",Array_Intervals);
    console.log("AL:",Array_Labels);
    if(opcion == 1) {
        return Array_Intervals;
    } else if (opcion == 2) {
        return Array_Labels;
    }
}

function Calcular_Ocurrencias_Prueba_Chi_Cuadrado(Array_Intervals,Array_Data) {
    // CALCULAR LAS OCURRRENCIAS PARA CADA INTERVALO
    let Oi = [];
    let Cont_Oi = 0;
        for (let j = 0; j < Array_Intervals.length; j++) {
            for (let i = 0 ; i < Array_Data.length ; i++) {
                //console.log(`ADi: ${Array_Data[i]}`,`AIj0: ${Array_Intervals[j][0]}`, `AIj1: ${Array_Intervals[j][1]}`);
                if (j == 0) {
                    if (Array_Data[i] >= Array_Intervals[j][0] && Array_Data[i] <= Array_Intervals[j][1] ){
                        Cont_Oi++; 
                    }
                    //console.log(`Cont: ${Cont_Oi}`);
                } else if (j == Array_Intervals.length - 1){
                    if (Array_Data[i] > Array_Intervals[j][0]){
                        Cont_Oi++; 
                    }
                }
                else {
                    if (Array_Data[i] > Array_Intervals[j][0] && Array_Data[i] <= Array_Intervals[j][1] ){
                        Cont_Oi++; 
                    }
                }
                //console.log(`Cont: ${Cont_Oi}`);
            }
            Oi[j] = Cont_Oi++;
            Cont_Oi = 0;
        }
    //console.log("Oi:",Oi);
    return Oi;
}

function Crear_Histograma_Prueba_Chi_Cuadrado(Array_Labels,Oi,Contenedor_Histograma) {
    var Histograma = document.createElement("canvas");
    Histograma.id = "myChart";
    Histograma.width = 400;
    Histograma.height = 400;

    if (typeof Chart !== "undefined") {
        var ctx = Histograma.getContext("2d");
        // Crea el objeto de datos del gráfico
        var data = {
            labels: Array_Labels, // Valores para el eje X
            datasets: [{
                label: 'Histograma',
                data: Oi, // Valores para el eje Y
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color del fondo de las barras
                borderColor: 'rgba(75, 192, 192, 1)', // Color del borde de las barras
                borderWidth: 1 // Ancho del borde de las barras
            }]
        };

        // Configuración de las opciones del gráfico
        var options = {
            scales: {
                y: {
                    beginAtZero: true // Comenzar el eje Y desde cero
                }
            }
        };

        // Crea el gráfico de barras
        new Chart(ctx, {
            type: 'bar',
            data: data,
            options: options
        });

        // Devuelve el elemento canvas que contiene el gráfico
        return Histograma;
    } else {
        console.error("Chart.js no está cargado. Asegúrate de incluir la biblioteca Chart.js en tu HTML.");
        return null;
    }
}

function Calcular_Probabilidad_Poisson(Array_Labels,m,Media_M) {
    // CALCULAR LA PROBABILIDAD DE CADA INTERVALO (DISTRIBUCIÓN DE POISSON)
    let H0, H1 , Lambda = Math.round(Media_M);
    Lambda = 2; //EL LAMBDA VARIA 
    let p = []; 
    let Sp = 0;
    //console.log(Number.EPSILON, Math.E);
    for (let i = 0; i < m; i++) {
        if(i != m-1){
        for (let j=0; j < 2; j++){
            let aux = (Math.pow(Lambda,Number(Array_Labels[i][j]))*(Math.pow(Math.E,Lambda*(-1))))/Calcular_Factorial(Number(Array_Labels[i][j]));
            console.log(`(${Lambda}^${Number(Array_Labels[i][j])}*e^${Lambda*(-1)})/${Calcular_Factorial(Number(Array_Labels[i][j]))}`)
            Sp = Sp + aux;
        }
        } else {
            Sp = (Math.pow(Lambda,Number(Array_Labels[i][0]))*(Math.pow(Math.E,Lambda*(-1))))/Calcular_Factorial(Number(Array_Labels[i][0]));
            let Sp2 = (Math.pow(Lambda,0)*(Math.pow(Math.E,Lambda*(-1))))/Calcular_Factorial(0);
            Sp = Sp +Sp2;
        }
        p[i] = Number(Sp.toFixed(4));
        console.log(`Sp: ${Sp}`,`p[i]: ${p[i]}`);
        Sp = 0;
    }

    let aux_p= 0;
    for (let i=0;i<m;i++) {
        aux_p = aux_p + p[i];
    }
    console.log(`p`,p,`aux_P: ${Math.round(aux_p)}`);    
    return p;
}

function Crear_Frecuencia_Esperada_Prueba_Chi_Cuadrado(opcion,Array_Data,p,m) {
    // CALCULAR LA FRECUENCIA ESPERADA
    let E = [];
    let SE = 0;
    //let Error = [];
    for (let i = 0; i < m; i++) {
        E[i] = Number((Array_Data.length * p[i]).toFixed(2));
        SE = SE + E[i];
    }
    //console.log(`Ei:`,E,`SE: `, SE);
    if (opcion == 1) {
        return E;
    } else if ( opcion == 2) {
        return SE;
    }
}

function Estimar_Estadistico_Prueba_Chicuadrado(opcion,E,m,Oi){
    // ESTIMAMOS EL ESTADISTICO DE PRUEBA
    let Error = [];
    let Estadistico_Prueba = 0;
    for (let i=0; i<m; i++) {
        Error[i] = Number(((Math.pow(E[i]-Oi[i],2))/E[i]).toFixed(2));
        //console.log(E[i],Oi[i]);
        Estadistico_Prueba = Estadistico_Prueba + Error[i];
    }
    //console.log(Error,Estadistico_Prueba);
    if(opcion == 1) {
        return Error;
    } else if(opcion == 2) {
        return Number(Estadistico_Prueba.toFixed(2));
    }
}

function Determinar_Nivel_Critico(Grado,alpha) {

    var Alphas = [ 0.001, 0.0025, 0.005, 0.01, 0.025, 0.05, 0.1, 0.15, 0.2 , 0.25, 0.35, 0.4, 0.45,0.5];
    var Grados = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29];
    var Nivel_Critico;

    var POS_Alpha;
    for (let i = 0; i< Alphas.length; i++){
        if(alpha == Alphas[i]) {
            POS_Alpha = i;
        }
    }

    var POS_Grado;
    for (let i = 0; i< Grados.length; i++){
        if(Grado == Grados[i]) {
            POS_Grado = i;
        }
    }

    return Tabla_Poisson[POS_Grado][POS_Alpha];
    //let alpha, Grados_libertad;
    // 0.05 , m-k-1=11-0-1=10, VC 18.307*/
}

function Aceptar_o_Rechazar(Estadistico_Prueba,Valor_Critico) {
    // COMPARAR EL EP Y EL VC
    let Mensaje = "";
    if(Estadistico_Prueba < Valor_Critico) {
        Mensaje = "No se puede rechazar la hipotesis nula."
    } else {
        Mensaje = "Se rechaza la hipotesis nula."
    }

    return Mensaje;
}

/* EVENTOS */
const btn1 = document.getElementById("Boton_Ver_Data");

btn1.addEventListener('click', (event) => {
    Mostrar_Data_Prueba_Chi_Cuadrado();
});

const btn2 = document.getElementById("Boton_Calcular");

btn2.addEventListener('click', (event) => {
    Mostrar_Resultados_Prueba_Chi_Cuadrado();
});


/*
const miTabla = document.getElementById("Tabla_Form");

miTabla.addEventListener("copy", (event) => {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(miTabla);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("copy");
    selection.removeAllRanges();
});

miTabla.addEventListener("paste", (event) => {
    event.preventDefault();
    const clipboardData = event.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData("text/plain");
    const selectedCell = document.activeElement;

    if(selectedCell.tagName == "TD" && selectedCell.contentEditable === "true") {
        selectedCell.textContent = pastedData;
    }
});
*/