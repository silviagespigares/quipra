import { useState, useEffect } from 'react';

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [telefon, setTelefon] = useState('');

  // Carregar els clients del backend en iniciar
  useEffect(() => {
    fetch('http://localhost:8080/api/clients')
      .then(res => res.json())
      .then(data => setClients(data))
      .catch(err => console.error('Error carregant clients:', err));
  }, []);

  // Afegir un client nou
  const handleSubmit = (e) => {
    e.preventDefault();
    const newClient = { nom, email, telefon };

    fetch('http://localhost:8080/api/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newClient),
    })
      .then(res => res.json())
      .then(savedClient => {
        setClients([...clients, savedClient]);
        setNom('');
        setEmail('');
        setTelefon('');
      })
      .catch(err => console.error('Error guardant el client:', err));
  };

  return (
    <div>
      <header className="topbar">
        <div>
          <p className="eyebrow">GESTIÓ DE CONTACTES</p>
          <h1>Clients</h1>
        </div>
      </header>

      {/* Formulari per afegir client */}
      <section className="welcome" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Afegir nou client</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #e6dcce', flex: 1 }}
          />
          <input
            type="email"
            placeholder="Correu electrònic"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #e6dcce', flex: 1 }}
          />
          <input
            type="text"
            placeholder="Telèfon"
            value={telefon}
            onChange={(e) => setTelefon(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #e6dcce', flex: 1 }}
          />
          <button type="submit" className="profile-button" style={{ width: 'auto', padding: '0.5rem 1rem', borderRadius: '4px', background: '#dfccb0', cursor: 'pointer' }}>
            Guardar
          </button>
        </form>
      </section>

      {/* Llista de clients */}
      <section className="content-panel">
        <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Llista de clients</h2>
        {clients.length === 0 ? (
          <p style={{ color: '#8c7863' }}>Encara no hi ha cap client registrat.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e6dcce', color: '#8c7863' }}>
                <th style={{ padding: '0.75rem' }}>Nom</th>
                <th style={{ padding: '0.75rem' }}>Email</th>
                <th style={{ padding: '0.75rem' }}>Telèfon</th>
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client.id} style={{ borderBottom: '1px solid #f5f0e6' }}>
                  <td style={{ padding: '0.75rem' }}>{client.nom}</td>
                  <td style={{ padding: '0.75rem' }}>{client.email}</td>
                  <td style={{ padding: '0.75rem' }}>{client.telefon || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}