import artikelModel from "../model/artikel.model.js";
import dokterModel from "../model/dokter.model.js";

const dokterService = {

    getAllDokter: async () => {
        const result = await dokterModel.getAllDokter();
        return result;
    },

    getAllDokterForUser: async () => {
        const result = await dokterModel.getAllDokterForUser();
        return result
    },

    createArtikeldokter: async (data) => {
        const result = await artikelModel.createArtikel(data);
        return result;
    },

    getArtikeldokter: async (id) => {
        const result = await artikelModel.getArtikelByAuthorId(id);
        return result;
    },

    getUserForDokter: async (dokterId) => {
        const result = await dokterModel.getUserForDokter(dokterId);
        return result;
    }
};

export default dokterService;