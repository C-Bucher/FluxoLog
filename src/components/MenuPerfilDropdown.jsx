import { useState, useEffect } from 'react';

export default function MenuPerfilDropdown({ empresa, onSwitchProfile, onLogout, onClose }) {
  const [contas, setContas] = useState([]);
  const [contaAtivaParaSenha, setContaAtivaParaSenha] = useState(null);
  const [senha, setSenha] = useState('');

  useEffect(() => {
    const salvas = JSON.parse(localStorage.getItem('fluxolog_contas_salvas')) || [];
    setContas(salvas.filter(c => c.id !== empresa.id)); 
  }, [empresa]);

  const handleTroca = async (emailSelecionado) => {
    try {
      const resposta = await fetch('http://localhost:3005/api/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: emailSelecionado, senha })
      });
      const dados = await resposta.json();

      if (resposta.ok) {
        onSwitchProfile(dados, emailSelecionado);
        setSenha('');
        setContaAtivaParaSenha(null);
        onClose(); 
      } else { alert("Senha incorreta."); }
    } catch (erro) { alert("Erro ao conectar."); }
  };

  return (
    <div className="dropdown-perfil-card">
      <div className="dp-secao-ativa">
        <div className="dp-avatar-grande">
          {empresa.nome_empresa ? empresa.nome_empresa.charAt(0).toUpperCase() : 'E'}
        </div>
        <h3>{empresa.nome_empresa}</h3>
        <p>{empresa.email}</p>
      </div>

      <div className="dp-divisor"></div>

      <div className="dp-secao-contas">
        {contas.length > 0 ? (
          contas.map((c, i) => (
            <div key={i} className="dp-conta-wrapper">
              <div className="dp-conta-item" onClick={() => setContaAtivaParaSenha(contaAtivaParaSenha === c.email ? null : c.email)}>
                <div className="dp-avatar-pequeno">{c.nome_empresa.charAt(0).toUpperCase()}</div>
                <div className="dp-conta-info">
                  <span className="dp-nome">{c.nome_empresa}</span>
                  <span className="dp-email">{c.email}</span>
                </div>
              </div>
              
              {contaAtivaParaSenha === c.email && (
                <div className="dp-senha-inline">
                  <input type="password" placeholder="Senha..." value={senha} onChange={(e) => setSenha(e.target.value)} autoFocus />
                  <button onClick={() => handleTroca(c.email)}>Entrar</button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="dp-sem-contas">Nenhuma outra conta salva.</div>
        )}
      </div>

      <div className="dp-divisor"></div>

      <div className="dp-acao-item" onClick={onLogout}>
        Adicionar outra conta
      </div>
      <div className="dp-acao-item" onClick={onLogout}>
        Sair
      </div>
    </div>
  );
}