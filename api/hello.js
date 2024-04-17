async function uploadToGitHubPages(nftJSON, tokenId) {
    const fileName = `nfts/${tokenId}.json`;
    const filePath = path.join(process.cwd(), fileName);

    // Write the NFT JSON to a file
    fs.writeFileSync(filePath, JSON.stringify(nftJSON, null, 2));

    // Upload the file to GitHub Pages
    // You'll need to replace these placeholders with your actual GitHub repository details
    const repo = 'mohadli/Metadata';
    const branch = 'main'; // or 'master', depending on your repository
    const token = process.env.GITHUB_TOKEN; // Make sure to set this environment variable in your Vercel project settings

    const url = `https://api.github.com/repos/${repo}/contents/${fileName}`;
    const base64Content = Buffer.from(JSON.stringify(nftJSON, null, 2)).toString('base64');

    const response = await axios.put(url, {
        message: `Add NFT JSON for tokenId ${tokenId}`,
        content: base64Content,
        branch: branch
    }, {
        headers: {
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json'
        }
    });

    console.log(`NFT JSON uploaded to ${response.data.content.download_url}`);
}

export default async (req, res) => {
  const Web3 = require('web3');
  const fs = require('fs');
  const axios = require('axios');
  const domainabi = [{"inputs": [{"internalType": "string","name": "baseURI","type": "string"}],"stateMutability": "nonpayable","type": "constructor"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "owner","type": "address"},{"indexed": true,"internalType": "address","name": "approved","type": "address"},{"indexed": true,"internalType": "uint256","name": "tokenId","type": "uint256"}],"name": "Approval","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "owner","type": "address"},{"indexed": true,"internalType": "address","name": "operator","type": "address"},{"indexed": false,"internalType": "bool","name": "approved","type": "bool"}],"name": "ApprovalForAll","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "previousOwner","type": "address"},{"indexed": true,"internalType": "address","name": "newOwner","type": "address"}],"name": "OwnershipTransferred","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "from","type": "address"},{"indexed": true,"internalType": "address","name": "to","type": "address"},{"indexed": true,"internalType": "uint256","name": "tokenId","type": "uint256"}],"name": "Transfer","type": "event"},{"inputs": [{"internalType": "string","name": "","type": "string"}],"name": "addrOf","outputs": [{"internalType": "uint256","name": "id","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "tokenId","type": "uint256"}],"name": "approve","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "owner","type": "address"}],"name": "balanceOf","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "tokenId","type": "uint256"}],"name": "getApproved","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "owner","type": "address"},{"internalType": "address","name": "operator","type": "address"}],"name": "isApprovedForAll","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "subDomainOwner","type": "address"},{"internalType": "string","name": "subDomain","type": "string"}],"name": "mintSubdomain","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "name","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "","type": "uint256"}],"name": "nameOf","outputs": [{"internalType": "string","name": "ensname","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "owner","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "tokenId","type": "uint256"}],"name": "ownerOf","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "renounceOwnership","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "string","name": "subDomain","type": "string"}],"name": "resolve","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "from","type": "address"},{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "tokenId","type": "uint256"}],"name": "safeTransferFrom","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "from","type": "address"},{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "tokenId","type": "uint256"},{"internalType": "bytes","name": "_data","type": "bytes"}],"name": "safeTransferFrom","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "operator","type": "address"},{"internalType": "bool","name": "approved","type": "bool"}],"name": "setApprovalForAll","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "string","name": "baseURI","type": "string"}],"name": "setBaseTokenURI","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "bytes4","name": "interfaceId","type": "bytes4"}],"name": "supportsInterface","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "symbol","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "string","name": "str","type": "string"}],"name": "testAlphaNumeric","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "tokenId","type": "uint256"}],"name": "tokenURI","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "totalSupply","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "from","type": "address"},{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "tokenId","type": "uint256"}],"name": "transferFrom","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "newOwner","type": "address"}],"name": "transferOwnership","outputs": [],"stateMutability": "nonpayable","type": "function"}];
  //const { abi, address } = require('./NFTContract.json'); // Assuming you have the ABI and address of your NFT contract
  const address = '0x89F3b42F941A88D3da886ae5002f58BB8a5F56ea';
  const { createCanvas, loadImage, registerFont } = require('canvas'); // Import canvas
  
  const web3 = new Web3('https://goerli.blockpi.network/v1/rpc/public');
  const contract = new web3.eth.Contract(abi, address);
  
  // Event listener for MintSubdomain event
  contract.events.MintSubdomain()
      .on('data', async event => {
          const subdomain = event.returnValues.subDomain;
          const tokenId = event.returnValues.tokenId;
          const tokenURI = baseURI + subdomain;
  
          const nftJSON = {
            "is_normalized": true,
            "name": `${subdomain}.ecc.eth`,
            "image": `https://storage.googleapis.com/ensimage/${subdomain}ecc.png`,
            "description": `The ECC Domain ${subdomain}, which is also the ECC subdomain ${subdomain}.ecc.eth.`,
            "attributes": [
                {"trait_type": "Length", "display_type": "number", "value": subdomain.length},
                {"trait_type": "Data Type", "value": "Alphabets"}
            ],
            "name_length": subdomain.length,
            "url": `https://app.ens.domains/name/${subdomain}.ecc.eth`,
            "version": 0
        };
        
          // Write PNG to a file
          const filePath = `./images/${subdomain}.png`;
          fs.writeFileSync(filePath, buffer);
  
          // Upload image to the server
          const uploadUrl = `https://storage.googleapis.com/ensimage/${subdomain}ecc.png`;
          const response = await axios.put(uploadUrl, fs.createReadStream(filePath), {
              headers: {
                  'Content-Type': 'image/png'
              }
          });
  
          console.log(`Image uploaded to ${uploadUrl}`);
  
          // Now you can use the tokenURI and uploadUrl to generate the NFT JSON as needed
      })
      .on('error', console.error);
}

