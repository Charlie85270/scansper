import { useRouter } from "next/router";
import React from "react";
import AppLayout from "../../components/layout/AppLayout";
import Card from "../../components/shared/Card/Card";

import DeploysList from "../../components/shared/DeploysList/DeploysList";
import Tabs from "../../components/shared/Tabs/Tabs";
import { useGetContractPackage } from "../../hooks/useGetContractPackage";
import { getTypeContract } from "../../components/shared/ContractsList/ContractsList";
import dynamic from "next/dynamic";
import { useGetItemFromHashAccount } from "../../hooks/useGetItemFromHashAccount";
import { useGetStatusInfos } from "../../hooks/useGetStatusInfos";

const DynamicReactJson = dynamic(import("react-json-view"), { ssr: false });

const ContractPackage = () => {
  const { query } = useRouter();
  const { id } = query;
  const contractQuery = useGetContractPackage(id);
  const statusInfos = useGetStatusInfos();

  const stateRootHash =
    statusInfos.data?.result.last_added_block_info.state_root_hash;
  const rawData = useGetItemFromHashAccount(stateRootHash, `hash-${id}`);
  const { data } = contractQuery;
  const tabsTitle = [{ id: "deploys", title: "Deploys" }];
  const tabsContent = [<DeploysList contractPackage={id?.toString()} />];
  return (
    <AppLayout
      title="Scansper | Contract"
      desc="Detail of the contract deployed on Casper Netowrk"
    >
      <div className="w-full mb-4">
        <Card
          title="Contract package details"
          backLabel="Back to contracts"
          backLink="/contracts"
        >
          <div className="px-2">
            <div className="flex-col w-full">
              <div className="pb-2 border-b">
                <p className="text-secondary text-md">Date</p>
                <p className="text-lg text-primary truncate">
                  {new Date(
                    data?.timestamp.toString() || ""
                  ).toLocaleDateString()}
                </p>
              </div>
              <div className="py-2 mt-4 border-b md:mt-0">
                <p className="text-secondary text-md">Contract package hash</p>
                <p className="text-lg text-primary truncate">
                  {data?.contract_package_hash}
                </p>
              </div>
              <div className="py-2 mt-4 border-b md:mt-0">
                <p className="text-secondary text-md">Name</p>

                {data?.contract_name}
              </div>
              <div className="py-2 mt-4 border-b md:mt-0">
                <p className="text-secondary text-md">Contract type</p>

                {getTypeContract(data?.contract_type_id)}
              </div>
              <div className="py-2 mt-4 border-b md:mt-0">
                <p className="text-secondary text-md">Description</p>
                {data?.contract_description}
              </div>
            </div>
            <div className="my-4">
              <p className="pb-4">Raw data</p>
              <DynamicReactJson collapsed src={{ json: rawData.data }} />
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

export default ContractPackage;
