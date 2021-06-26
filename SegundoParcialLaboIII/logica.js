"use strict";
var Parcial;
(function (Parcial) {
    var Logica = /** @class */ (function () {
        function Logica() {
            this.vehiculos = new Array();
        }
        Logica.prototype.filtrarVehiculos = function () {
            var tipoAuto = document.getElementById("filtroVehiculos").value;
            if (tipoAuto == "Auto") {
                var filtrados = this.vehiculos.filter(function (item) { return item instanceof Parcial.Auto; });
                agregarAnimal(filtrados);
            }
            else {
                var filtrados = this.vehiculos.filter(function (item) { return item instanceof Parcial.Camioneta; });
                agregarAnimal(filtrados);
            }
        };
        Logica.prototype.verTipos = function () {
            var tipoVehiculo = document.getElementById("vehiculos").value;
            if (tipoVehiculo == "Camioneta") {
                document.getElementById("contTipoCamioneta").hidden = false;
                document.getElementById("contTipoAuto").hidden = true;
            }
            else {
                document.getElementById("contTipoAuto").hidden = false;
                document.getElementById("contTipoCamioneta").hidden = true;
            }
        };
        return Logica;
    }());
    Parcial.Logica = Logica;
})(Parcial || (Parcial = {}));
