import type { Config } from "tailwindcss";

const config = {
   darkMode: ["class"],
   content: [
      "./pages/**/*.{ts,tsx}",
      "./components/**/*.{ts,tsx}",
      "./app/**/*.{ts,tsx}",
      "./src/**/*.{ts,tsx}",
   ],
   prefix: "",
   theme: {
      container: {
         center: true,
         padding: "2rem",
         screens: {
            "2xl": "1400px",
         },
      },
      extend: {
         keyframes: {
            "accordion-down": {
               from: { height: "0" },
               to: { height: "var(--radix-accordion-content-height)" },
            },
            "accordion-up": {
               from: { height: "var(--radix-accordion-content-height)" },
               to: { height: "0" },
            },
         },
         animation: {
            "accordion-down": "accordion-down 0.2s ease-out",
            "accordion-up": "accordion-up 0.2s ease-out",
         },
         colors: {
            primary: /* "#1abc9c"  "#028c9e"*/ "#28316c",
            secondary: "#c2cbff",
            accent: "#212959",
            colortext: "#010204",
            background: "#eceef8",
            black: "#000000",
            white: "#ffffff",
         },
         dropShadow: {
            my: "0 4px 8px rgba(33,41,89,0.25)",
            mytext: "0 4px 4px rgba(33,41,89,0.25)",
         },
      },
   },
   plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
