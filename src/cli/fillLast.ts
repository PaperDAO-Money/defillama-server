require("dotenv").config();
const protocolToFill = "lixir"

import { getProtocol, getBlocksRetry } from "./utils";
import { storeTvl } from "../storeTvlInterval/getAndStoreTvl";
import {
  getCoingeckoLock,
  releaseCoingeckoLock,
} from "../storeTvlUtils/coingeckoLocks";
const main = async () => {
  const protocol = getProtocol(protocolToFill);
  const now = Math.round(Date.now() / 1000);

  const { ethereumBlock, chainBlocks } = await getBlocksRetry(now);
  setInterval(() => {
    releaseCoingeckoLock();
  }, 1.5e3);
  const tvl = await storeTvl(
    now,
    ethereumBlock,
    chainBlocks,
    protocol,
    {},
    4,
    getCoingeckoLock,
    false,
    true,
    true,
  );
  console.log("TVL", tvl)
};
main();
