"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav/Nav";
import { Provider } from "react-redux";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import {store, persistor} from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  store.subscribe(()=>{console.log(store.getState())})

  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav  />
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              {children}
            </PersistGate>
        </Provider>
        
        </body>
    </html>
  );
}
