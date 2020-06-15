(function (code) {
    code(window.jQuery, window, document);
}(function ($, window, document) {
    $(function () {
        try {
            //#region Variables
            moment.locale('es');
            var Generico = new Globales(),
                dpDesdeFecha = $("#dpDesdeFecha"),
                dpHastaFecha = $("#dpHastaFecha"),
                btnBuscar = $("#btnBuscar"),
                btnCancelar = $("#btnCancelar"),
                tblSubConsultaPrecioVenta = $("#tblSubConsultaPrecioVenta");

            //#endregion 

            //#region Columnas Grillas

            columnaConsultaPrecioVenta = [
                { field: 'id', title: 'Id', width: '90px', hidden: true, blnIdentificador: true },
                { field: 'FechayHoradeCarga', title: 'Fecha/HoraCarga', width: '100px' },
                { field: 'IdMaterial', title: 'Cod. Material', width: '100px' },
                { field: 'NombreMaterial', title: 'Material', width: '100px' },
                { field: 'PrecioActualdeventa', title: 'Precio Venta Actual', width: '100px' }
 ,
            ]
            //#endregion

            //#region controles
            Generico.CtrFecha(dpDesdeFecha, {
                blnObligatorio: true,
                blnEditar: true,
                strNombre: 'Desde',
                fnCambiaValor: function () {
                }
            });
            Generico.CtrFecha(dpHastaFecha, {
                blnObligatorio: true,
                blnEditar: true,
                strNombre: 'Hasta',
                fnCambiaValor: function () {
                }
            });

            //#endregion

            //#region eventos
            btnBuscar.click(function () {
                ConsultaPrecioVenta();
            });
            btnCancelar.click(function () {
                btnLimpiarCampos();
            });

            //#endregion

            //#region funciones 

            function CargaFechaFiltros() {
                var Fecha = new Date();
                var Dia = Fecha.getDate();
                var Mes = Fecha.getMonth() + 1;
                var Año = Fecha.getFullYear();
                //var FechaDesde = 1 + "/" + Mes + "/" + Año;
                var FechaDesde = Dia + "/" + Mes + "/" + Año;
                var FechaHasta = Dia + "/" + Mes + "/" + Año;;
                dpDesdeFecha.value(FechaDesde);
                dpHastaFecha.value(FechaHasta);
            };

        function consultaMateriales() {
            var objBuscar = {};
            objBuscar = {}
            Generico.ServicioEnum.Graficas_Consulta = 255;
            Generico.EjecutarAjax('', { lstVistas: Generico.ServicioEnum.Graficas_Consulta + ";", objBusqueda: JSON.stringify(objBuscar) },
                function (okData) {
                    var colResultado = JSON.parse(okData)
                    $.each(colResultado, function (i, tipo) {
                        if (tipo !== null) {
                            var resultado = tipo;
                            if (resultado.Datos != null) {
                                var vista = JSON.parse(resultado.Datos.Vistas[0].JsonAxis);
                                cboMaterial.Actualizadata(vista);
                            }
                        }
                    });

                },
                function () { }, '/OrdenarMaterial/ConsultaMaterial')

            };

          
            //#endregion

            //#region Inicia Formulario
            consultaMateriales();
            CargaFechaFiltros();
            //#endregion



        } catch (err) {
            alert("Input is " + err);
        } finally {
            Globales = undefined;
        }
    })
}))