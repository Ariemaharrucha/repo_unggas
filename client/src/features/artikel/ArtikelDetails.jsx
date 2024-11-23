import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const ArtikelDetails = () => {
  const { id } = useParams();
  const [artikels, setArtikels] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/v1/artikel/${id}`
        );
        setArtikels(response.data.data);
      } catch (error) {
        console.error("Error fetching artikel details:", error);
      } finally {
        setLoading(false);
      }
    };
    getDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!artikels) {
    return <p>Artikel tidak ditemukan.</p>;
  }

  return (
    <div className="p-8 bg-red-200">
      {artikels.map((artikel) => {
        return (
        <div key={artikel.artikel_id}>
          <div className="p-8 bg-red-200">
            <h1 className="text-2xl font-bold mb-4">{artikel.judul}</h1>
            <p className="text-gray-700 mb-2">Kategori: {artikel.kategori}</p>
            <p className="text-gray-600 mb-4">Tanggal: {artikel.tanggal}</p>
            <img
              src={`http://localhost:3000/${artikel.image_artikel}`}
              alt={artikel.judul}
              className="mb-4 w-full h-80 object-cover"
            />
            <p>{artikel.konten}</p>
          </div>
        </div>
        )
      })}
    </div>
  );
};
