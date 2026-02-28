import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BAWANI AL-JAZERA | Construction",
  description: "Building the future with excellence. BAWANI AL-JAZERA construction company.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('bowani-theme');if(t==='bright'||t==='night')document.documentElement.setAttribute('data-theme',t);else document.documentElement.setAttribute('data-theme','night');})();`,
          }}
        />
      </head>
      <body className="antialiased" style={{ backgroundColor: '#1b1b1a', color: '#ffffff', minHeight: '100vh' }}>
        {children}
      </body>
    </html>
  );
}
