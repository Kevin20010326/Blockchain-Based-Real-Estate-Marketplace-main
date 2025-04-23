//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract BlockEstate is ERC721URIStorage {
    using Counters for Counters.Counter;
    // _tokenIds 變數記錄目前最新鑄造的 tokenId
    Counters.Counter private _tokenIds;
    // 記錄市場上已售出的物品數量
    Counters.Counter private _itemsSold;
    // owner 是創建智能合約的合約地址
    address payable owner;
    // 市場收取的費用
    uint256 listPrice = 0.01 ether;

    // 儲存已列出的 token 資訊的結構
    struct ListedToken {
        uint256 tokenId;
        address payable owner;
        address payable seller;
        uint256 price;
        bool currentlyListed;
    }

    // 當 token 成功上架時觸發的事件
    event TokenListedSuccess(
        uint256 indexed tokenId,
        address owner,
        address seller,
        uint256 price,
        bool currentlyListed
    );
    string[] public myURI;

    // 此 mapping 將 tokenId 映射到 token 資訊，並在檢索 tokenId 的詳細資訊時非常有用
    mapping(uint256 => ListedToken) private idToListedToken;

    constructor() ERC721("BlockEstate", "BL") {
        owner = payable(msg.sender);
    }

    function updateListPrice(uint256 _listPrice) public payable {
        require(owner == msg.sender, "Only owner can update listing price");
        listPrice = _listPrice;
    }

    function getListPrice() public view returns (uint256) {
        return listPrice;
    }

    function getLatestIdToListedToken()
        public
        view
        returns (ListedToken memory)
    {
        uint256 currentTokenId = _tokenIds.current();
        return idToListedToken[currentTokenId];
    }

    function getListedTokenForId(
        uint256 tokenId
    ) public view returns (ListedToken memory) {
        return idToListedToken[tokenId];
    }

    function getCurrentToken() public view returns (uint256) {
        return _tokenIds.current();
    }

    // 第一次鑄造 token 時，它會在這裡列出
    function createToken(
        string memory tokenURI,
        uint256 price
    ) public payable returns (uint) {
        myURI.push(tokenURI);
        // 將 tokenId 計數器加一，用來追蹤已鑄造的 NFT 數量
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        // 鑄造具有 tokenId newTokenId 的 NFT 到調用 createToken 的地址
        _safeMint(msg.sender, newTokenId);

        // 將 tokenId 映射到 tokenURI（這是包含 NFT Metadata IPFS URL）
        _setTokenURI(newTokenId, tokenURI);

        // 呼叫輔助函式來更新全域變數並發送事件
        createListedToken(newTokenId, price);

        return newTokenId;
    }

    function createListedToken(uint256 tokenId, uint256 price) private {
        // 確保發送者已經發送足夠的 ETH 來支付上架費用
        require(msg.value == listPrice, "Hopefully sending the correct price");
        // 基本檢查
        require(price > 0, "Make sure the price isn't negative");

        // 更新 tokenId 到 token 詳細資訊的映射，有助於檢索函式
        idToListedToken[tokenId] = ListedToken(
            tokenId,
            payable(address(this)),
            payable(msg.sender),
            price,
            true
        );

        _transfer(msg.sender, address(this), tokenId);
        // 發送成功轉移的事件。前端解析此訊息並更新最終用戶
        emit TokenListedSuccess(
            tokenId,
            address(this),
            msg.sender,
            price,
            true
        );
    }

    // 此函式將返回目前列出的所有 NFT
    function getAllNFTs() public view returns (ListedToken[] memory) {
        uint nftCount = _tokenIds.current();
        ListedToken[] memory tokens = new ListedToken[](nftCount);
        uint currentIndex = 0;
        uint currentId;
        // 目前所有項目都是已上架的，未來若有取消上架，需在這邊加上篩選條件
        for (uint i = 0; i < nftCount; i++) {
            currentId = i + 1;
            ListedToken storage currentItem = idToListedToken[currentId];
            tokens[currentIndex] = currentItem;
            currentIndex += 1;
        }
        // 陣列 'tokens' 包含市場上所有 NFT
        return tokens;
    }

   // 回傳目前用戶作為擁有者或販售者的所有 NFT
    function getMyNFTs() public view returns (ListedToken[] memory) {
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;
        uint currentId;
        // 在建立陣列之前，先計算所有屬於用戶的 NFT 數量
        for (uint i = 0; i < totalItemCount; i++) {
            if (
                idToListedToken[i + 1].owner == msg.sender ||
                idToListedToken[i + 1].seller == msg.sender
            ) {
                itemCount += 1;
            }
        }

        // 一旦你有了相關 NFT 的數量，就創建一個陣列，然後將所有 NFT 存儲在其中
        ListedToken[] memory items = new ListedToken[](itemCount);
        for (uint i = 0; i < totalItemCount; i++) {
            if (
                idToListedToken[i + 1].owner == msg.sender ||
                idToListedToken[i + 1].seller == msg.sender
            ) {
                currentId = i + 1;
                ListedToken storage currentItem = idToListedToken[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function executeSale(uint256 tokenId) public payable {
        uint price = idToListedToken[tokenId].price;
        address seller = idToListedToken[tokenId].seller;
        require(
            msg.value == price,
            "Please submit the asking price in order to complete the purchase"
        );

        // 更新 token 的詳細資訊
        idToListedToken[tokenId].currentlyListed = true;
        idToListedToken[tokenId].seller = payable(msg.sender);
        _itemsSold.increment();

        // 實際轉移 token 給新的擁有者
        _transfer(address(this), msg.sender, tokenId);
        // 批准市場代銷 NFT
        approve(address(this), tokenId);

        // 將上架費用轉移給市場創建者
        payable(owner).transfer(listPrice);
        // 將銷售所得轉移給 NFT 賣家
        payable(seller).transfer(msg.value);
    }

   
