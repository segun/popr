import ERC721Standard from '../../pages/contracts-abi/ERC721Standard.json';
import ProofOfPullRequest from '../../pages/contracts-abi/ProofOfPullRequest.json';

import { ethers } from 'ethers';

export const useERC721Standard = (address: string, ethereum) => {
    const abi = ERC721Standard.abi;    
    return useContract(address, ethereum, abi) ;
};

export const getPOPRContract = (address: string, ethereum) => {
    const abi = ProofOfPullRequest.abi;   
    return useContract(address, ethereum, abi);
};

const useContract = (address: string, ethereum, abi) => {
    const provider = new ethers.providers.Web3Provider(ethereum); //providers.Web3Provider(web3.currentProvider);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(address, abi, signer);
    const contractWithSigner = contract.connect(signer);
    return contractWithSigner;    
}

export const isTransactionMined = async (
    ethereum,
    hash,
    numberOfBlocks,
): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
        try {
            const provider = new ethers.providers.Web3Provider(ethereum);
            let blockCount = 0;
            provider.on('block', async (blockNumber) => {
                console.log(
                    'Block Mined: ',
                    blockNumber,
                    blockCount,
                    numberOfBlocks,
                );
                blockCount++;
                if (blockCount > numberOfBlocks) {
                    provider.removeAllListeners('block');
                    resolve(false);
                }
                const txReceipt = await provider.getTransactionReceipt(hash);
                if (txReceipt && txReceipt.blockNumber) {
                    provider.removeAllListeners('block');
                    resolve(true);
                }
            });
        } catch (error) {
            console.log(`waiting for transaction rejected with error`, error);
            reject(error);
        }
    });
};