/* document.addEventListener('DOMContentLoaded', function () {
    const BuscarDadosBtn = document.getElementById('BuscarDadosBtn');
    const DadosUsuarios = document.getElementById('DadosUsuarios');
    const loading = document.getElementById('loading');

    if (BuscarDadosBtn) {
        BuscarDadosBtn.addEventListener('click', buscaDadosUsr);
    }

    async function buscaDadosUsr() {
        try {

            loading.style.display = 'block';
            DadosUsuarios.innerHTML = '';

            const response = await fetch('https://randomuser.me/api/?results=5'); 
            const data = await response.json();

            loading.style.display = 'none';

            populateTable(data.results);
        } catch (error) {
            loading.style.display = 'none';
            console.error('Erro ao buscar dados da API:', error);
        }
    }

    function populateTable(users) {
        const table = `
            <table border="1">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Gênero</th>
                        <th>Cidade</th>
                        <th>País</th>
                        <th>Foto</th>
                    </tr>
                </thead>
                <tbody>
                    ${users.map(user => `
                        <tr>
                            <td>${user.name.first} ${user.name.last}</td>
                            <td>${user.email}</td>
                            <td>${user.gender}</td>
                            <td>${user.location.city}</td>
                            <td>${user.location.country}</td>
                            <td><img src="${user.picture.thumbnail}" alt="User Picture"></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;

        DadosUsuarios.innerHTML = table; // Insere a tabela no div
    }
});

document.addEventListener('DOMContentLoaded', function () {
    document.forms['salvaDados'].addEventListener('submit', function (event) {
        event.preventDefault(); // Evita o envio padrão do formulário
        console.log("foi");
    });
});
*/


let usuariosBuscados = [];

document.addEventListener('DOMContentLoaded', function () {
    const BuscarDadosBtn = document.getElementById('BuscarDadosBtn');
    const DadosUsuarios = document.getElementById('DadosUsuarios');
    const loading = document.getElementById('loading');

    const salvarDados = document.getElementById('salvarDados');

    
    salvarDados.style.display = 'none';

    if (BuscarDadosBtn) {
        BuscarDadosBtn.addEventListener('click', buscaDadosUsr);
    }

    async function buscaDadosUsr() {
        try {
            loading.style.display = 'block';
            DadosUsuarios.innerHTML = '';

            const response = await fetch('https://randomuser.me/api/?results=5');
            const data = await response.json();
            usuariosBuscados = data.results;

            loading.style.display = 'none';
            populateTable(usuariosBuscados);
        } catch (error) {
            loading.style.display = 'none';
            console.error('Erro ao buscar dados da API:', error);
        }
    }

    function populateTable(users) {
        const table =
            `<table border="1">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Gênero</th>
                                <th>Cidade</th>
                                <th>País</th>
                                <th>Foto</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${users.map(user => ` 
                                <tr>
                                    <td>${user.name.first} ${user.name.last}</td>
                                    <td>${user.email}</td>
                                    <td>${user.gender}</td>
                                    <td>${user.location.city}</td>
                                    <td>${user.location.country}</td>
                                    <td><img src="${user.picture.thumbnail}" alt="User Picture"></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>`
                    salvarDados.style.display = 'block';
            ;

        DadosUsuarios.innerHTML = table;

        
    }
});

document.getElementById('salvarDados').addEventListener('submit', async function (event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    const dadosParaEnviar = usuariosBuscados.map(user => ({
        nome: user.name.first,  
        sobrenome: user.name.last,
        email: user.email,
        genero: user.gender,
        cidade: user.location.city,
        pais: user.location.country,
        urlfoto: user.picture.thumbnail
    }));


    try {
        const response = await fetch(`https://localhost:44360/api/Usuario/Criar?nome=${dadosParaEnviar.nome}&email=${dadosParaEnviar.email}&genero=${dadosParaEnviar.genero}&cidade=${dadosParaEnviar.cidade}&pais=${dadosParaEnviar.pais}&urlfoto=${dadosParaEnviar.foto}`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosParaEnviar)
        });
        console.log(dadosParaEnviar);

        if (response) {
            window.alert('Dados enviados com sucesso!')
        } else {
            console.error('Erro ao enviar dados:', response.statusText);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }

    
});






