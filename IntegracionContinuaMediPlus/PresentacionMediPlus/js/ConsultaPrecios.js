(function (code) {
    code(window.jQuery, window, document);
}(function ($, window, document) {
    $(function () {
        try {
            //#region Variables
            moment.locale('es');
            var Generico = new Globales(),
                dpFechaSuscripcion = $("#dpFechaSuscripcion"),
                btnSuscripcion = $("#btnSuscripcion"),
                btnCancelar = $("#btnCancelar"),
                tblSubConsultaPrecioVenta = $("#tblSubConsultaPrecioVenta");

            //#endregion 

            //#region Columnas Grillas

            columnaConsultaPrecioSuscripcion = [
                { field: 'id', title: 'Id', width: '90px', hidden: true, blnIdentificador: true },
                { field: 'Precio', title: 'PrecioDes', width: '100px' },
                { field: 'Plan', title: 'PlanDes', width: '100px' },
                { field: 'Beneficios', title: 'BeneficiosDes', width: '100px' }
 ,
            ]
            //#endregion

            //#region controles
            Generico.CtrFecha(dpFechaSuscripcion, {
                blnObligatorio: true,
                blnEditar: true,
                strNombre: 'Desde',
                fnCambiaValor: function () {
                }
            });

            //#endregion

            //#region eventos
            btnSuscripcion.click(function () {
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
                dpFechaSuscripcion.value(FechaDesde);
                dpHastaFecha.value(FechaHasta);
            };

        function consultaSuscripciones() {
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
                                cboSuscripcion.Actualizadata(vista);
                            }
                        }
                    });

                },
                function () { }, '/OrdenarSuscripcion/ConsultaSuscripcion')

            };

          
            //#endregion

            //#region Inicia Formulario
            consultaSuscripciones();
            CargaFechaFiltros();
            //#endregion



        } catch (err) {
            alert("Input is " + err);
        } finally {
            Globales = undefined;
        }
    })
}))