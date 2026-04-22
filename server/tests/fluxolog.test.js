//npm test <-- Comando para iniciar os testes

const request = require('supertest');
const app = require('../index.js'); // Importa a nossa API

describe('Testes Automatizados - API do FluxoLog', () => {

    // TESTE 1
    it('1. Deve negar o login se o e-mail não existir no banco (Erro 401)', async () => {
        const resposta = await request(app)
            .post('/api/login')
            .send({ email: 'email_fantasma@teste.com', senha: '123' });
        
        expect(resposta.statusCode).toEqual(401);
        expect(resposta.body).toHaveProperty('error');
    });

    // TESTE 2
    it('2. Deve negar o login se não enviar a senha (Erro 500 ou 401)', async () => {
        const resposta = await request(app)
            .post('/api/login')
            .send({ email: 'admin@ceub.com' }); // Sem senha
        
        expect(resposta.statusCode).not.toEqual(200); // Garante que não fez login
    });

    // TESTE 3
    it('3. Deve retornar lista vazia (Status 200) ao buscar produtos de uma empresa que não existe', async () => {
        const resposta = await request(app).get('/api/produtos/999999');
        
        expect(resposta.statusCode).toEqual(200);
        expect(resposta.body).toEqual([]); // Array vazio
    });

    // TESTE 4
    it('4. Deve retornar totais zerados (Status 200) nas estatísticas de uma empresa fantasma', async () => {
        const resposta = await request(app).get('/api/estatisticas/999999');
        
        expect(resposta.statusCode).toEqual(200);
        expect(resposta.body.total_produtos_diferentes).toEqual(0);
        expect(resposta.body.total_itens_fisicos).toEqual(0);
        expect(resposta.body.valor_total_estoque).toEqual(0);
    });

    // TESTE 5
    it('5. Deve retornar erro 404 ao tentar atualizar um produto que não existe', async () => {
        const resposta = await request(app)
            .put('/api/produtos/999999')
            .send({ nome: 'Produto Fantasma', qtd: 10, preco: 50.00 });
        
        expect(resposta.statusCode).toEqual(404);
        expect(resposta.text).toBe("Produto nao encontrado");
    });

});