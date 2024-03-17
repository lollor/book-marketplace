/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      //remotePatterns: ["www.libraccio.it", "lh3.googleusercontent.com"]
      remotePatterns: [{
         hostname: "www.libraccio.it",
      }, {
         hostname: "lh3.googleusercontent.com"
      }]
   }
};

export default nextConfig;
