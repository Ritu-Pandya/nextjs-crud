// app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "Simple Notes CRUD",
  description: "Next.js + Prisma CRUD example",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", padding: 20, maxWidth: 800, margin: "0 auto" }}>
        <h1>Notes CRUD</h1>
        {children}
      </body>
    </html>
  );
}
