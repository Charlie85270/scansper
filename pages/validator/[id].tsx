import { useRouter } from "next/router";
import React from "react";
import AppLayout from "../../components/layout/AppLayout";
import Card from "../../components/shared/Card/Card";
import { useGetValidator } from "../../hooks/useGetValidator";
import { FiUsers, FiMail, FiPercent, FiTrendingUp } from "react-icons/fi";
import {
  FaFacebook,
  FaGithub,
  FaMedium,
  FaReddit,
  FaTelegram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

import { TbWorld } from "react-icons/tb";

const Valiator = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isFetching, error } = useGetValidator(id);
  const validator = data?.data;
  const accountInfo = validator?.account_info;
  console.log(validator);
  return (
    <AppLayout
      title="Casper Network Validators list"
      desc="Find the best validators to stake you CSPR tokens"
    >
      <div className="xl:space-x-4 xl:flex">
        <div className="w-full mb-4 xl:w-1/4">
          <Card>
            <div>
              <div className="flex items-center justify-center p-2 my-4 space-x-4">
                <img
                  className="w-16 h-16"
                  src={
                    validator?.account_info?.info.owner.branding.logo
                      .png_1024 ||
                    validator?.account_info?.info.owner.branding.logo.png_256 ||
                    `https://avatars.dicebear.com/api/identicon/:${
                      validator?.public_key.slice(13) ?? ""
                    }.svg`
                  }
                />
                <div>
                  <p className="text-xl text-gray-800">
                    {accountInfo?.info.owner.name}
                  </p>
                  {accountInfo?.info.owner.location.country && (
                    <div className="flex items-center space-x-2">
                      <img
                        className="w-4 h-4"
                        src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/${accountInfo?.info.owner.location.country.toLocaleLowerCase()}.svg`}
                      />
                      <span>
                        {accountInfo?.info.owner.location.country},
                        {accountInfo?.info.owner.location.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {/* STATS */}
              <div className="flex items-center justify-between space-x-3">
                <div className="flex-col items-center justify-center p-4 space-y-3 text-center border rounded basis-1/3">
                  <FiTrendingUp className="w-5 h-5 mx-auto " />
                  <p className="text-xl font-semibold text-gray-800">
                    {validator?.rank}
                  </p>
                  <p className="text-xs text-gray-500">Rank</p>
                </div>
                <div className="flex-col items-center justify-center p-4 space-y-3 text-center border rounded basis-1/3">
                  <FiUsers className="w-5 h-5 mx-auto " />
                  <p className="text-xl font-semibold text-gray-800">
                    {validator?.delegators_number}
                  </p>
                  <p className="text-xs text-gray-500">Delegators</p>
                </div>
                <div className="flex-col items-center justify-center p-4 space-y-3 text-center border rounded basis-1/3">
                  <FiPercent className="w-5 h-5 mx-auto " />
                  <p className="text-xl font-semibold text-gray-800">
                    {validator?.fee}
                  </p>
                  <p className="text-xs text-gray-500">Fees</p>
                </div>
              </div>
              {/* ABOUT */}
              <div className="mb-6">
                <p className="mt-6 font-semibold text-gray-800">About</p>
                <p className="text-xs text-gray-500">
                  {accountInfo?.info?.nodes[0]?.description ||
                    accountInfo?.info.owner.description ||
                    "No description available"}
                </p>
              </div>
              {/* CONTACT */}
              <div className="flex-col mb-4 mb-6 space-y-2">
                <div className="flex items-center space-x-4">
                  <TbWorld />{" "}
                  <a
                    className="text-sm"
                    href={accountInfo?.info.owner.website}
                    target="_blank"
                  >
                    {accountInfo?.info.owner.website || "N/A"}
                  </a>
                </div>
                <div className="flex items-center space-x-4">
                  <FiMail />
                  <a
                    className="text-sm"
                    href={`mailto:${accountInfo?.info.owner.email}`}
                    target="_blank"
                  >
                    {accountInfo?.info.owner.email || "N/A"}
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-center mt-4 mt-8 space-x-6">
                {validator?.account_info?.info?.owner?.social.facebook && (
                  <a
                    target="_blank"
                    href={`https://facebook.com/${validator?.account_info?.info?.owner?.social.facebook}`}
                  >
                    <FaFacebook className="w-5 h-5 text-blue-800" />
                  </a>
                )}
                {validator?.account_info?.info?.owner?.social.github && (
                  <a
                    target="_blank"
                    href={`https://github.com/${validator?.account_info?.info?.owner?.social.github}`}
                  >
                    <FaGithub className="w-5 h-5" />
                  </a>
                )}
                {validator?.account_info?.info?.owner?.social.medium && (
                  <a
                    target="_blank"
                    href={`https://medium.com/${validator?.account_info?.info?.owner?.social.medium}`}
                  >
                    <FaMedium className="w-5 h-5 text-gray-900" />
                  </a>
                )}
                {validator?.account_info?.info?.owner?.social.reddit && (
                  <a
                    target="_blank"
                    href={`https://www.reddit.com/user/${validator?.account_info?.info?.owner?.social.reddit}`}
                  >
                    <FaReddit className="w-5 h-5 text-orange-600" />
                  </a>
                )}

                {validator?.account_info?.info?.owner?.social.telegram && (
                  <a
                    target="_blank"
                    href={`https://t.me/${validator?.account_info?.info?.owner?.social.telegram}`}
                  >
                    <FaTelegram className="w-5 h-5 text-sky-400" />
                  </a>
                )}
                {validator?.account_info?.info?.owner?.social.twitter && (
                  <a
                    target="_blank"
                    href={`https://twitter.com/${validator?.account_info?.info?.owner?.social.twitter}`}
                  >
                    <FaTwitter className="w-5 h-5 text-sky-500" />
                  </a>
                )}
                {validator?.account_info?.info?.owner?.social.youtube && (
                  <a
                    target="_blank"
                    href={`https://www.youtube.com/channel/${validator?.account_info?.info?.owner?.social.youtube}`}
                  >
                    <FaYoutube className="w-5 h-5 text-red-600" />
                  </a>
                )}
              </div>
            </div>
          </Card>
        </div>
        <div className="w-full xl:w-3/4">
          <Card>OH</Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Valiator;
