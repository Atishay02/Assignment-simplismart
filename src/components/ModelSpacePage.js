import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ModelSpacePage = () => {
  const { id } = useParams();
  const [modelSpace, setModelSpace] = useState(null);
  const [inputs, setInputs] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [output, setOutput] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchModelSpace = async () => {
      try {
        const response = await axios.get(`https://frontend-assignment-api.misc.simplismart.ai/model-spaces/${id}`);
        setModelSpace(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchModelSpace();
  }, [id]);

  const handleFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = error => reject(error);
    });
  };

  const handleChange = async (e) => {
    const { name, type, files, value } = e.target;
    if (type === 'file' && files.length > 0) {
      const file = files[0];
      const base64 = await handleFileToBase64(file);
      setInputs({ ...inputs, [name]: base64 });
    } else {
      setInputs({ ...inputs, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://frontend-assignment-api.misc.simplismart.ai/model-spaces/${id}/predict`, inputs);
      setOutput(response.data.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const renderOutput = (key, value) => {
    if (typeof value === 'string' && value.startsWith('http')) {
      return <img src={value} alt={key} style={{ maxWidth: '100%', height: 'auto' }} />;
    }
    return <pre>{JSON.stringify(value, null, 2)}</pre>;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const containerStyle = {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    height: 'auto',
    minHeight: '96.5vh',
    fontFamily: 'Arial, sans-serif',
    padding: '1% 2% 0.5% 2%',
    backgroundColor: "#f4f4f9"
  };

  const formContainerStyle = {
    flex: isMobile ? '1' : '0.4',
    marginRight: isMobile ? '0' : '2%',
    marginBottom: isMobile ? '2%' : '0',
    padding: '1% 2% 1% 2%',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const outputContainerStyle = {
    flex: isMobile ? '1' : '0.6',
    padding: '2%',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <h1 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>{modelSpace.name}</h1>
        <p style={{ marginBottom: '2rem', fontSize: '1rem' }}>{modelSpace.description}</p>
        <form onSubmit={handleSubmit} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {modelSpace.inputs.map(input => (
            <div key={input.name} style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '1rem' }}>{input.description}</label>
              <input
                type={input.type === "image" || input.type === "audio" ? "file" : input.type}
                name={input.name}
                onChange={handleChange}
                required={input.required}
                accept={input.type === "image" ? "image/jpeg, image/jpg, image/png" : input.type === "audio" ? "audio/mpeg" : ""}
                style={{ width: '100%', padding: '0.35rem', borderRadius: '5px', border: '1px solid #ddd' }}
              />
            </div>
          ))}
          <button type="submit" style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'}
          >
            Predict
          </button>
        </form>
      </div>
      <div style={outputContainerStyle}>
        {output && (
          <div className="output-section" style={{ flex: 1 }}>
            <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Output</h2>
            {Object.entries(output).map(([key, value]) => (
              <div key={key} style={{ marginBottom: '1rem' }}>
                <strong>{key}:</strong>
                {renderOutput(key, value)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelSpacePage;
