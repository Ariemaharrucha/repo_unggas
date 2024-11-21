import artikelModel from "../model/artikel.model.js";
import dokterModel from "../model/dokter.model.js";

const dokterService = {

    getAllDokter: async () => {
        const result = await dokterModel.getAllDokter();
        return result;
    },

    createArtikeldokter: async (data) => {
        const result = await artikelModel.createArtikel(data);
        return result;
    },
    getArtikeldokter: async (id) => {
        const result = await artikelModel.getArtikelByAuthorId(id);
        return result;
    },
};

export default dokterService;