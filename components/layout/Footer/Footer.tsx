import React from "react";

const Footer = () => {
  const casper = "https://casper.network/en-us/";
  const casperhodlersLink = "https://casperholders.io/";
  const creditLink = "https://github.com/Charlie85270";
  const coingecko = "https://www.coingecko.com/";
  return (
    <footer className="px-3 py-8 text-gray-500 transition-colors duration-200 background-card text-2 dark:text-gray-200">
      <div className="flex flex-col">
        <div className="flex flex-col w-full mt-4 justify-evenly md:mt-0 md:flex-row">
          <p className="flex flex-col items-center justify-center w-full border-gray-100 md:w-1/5 md:items-end md:border-r md:pr-5">
            Powered by
          </p>

          <div className="flex items-center w-full mt-4 border-gray-100 md:w-2/5 justify-evenly md:mt-0 md:border-r">
            <a
              target="_blank"
              className="flex-col items-center justify-center hover:text-underline hover:text-primary-gray-20"
              href="https://cspr.cloud/"
            >
              <img
                src="/cloud.png"
                width="40"
                height="40"
                className="mx-auto"
              />
              cspr.cloud
            </a>
            <a
              target="_blank"
              className="flex-col items-center justify-center hover:text-underline hover:text-primary-gray-20"
              href={coingecko}
            >
              <img
                src="/coingecko.png"
                width="35"
                height="35"
                className="mx-auto"
              />
              <span className="">Coingecko</span>
            </a>
            <a
              target="_blank"
              className="flex-col items-center justify-center text-center hover:text-underline hover:text-primary-gray-20"
              href={casperhodlersLink}
            >
              <img
                src="/holders.png"
                width="30"
                height="30"
                className="mx-auto rounded-full"
              />

              <span className="">Casperholders</span>
            </a>
          </div>

          <div className="flex flex-col items-center justify-center w-full md:w-1/5 mt-7 md:mt-0 md:items-start md:pl-5">
            <span className="">© 2023</span>
            <span className="mt-7 md:mt-1">
              Created by{" "}
              <a
                className="underline hover:text-primary-gray-20"
                href={creditLink}
              >
                Charlie
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
