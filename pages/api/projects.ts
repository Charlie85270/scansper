import nc from "next-connect";
import cors from "cors";

// export const config = {
//   runtime: "edge",
// };

export default async function handler(req, res) {
  const response = await fetch(
    "https://casperecosystem.io/page-data/index/page-data.json",
    {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error

      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    }
  );

  res.status(200).json(await response.json());
}
