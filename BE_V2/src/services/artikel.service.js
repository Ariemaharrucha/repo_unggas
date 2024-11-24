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
      role
    } = data;
    // console.log(data);
    
    return artikelModel.createArtikel({
      judul,
      author_name,
      konten,
      image_artikel,
      kategori,
      tanggal,
      author_id,
      role
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
      role
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

  getArtikelForUser: async () => {
    const result = await artikelModel.getArtikeForUser();
    return result;
  },

  getArtikelKategori: async (kategori) => {
    return artikelModel.getArtikelKategori(kategori);
  },

  getArtikelKategoriLingkungan: async () => {
    return artikelModel.getArtikelKategorLingkungan();
  },

  getArtikelKategoriPakan: async () => {
    return artikelModel.getArtikelKategoriPakan();
  },

  getArtikelKategoriNutrisi: async () => {
    return artikelModel.getArtikelKategoriNutrisi();
  },

  getArtikelKategoriKesehatanUnggas: async () => {
    const result = await artikelModel.getArtikelKategoriKesehatanUnggas();
    return result;
  },
}

export default artikelService;