
var cepFormulario = document.getElementById('cep');
cepFormulario.addEventListener("focusout", () => buscarEndereco(cepFormulario.value))

async function buscarEndereco(cep) {
    var erroCep = document.getElementById('erro');
    erroCep.innerHTML = '';
    try {
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var consultaCEPConvertida = await consultaCEP.json();
        if (consultaCEPConvertida.erro) {
            erroCep.innerHTML = `<p>CEP inválido!</p>`
            throw Error('CEP não existente!');
        }
        console.log(consultaCEPConvertida);

        return preencherformulario(consultaCEPConvertida);
    } catch (error) {
        erroCep.innerHTML = `<p>CEP inválido!</p>`
        console.log(error)
    }
}

function preencherformulario(cepJson) {
    var enderecoFormulario = document.getElementById('endereco');
    enderecoFormulario.value = cepJson.logradouro;
    enderecoFormulario.disabled = true;

    var bairroFormulario = document.getElementById('bairro');
    bairroFormulario.value = cepJson.bairro;
    bairroFormulario.disabled = true;

    var cidadeFormulario = document.getElementById('cidade');
    cidadeFormulario.value = cepJson.localidade;
    cidadeFormulario.disabled = true;

    var estadoFormulario = document.getElementById('estado');
    estadoFormulario.value = cepJson.uf;
    estadoFormulario.disabled = true;
}