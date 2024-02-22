const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 8080; // Puerto en el que escuchará tu servidor proxy

// Configuración del proxy para redirigir las solicitudes al backend
const apiProxy = createProxyMiddleware('/api', {
  target: 'http://localhost:47924', // URL de tu servidor backend
  changeOrigin: true, // Cambiar el origen de la solicitud a la URL de destino
  pathRewrite: {
    '^/api': '' // Eliminar el prefijo '/api' de la URL
  }
});

// Usar el middleware de proxy para las rutas que coincidan con '/api'
app.use('/api', apiProxy);

// Escuchar en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor proxy escuchando en http://localhost:${PORT}`);
});
