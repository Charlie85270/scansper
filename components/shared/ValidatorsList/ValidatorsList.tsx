import classNames from "classnames";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("react-map-gl"), { ssr: false });

import { FiUsers } from "react-icons/fi";
import {
  formatNumber,
  getAvatarUrl,
  getPerfColor,
  MOTE_VALUE,
  truncateString,
} from "../../../utils/Utils";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Table from "../Table/Table";
import { useGetStatusInfos } from "../../../hooks/useGetStatusInfos";
import { useGetAllValidators } from "../../../hooks/useGetAllValidators";
import { useGetHistoryCasperPrice } from "../../../hooks/useGetHistoryCasperPrice";
import { Marker, Popup } from "react-map-gl";
import { Datum } from "../../../types/validators";

const ValidatorsList = () => {
  const statusInfos = useGetStatusInfos();
  const era = statusInfos.data?.result.last_added_block_info.era_id || 0;
  const validators = useGetAllValidators(era);
  const price = useGetHistoryCasperPrice(1);
  const casperPrice = price.data?.prices[price.data?.prices.length - 1][1] || 0;
  const [popupInfo, setPopupInfo] = useState<Datum>();
  // Error state
  if (validators.error && !validators.isLoading) {
    return <ErrorMessage />;
  }

  const headers = [
    "Rank",
    "Validator",
    "Fees",
    "Delegators",
    "Self stake",
    "% network",
    "Total stake",
    "Performance",
  ];

  const rows = validators.data?.data?.map(item => {
    return [
      <span className="flex items-center space-x-2 text-sm">{item.rank}</span>,
      <Link
        className="flex items-center space-x-4 hover:underline"
        href={`/validator/${item.public_key}?tab=delegators`}
      >
        <img
          className="w-8 h-8 rounded-lg"
          src={
            item.account_info?.info.owner.branding.logo.png_256 ||
            item.account_info?.info.owner.branding.logo.png_1024 ||
            getAvatarUrl(item.public_key)
          }
        />
        <div className="">
          <p className="text-primary">{item.account_info?.info.owner.name}</p>
          <p className="text-sm text-secondary">
            {truncateString(item.public_key, 10)}
          </p>
        </div>
      </Link>,
      <span className="flex items-center space-x-2 text-sm">{item.fee}%</span>,
      <div className="flex items-center space-x-2">
        <span>{item.delegators_number}</span>{" "}
        <FiUsers className="w-3 text-secondary" />
      </div>,

      <p className="text-secondary">{item.self_share}%</p>,
      <p className="text-secondary">{item.network_share}%</p>,
      <div>
        <span className="flex items-center space-x-2">
          <span className="text-primary text-md">
            {formatNumber(
              Number(Number(Number(item.total_stake) / MOTE_VALUE).toFixed(0))
            )}
          </span>
          <img
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDEuNTMgMjc2Ljk1Ij48ZyBkYXRhLW5hbWU9IkxheWVyIDIiPjxwYXRoIGQ9Ik0yMjcuNTggMjE0LjFhMTQgMTQgMCAwMC0xMy42MyAxMWwtNTIuNjYtMi41NGEyMC4wNiAyMC4wNiAwIDAwLjI2LTMgMTkuNDEgMTkuNDEgMCAwMC0uNzctNS4zN2wxOS4xMi0xMWExNCAxNCAwIDAwMTQgNC43NSAxMy44MSAxMy44MSAwIDAwMTAuNDctMTAuODEgMTQgMTQgMCAxMC0yNi4xMSAzLjUxbC0xOC41NiAxMC42OWExOS4zOSAxOS4zOSAwIDAwLTM1LjgxIDE0Ljc2bC0zNC4zNyA4LjQxQTE5LjM4IDE5LjM4IDAgMDA4NCAyMjJsNi4yLTguNTlhMTQgMTQgMCAwMDE4LjItMTAuOTEgMTQgMTQgMCAxMC0yMSA5LjZsLTUuNjggNy45YTE4Ljg3IDE4Ljg3IDAgMDAtMTQuMS0zLjY2bC01Ljk0LTMzLjg0YTE5LjQgMTkuNCAwIDEwLTEzLjIxLTM2LjEyTDMzLjUyIDExNy4yYTE5LjQgMTkuNCAwIDAwNy43NC03LjFsMTIuNCAzLjI3YTEzLjQgMTMuNCAwIDAwLS4xNiAyIDE0IDE0IDAgMTAuOTEtNC45NGwtMTEuNzEtMy4xYTE5LjI0IDE5LjI0IDAgMDAxLjQ5LTcuNDUgMTkgMTkgMCAwMC0uNTgtNC42MWwzNC40Ni0xNS44M2ExOS4zOSAxOS4zOSAwIDAwMzEuNS0yMi41bDIyLjA5LTIxLjU0YTE5LjIgMTkuMiAwIDAwOSAzdjkuOTJhMTMuOCAxMy44IDAgMTAzIDB2LTkuNmExOS4zOSAxOS4zOSAwIDAwNy44Ni0yLjM0TDE3NS42NyA2NGExOS40MSAxOS40MSAwIDEwMzMuNjggNS4xNmw3LjUzLTQuMjRhMTQgMTQgMCAxMC0xLjY5LTIuNTNsLTcuMDcgNGExOS4zOSAxOS4zOSAwIDAwLTMwLjQyLTQuNjZMMTU0IDM0LjY5YTE5LjY2IDE5LjY2IDAgMDA1LjU0LTYuODhsMjAuNzIgMy40NWExMy45NCAxMy45NCAwIDEwLS4zNC0zLjEzbC0xOS4yNi0zLjJhMTkuNCAxOS40IDAgMTAtMzEuNTEgOC45MkwxMDcuNzIgNTQuOGExOS4zMiAxOS4zMiAwIDAwLTEzLjA5LTYuNThWMzMuNTVhMTMuOCAxMy44IDAgMTAtMyAwVjQ3LjlhMTkuMzYgMTkuMzYgMCAwMC0xNS4yOSAyOUw0Mi42OCA5Mi4zOGExOS41OSAxOS41OSAwIDAwLTUuNTQtNy40NUw1MC4zMiA2MS4zYTEzLjIxIDEzLjIxIDAgMDA5LS43MSAxNC4xMyAxNC4xMyAwIDAwOC40Ni0xMS40MSAxNCAxNCAwIDEwLTIwLjI4IDExbC0xMi44MiAyM2ExOS40IDE5LjQgMCAxMC0zLjkzIDM1LjE3TDQ1LjkgMTQ4YTE5LjQyIDE5LjQyIDAgMDAtNy40NiAxMS42NmwtMTEtMy4yNGExMy4wNSAxMy4wNSAwIDAwLS44Mi05IDE0LjE2IDE0LjE2IDAgMDAtMTEuNDYtOC4zMiAxNCAxNCAwIDEwMTEuMjIgMjAuMTdsMTEuNyAzLjQ1di44NWExOS4zNyAxOS4zNyAwIDAwOC45IDE2LjNsLTcuNTEgOS44NWExNCAxNCAwIDEwMi4wNSAyLjI4bDguMTMtMTAuNjdhMTkuMzIgMTkuMzIgMCAwMDcuOCAxLjY0Yy40MSAwIC44MiAwIDEuMjItLjA2bDYgMzQuMDVhMTkuNCAxOS40IDAgMTAyMC44OCAzMC40MWwyOC4wOSAxMi41YTEzLjEzIDEzLjEzIDAgMDAuOTIgOC44MiAxNC4xMSAxNC4xMSAwIDAwMTEuNCA4LjIzQTE0IDE0IDAgMTAxMTQuNjMgMjU3bC0yNy40MS0xMi4yM2ExOS40MSAxOS40MSAwIDAwMi4yMi03LjE1bDM1LjY5LTguNzNhMTkuMzggMTkuMzggMCAwMDI5IDUuODlsMTMuMzYgMTEuNTNhMTQgMTQgMCAxMDEuNTctMi42NGwtMTIuNy0xMWExOS41MiAxOS41MiAwIDAwNC4yLTcuMTNsNTMuMDYgMi41NmExMy45NSAxMy45NSAwIDEwMTMuOTQtMTR6IiBmaWxsPSIjZmYwMDEyIiBkYXRhLW5hbWU9IkxheWVyIDEiLz48L2c+PC9zdmc+"
            width="12px"
            alt="cspr"
          />
        </span>
        <span className="text-xs text-secondary">
          {formatNumber((Number(item.total_stake) / MOTE_VALUE) * casperPrice)}$
        </span>
      </div>,

      <div>
        <span className="text-sm text-secondary">
          {item?.average_performance?.average_score?.toFixed(2)}%{" "}
        </span>

        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="h-2.5 rounded-full"
            style={{
              width: `${item.average_performance?.average_score}%`,
              backgroundColor: getPerfColor(
                item.average_performance?.average_score
              ),
            }}
          ></div>
        </div>
      </div>,
    ];
  });

  const getLocation = (t?: Datum) => {
    if (!t) {
      return undefined;
    }
    if (
      !t.account_info?.info.nodes[0]?.location.longitude &&
      !t.account_info?.info.owner?.location.longitude
    ) {
      return undefined;
    }

    return {
      long:
        t.account_info?.info.nodes[0]?.location.longitude ||
        t.account_info?.info.owner?.location.longitude,
      lat:
        t.account_info?.info.nodes[0]?.location.latitude ||
        t.account_info?.info.owner?.location.latitude,
    };
  };

  const pins = validators.data?.data
    .filter(t => getLocation(t))
    .map(val => {
      return (
        <Marker
          longitude={getLocation(val)?.long}
          latitude={getLocation(val)?.lat}
          onClick={e => {
            console.log(getLocation(val)?.long);
            console.log(getLocation(val)?.lat);
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(val);
          }}
          anchor="bottom"
        >
          <img
            className="w-6 rounded-full"
            src={
              val.account_info?.info.owner.branding.logo.png_256 ||
              val.account_info?.info.owner.branding.logo.png_1024 ||
              getAvatarUrl(val.public_key)
            }
          />
        </Marker>
      );
    });

  return (
    <div className="relative overflow-hidden rounded-lg text-secondary">
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
        initialViewState={{
          longitude: 8.22,
          latitude: 46.8,
          zoom: 1,
        }}
        mapStyle="mapbox://styles/crabiller/ck95juxij2kf71iqbdoi5v00w"
        style={{ width: "100%", height: 300, marginBottom: "12px" }}
      >
        {pins}
        {popupInfo && (
          <Popup
            anchor="bottom"
            closeButton={false}
            longitude={getLocation(popupInfo)?.long || 1}
            latitude={getLocation(popupInfo)?.lat || 1}
            onClose={() => setPopupInfo(undefined)}
          >
            <Link
              className="flex-col items-start space-x-4 hover:underline"
              href={`/validator/${popupInfo.public_key}?tab=delegators`}
            >
              <div className="flex items-center space-x-4">
                <img
                  className="w-8 h-8 rounded-lg"
                  src={
                    popupInfo.account_info?.info.owner.branding.logo.png_256 ||
                    popupInfo.account_info?.info.owner.branding.logo.png_1024 ||
                    getAvatarUrl(popupInfo.public_key)
                  }
                />
                <div className="">
                  <p className="text-sm text-primary">
                    {popupInfo.account_info?.info.owner.name}
                  </p>
                  {popupInfo?.account_info?.info.owner.location.country && (
                    <div className="flex items-center space-x-2 text-secondary">
                      <img
                        className="w-4 h-4"
                        src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/${popupInfo?.account_info?.info.owner.location.country.toLocaleLowerCase()}.svg`}
                      />
                      <span>
                        {popupInfo?.account_info?.info.owner.location.country},
                        {popupInfo?.account_info?.info.owner.location.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </Popup>
        )}
      </Map>

      <div className="w-full overflow-y-hidden">
        <Table
          totalItems={rows?.length || 0}
          isLoading={statusInfos.isFetching || validators.isFetching}
          rows={rows || []}
          header={headers}
        />
      </div>
    </div>
  );
};

export default ValidatorsList;
