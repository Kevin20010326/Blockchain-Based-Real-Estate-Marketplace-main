
# Blockchain Based Real Estate Marketplace(BlockEstate)
BlockEstate is a blockchain-based real estate marketplace that allows users to list and buy properties using the Ethereum blockchain. It is developed using various technologies and tools, including the ERC721 library, Hardhat, IPFS, Ethers.js, React.js, Tailwind CSS, and HTML5.

The frontend of BlockEstate is built using React.js, Tailwind CSS, and HTML5. It provides a user-friendly interface for users to interact with the marketplace. Users can connect their MetaMask wallet to the platform to access their Ethereum accounts and perform transactions.

To list a property, users can provide property information such as address, description, price, and any additional details required. This information is stored securely on the Ethereum blockchain using the ERC721 standard. Each property is represented as a unique non-fungible token (NFT), allowing for easy ownership tracking and transfer.

The buy page of BlockEstate displays all the listed properties available for purchase. Users can browse through the listings and click on "Learn More" to view detailed information about a specific property. This information may include images, property features, seller information, and any other relevant details.

Additionally, BlockEstate provides a feature that allows users to view their own listed properties. This gives sellers the ability to manage and monitor their listings easily.

The backend of BlockEstate is implemented using Solidity, the programming language for writing smart contracts on the Ethereum blockchain. Ethers.js is used as a JavaScript library to interact with the Ethereum network and perform transactions. IPFS (InterPlanetary File System) is used for storing and retrieving property images and other large data files.

NPM (Node Package Manager) is utilized as the package manager for managing dependencies and ensuring the smooth functioning of the application.

Overall, BlockEstate aims to create a decentralized and transparent marketplace for buying and selling real estate properties using the power of blockchain technology.

BlockEstate 是一個基於區塊鏈的房地產市場，允許用戶使用以太坊區塊鏈列出和購買房產。它使用各種技術和工具開發，包括 ERC721 函式庫、Hardhat、IPFS、Ethers.js、React.js、Tailwind CSS 和 HTML5。

BlockEstate 的前端使用 React.js、Tailwind CSS 和 HTML5 建構。它為用戶與市場互動提供了友好的介面。用戶可以將他們的 MetaMask 錢包連接到該平台以存取他們的以太坊帳戶並執行交易。

要列出房產，用戶可以提供房產信息，例如地址、描述、價格以及任何其他所需的詳細資訊。這些資訊使用 ERC721 標準安全地儲存在以太坊區塊鏈上。每個財產都表示為一個獨特的非同質化代幣 (NFT)，從而可以輕鬆實現所有權的追蹤和轉移。

BlockEstate 的購買頁面顯示了所有可供購買的列出的房產。用戶可以瀏覽清單並點擊「了解更多」以查看有關特定房產的詳細資訊。這些資訊可能包括圖像、房產特徵、賣家資訊以及任何其他相關詳細資訊。

此外，BlockEstate 還提供允許用戶查看自己列出的房產的功能。這使賣家能夠輕鬆管理和監控他們的清單。

BlockEstate 的後端使用 Solidity 實現，Solidity 是在以太坊區塊鏈上編寫智慧合約的程式語言。 Ethers.js 用作 JavaScript 函式庫來與以太坊網路互動並執行交易。 IPFS（星際檔案系統）用於儲存和檢索財產影像和其他大型資料檔案。

NPM（Node 套件管理器）用作套件管理器，用於管理依賴項並確保應用程式的順利運作。

總體而言，BlockEstate 旨在利用區塊鏈技術的力量創造一個去中心化、透明的房地產買賣市場。










## Tech Stack

**Frontend:** React, TailwindCSS , HTML

**Backend:** Solidity, Ethers.js




## Installation

Install my-project with npm

```bash
  npm install my-project
  git clone https://github.com/Kevin20010326/Blockchain-Based-Real-Estate-Marketplace-main.git
  cd Blockchain-Based-Real-Estate-Marketplace
  npm install
  npx hardhat node
  npx hardhat run .\scripts\deploy.js --network   localhost
  cd frontend
  npm install
  npm run start
```

