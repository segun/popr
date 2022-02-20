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

interface Entry<T> {
  data: T[];
  dataKey: string;
  revision: number;
}

export interface Url {
  name: string;
  url: string
}

export const saveNft = async (nft: NftData) => {
  try {
    const { privateKey, publicKey } = genKeyPairFromSeed(nft.walletAddress);
    const savedNftsKey = nft.walletAddress;

    let entry: Entry<NftData>;
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
    const { privateKey, publicKey } = genKeyPairFromSeed(wallet);

    // clear DB
    // await client.db.setJSON(privateKey, wallet, []);    
    const savedNftsKey = wallet;
    const entry: Entry<NftData> = await client.db.getJSON(publicKey, savedNftsKey);
    return entry.data;
  } catch (err) {
    console.log(err);
  }
  return [];
};

export const getImageApiList = async () => {
  try {
    const { publicKey } = genKeyPairFromSeed("this is a seed");
    const dbKey = "api-list";
    const entry: Entry<Url> = await client.db.getJSON(publicKey, dbKey);
    console.log(entry);
    return entry.data;
  } catch (err) {
    console.log(err);
  }
  return [];
};

export const saveImageApi = async (name: string, url: string) => {  

  try {
    const { privateKey, publicKey } = genKeyPairFromSeed("this is a seed");
    const dbKey = "api-list";

    let entry: Entry<Url>;
    try {
      entry = await client.db.getJSON(publicKey, dbKey);
    } catch (err) {}

    if (!entry.data) {
      entry.data = [];
    }

    entry.data.push({name, url});
    await client.db.setJSON(privateKey, dbKey, entry.data);

    return true;
  } catch (err) {
    console.log(err);
  }
};


export const resetAPIDB =async () => {
  const { privateKey, publicKey } = genKeyPairFromSeed("this is a seed");
  const dbKey = "api-list";

  await client.db.setJSON(privateKey, dbKey, []);    
};
