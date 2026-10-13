import { useState } from 'react';

export default function Usuaris({ currentUser, setCurrentUser }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Funció per iniciar sessió amb validació completa
  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    fetch('http://localhost:8080/api/usuaris/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorMsg = await res.text();
          throw new Error(errorMsg || 'Error en l\'inici de sessió');
        }
        return res.json();
      })
      .then((data) => {
        setCurrentUser(data);
        setError('');
      })
      .catch((err) => setError(err.message));
  };

  // Funció per registrar un nou usuari
  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const nouUsuari = { nom, email, password, rol: 'USUARI' };

    fetch('http://localhost:8080/api/usuaris/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nouUsuari),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorMsg = await res.text();
          throw new Error(errorMsg || 'Error al registrar l\'usuari');
        }
        return res.json();
      })
      .then(() => {
        setSuccess('Usuari registrat correctament! Ara ja pots iniciar sessió.');
        setNom('');
        setEmail('');
        setPassword('');
        setTimeout(() => {
          setIsRegistering(false);
          setSuccess('');
        }, 2000);
      })
      .catch((err) => setError(err.message));
  };

  // Funció per tancar sessió
  const handleLogout = () => {
    setCurrentUser(null);
    setEmail('');
    setPassword('');
  };

  // PÀGINA D'ACCÉS (Login / Registre)
  if (!currentUser) {
    return (
      <section style={{ background: '#fbf9f4', padding: '2rem', borderRadius: '8px', border: '1px solid #e6dcce' }}>
        <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem', textAlign: 'center', color: '#5c4a38' }}>
          {isRegistering ? 'Registra\'t a Quipra' : 'Entra al teu compte'}
        </h2>

        {error && (
          <p style={{ color: '#b33939', fontSize: '0.88rem', marginBottom: '1rem', textAlign: 'center', background: '#f8d7da', padding: '0.6rem', borderRadius: '4px', border: '1px solid #f5c6cb' }}>
            ⚠️ {error}
          </p>
        )}
        {success && (
          <p style={{ color: '#2b8a3e', fontSize: '0.88rem', marginBottom: '1rem', textAlign: 'center', background: '#d4edda', padding: '0.6rem', borderRadius: '4px', border: '1px solid #c3e6cb' }}>
            ✓ {success}
          </p>
        )}

        {isRegistering ? (
          /* FORMULARI DE REGISTRE */
          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="text"
              placeholder="Nom complet"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
              style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #e6dcce' }}
            />
            <input
              type="email"
              placeholder="Correu electrònic"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #e6dcce' }}
            />
            <input
              type="password"
              placeholder="Contrasenya"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #e6dcce' }}
            />
            <button type="submit" style={{ padding: '0.75rem', borderRadius: '4px', background: '#dfccb0', cursor: 'pointer', border: 'none', fontWeight: 'bold', color: '#5c4a38' }}>
              Completar Registre
            </button>
          </form>
        ) : (
          /* FORMULARI DE LOGIN */
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="email"
              placeholder="Correu electrònic"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #e6dcce' }}
            />
            <input
              type="password"
              placeholder="Contrasenya"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #e6dcce' }}
            />
            <button type="submit" style={{ padding: '0.75rem', borderRadius: '4px', background: '#dfccb0', cursor: 'pointer', border: 'none', fontWeight: 'bold', color: '#5c4a38' }}>
              Entrar
            </button>
          </form>
        )}

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
          {isRegistering ? (
            <p>
              Ja tens un compte?{' '}
              <button onClick={() => { setIsRegistering(false); setError(''); }} style={{ background: 'none', border: 'none', color: '#8c7863', cursor: 'pointer', textDecoration: 'underline', fontWeight: 'bold' }}>
                Inicia sessió
              </button>
            </p>
          ) : (
            <p>
              No tens compte?{' '}
              <button onClick={() => { setIsRegistering(true); setError(''); }} style={{ background: 'none', border: 'none', color: '#8c7863', cursor: 'pointer', textDecoration: 'underline', fontWeight: 'bold' }}>
                Registra't aquí
              </button>
            </p>
          )}
        </div>
      </section>
    );
  }

  // PÀGINA DE PERFIL (Quan l'usuari ja ha iniciat sessió)
  return (
    <div>
      <header className="topbar">
        <div>
          <p className="eyebrow">EL TEU COMPTE</p>
          <h1>El meu espai</h1>
        </div>
        <button 
          onClick={handleLogout} 
          style={{ background: '#dfccb0', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', color: '#5c4a38' }}
        >
          Tancar sessió
        </button>
      </header>

      <section className="welcome" style={{ marginBottom: '1.5rem', background: '#fbf9f4', padding: '2rem', borderRadius: '8px', border: '1px solid #e6dcce' }}>
        <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#5c4a38' }}>Dades personals de l'usuari</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: '#5c4a38' }}>
          <p><strong>Nom:</strong> {currentUser.nom}</p>
          <p><strong>Correu electrònic:</strong> {currentUser.email}</p>
          <p><strong>Rol assignat:</strong> <span style={{ background: '#dfccb0', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold' }}>{currentUser.rol}</span></p>
        </div>
      </section>
    </div>
  );
}