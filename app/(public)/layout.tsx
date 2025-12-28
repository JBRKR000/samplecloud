import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-orbitron',
});

export const metadata: Metadata = {
    title: "SampleCloud",
    description: "SampleCloud",
    icons: {
        icon: "/logo.ico"
    }
};  

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
   return (
    <html lang="pl" className={`${orbitron.variable} ${inter.variable}`}>
      <body className=" bg-background text-primary-foreground font-body">
        {children}
      </body>
    </html>
  );
}