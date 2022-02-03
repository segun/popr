import { NFTStorage, Blob } from "nft.storage";
import { config } from "../../../utils/config";


const fs = require('fs');
const FormData = require('form-data');

const api = async (req, res) => {  
  const data = req.body;
  const nftStorageToken = config.NFT_STORAGE_TOKEN;

  const storage = new NFTStorage({ token: nftStorageToken });
  const cid = await storage.storeBlob(new Blob([data]));
  console.log({ cid });
  const status = await storage.status(cid);
  console.log(status);

  return res.status(200).json(status);
}

export default api;