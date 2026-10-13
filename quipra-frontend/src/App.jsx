import { useState, useEffect } from 'react';
import './App.css';
import Usuaris from './Usuaris';
import Calendari from './Calendari';
import Clients from './Clients';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('inici');
  const [backendError, setBackendError] = useState(false);

  // Comprovació de connexió amb el backend en carregar l'aplicació
  useEffect(() => {
    fetch('http://localhost:8080/api/usuaris')
      .then((res) => {
        if (!res.ok) throw new Error('Error de connexió');
        setBackendError(false);
      })
      .catch(() => {
        // Si el backend està apagat o cau la base de dades
        setBackendError(true);
      });
  }, []);

  // Si no hi ha connexió amb el backend, mostrem un banner o pantalla d'incidència
  const renderSystemIncidenceAlert = () => {
    if (!backendError) return null;
    return (
      <div style={{
        background: '#f8d7da',
        color: '#721c24',
        padding: '0.75rem 1.5rem',
        borderBottom: '1px solid #f5c6cb',
        textAlign: 'center',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem'
      }}>
        ⚠️ <span>Incidència de sistema: No es pot connectar amb el servidor (backend/BDD). Comprova que Spring Boot estigui en marxa.</span>
        <button 
          onClick={() => window.location.reload()} 
          style={{ background: '#721c24', color: '#fff', border: 'none', padding: '0.2rem 0.6rem', borderRadius: '4px', cursor: 'pointer', marginLeft: '0.5rem', fontSize: '0.8rem' }}
        >
          Reintentar
        </button>
      </div>
    );
  };

  // Si NO hi ha usuari loguejat, mostrem la Landing Page de presentació + Login/Registre
  if (!currentUser) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: '#f5f0e6', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: '2rem',
        fontFamily: 'inherit',
        color: '#5c4a38'
      }}>
        {renderSystemIncidenceAlert()}

        {/* Contenidor principal tipus Landing */}
        <div style={{ 
          maxWidth: '900px', 
          width: '100%', 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '3rem', 
          alignItems: 'center',
          background: '#fbf9f4',
          padding: '3rem',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(92, 74, 56, 0.08)',
          border: '1px solid #e6dcce',
          marginTop: backendError ? '1rem' : '0'
        }}>
          
          {/* Columna esquerra: Presentació de l'aplicació */}
          <div>
            <span style={{ fontSize: '2.5rem', fontWeight: 'bold', fontFamily: 'serif', letterSpacing: '-1px' }}>
              QuiPra
            </span>
            <p style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#8c7863', marginTop: '0.5rem', marginBottom: '1.5rem', fontWeight: 'bold' }}>
              Gestió integral per a professionals freelance
            </p>
            <h1 style={{ fontSize: '1.8rem', lineHeight: '1.2', marginBottom: '1rem', color: '#5c4a38' }}>
              Organitza el teu negoci, simplifica el teu dia a dia.
            </h1>
            <p style={{ color: '#6b5744', lineHeight: '1.6', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              Quipra és l'espai de treball definitiu per portar el control dels teus clients, esdeveniments, tasques i hores de manera centralitzada i sota un entorn segur.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: '#5c4a38' }}>
              <li>✓ Control total de clients i projectes</li>
              <li>✓ Agenda i calendari sincronitzats</li>
              <li>✓ Accés privat i segur per a usuaris</li>
            </ul>
          </div>

          {/* Columna dreta: Formulari de Login / Registre (Component Usuaris) */}
          <div style={{ width: '100%' }}>
            <Usuaris currentUser={currentUser} setCurrentUser={setCurrentUser} />
          </div>

        </div>

        {/* Peu de pàgina discret */}
        <footer style={{ marginTop: '2rem', fontSize: '0.85rem', color: '#8c7863' }}>
          Quipra Freelance Dashboard &copy; 2026 — Projecte Acadèmic EAC
        </footer>
      </div>
    );
  }

  // Si JA ha iniciat sessió, mostrem tot l'aplicatiu web complet amb el seu sidebar i vistes
  return (
    <div className="quipra" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {renderSystemIncidenceAlert()}
      
      <div style={{ display: 'flex', flex: 1 }}>
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="brand">
            <span className="brand-icon">QuiPra</span>
          </div>

          <p className="menu-label">ESPAI DE TREBALL</p>

          <nav className="navigation">
            <button 
              onClick={() => setCurrentView('inici')} 
              className={`nav-link ${currentView === 'inici' ? 'active' : ''}`}
              style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
            >
              <span>⌂</span> Inici
            </button>
            
            <button 
              onClick={() => setCurrentView('calendari')} 
              className={`nav-link ${currentView === 'calendari' ? 'active' : ''}`}
              style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
            >
              <span>▦</span> Calendari
            </button>
            
            <a href="#tasques" className="nav-link" onClick={(e) => e.preventDefault()}>
              <span>✓</span> Tasques
            </a>
            
            <a href="#projectes" className="nav-link" onClick={(e) => e.preventDefault()}>
              <span>▤</span> Projectes
            </a>
            
            <button 
              onClick={() => setCurrentView('clients')} 
              className={`nav-link ${currentView === 'clients' ? 'active' : ''}`}
              style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
            >
              <span>♙</span> Clients
            </button>
            
            <a href="#hores" className="nav-link" onClick={(e) => e.preventDefault()}>
              <span>◷</span> Hores treballades
            </a>
            
            <a href="#documents" className="nav-link" onClick={(e) => e.preventDefault()}>
              <span>▧</span> Documents
            </a>
            
            <a href="#viatges" className="nav-link" onClick={(e) => e.preventDefault()}>
              <span>✈</span> Viatges i tiquets
            </a>
          </nav>

          {/* SIDEBAR BOTTOM INTERACTIU */}
          <button 
            onClick={() => setCurrentView('usuaris')} 
            className={`sidebar-bottom ${currentView === 'usuaris' ? 'active' : ''}`}
            style={{ background: currentView === 'usuaris' ? '#dfccb0' : 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: '6px' }}
          >
            <div className="avatar">
              {currentUser.nom ? currentUser.nom.substring(0, 2).toUpperCase() : 'US'}
            </div>
            <div>
              <strong>{currentUser.nom}</strong>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#8c7863' }}>
                El meu compte
              </p>
            </div>
          </button>
        </aside>

        {/* MAIN CONTENT DINÀMIC */}
        <main className="main-content">
          {currentView === 'inici' && (
            <>
              <header className="topbar">
                <div>
                  <p className="eyebrow">EL TEU ESPAI PROFESSIONAL</p>
                  <h1>Inici</h1>
                </div>
                <button className="profile-button" type="button">
                  {currentUser.nom ? currentUser.nom.substring(0, 2).toUpperCase() : 'US'}
                </button>
              </header>

              <section className="welcome">
                <p className="eyebrow">EL TEU DIA, MÉS ORGANITZAT</p>
                <h2>Bon dia, {currentUser.nom}! 👋</h2>
                <p>
                  Benvinguda a Quipra. Organitza la teva feina i tingues-ho
                  tot sota control.
                </p>
              </section>

              <section className="overview">
                <article className="overview-card">
                  <span className="card-icon">✓</span>
                  <p>Tasques pendents</p>
                  <strong>5</strong>
                  <small>Per completar</small>
                </article>

                <article className="overview-card">
                  <span className="card-icon">▦</span>
                  <p>Esdeveniments d'avui</p>
                  <strong>3</strong>
                  <small>Al teu calendari</small>
                </article>

                <article className="overview-card">
                  <span className="card-icon">◷</span>
                  <p>Hores aquesta setmana</p>
                  <strong>24 h</strong>
                  <small>Temps registrat</small>
                </article>
              </section>

              <section className="content-panel">
                <div>
                  <p className="eyebrow">EL TEU ESPAI DE TREBALL</p>
                  <h2>Tot el que necessites, en un sol lloc.</h2>
                  <p>
                    Consulta les teves tasques, organitza els projectes i
                    mantén els documents a mà.
                  </p>
                </div>
              </section>
            </>
          )}

          {currentView === 'calendari' && <Calendari />}
          {currentView === 'clients' && <Clients />}
          {currentView === 'usuaris' && <Usuaris currentUser={currentUser} setCurrentUser={setCurrentUser} />}
        </main>
      </div>
    </div>
  );
}

export default App;