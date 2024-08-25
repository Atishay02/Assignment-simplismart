import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [modelSpaces, setModelSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModelSpaces = async () => {
      try {
        const response = await axios.get(
          "https://frontend-assignment-api.misc.simplismart.ai/model-spaces"
        );
        setModelSpaces(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchModelSpaces();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: "2%", fontFamily: "Arial, sans-serif", backgroundColor: "#f4f4f9", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", fontSize: "2.5rem", color: "#333", marginBottom: "2.5%" }}>
        Model Spaces
      </h1>
      <p style={{ textAlign: "center", fontSize: "1.1rem", color: "#666", maxWidth: "800px", margin: "0 auto 4%" }}>
        Welcome to our Model Space, where we showcase some of the most advanced AI models developed by leading research teams.
        Our collection includes cutting-edge models like Meta Llama 2, OpenAI Whisper Large V2, and Stable Diffusion XL.
        Explore these powerful models, each engineered to push the boundaries of what's possible in AI.
      </p>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ul style={{ display: "flex", flexWrap: "wrap", gap: "2%", listStyleType: "none", padding: "0", maxWidth: "80%" }}>
          {modelSpaces.map((space) => (
            <li
              key={space.id}
              style={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                transition: "transform 0.3s, box-shadow 0.3s",
                width: "calc(29%)",
                marginBottom: "2%",
              }}
            >
              <Link to={`/model-spaces/${space.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <img
                  src={space.avatar}
                  alt={`${space.name} avatar`}
                  style={{ borderRadius: "50%", marginBottom: "15px", width: "80px", height: "80px", objectFit: "cover" }}
                />
                <h2 style={{ fontSize: "1.6rem", margin: "10px 0", color: "#333" }}>{space.name}</h2>
                <p style={{ fontSize: "1rem", color: "#777", lineHeight: "1.5", maxHeight: "4.5rem", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {space.description}
                </p>
              </Link>
              <style jsx>{`
                li:hover {
                  transform: scale(1.05);
                  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
                }
              `}</style>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
