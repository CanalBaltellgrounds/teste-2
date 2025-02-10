const cadastro = document.getElementById('cadastro');
cadastro.addEventListener('submit', (event) => {
    event.preventDefault();

    const corpo = {
        descricao: cadastro.descricao.value,
        valor: parseFloat(cadastro.valor.value).toFixed(2), // Formata o valor para 2 casas decimais
        data: cadastro.data.value
    };

    fetch('http://localhost:4000/gastos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(corpo)
    })
    .then(response => response.status)
    .then(status => {
        if (status === 201) {
            alert('Gasto cadastrado com sucesso!');
            window.location.reload();
        } else {
            alert('Erro ao cadastrar gasto.');
        }
    });
});

// Receber os dados do servidor e exibir na tabela
fetch('http://localhost:4000/gastos')
    .then(response => response.json())
    .then(gastos => {
        const tabela = document.getElementById('gastos');
        gastos.forEach(gasto => {
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${gasto.id}</td>
                <td>${gasto.descricao}</td>
                <td>R$ ${gasto.valor}</td>
                <td>${gasto.data}</td>
                <td>
                    <button onclick="editarGasto(${gasto.id})">Editar</button>
                    <button onclick="excluirGasto(${gasto.id})">Excluir</button>
                </td>
            `;
            tabela.appendChild(linha);
        });
    });

function editarGasto(id) {
    alert(`Editar gasto com ID ${id}`);
    // Implemente a lógica de edição aqui
}

function excluirGasto(id) {
    if (confirm('Tem certeza que deseja excluir este gasto?')) {
        fetch(`http://localhost:4000/gastos/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.status)
        .then(status => {
            if (status === 200) {
                alert('Gasto excluído com sucesso!');
                window.location.reload();
            } else {
                alert('Erro ao excluir gasto.');
            }
        });
    }
}