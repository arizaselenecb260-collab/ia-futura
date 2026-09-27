const CACHE_NAME = "ia-futura-v1";

const ARCHIVOS = [
    "index.html",
    "que-es.html",
    "usos.html",
    "historia.html",
    "ventajas.html",
    "video.html",
    "contacto.html",
    "estilos.css",
    "manifest.json",
    "imagenes/Imagen-IA.png"
];

self.addEventListener("install", (event) => {

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(ARCHIVOS);
            })
    );

});


self.addEventListener("fetch", (event) => {

    event.respondWith(
        caches.match(event.request)
            .then((respuesta) => {

                return respuesta || fetch(event.request);

            })
    );

});


self.addEventListener("activate", (event) => {

    event.waitUntil(
        caches.keys().then((nombres) => {

            return Promise.all(
                nombres
                    .filter((nombre) => nombre !== CACHE_NAME)
                    .map((nombre) => caches.delete(nombre))
            );

        })
    );

});