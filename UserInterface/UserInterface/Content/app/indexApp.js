var _urlPaths = {
    programasDescontoApi: "http://localhost:51441/api/programadesconto",
    clienteApi: "http://localhost:51441/api/cliente"
};

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf == '') return false;
    // Elimina CPFs invalidos conhecidos    
    if (cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999")
        return false;
    // Valida 1o digito 
    add = 0;
    for (i = 0; i < 9; i++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(9)))
        return false;
    // Valida 2o digito 
    add = 0;
    for (i = 0; i < 10; i++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
        return false;
    return true;
}

$(function () {
    $("#Cpf").mask("999.999.999-99");
    $("#CodIdentificadorTotvs").mask("9999");

    $.get(_urlPaths.programasDescontoApi, function (data) {
        if (data.Data.IsValid == true) {
            var select = $('#ProgramaDesconto');
            select.find('option').remove();
            select.append('<option value=0></option>');
            $.each(data.Data.List, function (i, item) {
                select.append('<option value=' + item.Id + '>' + item.Nome + '</option>');
            });
        }
    });

    $("#btnCadastrar").click(function () {
        if (validarCPF($('#Cpf').val())) {
            var dados = {
                "CodIdentificadorTotvs": $('#CodIdentificadorTotvs').val(),
                "Nome": $('#Nome').val(),
                "Cpf": $('#Cpf').val(),
                "IdProgramaDesconto": $('#ProgramaDesconto').val()
            }

            $.post(_urlPaths.clienteApi, dados, function (data) {
                if (data.Data.IsValid == true) {
                    $("#frmCliente")[0].reset();
                    alert("Cliente cadastrado com sucesso");
                }
                else {
                    alert(data.Data.Message);
                }
            });
        }
        else {
            alert("CPF Inválido");
        }
        return false;
    });

    $("#btnCancelar").click(function () {
        $("#frmCliente")[0].reset();
        return false;
    });
});