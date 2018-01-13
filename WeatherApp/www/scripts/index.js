// Si quiere una introducción sobre la plantilla En blanco, vea la siguiente documentación:
// http://go.microsoft.com/fwlink/?LinkID=397704
// Para depurar código al cargar la página en cordova-simulate o en dispositivos o emuladores Android: inicie la aplicación, establezca puntos de interrupción 
// y ejecute "window.location.reload()" en la Consola de JavaScript.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // Controlar la pausa de Cordova y reanudar eventos
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        // TODO: Cordova se ha cargado. Haga aquí las inicializaciones que necesiten Cordova.
        document.getElementById("btnbuscar").addEventListener('click', BuscarUsuario, false);
        document.getElementById("btnCargar").addEventListener('click', CargarLista, false);
    };

    function onPause() {
        // TODO: esta aplicación se ha suspendido. Guarde el estado de la aplicación aquí.
    };

    function onResume() {
        // TODO: esta aplicación se ha reactivado. Restaure el estado de la aplicación aquí.
    };

    function BuscarUsuario() {
        var usuario = document.getElementById("txtnombre").value;
        if (usuario == "") {
            docume.getElementById("divResultado").innerHTML = "Ingrese usuario!";
        }
        else {
            $.ajax({
                type: "GET",
                url: "http://192.168.0.11:9098/getdata.aspx?usuario=" + usuario,
                crossDomain: true,
                cache: false,
                success: function (result) {
                    document.getElementById("divResultado").innerHTML = "Bienvenido:" + result[0].fullname;
                },
                error: function (result) {
                    alert("Ocurrio un problema. Por Favor Comuniquese con el administrador del sistema. Gracias");
                }

            });
        }
    }

    function CargarLista() {
        var cadena = "<table border=0 cellpadding=2 cellspacing=0><tr><th>Nombre</th><th>Direccion</th><th>Telefono</th></tr>"
        //agregando evento Ajax

        $.ajax({
            type: "GET",
            url: "http://192.168.0.11:9098/getlist.aspx",
            crossDomain: true,
            cache: false,
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                $.each(result, function (i, field) {
                    cadena = cadena + "<tr>" + "<td>" + field.cNombre + "</td><td>" + field.cDireccion + "</td><td>" + field.cTelefono + "</td>";
                });
                cadena = cadena + "</table>";
                $("#divLista").append(cadena);
            },
            error: function (result) {
                alert("Ocurrio un problema. porfavor comuniquese con el administrador del sistema.Gracias.")
            }
        
            });
}

    
} )();