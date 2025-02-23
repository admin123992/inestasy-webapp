/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['example.com'], // Se usi immagini esterne, sostituisci example.com
  },
  output: 'standalone', // Per abilitare la build ottimizzata per Vercel
};

module.exports = nextConfig;
