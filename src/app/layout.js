import { Poppins } from "next/font/google";
import "./globals.css";
import NewBookingContextProvider from "./context/newbookingcontext";

const poppins = Poppins({
  weight: "500",
  subsets: ["latin"],
  style: "normal",
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: "HM Portal",
  description: "HM Portal - dev",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <NewBookingContextProvider>{children}</NewBookingContextProvider>
      </body>
    </html>
  );
}
