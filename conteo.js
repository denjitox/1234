const Twit = require('twit');
const cron = require('node-cron');

// Configura tus credenciales de la API de Twitter
const T = new Twit({
  consumer_key: 'Q1eTN39LXylSeX4eZklFjaoya',
  consumer_secret: 'T908B0XsPsLS17b2nuhicoqavEE0H8nB3Oz9rC2gadwSa6xzv0T',
  access_token: '1513000162444070912-KHYaAkkjR1i57syuyNySZsMdC9c3SA',
  access_token_secret: '1jPPgS9EBqujAB6W2aKkYgXWuDCuEI4CHOhMyS35C3SC9',
  timeout_ms: 60 * 1000,  // opcional HTTP request timeout to apply to all requests.
  strictSSL: true,     // optional - requires SSL certificates to be valid.
});

let count = 410;

// Función para publicar el número actual en Twitter
function publicarNumero() {
  T.post('statuses/update', { status: `El contador está en: ${count}` }, function(err, data, response) {
    if (err) {
      console.log('Error al publicar en Twitter:', err);
    } else {
      console.log('Número publicado en Twitter:', count);
    }
  });
}

// Función para aumentar el conteo y publicar en Twitter
function aumentarConteo() {
  count++;
  publicarNumero();
}

// Programar la tarea para ejecutarse todos los días a las 20:30 horas
cron.schedule('30 20 * * *', () => {
  aumentarConteo();
}, {
  scheduled: true,
  timezone: 'America/Mexico_City' // Cambia el huso horario según tu ubicación
});
