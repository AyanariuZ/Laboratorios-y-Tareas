const SubmitButton = ({ loading, onClick }) => {
  return (
    <div className="d-grid">
      <button
        className="btn btn-primary btn-lg"
        onClick={onClick}
        disabled={loading}
        style={{
          background: '#667eea',
          border: 'none',
          borderRadius: '10px',
          padding: '12px 24px',
          fontWeight: '500'
        }}
      >
        {loading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Enviando...
          </>
        ) : (
          <>
            <i className="bi bi-send me-2"></i>
            Enviar Prompt
          </>
        )}
      </button>
    </div>
  );
};

export default SubmitButton