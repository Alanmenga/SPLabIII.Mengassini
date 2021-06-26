"use strict";
var Parcial;
(function (Parcial) {
    var vehiculos = new Array();
    window.addEventListener("load", function () {
        var selectMostrar = document.getElementById("mostrar");
        selectMostrar === null || selectMostrar === void 0 ? void 0 : selectMostrar.addEventListener("change", mostrarVehiculos);
        var selectVehiculos = document.getElementById("vehiculos");
        selectVehiculos === null || selectVehiculos === void 0 ? void 0 : selectVehiculos.addEventListener("change", tiposVehiculos);
    });
    function mostrarVehiculos() {
        var tipoAuto = document.getElementById("mostrar").value;
        if (tipoAuto == "Auto") {
            var filtrados = vehiculos.filter(function (item) { return item instanceof Parcial.Auto; });
            agregarVehiculo(filtrados);
        }
        else {
            var filtrados = vehiculos.filter(function (item) { return item instanceof Parcial.Camioneta; });
            agregarVehiculo(filtrados);
        }
    }
    Parcial.mostrarVehiculos = mostrarVehiculos;
    function tiposVehiculos() {
        var tipoVehiculo = document.getElementById("vehiculos").value;
        if (tipoVehiculo == "Camioneta") {
            document.getElementById("contTipoCamioneta").hidden = false;
            document.getElementById("contTipoAuto").hidden = true;
        }
        else {
            document.getElementById("contTipoAuto").hidden = false;
            document.getElementById("contTipoCamioneta").hidden = true;
        }
    }
    Parcial.tiposVehiculos = tiposVehiculos;
    function abrirVentanaAlta() {
        document.getElementById("ventanaAlta").style.display = "block";
        var contAgregar = document.getElementById("ventanaAlta");
        contAgregar.classList.add("verForm");
    }
    Parcial.abrirVentanaAlta = abrirVentanaAlta;
    function cerrarVentanaAlta() {
        document.getElementById("ventanaAlta").style.display = "none";
        var contGrilla = document.getElementById("ventanaAlta");
        document.getElementById("contTipoCamioneta").hidden = true;
        document.getElementById("contTipoAuto").hidden = true;
        document.getElementById("Idehiculo").value = "";
        document.getElementById("marcaVehiculo").value = "";
        document.getElementById("modeloVehiculo").value = "";
        document.getElementById("precioVehiculo").value = "";
        document.getElementById("cantidadPuertas").value = "";
        contGrilla.classList.remove("verForm");
    }
    Parcial.cerrarVentanaAlta = cerrarVentanaAlta;
    function agregar() {
        var id;
        if (vehiculos.length == 0) {
            id = 1;
        }
        else {
            var auxVehiculos = vehiculos;
            id = auxVehiculos.reduce(function (max, item) {
                if (item.id >= max) {
                    return item.id + 1;
                }
                return max;
            }, 0);
            if (id == 0) {
                id + 1;
            }
        }
        var marca = document.getElementById("marcaVehiculo").value;
        var modelo = document.getElementById("modeloVehiculo").value;
        var precio = document.getElementById("precioVehiculo").value;
        var tipoVehiculo = document.getElementById("vehiculos").value;
        var tipoCamioneta = document.getElementById("tipoCamioneta").value;
        var puertas = document.getElementById("cantidadPuertas").value;
        if (tipoVehiculo === "Auto") {
            var auto = new Parcial.Auto(marca, modelo, parseInt(precio), parseInt(puertas), id);
            vehiculos.push(auto);
        }
        else if (tipoVehiculo === "Camioneta") {
            if (tipoCamioneta == "Es4X4") {
                var camioneta = new Parcial.Camioneta(marca, modelo, parseInt(precio), true, id);
                vehiculos.push(camioneta);
            }
            else {
                var camioneta = new Parcial.Camioneta(marca, modelo, parseInt(precio), false, id);
                vehiculos.push(camioneta);
            }
        }
        agregarVehiculo(vehiculos);
        cerrarVentanaAlta();
    }
    Parcial.agregar = agregar;
    function agregarVehiculo(vehiculos) {
        var marca = "";
        var modelo = "";
        var precio;
        var id;
        var detalle;
        var tipoVehiculo = "";
        var tCuerpo = document.getElementById("tCuerpo");
        while (tCuerpo.rows.length > 0) {
            tCuerpo.removeChild(tCuerpo.childNodes[0]);
        }
        var _loop_1 = function (item) {
            id = item.id;
            marca = item.marca;
            modelo = item.modelo;
            precio = item.precio;
            btnDel = document.createElement('input');
            btnDel.type = 'button';
            btnDel.className = 'botonEliminar';
            btnDel.value = "Eliminar";
            btnDel.onclick = function () { eliminarVehiculo(vehiculos.indexOf(item)); };
            tr = document.createElement("tr");
            tdId = document.createElement("td");
            nodoTexto = document.createTextNode(id);
            tdId.appendChild(nodoTexto);
            tr.appendChild(tdId);
            tdMarca = document.createElement("td");
            nodoTexto = document.createTextNode(marca);
            tdMarca.appendChild(nodoTexto);
            tr.appendChild(tdMarca);
            tdModelo = document.createElement("td");
            nodoTexto = document.createTextNode(modelo);
            tdModelo.appendChild(nodoTexto);
            tr.appendChild(tdModelo);
            tdPrecio = document.createElement("td");
            nodoTexto = document.createTextNode(precio);
            tdPrecio.appendChild(nodoTexto);
            tr.appendChild(tdPrecio);
            tdAccion = document.createElement("td");
            tdAccion.appendChild(btnDel);
            tr.appendChild(tdAccion);
            tCuerpo.appendChild(tr);
        };
        var btnDel, tr, tdId, nodoTexto, tdMarca, nodoTexto, tdModelo, nodoTexto, tdPrecio, nodoTexto, tdAccion;
        for (var _i = 0, vehiculos_1 = vehiculos; _i < vehiculos_1.length; _i++) {
            var item = vehiculos_1[_i];
            _loop_1(item);
        }
    }
    function eliminarVehiculo(id) {
        vehiculos.splice(id, 1);
        agregarVehiculo(vehiculos);
    }
})(Parcial || (Parcial = {}));
