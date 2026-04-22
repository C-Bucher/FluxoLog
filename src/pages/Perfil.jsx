export default function Perfil({ empresa }) {
  return (
    <div className="perfil-container-ref">
      <div className="card-ref">
        <div className="avatar-ref">
          <svg viewBox="0 0 24 24" fill="#a0aec0" width="60px" height="60px">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
        
        <h1 className="nome-empresa-ref">{empresa.nome_empresa}</h1>
        
        <div className="info-secao-ref">
          <h3>Informações da empresa</h3>
          <ul>
            <li>
              <strong>Endereço de e-mail:</strong><br />
              <a href={`mailto:${empresa.email}`} className="email-link-ref">{empresa.email}</a>
            </li>
            <li style={{ marginTop: '15px' }}>
              <strong>ID no Sistema:</strong><br />
              <span style={{ color: '#475569' }}>#{empresa.id}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}