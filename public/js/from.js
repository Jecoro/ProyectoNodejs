document.addEventListener('DOMContentLoaded', function () {
    
    const nombre=document.getElementById("nombre");
    const apellidos=document.getElementById("apellidos");
    const edad=document.getElementById("edad");
    const nif=document.getElementById("nif");
    const email=document.getElementById("email");
    const provincia=document.getElementById("provincia");
    const fecha=document.getElementById("fecha");
    const telefono=document.getElementById("telefono");
    const hora=document.getElementById("hora");
    const enviar=document.getElementById("enviar");

    nombre.addEventListener("focusout", validarNombre);
    apellidos.addEventListener("focusout", validarApellidos);
    edad.addEventListener("focusout" , validarEdad);
    nif.addEventListener("focusout" , validarNif);
    email.addEventListener("focusout" , validarEmail);
    provincia.addEventListener("focusout" , validarProvincias);
    fecha.addEventListener("focusout" , validarFecha);
    telefono.addEventListener("focusout" , validarTelefono);
    hora.addEventListener("focusout" , validarHora);
    document.getElementById("formulario").addEventListener('submit', validarEnviar); 

    function validarNombre(){
        const valorNombre=document.getElementById("nombre").value;
        document.formulario.nombre.value=valorNombre.toString().toUpperCase();
        var regex = /(^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]{3,16})+$/;

        if(valorNombre!=""){
            if (!regex.test(valorNombre)){
                document.getElementById("errores").innerHTML="<p>Introduce un nombre adecuado(solo se permiten letras)</p>";
                document.getElementById("nombre").focus();
            }else{
                document.getElementById("errores").innerHTML="";
            }
    
        }else{
            document.getElementById("errores").innerHTML="<p>El nombre no puede estar vacío</p>";
            document.getElementById("nombre").focus();
        }
    }
    function validarApellidos(){
        const valorApellidos=document.getElementById("apellidos").value;
        document.formulario.apellidos.value=valorApellidos.toString().toUpperCase();
        var regex = /(^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]{3,16})+$/;

        if(valorApellidos!=""){
            if (!regex.test(valorApellidos)){
                document.getElementById("errores").innerHTML="<p>Introduce apellidos adecuados(solo se permiten letras)</p>";
                document.getElementById("apellidos").focus();
            }else{
                document.getElementById("errores").innerHTML="";
            }
    
        }else{
            document.getElementById("errores").innerHTML="<p>Apellidos no puede estar vacío</p>";
            document.getElementById("apellidos").focus();
        }
    }
    function validarEdad(){
        const edad=document.getElementById("edad").value;
        var regex = /^[0-9]$|^[1-9][0-9]$|^(105)$/;//tres numero del 0 al 9 y que como maximo sea 105
        if(edad!=""){
            
            if (!regex.test(edad)){
                document.getElementById("errores").innerHTML="<p>Introduce una edad valida</p>";
                document.getElementById("edad").focus();
            }else{
                document.getElementById("errores").innerHTML="";
            }
        }else{
            document.getElementById("errores").innerHTML="<p>Debes introducir la edad</p>";
            document.getElementById("edad").focus();
        }

    }
    function validarNif(){
        const nif=document.getElementById("nif").value;
        var regex = /^[0-9XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;//Esta regex valida tanto pasaporte como dni(junté las regex de cada uno basicamente) 
        //NIF (Numero de Identificación Fiscal) - 8 numeros y una letra
        //NIE (Numero de Identificación de Extranjeros) - 1 letra(XYZ), 7 numeros y 1 letra(TRWAGMYFPDXBNJZSQVHLCKE)
        if(nif!=""){
            if (!regex.test(nif)){
                document.getElementById("errores").innerHTML="<p>El formato del NIF no  es correcto</p>";
                document.getElementById("nif").focus();
            }else{
                document.getElementById("errores").innerHTML="";
            }
        }else{
            document.getElementById("errores").innerHTML="<p>El NIF no puede estar vacío</p>";
            document.getElementById("nif").focus();
        }
    }
    function validarEmail(){
        const email=document.getElementById("email").value;
        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        //Comprueba el nombre para el que permite numero letras puntos y guiones
        //Despues el @
        //Al final permite que el dominio sea de 2 a 3 caracteres (.es .com .org)
        if(email!=""){
            if (!regex.test(email)){
                document.getElementById("errores").innerHTML="<p>El email no es correcto</p>";
                document.getElementById("email").focus();
            }else{
                document.getElementById("errores").innerHTML="";
            }
        }else{
            document.getElementById("errores").innerHTML="<p>El  email no puede estar vacío</p>";
            document.getElementById("email").focus();
        }
    }
    function validarProvincias(){
        const provincia=document.getElementById("provincia").value;
        if(provincia=="0"){
            document.getElementById("errores").innerHTML="<p>Escoja una provincia</p>";
            document.getElementById("provincia").focus();
        }else{
            document.getElementById("errores").innerHTML="";
        }
    }
    function validarFecha(){
        const fecha=document.getElementById("fecha").value;
        var regex = /^(?:3[01]|[12][0-9]|0?[1-9])([\-/])(0?[1-9]|1[1-2])\1\d{4}$/;
        //Primero evalua los dias posibles en el mes (0-31); 3:[01] permite que exitan los dias 30 y 31
        //Permite el uso de un guion o una barra. 
        //Para los meses permite meter los que van de 0 a 9 y controla que si empieza por uno solo pueda llevar detras un 1 o un 2
        //Para el año permite de 4 numeros.
        if(fecha!=""){
            if (!regex.test(fecha)){
                document.getElementById("errores").innerHTML="<p>El formato de fecha aceptado es: 01/01/2013, 5-3-2013</p>";
                document.getElementById("fecha").focus();
            }else{
                document.getElementById("errores").innerHTML="";
            }
        }else{
            document.getElementById("errores").innerHTML="<p>La Fecha no puede estar vacía</p>";
            document.getElementById("fecha").focus();
        }
    }
    
    function validarTelefono(){
        const telefono=document.getElementById("telefono").value;
        var regex = /^[0-9]{9}$/;//Comprueba que sean 9 numeros del 0 al 9
        
        if(telefono!=""){
            if (!regex.test(telefono)){
                document.getElementById("errores").innerHTML="<p>El formato del  teléfono no es correcto (666 666 666)</p>";
                document.getElementById("telefono").focus();
            }else{
                document.getElementById("errores").innerHTML="";
            }
        }else{
            document.getElementById("errores").innerHTML="<p>El  Teléfono no puede estar vacío</p>";
            document.getElementById("telefono").focus();
        }
    }  
    function validarHora(){
        const hora=document.getElementById("hora").value;
        var regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        //Permite hora en formato 00:00, comprueba los 2 primeros numeros para que sean 0 o 1 y un numero del 0  al 9 pero si es un dos solo deja hasta el 3
        //en el centro iran : y despues comprueba los minutos del 0 al 60(no incluido).
        if(hora!=""){
            if (!regex.test(hora)){
                document.getElementById("errores").innerHTML="<p>La hora no es correcta</p>";
                document.getElementById("hora").focus();
            }else{
                document.getElementById("errores").innerHTML="";
            }
        }else{
            document.getElementById("errores").innerHTML="<p>La hora no puede estar vacía</p>";
            document.getElementById("hora").focus();
        }
    }
    function validarEnviar(evento){
        
        const nombre=document.getElementById("nombre").value;
        const apellidos=document.getElementById("apellidos").value;
        const edad=document.getElementById("edad").value;
        const nif=document.getElementById("nif").value;
        const email=document.getElementById("email").value;
        const provincia=document.getElementById("provincia").value;
        const fecha=document.getElementById("fecha").value;
        const telefono=document.getElementById("telefono").value;
        const hora=document.getElementById("hora").value;
        

        if (nombre == null || nombre == "", apellidos == null || apellidos == "",
        edad == null || edad == "", nif == null || nif == "", email == null || email == "",  
        provincia == null || provincia == "", fecha == null || fecha == "", telefono == null || telefono == "", hora == null || hora == "") {
            alert("No puede dejar ningún campo vacío");
            evento.preventDefault();
            
    
              
        
        }else{
            var confirmacion = confirm('¿Está seguro que desea enviar el formulario?');
            if (!confirmacion){
                evento.preventDefault();
            }
           }
        }
});