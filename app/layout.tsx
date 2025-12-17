import { Roboto } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "@/app/theme-registry";

const robotoFlex = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoFlex.variable} antialiased`}
      >
      <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
