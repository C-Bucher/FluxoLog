const prisma = require('./database');

const listarProdutos = async (req, res) => {
    try {
        const produtos = await prisma.produto.findMany({
            where: { empresa_id: parseInt(req.params.empresa_id) },
            orderBy: { id: 'asc' }
        });
        res.json(produtos.map(p => ({ ...p, preco: Number(p.preco) })));
    } catch (error) { res.status(500).json({ error: error.message }); }
};

const criarProduto = async (req, res) => {
    const { nome, qtd, preco, empresa_id } = req.body;
    try {
        const novo = await prisma.produto.create({
            data: { nome, qtd: parseInt(qtd), preco: parseFloat(preco), empresa_id: parseInt(empresa_id) }
        });
        res.status(201).json({ ...novo, preco: Number(novo.preco) });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

const atualizarProduto = async (req, res) => {
    const { nome, qtd, preco } = req.body;
    try {
        const atualizado = await prisma.produto.update({
            where: { id: parseInt(req.params.id) },
            data: { nome, qtd: parseInt(qtd), preco: parseFloat(preco) }
        });
        res.json({ ...atualizado, preco: Number(atualizado.preco) });
    } catch (error) {
        if (error.code === 'P2025') res.status(404).send("Produto nao encontrado");
        else res.status(500).json({ error: error.message });
    }
};

const deletarProduto = async (req, res) => {
    try {
        await prisma.produto.delete({ where: { id: parseInt(req.params.id) } });
        res.json({ message: "Produto removido com sucesso!" });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

const obterEstatisticas = async (req, res) => {
    const empresa_id = parseInt(req.params.empresa_id);
    try {
        const agregacao = await prisma.produto.aggregate({
            where: { empresa_id }, _count: { id: true }, _sum: { qtd: true }
        });
        const produtos = await prisma.produto.findMany({
            where: { empresa_id }, select: { qtd: true, preco: true }
        });
        
        const valorTotal = produtos.reduce((acc, p) => acc + (p.qtd * Number(p.preco)), 0);

        res.json({
            total_produtos_diferentes: agregacao._count.id,
            total_itens_fisicos: agregacao._sum.qtd || 0,
            valor_total_estoque: valorTotal
        });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

module.exports = { listarProdutos, criarProduto, atualizarProduto, deletarProduto, obterEstatisticas };