import { SkynetClient, genKeyPairFromSeed } from "skynet-js";
// Set a custom user agent.
// const customUserAgent = "Sia-Agent";

// Set an upload progress tracker.
const onUploadProgress = (progress, { loaded, total }) => {
  console.info(`Progress ${Math.round(progress * 100)}%`);
};

const client = new SkynetClient("https://siasky.net", {
  onUploadProgress,
});

export interface NftData {
  githubUsername: string;
  walletAddress: string;
  tokenId: number;
  contractAddress: string;
  jsonHash: string;
  nftHash: string;
  pullRequestId: string;
}

interface Entry {
  data: NftData[];
  dataKey: string;
  revision: number;
}

export const saveNft = async (nft: NftData) => {
  try {
    const { privateKey, publicKey } = genKeyPairFromSeed(nft.walletAddress);
    const savedNftsKey = nft.walletAddress;

    let entry: Entry;
    try {
      entry = await client.db.getJSON(publicKey, savedNftsKey);
    } catch (err) {}

    if (!entry.data) {
      entry.data = [];
    }

    entry.data.push(nft);
    await client.db.setJSON(privateKey, savedNftsKey, entry.data);

    return true;
  } catch (err) {
    console.log(err);
  }

  return false;
};

export const getNfts = async (wallet: string) => {
  try {
    const { publicKey } = genKeyPairFromSeed(wallet);
    const savedNftsKey = wallet;
    const entry: Entry = await client.db.getJSON(publicKey, savedNftsKey);
    return entry.data;
  } catch (err) {
    console.log(err);
  }

  return [];
};
