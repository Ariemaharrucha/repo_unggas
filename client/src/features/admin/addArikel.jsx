import { useEffect, useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import { useForm } from "react-hook-form";

export const AddArtikel = () => {
  const [content, setContent] = useState("");
  const [adminData, setAdminData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const dokterData = localStorage.getItem("user");
    if (dokterData) {
      setAdminData(JSON.parse(dokterData));
    }
  }, []);

  const handleChange = (value) => {
    setContent(value);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("author_id", adminData.id);
    formData.append("author_name", data.author_name);
    formData.append("judul", data.judul);
    formData.append("konten", content);
    formData.append("image_artikel", data.image_artikel[0]);
    formData.append("kategori", data.kategori);
    formData.append("tanggal", data.tanggal);
    formData.append("role", "admin");

    try {
      setLoading(true);
      setSuccessMessage("");
      const response = await axios.post(
        "http://localhost:3000/api/v1/admin/artikel",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Artikel berhasil ditambahkan:", response.data);
      setSuccessMessage("Artikel berhasil ditambahkan!"); 
      reset(); 
      setContent(""); 
    } catch (error) {
      console.error("Gagal menambahkan artikel:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            value={adminData?.id || ""}
            {...register("author_id")}
            readOnly
            className="border"
          />
        </div>
        <div>
          <label htmlFor="author_name">Author Name:</label>
          <input
            {...register("author_name", {
              required: "Author name wajib diisi",
            })}
            className="border"
          />
          {errors.author_name && (
            <p className="text-red-500">{errors.author_name.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="judul">Judul:</label>
          <input
            {...register("judul", { required: "Judul wajib diisi" })}
            className="border"
          />
          {errors.judul && (
            <p className="text-red-500">{errors.judul.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="konten">Konten:</label>
          <ReactQuill
            value={content}
            onChange={handleChange}
            placeholder="Tulis di sini"
            className="block w-2/5"
          />
        </div>
        <div>
          <label htmlFor="image_artikel">Image Artikel:</label>
          <input
            type="file"
            {...register("image_artikel", {
              required: "Gambar artikel wajib diunggah",
            })}
          />
          {errors.image_artikel && (
            <p className="text-red-500">{errors.image_artikel.message}</p>
          )}
        </div>
        <div>
          <label>Kategori:</label>
          <input
            {...register("kategori", { required: "Kategori wajib diisi" })}
            className="border"
          />
          {errors.kategori && (
            <p className="text-red-500">{errors.kategori.message}</p>
          )}
        </div>
        <div>
          <label>Tanggal:</label>
          <input
            type="date"
            {...register("tanggal", { required: "Tanggal wajib diisi" })}
            className="border"
          />
          {errors.tanggal && (
            <p className="text-red-500">{errors.tanggal.message}</p>
          )}
        </div>
        <div>
          <label>Role:</label>
          <input value="admin" readOnly className="border" />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 border bg-blue-500 text-white disabled:bg-gray-300"
          >
          {isLoading ? "Loading..." : "Submit"}
        </button>
          {isLoading && <p className="text-blue-500">Mengirim artikel...</p>}
          {successMessage && (
            <p className="text-green-500">{successMessage}</p>
          )}
      </form>
    </div>
  );
};
