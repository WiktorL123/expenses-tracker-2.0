
import "./globals.css";
import ExpenseProvider from "@/context/ExpenseContext";
import UIProvider from "@/context/UIContext";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={'bg-gray-200'}
      >
      <ExpenseProvider>
          <UIProvider>
              {children}
          </UIProvider>
      </ExpenseProvider>
      </body>
    </html>
  );
}
