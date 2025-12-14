import Header from "./_components/Header";
import Logo from "./_components/Logo";
import Navigation from "./_components/Navigation";
import "@/app/_styles/globals.css";

import { Josefin_Sans } from "next/font/google";
const josefinSans = Josefin_Sans({
  subsets: ["latin"], //set of chars
  display: "swap",
});

export const metadata = {
  // title: "The Wild Oasis",
  title: {
    default: "Welcome to The Wild Oasis",
    template: "%s / The Wild Oasis",
  },
  description:
    "Your paradise in the Dolomites. Comfortable cabins, stunning mountain views, and a warm welcome to nature's beauty.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-primary-950 text-primary-100 min-h-screen flex flex-col antialiased ${josefinSans.className}`}
      >
        <Header />
        <div className="flex-1 px-8 py-12">
          <main className="max-w-7xl mx-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
