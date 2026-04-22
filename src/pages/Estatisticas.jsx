import { useState, useEffect } from 'react';

export default function Estatisticas({ empresaId }) {
  const [stats, setStats] = useState({ total_produtos_diferentes: 0, total_itens_fisicos: 0, valor_total_estoque: 0 });

  useEffect(() => {
    const carregarEstatisticas = async () => {
      try {
        const resposta = await fetch(`http://localhost:3005/api/estatisticas/${empresaId}`);
        const dados = await resposta.json();
        setStats(dados);
      } catch (erro) { console.error("Erro ao buscar estatísticas:", erro); }
    };
    carregarEstatisticas();
  }, [empresaId]);

  return (
    <div className="card-estatisticas">
      <h2>Dashboard Financeiro e Estoque</h2>
      <p>Resumo em tempo real da empresa.</p>
      <div className="stats-grid">
        <div className="stat-box">
          <h3>Total de Produtos (Tipos)</h3>
          <p className="stat-numero">{stats.total_produtos_diferentes}</p>
        </div>
        <div className="stat-box">
          <h3>Unidades Físicas (Volume)</h3>
          <p className="stat-numero">{stats.total_itens_fisicos} un.</p>
        </div>
        <div className="stat-box destaque">
          <h3>Capital em Estoque</h3>
          <p className="stat-numero valor">R$ {Number(stats.valor_total_estoque).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}