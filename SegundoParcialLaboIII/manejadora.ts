namespace Parcial
{
    var vehiculos: Array<Vehiculo> = new Array<Vehiculo>();

    window.addEventListener("load", function () 
    {
        var selectMostrar = document.getElementById("mostrar");
        selectMostrar?.addEventListener("change", mostrarVehiculos);
       
        var selectVehiculos = document.getElementById("vehiculos");
        selectVehiculos?.addEventListener("change", tiposVehiculos);
    });

    export function mostrarVehiculos()
    {
        var tipoAuto = (<HTMLInputElement>document.getElementById("mostrar")).value;
        if (tipoAuto=="Auto") 
        {
            var filtrados = vehiculos.filter(item=> item instanceof Auto);
            agregarVehiculo(filtrados);
        } else 
        {
            var filtrados = vehiculos.filter(item=> item instanceof Camioneta);
            agregarVehiculo(filtrados);
        }
    }


    export function tiposVehiculos() 
    {
        var tipoVehiculo: string = (<HTMLInputElement>document.getElementById("vehiculos")).value;

        if (tipoVehiculo == "Camioneta") {

            (<HTMLInputElement>document.getElementById("contTipoCamioneta")).hidden = false;
            (<HTMLInputElement>document.getElementById("contTipoAuto")).hidden = true;
        }
        else {

            (<HTMLInputElement>document.getElementById("contTipoAuto")).hidden = false;
            (<HTMLInputElement>document.getElementById("contTipoCamioneta")).hidden = true;
        }
    }


    export function abrirVentanaAlta() 
    {
        (<HTMLInputElement>document.getElementById("ventanaAlta")).style.display = "block";

        var contAgregar: any = <HTMLInputElement>document.getElementById("ventanaAlta");
        contAgregar.classList.add("verForm");
    }

    export function cerrarVentanaAlta() 
    {
        (<HTMLInputElement>document.getElementById("ventanaAlta")).style.display = "none";
        var contGrilla = (<HTMLInputElement>document.getElementById("ventanaAlta"));

        (<HTMLInputElement>document.getElementById("contTipoCamioneta")).hidden = true;
        (<HTMLInputElement>document.getElementById("contTipoAuto")).hidden = true;

        (<HTMLInputElement>document.getElementById("Idehiculo")).value = "";
        (<HTMLInputElement>document.getElementById("marcaVehiculo")).value = "";
        (<HTMLInputElement>document.getElementById("modeloVehiculo")).value = "";
        (<HTMLInputElement>document.getElementById("precioVehiculo")).value = "";
        (<HTMLInputElement>document.getElementById("cantidadPuertas")).value = "";
        
        contGrilla.classList.remove("verForm"); 
    }
    
    
    export function agregar() 
    {
        var id;
        if(vehiculos.length == 0)
        {
            id = 1;
        }
        else
        {
            var auxVehiculos = vehiculos;
            id = auxVehiculos.reduce(function (max, item)
            {
                if(item.id >= max) {
                    return item.id + 1;
                }
                return max;
            }, 0);
            if(id == 0)
            {
                id + 1;
            }
        }
        
        var marca = (<HTMLInputElement>document.getElementById("marcaVehiculo")).value;
        var modelo = (<HTMLInputElement>document.getElementById("modeloVehiculo")).value;
        var precio = (<HTMLInputElement>document.getElementById("precioVehiculo")).value;
        var tipoVehiculo = (<HTMLInputElement>document.getElementById("vehiculos")).value;
        var tipoCamioneta = (<HTMLInputElement>document.getElementById("tipoCamioneta")).value;
        var puertas = (<HTMLInputElement>document.getElementById("cantidadPuertas")).value;
        
        if (tipoVehiculo === "Auto") 
        {
            var auto: Auto = new Auto(marca, modelo, parseInt(precio), parseInt(puertas),id);
            vehiculos.push(auto);      
        }
        else if (tipoVehiculo === "Camioneta") 
        {
            if (tipoCamioneta == "Es4X4") 
            {
                var camioneta: Camioneta = new Camioneta(marca, modelo, parseInt(precio), true,id);
                vehiculos.push(camioneta);
            }
            else {
                var camioneta: Camioneta = new Camioneta(marca, modelo, parseInt(precio), false,id);
                vehiculos.push(camioneta);
            }
        }
        agregarVehiculo(vehiculos);
        cerrarVentanaAlta();
    }



    function agregarVehiculo(vehiculos: Array<Vehiculo>) 
    {
        var marca: string = "";
        var modelo: string = "";
        var precio: any;
        var id: any;
        var detalle: any;
        var tipoVehiculo: string = "";

        var tCuerpo: HTMLTableElement = <HTMLTableElement>document.getElementById("tCuerpo");

        while (tCuerpo.rows.length > 0) 
        {
            tCuerpo.removeChild(tCuerpo.childNodes[0]);
        }

        for (const item of vehiculos) 
        {
            id = item.id;
            marca = item.marca;
            modelo = item.modelo;
            precio = item.precio;

            var btnDel = document.createElement('input');
            btnDel.type = 'button';
            btnDel.className = 'botonEliminar';
            btnDel.value = "Eliminar";            
            btnDel.onclick = function(){eliminarVehiculo(vehiculos.indexOf(item))};

            var tr: HTMLTableRowElement = document.createElement("tr");

            var tdId: HTMLTableDataCellElement = document.createElement("td");
            var nodoTexto = document.createTextNode(id);
            tdId.appendChild(nodoTexto);
            tr.appendChild(tdId);

            var tdMarca: HTMLTableDataCellElement = document.createElement("td");
            var nodoTexto = document.createTextNode(marca);
            tdMarca.appendChild(nodoTexto);
            tr.appendChild(tdMarca);

            var tdModelo: HTMLTableDataCellElement = document.createElement("td");
            var nodoTexto = document.createTextNode(modelo);
            tdModelo.appendChild(nodoTexto);
            tr.appendChild(tdModelo);

            var tdPrecio: HTMLTableDataCellElement = document.createElement("td");
            var nodoTexto = document.createTextNode(precio);
            tdPrecio.appendChild(nodoTexto);
            tr.appendChild(tdPrecio);

            var tdAccion: HTMLTableDataCellElement = document.createElement("td");
            tdAccion.appendChild(btnDel);
            tr.appendChild(tdAccion);

            tCuerpo.appendChild(tr);
        }
    }

    function eliminarVehiculo(id: number) 
    {
        vehiculos.splice(id , 1);
        agregarVehiculo(vehiculos);
    }

}