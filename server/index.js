const express = require('express');
const cors = require('cors');
const rotas = require('./src/routes'); 

// 1. Importações do Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

process.on('uncaughtException', (err) => { console.error("🚨 ERRO FATAL:", err); });
process.on('unhandledRejection', (reason, promise) => { console.error("🚨 PROMISE REJEITADA:", reason); });

const app = express();
const PORT = 3005;

app.use(cors());
app.use(express.json());

// 2. Rota mágica para a página do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res, next) => {
    console.log(`➡️  Recebeu chamada do React: ${req.method} ${req.url}`);
    next();
});

app.use(rotas);

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`🚀 Servidor Modularizado rodando na porta ${PORT}`);
        console.log(`📖 Documentação online em http://localhost:${PORT}/api-docs`);
    });
}

module.exports = app;