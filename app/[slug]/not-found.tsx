export default function NotFound() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: '1rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Propriedade não encontrada</h1>
      <p style={{ color: '#5A5A5A' }}>O link que você usou pode estar desatualizado.</p>
    </div>
  );
}
