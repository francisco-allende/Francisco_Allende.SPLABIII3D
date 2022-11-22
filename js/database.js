import { Anuncio_Auto } from "./anuncio.js";

export let anuncios = 
[
    new Anuncio_Auto(Math.floor(Math.random() * 1001), "Renault", "venta", "Sandero Stepway 2013", 800000, 4, 150000, 320),
    new Anuncio_Auto(Math.floor(Math.random() * 1001), "Toyota", "venta", "Hilux 2018", 12000000, 4, 50000, 520),
    new Anuncio_Auto(Math.floor(Math.random() * 1001), "Ford", "alquiler", "Fiesta 2011", 7999, 4, 2500000, 280),
    new Anuncio_Auto(Math.floor(Math.random() * 1001), "Fiat", "alquiler", "Duna 2012", 6999, 4, 3500000, 300)
]