const express = require('express');
const router = express.Router();

const empresaController = require('./empresaController');
const produtoController = require('./produtoController');

// Rotas de Empresa
router.post('/api/empresas', empresaController.registrarEmpresa);
router.post('/api/login', empresaController.loginEmpresa);

// Rotas de Produto
router.get('/api/produtos/:empresa_id', produtoController.listarProdutos);
router.post('/api/produtos', produtoController.criarProduto);
router.put('/api/produtos/:id', produtoController.atualizarProduto);
router.delete('/api/produtos/:id', produtoController.deletarProduto);

// Rota de Estatísticas
router.get('/api/estatisticas/:empresa_id', produtoController.obterEstatisticas);

module.exports = router;