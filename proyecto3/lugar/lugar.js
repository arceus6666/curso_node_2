const instCiudad = require("../config/axios").instCiudad;

const getLugares = async (ciudad) => {
    const response = await instCiudad.get('/',{
        params: { location: ciudad }
    });
    if(response.data.Results.length <= 0)
        throw new Error("No hay datos disponibles de la ciudad");
    const data = response.data.Results[0];
    return {
        ciudad: data.name,
        lat: data.lat,
        lng: data.lon,
    };
}

module.exports = {
    getLugares,
}
