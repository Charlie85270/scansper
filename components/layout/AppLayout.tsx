import Meta from "../shared/Meta";
import Header from "./Header/Header";
import React from "react";
import NavBar from "./NavBar/NavBar";
import Footer from "./Footer/Footer";

interface Props {
  title: string;
  desc: string;
  children: React.ReactNode;
}

const AppLayout = ({ title, desc, children }: Props) => {
  return (
    <div className="flex flex-col font-sans antialiased text-gray-600 bg-gray-100 dark:bg-gray-900">
      <Meta pageTitle={title} description={desc} />
      <div className="flex">
        <div className="fixed top-0">
          <NavBar />
        </div>

        <div className="w-full lg:pl-72 xl:pl-80">
          <div className="fixed top-0 z-50 w-full">
            <Header />
          </div>
          <main className="w-full p-4 pt-24 mx-auto mt-4 overflow-x-hidden overflow-y-auto">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
