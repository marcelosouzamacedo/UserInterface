var _urlPaths = {
    consultorClienteApi: "http://localhost:51441/api/consultorcliente",
    clienteApi: "http://localhost:51441/api/cliente"
};

$(function () {
    $("#CodIdentificadorTotvs").mask("9999");
    $("#divTabela").hide();

    $("#btnBuscar").click(function () {
        if ($('#CodIdentificadorTotvs').val() != "") {
            $.get(_urlPaths.consultorClienteApi + "/" + $('#CodIdentificadorTotvs').val(), function (data) {
                if (data.Data.IsValid == true) {
                    $("#divTabela").show();
                    var tbody = $('#corpoTabela');
                    tbody.html("");
                    $.each(data.Data.List, function (i, item) {
                        tbody.append('<td>' + item.Nome + '</td><td>' + item.DataInclusaoFormatted + '</td>');
                    });
                }
            });
        }
        else {
            alert("Informe o código do consultor");
        }
        return false;
    });
});