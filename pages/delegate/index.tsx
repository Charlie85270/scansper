import { CLValueBuilder, decodeBase16 } from "casper-js-sdk";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

import AppLayout from "../../components/layout/AppLayout";

import DelegateForm from "../../components/shared/DelegateForm/DelegateForm";

export const Delegate = () => {
  return (
    <AppLayout
      title="Scansper | Transfer Page"
      desc="Delegate and undelegate CSPR on the Casper Network"
    >
      <DelegateForm />
    </AppLayout>
  );
};

export default Delegate;
