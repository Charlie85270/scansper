import React from "react";
import AppLayout from "../../components/layout/AppLayout";
import Card from "../../components/shared/Card/Card";
import Last14DeploysStatsChart from "../../components/shared/Chart/Last14DaysDeploys/Last14DaysDeploys";
import DeploysList from "../../components/shared/DeploysList/DeploysList";
import CopyButton from "../../components/shared/CopyButton/CopyButton";

export const IndexPage = () => {
  return (
    <AppLayout title="Donation | Scansper" desc="Help us to build Scansper">
      <h1 className="text-xl font-bold">
        Dear Scansper Community, <br></br>
      </h1>

      <p className="mt-12">
        Scansper is a project build by Charlie And Indy, 2 passionate developers
        from the Casper community trying to give you the best tools on Casper
        network.<br></br>
        <br></br> We hope this message finds you well. We are excited to share
        some important updates regarding the growth of our application,{" "}
        <b>Scansper</b>.<br></br>
        <br></br>
        Over time, Scansper has evolved into a more powerful and comprehensive
        tool, thanks to your ongoing support and feedback. <br></br>As our
        application expands and takes on new features and capabilities, the
        associated infrastructure costs have also grown significantly. <br></br>{" "}
        These costs encompass various aspects such as web server maintenance,
        indexing, parsing, and database management, to name a few. <br></br>{" "}
        <br></br> While we are committed to keeping Scansper accessible to all
        users and free from external influences, the financial burden of
        maintaining and scaling the infrastructure has become substantial. To
        maintain our independence and continue to operate as a community-driven
        and open-source project, we have decided not to seek external grants or
        corporate funding. <br></br>Instead, we believe in the strength of our
        community and are turning to you for support. We are excited to announce
        that we are now accepting donations from the community to help cover the
        growing infrastructure expenses. <br></br>
        <br></br> Your contributions will enable us to sustain and enhance
        Scansper, ensuring that it remains a valuable and freely accessible
        resource for everyone. <br></br> We appreciate every member of our
        community and understand that not everyone may be in a position to
        contribute financially. However, if you can spare any amount, large or
        small, it will go a long way in helping us maintain Scansper's integrity
        and independence.<br></br>
        <br></br> To make a donation, you can send any amount of CSPR to{" "}
        <div className="flex">
          <b>
            0159ac42a6383573e9683b0d35d7b5999e6248800ad9364b4f77c999b96798ccfc
          </b>{" "}
          <CopyButton textToCopy="0159ac42a6383573e9683b0d35d7b5999e6248800ad9364b4f77c999b96798ccfc" />
          address.
        </div>
        Your support is instrumental in shaping the future of Scansper, and we
        are immensely grateful for your involvement.<br></br>  <br></br>Thank you for
        being a part of the Scansper journey. Together, we can ensure that
        Scansper continues to grow, evolve, and thrive as a vital resource for
        all.
      </p>
      <p className="mt-12 text-xs italic">
        Scansper was not funded by any grants and didn't received any money to
        be built. We're developing the explorer on our free time. We earn
        absolutely 0$ with Scansper.
      </p>
    </AppLayout>
  );
};

export default IndexPage;
