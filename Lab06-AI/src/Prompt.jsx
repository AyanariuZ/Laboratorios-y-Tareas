const PromptInput = ({ value, onChange}) => {
  return (
    <>
    <div className="text-center text-white mb-4">
      <h1 className="display-4 fw-bold mb-3" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        🤖 DeepSeek Chat
      </h1>
      <p className="lead">Mandale mensaje a DeepSeek y haganse mejores amigos :3</p>
    </div>
    <div className="mb-4">
      <label htmlFor="prompt" className="form-label">
        <strong>Tu pregunta o prompt</strong>
      </label>
      <textarea
        className="form-control"
        id="prompt"
        rows="4"
        placeholder="Escribe aquí tu pregunta para DeepSeek..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          resize: 'none',
          borderRadius: '10px',
          border: '2px solid #e9ecef',
          padding: '12px 16px'
        }}
      />
    </div>
    </>
  );
};

export default PromptInput