import Link from "next/link";
import React, { useContext } from "react";
import AppContext from "../../../AppContext";
import AppLayout from "../../../components/layout/AppLayout";
import Card from "../../../components/shared/Card/Card";
import RichList from "../../../components/shared/RichList/RichList";
import Table from "../../../components/shared/Table/Table";
import {
  getAvatarUrl,
  getPublicKeyName,
  truncateString,
} from "../../../utils/Utils";

const genesisAccount = [
  {
    Name: "Acheron Trading",
    Website: "https://acherontrading.com/",
    public_key:
      "01ee8b5ec54251a9f2f92edbbf328fcdb78449ae2cca2743d591f1b7e83b6d9049",
  },
  {
    Name: "AGE Fund",
    Website: "http://age.fund",
    public_key:
      "01b4815d64e022127b117d25436e4b9a9d9d1338b0c6cb09db3995d4d3ac84d86b",
  },
  {
    Name: "Anonstake",
    Website: "http://www.anonstake.com/",
    public_key:
      "010427c1d1227c9d2aafe8c06c6e6b276da8dcd8fd170ca848b8e3e8e1038a6dc8",
  },
  {
    Name: "Antoine Vergne",
    Website: "https://antoinevergne.wixsite.com/my-site",
    public_key:
      "010a78eef78966a56a633c665411388f97f850609960d5d898f3992272b8d4bcca",
  },
  {
    Name: "ArmyIDs",
    Website: "https://armyids.com/",
    public_key:
      "011907bc6fa90ccb8cacc150170b887b3dd97a96fc029b515365141d1e5d4f7983",
  },
  {
    Name: "Art3mis Cloud",
    Website: "https://art3mis.cloud/",
    public_key:
      "01ba1dcfbe8dba48b88674bb007c000391c0ea36b5d80570c113a42a9823d702c2",
  },
  {
    Name: "Austin Davis",
    Website: "N/A",
    public_key:
      "012f5501236a3bd82d22ee7675e78174ee723565495fd0f43be8a011bfa6494687",
  },
  {
    Name: "BitCat",
    Website: "https://www.bitcat365.com/",
    public_key:
      "014382d46e2543ab2832c04936f8c205847040426abb56065bbf7b2f7e1d33f200",
  },
  {
    Name: "BitNordic",
    Website: "http://bitnordic.com/",
    public_key:
      "01a849b574b01c775754db774f7243c4eae01f8919ba3d5c624282485af07b18ae",
  },
  {
    Name: "Bixin/Kelepool",
    Website: "https://www.kelepool.com/#/",
    public_key:
      "01765c9d153550285d2e6da2f4407ca8b6c5d2f94098e9794a02609df1068474ef",
  },
  {
    Name: "Block Blox",
    Website: "http://block-blox.com",
    public_key:
      "01e61c8b8227afd8f7d4daece145546aa6775cf1c4ebfb6f3f56c18df558aed72d",
  },
  {
    Name: "Branko Karalic",
    Website: "https://branework.com/brane226/",
    public_key:
      "01c2de71b99085b38f3ba0dece0c1e128de7fe69526beb66951b99f5c7272c3980",
  },
  {
    Name: "Cypher Core",
    Website: "https://cyphercore.io",
    public_key:
      "01c5594d384a35a7520f00643c054bc5f574d04fa88d73fb215614fea35178d9b2",
  },
  {
    Name: "Danil Ushakov",
    Website: "N/A",
    public_key:
      "017f7380736731efa408c323b38a13541be1c99a4aefb0d5b59c6a4aecac494105",
  },
  {
    Name: "Delight Labs",
    Website: "http://delightlabs.io",
    public_key:
      "01a6901408eda702a653805f50060bfe00d5e962747ee7133df64bd7bab50b4643",
  },
  {
    Name: "Everstake",
    Website: "https://everstake.one/blog",
    public_key:
      "012bac1d0ff9240ff0b7b06d555815640497861619ca12583ddef434885416e69b",
  },
  {
    Name: "Figment",
    Website: "https://figment.io",
    public_key:
      "01717c1899762ffdbd12def897ac905f1debff38e8bafb081620cb6da5a6bb1f25",
  },
  {
    Name: "Figment",
    Website: "https://figment.io",
    public_key:
      "015fd964620f98e551065079e142840dac3fb25bd97a0d4722411cb439f9247d72",
  },
  {
    Name: "CoinList",
    Website: "https://figment.io",
    public_key:
      "018f84c6fc037284f189cc8cb49f89212ff434a5eb050e48cdd164ff3890fbff69",
  },
  {
    Name: "Gunray",
    Website: "https://www.gunray.xyz/",
    public_key:
      "013eb6775484f25ac4e126e93a350ef2bc259385da5141d331829af7f755b03844",
  },
  {
    Name: "Hashquark",
    Website: "http://hashquark.io",
    public_key:
      "01652d9fbd8dbb443af0122cd4347f4107e697306e5b90f93dbf959f7612e5e7d2",
  },
  {
    Name: "Hera Software",
    Website: "http://herc.one",
    public_key:
      "01faec72d138026edbd470d9ba1f6a05c5fabaa98da8bb41c8c92041d2f58337d2",
  },
  {
    Name: "Huobi Pool",
    Website: "https://www.huobipool.com/",
    public_key:
      "01026ca707c348ed8012ac6a1f28db031fadd6eb67203501a353b867a08c8b9a80",
  },
  {
    Name: "Isillien",
    Website: "http://www.isillien.com/",
    public_key:
      "01269c84a9153623fc47288f5a2b1bd681fc7d01b1f6144626583a56d3ba8f7c09",
  },
  {
    Name: "Jedcrypto",
    Website: "http://jedcrypto.com/",
    public_key:
      "01ad71484b09749a49463d3af2a8a3addd71509a92f447e9b06cbddbf60b45cbf7",
  },
  {
    Name: "Ledger Leap",
    Website: "https://ledgerleap.com/",
    public_key:
      "011117189c666f81c5160cd610ee383dc9b2d0361f004934754d39752eedc64957",
  },
  {
    Name: "Make Services",
    Website: "https://makestake.io",
    public_key:
      "01419478cc7a68037c553c0214d595cb6b432c71ef73ece0d7a5f98c5eb1ecb44a",
  },
  {
    Name: "BitStake",
    Website: "N/A",
    public_key:
      "0145316b84fee8735291f5a29206e5211c74ab828b0382bb475a4a6e799894ea11",
  },
  {
    Name: "Shea Staking",
    Website: "https://www.shea-staking.cc",
    public_key:
      "01219550874603647a55b98844a7e41accc5c3076b6c1fbb30002e7f6031524fa2",
  },
  {
    Name: "SmartStake",
    Website: "https://harmony.smartstake.io/",
    public_key:
      "01c7de2f333695c4db43cce8c555f74540176071a9eeb8438eb335634b9729ee6b",
  },
  {
    Name: "Sparq Labs",
    Website: "http://casper.sparqlabs.io/",
    public_key:
      "01d904f8135553a4810487b0d754f9f1c8efb1ee91c96f36e92b9631120a7ece06",
  },
  {
    Name: "Stake.Fish",
    Website: "https://stake.fish",
    public_key:
      "010a8ac8d23e6c57fa340c552ddf9199d9cba9166ecc0daee640053ebfc6254610",
  },
  {
    Name: "Staked",
    Website: "https://staked.us",
    public_key:
      "0182f835993ce0d3596147429ea432b3a025580f458f50bbbaccbbe4c73f1f1113",
  },
  {
    Name: "Validation Capital",
    Website: "https://validation.capital",
    public_key:
      "012dc55b77b2a9faf75dbaed15775ddfc48e60c4596608318c8b96b1900bdf1d5f",
  },
  {
    Name: "Validation Spot",
    Website: "https://validationspot.io/",
    public_key:
      "01d2212cbecf229cd13deb7d2b650ed72cc109763398d95aa7743a1559e7eb4781",
  },
  {
    Name: "WaterDrip Capital",
    Website: "http://waterdrip.io/",
    public_key:
      "0144118517b5ba7e7ca917d5a418c5fb8bf49e279427435d6597f59f8c5bf9ff1f",
  },
  {
    Name: "WolfEdge Capital",
    Website: "http://wolfedge.capital",
    public_key:
      "0149fcd9cc0986ba04d77ad48c7def4860bf6952ccb075666e579549386fd2f143",
  },
  {
    Name: "Chain Capital",
    Website: "N/A",
    public_key:
      "014ec8bfba46dbd592c0b44dd356abffb203330ddeced26c7522656b9bff85e7bc",
  },
  {
    Name: "Megala Ventures",
    Website: "https://megala.ventures/",
    public_key:
      "0167e08c3b05017d329444dc7d22518ba652cecb2c54669a69e5808ebcab25e42c",
  },
  {
    Name: "Woodstock Fund",
    Website: "https://woodstockfund.com/",
    public_key:
      "01b32b134afdf8585b8c8181f81375a98c5ed12e145c9e6bfea33a55eeccf1fa22",
  },
  {
    Name: "James McDonald",
    Website: "",
    public_key:
      "017de9688caedd0718baed968179ddbe0b0532a8ef0a9a1cb9dfabe9b0f6016fa8",
  },
  {
    Name: "SNZ Holding",
    Website: "",
    public_key:
      "01b1c48c69eeb5339ae43be062dee21c46d61346b9ee1f83d4e924000833c5a3e4",
  },
  {
    Name: "Oasis Power Investments Limited",
    Website: "",
    public_key:
      "017b9a85b657e0a8c2e01bf2d80b6b2e6f8d8b4bc6d7c479f21e59dceea761710b",
  },
  {
    Name: "BW.com Self",
    Website: "",
    public_key:
      "01eedfd20f75528c50aae557d15dff5ca6379ca8401bceb8e969cd0cb1ea52ec7f",
  },
  {
    Name: "ZB Global Self",
    Website: "",
    public_key:
      "017d940644deeb8eea3d94f62cfa65a9bea4eb2e8ec9433104bb145d73fd39e98f",
  },
  {
    Name: "ETA DevxDAO Self #1",
    Website: "",
    public_key:
      "0163e03c3aa2b383f9d1b2f7c69498d339dcd1061059792ce51afda49135ff7876",
  },
  {
    Name: "Rachid Self",
    Website: "",
    public_key:
      "015dfd4b3f997b1eb1a7292eb501845931b8aa9869988a5caa2be79ac4f5ff8a21",
  },
  {
    Name: "KOIOS / Dennis IJlst Self",
    Website: "",
    public_key:
      "013f4f5b2da0d7ed5cf78d5f153a5517ff203c0ed3570061476e793c81669e77d9",
  },
  {
    Name: "Robert Jennings Self",
    Website: "",
    public_key:
      "0113442fd0dc052634fb42943e8ba095a404ea12cded84fbe4b1536ded94dab10f",
  },
  {
    Name: "BitMax Self",
    Website: "",
    public_key:
      "014c2573f59c70775a41d9cb69b9e3146e6d51567d33a141423b5bf371967e5902",
  },
  {
    Name: "DigiStrats",
    Website: "",
    public_key:
      "0190c434129ecbaeb34d33185ab6bf97c3c493fc50121a56a9ed8c4c52855b5ac1",
  },
  {
    Name: "RobotCache",
    Website: "",
    public_key:
      "014b466f5c6c87bb1d2566d166120e320a724231374cd0775e0e347afed70a4745",
  },
  {
    Name: "Meghanmark",
    Website: "",
    public_key:
      "015da78bc6315643fbcf57d87a50853c67d8b271b615f38f6538f78a844cc4501d",
  },
  {
    Name: "arcadiamgroup",
    Website: "",
    public_key:
      "0142093cad632cc989b3e9952a4e571cab44d90a7bf9e3badd0d91c2dc2ead332a",
  },
  {
    Name: "Dennis Reichelt",
    Website: "",
    public_key:
      "01ae2af99944b0b9f92fccf425aa51894ebbad0f4e8e42c66a71dcb999a3bd94ed",
  },
  {
    Name: "ETA DevxDAO Self #2",
    Website: "",
    public_key:
      "01aa2976834459371b1cf7f476873dd091a0e364bd18abed8e77659b83fd892084",
  },
];

export const Genesis = () => {
  const { validators } = useContext(AppContext);
  const headers = ["Name", "Website", "Public Key"];
  const rows = genesisAccount?.map(item => {
    return [
      <div className="flex items-center space-x-2 text-sm flex-nowrap">
        <span> {item.Name}</span>
      </div>,
      <div className="flex items-center space-x-2 text-sm flex-nowrap">
        <a target="_blank" className="hover:underline" href={item.Website}>
          {item.Website}
        </a>
      </div>,
      <Link
        className="flex items-center space-x-2 text-blue-500 hover:text-blue-900"
        href={`/account/${item.public_key}?tab=deploys`}
      >
        <img
          className="w-6 h-6 rounded-lg"
          src={getAvatarUrl(item.public_key, validators)}
        />
        <span>
          {truncateString(getPublicKeyName(item.public_key, validators), 20)}
        </span>
      </Link>,
    ];
  });
  return (
    <AppLayout
      title="Genesis accounts of the Casper Network"
      desc="Genesis accounts of the Casper Network"
    >
      <Card titleSize="large" title="Genesis accounts">
        <p className="italic text-gray-400">
          This is the list of all genesis accounts (validators) when the Casper
          mainnet was launched the Mar 31 2021.
        </p>
        <Table
          showTotalItems
          totalItems={genesisAccount.length}
          rows={rows}
          header={headers}
        />
      </Card>
    </AppLayout>
  );
};

export default Genesis;
