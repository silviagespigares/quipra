import { useState, useEffect } from 'react';

export default function Calendari() {
  const [esdeveniments, setEsdeveniments] = useState([]);
  const [titol, setTitol] = useState('');
  const [data, setData] = useState('');
  const [descripcio, setDescripcio] = useState('');

  // Carregar els esdeveniments del backend en iniciar
  useEffect(() => {
    fetch('http://localhost:8080/api/esdeveniments')
      .then(res => res.json())
      .then(data => setEsdeveniments(data))
      .catch(err => console.error('Error carregant esdeveniments:', err));
  }, []);

  // Afegir un esdeveniment nou
  const handleSubmit = (e) => {
    e.preventDefault();
    const newEsdeveniment = { titol, data, descripcio };

    fetch('http://localhost:8080/api/esdeveniments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEsdeveniment),
    })
      .then(res => res.json())
      .then(savedEsdeveniment => {
        setEsdeveniments([...esdeveniments, savedEsdeveniment]);
        setTitol('');
        setData('');
        setDescripcio('');
      })
      .catch(err => console.error('Error guardant l\'esdeveniment:', err));
  };

  return (
    <div>
      <header className="topbar">
        <div>
          <p className="eyebrow">GESTIÓ DEL TEMPS</p>
          <h1>Calendari</h1>
        </div>
      </header>

      {/* Formulari per afegir esdeveniment */}
      <section className="welcome" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Afegir nou esdeveniment</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Títol de l'esdeveniment"
            value={titol}
            onChange={(e) => setTitol(e.target.value)}
            required
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #e6dcce', flex: 1 }}
          />
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #e6dcce', flex: 1 }}
          />
          <input
            type="text"
            placeholder="Descripció"
            value={descripcio}
            onChange={(e) => setDescripcio(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #e6dcce', flex: 1 }}
          />
          <button type="submit" className="profile-button" style={{ width: 'auto', padding: '0.5rem 1rem', borderRadius: '4px', background: '#dfccb0', cursor: 'pointer' }}>
            Guardar
          </button>
        </form>
      </section>

      {/* Llista d'esdeveniments */}
      <section className="content-panel">
        <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Pròxims esdeveniments</h2>
        {esdeveniments.length === 0 ? (
          <p style={{ color: '#8c7863' }}>Encara no hi ha cap esdeveniment al calendari.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e6dcce', color: '#8c7863' }}>
                <th style={{ padding: '0.75rem' }}>Títol</th>
                <th style={{ padding: '0.75rem' }}>Data</th>
                <th style={{ padding: '0.75rem' }}>Descripció</th>
              </tr>
            </thead>
            <tbody>
              {esdeveniments.map(ev => (
                <tr key={ev.id} style={{ borderBottom: '1px solid #f5f0e6' }}>
                  <td style={{ padding: '0.75rem' }}>{ev.titol}</td>
                  <td style={{ padding: '0.75rem' }}>{ev.data}</td>
                  <td style={{ padding: '0.75rem' }}>{ev.descripcio || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}