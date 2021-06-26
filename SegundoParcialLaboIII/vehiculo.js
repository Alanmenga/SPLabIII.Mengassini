"use strict";
var Parcial;
(function (Parcial) {
    var Vehiculo = /** @class */ (function () {
        function Vehiculo(marca, modelo, precio, id) {
            this.id = id;
            this.marca = marca;
            this.modelo = modelo;
            this.precio = precio;
        }
        return Vehiculo;
    }());
    Parcial.Vehiculo = Vehiculo;
})(Parcial || (Parcial = {}));
