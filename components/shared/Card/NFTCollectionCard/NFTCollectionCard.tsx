import React, { useState } from "react";
import {
  formatNumber,
  MOTE_VALUE,
  truncateString,
} from "../../../../utils/Utils";
import { AiFillCheckCircle } from "react-icons/ai";
import classnames from "classnames";
import Link from "next/link";
interface Props {
  image?: string;
  title: string;
  holders?: number;
  totalItems?: number;
  floor?: string | null;
  verified?: boolean;
  href: string;
  target?: "_blank" | "_self";
}

const NFTCollectionCard = ({
  title,
  image,
  floor,
  holders,
  totalItems,
  verified,
  href,
  target = "_blank",
}: Props) => {
  const price = floor ? formatNumber(Number(floor) / MOTE_VALUE) : "NA";

  const [isImgLoaded, setIsImageLoaded] = useState(false);
  const imageOnLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <Link target={target} href={href}>
      <div className="relative flex flex-col justify-between w-full pb-2 bg-white rounded-md shadow-lg flex-nowrap hover:shadow-xl hover:opacity-70">
        <img
          onLoad={imageOnLoad}
          src={image || "/defaultNFT.png"}
          alt="img"
          className={classnames({ hidden: !isImgLoaded }, "rounded-t-md h-72")}
        />

        <div
          className={classnames(
            { hidden: isImgLoaded },
            "w-full bg-gray-200 rounded-t-3xl h-72 animate-pulse m-0"
          )}
        ></div>

        <div className="flex-col justify-between w-full px-4 pt-2">
          <div className="flex items-center mb-2 space-x-2 text-lg text-gray-800">
            <span>{truncateString(title, 20)}</span>
            {verified && <AiFillCheckCircle className="text-blue-400" />}
          </div>
          <div className="flex-col">
            <span className="flex items-center justify-between text-2xl text-gray-900">
              <span className="text-sm text-gray-500">Floor price</span>
              <span className="text-sm text-gray-500">
                <span className="flex items-center space-x-2">
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDEuNTMgMjc2Ljk1Ij48ZyBkYXRhLW5hbWU9IkxheWVyIDIiPjxwYXRoIGQ9Ik0yMjcuNTggMjE0LjFhMTQgMTQgMCAwMC0xMy42MyAxMWwtNTIuNjYtMi41NGEyMC4wNiAyMC4wNiAwIDAwLjI2LTMgMTkuNDEgMTkuNDEgMCAwMC0uNzctNS4zN2wxOS4xMi0xMWExNCAxNCAwIDAwMTQgNC43NSAxMy44MSAxMy44MSAwIDAwMTAuNDctMTAuODEgMTQgMTQgMCAxMC0yNi4xMSAzLjUxbC0xOC41NiAxMC42OWExOS4zOSAxOS4zOSAwIDAwLTM1LjgxIDE0Ljc2bC0zNC4zNyA4LjQxQTE5LjM4IDE5LjM4IDAgMDA4NCAyMjJsNi4yLTguNTlhMTQgMTQgMCAwMDE4LjItMTAuOTEgMTQgMTQgMCAxMC0yMSA5LjZsLTUuNjggNy45YTE4Ljg3IDE4Ljg3IDAgMDAtMTQuMS0zLjY2bC01Ljk0LTMzLjg0YTE5LjQgMTkuNCAwIDEwLTEzLjIxLTM2LjEyTDMzLjUyIDExNy4yYTE5LjQgMTkuNCAwIDAwNy43NC03LjFsMTIuNCAzLjI3YTEzLjQgMTMuNCAwIDAwLS4xNiAyIDE0IDE0IDAgMTAuOTEtNC45NGwtMTEuNzEtMy4xYTE5LjI0IDE5LjI0IDAgMDAxLjQ5LTcuNDUgMTkgMTkgMCAwMC0uNTgtNC42MWwzNC40Ni0xNS44M2ExOS4zOSAxOS4zOSAwIDAwMzEuNS0yMi41bDIyLjA5LTIxLjU0YTE5LjIgMTkuMiAwIDAwOSAzdjkuOTJhMTMuOCAxMy44IDAgMTAzIDB2LTkuNmExOS4zOSAxOS4zOSAwIDAwNy44Ni0yLjM0TDE3NS42NyA2NGExOS40MSAxOS40MSAwIDEwMzMuNjggNS4xNmw3LjUzLTQuMjRhMTQgMTQgMCAxMC0xLjY5LTIuNTNsLTcuMDcgNGExOS4zOSAxOS4zOSAwIDAwLTMwLjQyLTQuNjZMMTU0IDM0LjY5YTE5LjY2IDE5LjY2IDAgMDA1LjU0LTYuODhsMjAuNzIgMy40NWExMy45NCAxMy45NCAwIDEwLS4zNC0zLjEzbC0xOS4yNi0zLjJhMTkuNCAxOS40IDAgMTAtMzEuNTEgOC45MkwxMDcuNzIgNTQuOGExOS4zMiAxOS4zMiAwIDAwLTEzLjA5LTYuNThWMzMuNTVhMTMuOCAxMy44IDAgMTAtMyAwVjQ3LjlhMTkuMzYgMTkuMzYgMCAwMC0xNS4yOSAyOUw0Mi42OCA5Mi4zOGExOS41OSAxOS41OSAwIDAwLTUuNTQtNy40NUw1MC4zMiA2MS4zYTEzLjIxIDEzLjIxIDAgMDA5LS43MSAxNC4xMyAxNC4xMyAwIDAwOC40Ni0xMS40MSAxNCAxNCAwIDEwLTIwLjI4IDExbC0xMi44MiAyM2ExOS40IDE5LjQgMCAxMC0zLjkzIDM1LjE3TDQ1LjkgMTQ4YTE5LjQyIDE5LjQyIDAgMDAtNy40NiAxMS42NmwtMTEtMy4yNGExMy4wNSAxMy4wNSAwIDAwLS44Mi05IDE0LjE2IDE0LjE2IDAgMDAtMTEuNDYtOC4zMiAxNCAxNCAwIDEwMTEuMjIgMjAuMTdsMTEuNyAzLjQ1di44NWExOS4zNyAxOS4zNyAwIDAwOC45IDE2LjNsLTcuNTEgOS44NWExNCAxNCAwIDEwMi4wNSAyLjI4bDguMTMtMTAuNjdhMTkuMzIgMTkuMzIgMCAwMDcuOCAxLjY0Yy40MSAwIC44MiAwIDEuMjItLjA2bDYgMzQuMDVhMTkuNCAxOS40IDAgMTAyMC44OCAzMC40MWwyOC4wOSAxMi41YTEzLjEzIDEzLjEzIDAgMDAuOTIgOC44MiAxNC4xMSAxNC4xMSAwIDAwMTEuNCA4LjIzQTE0IDE0IDAgMTAxMTQuNjMgMjU3bC0yNy40MS0xMi4yM2ExOS40MSAxOS40MSAwIDAwMi4yMi03LjE1bDM1LjY5LTguNzNhMTkuMzggMTkuMzggMCAwMDI5IDUuODlsMTMuMzYgMTEuNTNhMTQgMTQgMCAxMDEuNTctMi42NGwtMTIuNy0xMWExOS41MiAxOS41MiAwIDAwNC4yLTcuMTNsNTMuMDYgMi41NmExMy45NSAxMy45NSAwIDEwMTMuOTQtMTR6IiBmaWxsPSIjZmYwMDEyIiBkYXRhLW5hbWU9IkxheWVyIDEiLz48L2c+PC9zdmc+"
                    width="15px"
                    alt="cspr"
                  />
                  <span className="text-xl text-gray-800">{price}</span>
                </span>
              </span>
            </span>

            <div className="flex justify-between mt-2 text-sm text-gray-500">
              {totalItems && (
                <div className="flex-col">
                  <p>Items</p>
                  <p className="text-gray-800">{totalItems}</p>
                </div>
              )}
              {holders && (
                <div className="flex-col">
                  <p>Holders</p>
                  <p className="text-right text-gray-800">{holders}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const NFTCollectionCardSkeleton = () => {
  return (
    <div className="relative flex flex-col justify-between w-full pb-2 space-y-2 bg-gray-200 shadow-lg h-96 animate-pulse flex-nowrap hover:shadow-xl hover:opacity-70 rounded-3xl"></div>
  );
};

export default NFTCollectionCard;
