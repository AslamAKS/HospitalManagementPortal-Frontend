import "./globals.css";
import NewBookingContextProvider from "./context/newbookingcontext";

export const metadata = {
  title: "HM Portal",
  description: "HM Portal - dev",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NewBookingContextProvider>{children}</NewBookingContextProvider>
      </body>
    </html>
  );
}
