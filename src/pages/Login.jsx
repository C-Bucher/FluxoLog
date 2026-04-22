import { useState } from 'react';
import logo from '../assets/logo-white.png'; // Repare no ../ para voltar uma pasta

export default function Login({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [nomeEmpresa, setNomeEmpresa] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/login' : '/api/empresas';
    const body = isLogin ? { email, senha } : { nome_empresa: nomeEmpresa, email, senha };

    try {
      const resposta = await fetch(`http://localhost:3005${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const dados = await resposta.json();

      if (resposta.ok) {
        onLogin(dados, email);
      } else {
        alert(dados.error || "Erro ao processar.");
      }
    } catch (erro) {
      alert("Erro de conexao com o servidor.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={logo} alt="FluxoLog" style={{ height: '60px', marginBottom: '20px', backgroundColor: '#2c3e50', padding: '10px', borderRadius: '8px' }} />
        <h2>{isLogin ? "Acessar Sistema" : "Cadastrar Empresa"}</h2>

        <form onSubmit={handleSubmit} className="login-form">
          {!isLogin && (
            <input type="text" placeholder="Nome da Empresa" value={nomeEmpresa} onChange={(e) => setNomeEmpresa(e.target.value)} required />
          )}
          <input type="email" placeholder="E-mail corporativo" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />

          <button type="submit" className="btn-login">
            {isLogin ? "Entrar" : "Criar Conta"}
          </button>
        </form>

        <p className="login-toggle" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Nao tem conta? Cadastre sua empresa." : "Ja tem conta? Faca login."}
        </p>
      </div>
    </div>
  );
}