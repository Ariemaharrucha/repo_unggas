import artikelModel from "../model/artikel.model.js";

const artikelService= {
  getArtikel: async () => {
    return artikelModel.getArtikel();
  },

  getArtikelById: async (id) => {
    return artikelModel.getArtikelById(id);
  },

  createArtikel: async (data) => {
    const {
      judul,
      author_name,
      konten,
      image_artikel,
      kategori,
      tanggal,
      author_id,
    } = data;
    console.log(data);
    
    return artikelModel.createArtikel({
      judul,
      author_name,
      konten,
      image_artikel,
      kategori,
      tanggal,
      author_id,
    });
  },

  editArtikel: async (id, data) => {
    const {
      judul,
      author_name,
      konten,
      image_artikel,
      kategori,
      tanggal,
      author_id,
    } = data;
    if (!judul || !konten || !kategori) {
      throw new Error("Judul, teks, dan kategori artikel harus diisi.");
    }

    return artikelModel.editArtikel(id, data);
  },

  deleteArtikel: async (id) => {
    const artikel = await artikelModel.getArtikelById(id);
    if (!artikel) {
      throw new Error("Artikel tidak ditemukan.");
    }
    return artikelModel.deleteArtikel(id);
  },
}

export default artikelService;