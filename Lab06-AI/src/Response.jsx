const ResponseSection = ({ response }) => {
  if (!response) return null;

  return (
    <div className="mt-4">
      <div 
        className="card"
        style={{
          background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%)',
          border: '1px solid #e0e7ff',
          borderRadius: '15px'
        }}
      >
        <div className="card-body">
          <pre
            className="mb-0"
            style={{
              whiteSpace: 'pre-wrap',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontSize: '0.95rem',
              lineHeight: '1.6',
              color: '#374151'
            }}
          >
            {response}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ResponseSection