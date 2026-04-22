import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import logo from './assets/logo-white.png';
import "./App.css";

// --- IMPORTAÇÃO DOS MÓDULOS ---
import Login from './pages/Login';
import Estatisticas from './pages/Estatisticas';
import Perfil from './pages/Perfil';
import MenuPerfilDropdown from './components/MenuPerfilDropdown';

// --- SISTEMA PRINCIPAL (Painel) ---
function FluxoLogApp({ empresa, onLogout, onSwitchProfile }) {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState('');
  const [qtd, setQtd] = useState('');
  const [preco, setPreco] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [busca, setBusca] = useState('');
  const [menuAberto, setMenuAberto] = useState(false);
  const [perfilAberto, setPerfilAberto] = useState(false);

  const navigate = useNavigate();

  const carregarEstoque = async () => {
    try {
      const resposta = await fetch(`http://localhost:3005/api/produtos/${empresa.id}`);
      const dados = await resposta.json();
      setProdutos(dados);
    } catch (erro) { console.error(erro); }
  };

  const alterarQuantidade = async (produto, mudanca) => {
    const novaQtd = Number(produto.qtd) + mudanca;
    if (novaQtd < 0) { alert("Erro: O estoque não pode ficar negativo!"); return; }
    try {
      await fetch(`http://localhost:3005/api/produtos/${produto.id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ nome: produto.nome, qtd: novaQtd, preco: produto.preco })
      });
      carregarEstoque(); 
    } catch (erro) { console.error("Erro ao atualizar quantidade:", erro); }
  };

  const salvarProduto = async (e) => {
    e.preventDefault();
    const dados = { nome, qtd, preco, empresa_id: empresa.id };
    if (editandoId) {
      await fetch(`http://localhost:3005/api/produtos/${editandoId}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dados)
      });
      setEditandoId(null);
    } else {
      await fetch('http://localhost:3005/api/produtos', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dados)
      });
    }
    setNome(''); setQtd(''); setPreco('');
    carregarEstoque();
    alert("Produto salvo com sucesso!");
    navigate('/');
  };

  const prepararEdicao = (p) => { setEditandoId(p.id); setNome(p.nome); setQtd(p.qtd); setPreco(p.preco); navigate('/adicionar'); };
  const cancelarEdicao = () => { setEditandoId(null); setNome(''); setQtd(''); setPreco(''); navigate('/'); };
  const deletarProduto = async (id) => {
    if (window.confirm("Confirmar exclusão?")) {
      await fetch(`http://localhost:3005/api/produtos/${id}`, { method: 'DELETE' });
      carregarEstoque();
    }
  };

  useEffect(() => { carregarEstoque(); }, [empresa]);

  const produtosFiltrados = produtos.filter(p => p.nome.toLowerCase().includes(busca.toLowerCase()));
  const fecharPerfilOverlay = () => setPerfilAberto(false);

  return (
    <div className={`app-container ${menuAberto ? 'com-menu' : ''}`}>
      {perfilAberto && <div className="overlay-invisivel" onClick={fecharPerfilOverlay}></div>}

      <aside className={`sidebar ${menuAberto ? 'aberta' : ''}`}>
        <div className="sidebar-logo"><img src={logo} alt="Logo FluxoLog" /></div>
        <nav className="sidebar-nav">
          <ul>
            <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Estoque Atual</NavLink></li>
            <li><NavLink to="/adicionar" className={({ isActive }) => isActive ? "active" : ""}>Adicionar Produto</NavLink></li>
            <li><NavLink to="/estatisticas" className={({ isActive }) => isActive ? "active" : ""}>Estatísticas</NavLink></li>
            <li><NavLink to="/perfil" className={({ isActive }) => isActive ? "active" : ""}>Perfil da Empresa</NavLink></li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <header className="main-header">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button className="btn-menu" onClick={() => setMenuAberto(!menuAberto)}>☰ Menu</button>
            <h1>Gestão de Estoque</h1>
          </div>
          
          <div className="header-perfil-container">
            <button className="bolinha-perfil-header" onClick={() => setPerfilAberto(!perfilAberto)}>
              {empresa.nome_empresa.charAt(0).toUpperCase()}
            </button>
            
            {perfilAberto && (
              <MenuPerfilDropdown 
                empresa={empresa} 
                onSwitchProfile={onSwitchProfile} 
                onLogout={onLogout} 
                onClose={fecharPerfilOverlay}
              />
            )}
          </div>
        </header>

        <Routes>
          <Route path="/" element={
            <div className="card-estoque card">
              <div className="estoque-header">
                <h2>Painel de Controle</h2>
                <input type="text" placeholder="Buscar produto..." value={busca} onChange={(e) => setBusca(e.target.value)} className="input-busca" />
              </div>
              <table>
                <thead><tr><th>ID</th><th>Produto</th><th>Quantidade</th><th>Preço</th><th>Ações</th></tr></thead>
                <tbody>
                  {produtosFiltrados.length > 0 ? (
                    produtosFiltrados.map((p) => (
                      <tr key={p.id} className={p.qtd <= 5 ? "estoque-baixo" : ""}>
                        <td>{p.id}</td>
                        <td>{p.nome}{p.qtd <= 5 && <span className="badge-alerta">Estoque Baixo</span>}</td>
                        <td>
                          <div className="controle-qtd">
                            <button className="btn-qtd" onClick={() => alterarQuantidade(p, -1)}>-</button>
                            <span style={{ minWidth: '30px', textAlign: 'center' }}>{p.qtd}</span>
                            <button className="btn-qtd" onClick={() => alterarQuantidade(p, 1)}>+</button>
                          </div>
                        </td>
                        <td>R$ {Number(p.preco).toFixed(2)}</td>
                        <td>
                          <button className="btn-action" onClick={() => prepararEdicao(p)}>Editar</button>
                          <button className="btn-action btn-delete" onClick={() => deletarProduto(p.id)}>Excluir</button>
                        </td>
                      </tr>
                    ))
                  ) : (<tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>Nenhum produto encontrado.</td></tr>)}
                </tbody>
              </table>
            </div>
          } />
          <Route path="/adicionar" element={
            <section className="form-cadastro card">
              <h2>{editandoId ? "Editar Item" : "Cadastrar Novo Produto"}</h2>
              <form onSubmit={salvarProduto}>
                <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
                <input type="number" placeholder="Qtd" value={qtd} onChange={(e) => setQtd(e.target.value)} required />
                <input type="number" step="0.01" placeholder="Preço" value={preco} onChange={(e) => setPreco(e.target.value)} required />
                <button type="submit" className={editandoId ? "btn-edit" : "btn-add"}>{editandoId ? "Salvar Alterações" : "Cadastrar"}</button>
                {editandoId && <button type="button" className="btn-cancel" onClick={cancelarEdicao}>Cancelar</button>}
              </form>
            </section>
          } />
          <Route path="/estatisticas" element={<Estatisticas empresaId={empresa.id} />} />
          <Route path="/perfil" element={<Perfil empresa={empresa} />} />
        </Routes>
      </main>
    </div>
  );
}

// --- CONTROLE DE AUTENTICAÇÃO ---
export default function App() {
  const [empresaLogada, setEmpresaLogada] = useState(null);

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('fluxolog_usuario');
    if (usuarioSalvo) { setEmpresaLogada(JSON.parse(usuarioSalvo)); }
  }, []);

  const handleLogin = (dadosEmpresa, emailDigitado) => {
    const empresaCompleta = { ...dadosEmpresa, email: emailDigitado };
    setEmpresaLogada(empresaCompleta);
    localStorage.setItem('fluxolog_usuario', JSON.stringify(empresaCompleta));

    if (emailDigitado) {
      let salvas = JSON.parse(localStorage.getItem('fluxolog_contas_salvas')) || [];
      salvas = salvas.filter(c => c.email !== emailDigitado); 
      salvas.push({ id: empresaCompleta.id, nome_empresa: empresaCompleta.nome_empresa, email: emailDigitado });
      localStorage.setItem('fluxolog_contas_salvas', JSON.stringify(salvas));
    }
  };

  const handleLogout = () => {
    setEmpresaLogada(null);
    localStorage.removeItem('fluxolog_usuario');
  };

  return (
    <Router>
      {empresaLogada ? (
        <FluxoLogApp empresa={empresaLogada} onLogout={handleLogout} onSwitchProfile={handleLogin} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </Router>
  );
}