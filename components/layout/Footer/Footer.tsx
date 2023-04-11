import React from "react";

const Footer = () => {
  const casper = "https://casper.network/en-us/";

  const casperlive = "https://cspr.live/";

  return (
    <footer className="px-3 py-8 text-gray-500 transition-colors duration-200 bg-white dark:bg-gray-800 text-2 dark:text-gray-200">
      <div className="flex flex-col">
        <div className="h-px mx-auto rounded-full md:hidden mt-7 w-11"></div>
        <div className="flex flex-col mt-4 md:mt-0 md:flex-row">
          <nav className="flex flex-col items-center justify-center flex-1 border-gray-100 md:items-end md:border-r md:pr-5">
            <a
              aria-current="page"
              target="_blank"
              href={casper}
              className="hover:text-gray-700 dark:hover:text-white"
            >
              Casper Network
            </a>
            <a
              aria-current="page"
              target="_blank"
              href={casper}
              className="hover:text-gray-700 dark:hover:text-white"
            >
              cspr.live
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
