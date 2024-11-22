import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ListDokter = () => {
  const navigate = useNavigate();
  const [dokter, setDokter] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getDokter = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/v1/dokter/list"
      );
      // console.log(response.data.result);
      setDokter(response.data.data);
    };
    getDokter();

    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  async function handleCreateKonsultasi(user_id, dokter_id) {
    console.log(user_id, dokter_id);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/konsultasi/findOrCreate",
        {
          user_id,
          dokter_id,
        }
      );
      const roomId = response.data.data;

      if (roomId) {
        navigate(`/chat-apps/chat/${roomId}`);
      }
    } catch (error) {
      console.error("Error handling konsultasi:", error);
      alert("Terjadi kesalahan saat memulai chat.");
    }
  }
  return (
    <div>
      <h1>hi {user?.username} </h1>
      <h1>List Dokter</h1>
      <div>
        <ul className="flex gap-10">
          {dokter.map((dokterItem) => {
            return (
              <div key={dokterItem.dokter_id}>
                <li>{dokterItem.nama_dokter}</li>
                <li>{dokterItem.spesialis}</li>
                <li>{dokterItem.pengalaman}</li>
                <li>{dokterItem.jam_kerja}</li>
                <li>
                  <img
                    className="size-10"
                    src={`http://localhost:3000/${dokterItem.image_profile}`}
                    alt=""
                  />
                </li>
                <button
                  className="px-4 py-2 bg-blue-500 text-white"
                  onClick={() =>
                    handleCreateKonsultasi(user.id, dokterItem.dokter_id)
                  }
                >
                  Chat
                </button>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
