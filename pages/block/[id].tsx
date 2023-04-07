import { useRouter } from "next/router";
import React, { useContext } from "react";
import AppLayout from "../../components/layout/AppLayout";
import Card from "../../components/shared/Card/Card";

import { getAvatarUrl, getPublicKeyName } from "../../utils/Utils";
import Link from "next/link";
import AppContext from "../../AppContext";
import { useGetBlockById } from "../../hooks/useGetBlockById";
import DeploysList from "../../components/shared/DeploysList/DeploysList";
import Tabs from "../../components/shared/Tabs/Tabs";

const Block = () => {
  const { query } = useRouter();
  const { id } = query;
  const blockQuery = useGetBlockById(id);

  const { validators } = useContext(AppContext);
  const { data } = blockQuery;
  const tabsTitle = [{ id: "deploys", title: "Deploys" }];
  const tabsContent = [<DeploysList blockId={id?.toString()} />];
  return (
    <AppLayout
      title="Casper Network block details"
      desc="Find the best validators to stake you CSPR tokens"
    >
      <div className="w-full mb-4">
        <Card
          title="Block details"
          backLabel="Back to blocks"
          backLink="/blocks"
        >
          <div className="px-2">
            <div className="flex-col w-full">
              <div className="pb-2 border-b">
                <p className="text-gray-400 text-md">Date</p>
                <p className="text-lg text-gray-800 truncate">
                  {new Date(
                    data?.data?.timestamp.toString() || ""
                  ).toLocaleDateString()}
                </p>
              </div>
              <div className="py-2 mt-4 border-b md:mt-0">
                <p className="text-gray-400 text-md">Block hash</p>
                <p className="text-lg text-gray-800 truncate">
                  {data?.data.blockHash}
                </p>
              </div>
              <div className="py-2 mt-4 border-b md:mt-0">
                <p className="text-gray-400 text-md">Block height</p>

                {data?.data.blockHeight}
              </div>
              <div className="py-2 mt-4 border-b md:mt-0">
                <p className="text-gray-400 text-md">Era</p>
                {data?.data.eraId}
              </div>
              <div className="py-2 mt-4 border-b md:mt-0">
                <p className="text-gray-400 text-md">Parent block key</p>
                <Link
                  className="flex items-center space-x-2 text-lg text-blue-500 hover:text-blue-900"
                  href={`/block/${data?.data.parentHash}?tab=deploys`}
                >
                  <span className="truncate">{data?.data.parentHash}</span>
                </Link>
              </div>
              <div className="py-2 mt-4 border-b md:mt-0">
                <p className="text-gray-400 text-md">State root hash</p>
                {data?.data.state}
              </div>
              <div className="py-2 mt-4 border-b md:mt-0">
                <p className="text-gray-400 text-md">Validator</p>
                <Link
                  className="flex items-center space-x-2 text-lg text-blue-500 hover:text-blue-900"
                  href={`/validator/${data?.data.proposer}?tab=delegators`}
                >
                  <img
                    className="w-8 h-8 rounded-lg"
                    src={getAvatarUrl(data?.data.proposer || "", validators)}
                  />
                  <span className="truncate">
                    {getPublicKeyName(data?.data.proposer || "", validators)}
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full pt-4 mt-4 border-t">
            <Tabs tabsContent={tabsContent} resetUrlOnchange tabs={tabsTitle} />
          </div>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Block;
