import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

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
    <div
      style={{
        padding: "2%",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f0f4f8",
        minHeight: "91vh",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "2.8rem",
          color: "#2c3e50",
          marginBottom: "2.5%",
          fontWeight: "bold",
        }}
      >
        Model Spaces
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "3%",
        }}
      >
        <div
          style={{
            flex: 1,
            maxWidth: "60%",
            backgroundColor: "#ffffff",
            padding: "2% 4%",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            boxSizing: "border-box",
          }}
        >
          <p
            style={{
              fontSize: "1.2rem",
              color: "#34495e",
              lineHeight: "1.7",
              marginBottom: "1.5rem",
            }}
          >
            Welcome to our Model Space, where we showcase some of the most
            advanced AI models developed by leading research teams worldwide.
            Our collection features cutting-edge models like Meta Llama 2,
            OpenAI Whisper Large V2, and Stable Diffusion XL, each representing
            significant advancements in AI technology.
          </p>
          <p
            style={{
              fontSize: "1.2rem",
              color: "#34495e",
              lineHeight: "1.7",
              marginBottom: "1.5rem",
            }}
          >
            Meta Llama 2 excels in natural language understanding and
            generation, while OpenAI Whisper Large V2 is renowned for its fast
            and accurate speech recognition. We also highlight Stable Diffusion
            XL, an innovative model for generative art and design.
          </p>
          <p
            style={{
              fontSize: "1.2rem",
              color: "#34495e",
              lineHeight: "1.7",
              marginBottom: "1.5rem",
            }}
          >
            Explore these models and discover how they're setting new standards
            and transforming industries with their capabilities. Dive into the
            future of AI with us.
          </p>
        </div>

        <div
          style={{
            flex: 1,
            maxWidth: "40%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            {modelSpaces.map((space) => (
              <SwiperSlide key={space.id}>
                <div
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    padding: "20px",
                    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
                    textAlign: "center",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Link
                    to={`/model-spaces/${space.id}`}
                    style={{ textDecoration: "none", color: "#333" }}
                  >
                    <img
                      src={space.avatar}
                      alt={`${space.name} avatar`}
                      style={{
                        borderRadius: "50%",
                        marginBottom: "15px",
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                    <h2
                      style={{
                        fontSize: "1.6rem",
                        margin: "10px 0",
                        color: "#2c3e50",
                      }}
                    >
                      {space.name}
                    </h2>
                    <p
                      style={{
                        fontSize: "1rem",
                        color: "#7f8c8d",
                        lineHeight: "1.5",
                        maxHeight: "4.5rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {space.description}
                    </p>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style>
        {`
          @media (max-width: 768px) {
            div[style*="display: flex; flex-direction: row;"] {
              flex-direction: column !important;
              gap: 20px !important;
            }
            div[style*="flex: 1; max-width: 40%;"] {
              max-width: 100% !important;
              margin-top: 0;
            }
            div[style*="flex: 1; max-width: 60%;"] {
              max-width: 100% !important;
              margin-bottom: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default HomePage;
