const prisma = require('./database');
const bcrypt = require('bcrypt');

const registrarEmpresa = async (req, res) => {
    const { nome_empresa, email, senha } = req.body;
    try {
        const saltos = 10;
        const senhaCriptografada = await bcrypt.hash(senha, saltos);

        const novaEmpresa = await prisma.empresa.create({
            data: { nome_empresa, email, senha: senhaCriptografada },
            select: { id: true, nome_empresa: true }
        });

        res.status(201).json(novaEmpresa);
    } catch (error) {
        if (error.code === 'P2002') res.status(400).json({ error: "Este e-mail ja esta cadastrado." });
        else res.status(500).json({ error: error.message });
    }
};

const loginEmpresa = async (req, res) => {
    const { email, senha } = req.body;
    try {
        const empresa = await prisma.empresa.findUnique({ where: { email } });

        if (empresa) {
            const senhaValida = await bcrypt.compare(senha, empresa.senha);
            if (senhaValida) res.json({ id: empresa.id, nome_empresa: empresa.nome_empresa });
            else res.status(401).json({ error: "E-mail ou senha incorretos." });
        } else {
            res.status(401).json({ error: "E-mail ou senha incorretos." });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { registrarEmpresa, loginEmpresa };