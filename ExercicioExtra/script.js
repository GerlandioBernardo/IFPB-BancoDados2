let estados = document.querySelector("#estado");
window.addEventListener('load', async function(){
    let resposta =  await fetch('http://servicodados.ibge.gov.br/api/v1/localidades/estados');
    let data = await resposta.json();
    for(let i =0; i< data.length; i++){
        let option = document.createElement('option');
        option.value = data[i].nome;
        option.textContent = data[i].nome;
        option.id = data[i].id;
        estados.appendChild(option);
    }

})
estados.addEventListener('change', async function(){
    let municipios = document.querySelector('#municipio');
    let estadoEscolhido = document.querySelector("#estado")
    let idDoEstado = estadoEscolhido.options[estadoEscolhido.selectedIndex].id;
    let resposta = await fetch(`http://servicodados.ibge.gov.br/api/v1/localidades/estados/${idDoEstado}/municipios`);
    let data = await resposta.json();
    for(let i =0; i< data.length; i++){
        let option = document.createElement('option');
        option.value = data[i].nome;
        option.textContent = data[i].nome;
        municipios.appendChild(option);
    }

})
document.querySelector('#buttonBuscar').addEventListener('click', async function (e) {
    e.preventDefault();
    const estado = document.querySelector('#estado').value;
    const municipio = document.querySelector('#municipio').value;
    const response = await fetch(`http://localhost:3000/consultar?estado=${estado}&&municipio=${municipio}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
    })
    if(!response.ok){
        console.log('Erro Novamente');
    }
    let data = await response.json();
    let svg = document.querySelector('#svg');
    let valorViewBox = Object.values(data.estado[0]);
    let valorViewBoxString = valorViewBox.join(' ');
    svg.setAttribute('viewBox', valorViewBoxString);

    // Estado
    let criaPathEstado = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    let pathEstadoValor = Object.values(data.respostaGeomEstado[0]);
    let pathEstadoValorString = pathEstadoValor.join(' ');
    criaPathEstado.setAttribute('d', pathEstadoValorString);
    criaPathEstado.setAttribute('fill', 'white');
    criaPathEstado.setAttribute('stroke', 'green');
    criaPathEstado.setAttribute('stroke-width', '0.01');
    svg.appendChild(criaPathEstado);

    //Municipio
    let criaPathMunicipio = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    let pathMunicipioValor = Object.values(data.respostaGeomMunicipio[0]);
    let pathMunicipioValorString = pathMunicipioValor.join(' ');
    criaPathMunicipio.setAttribute('d', pathMunicipioValorString);
    criaPathMunicipio.setAttribute('fill', 'blue');
    criaPathMunicipio.setAttribute('stroke', 'red');
    criaPathMunicipio.setAttribute('stroke-width', '0.001');
    svg.appendChild(criaPathMunicipio);
    

})