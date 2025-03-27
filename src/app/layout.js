import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ExpenseProvider from "@/context/ExpenseContext";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={'bg-gray-200'}
      >
      <ExpenseProvider>
            {children}
      </ExpenseProvider>
      </body>
    </html>
  );
}
