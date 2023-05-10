## The goal of this document is to centralize our questions and ideas around data indexing on the blockchain Casper Network 


# Questions
1. How to identify dAPPs contracts ? There is a standard or normalized way to identify Dapps on the Casper Blockchain ? We have some informations with the named keys but seems that not all projects use them. 
2. How to handle NFTs minted by batch that doesn't follow the CEP standard ? Exemple with this deploy for the Mistery box NFTs where 26 NFTs are minted on one deploy :[https://cspr.live/deploy/6800d19bb5691db22c73239e87004da33cdba773a13846c14a030bf86ccf0ea1](https://cspr.live/deploy/6800d19bb5691db22c73239e87004da33cdba773a13846c14a030bf86ccf0ea1 "https://cspr.live/deploy/6800d19bb5691db22c73239e87004da33cdba773a13846c14a030bf86ccf0ea1") with a custom args named `number_of_boxs`. is there a standard or normalization for these kind of mint ? 
3. Can you confirm us that "New wallet created" means timestamp of the first activity of the wallet on the network ? Below the Casper Documentation :

	> On Mainnet, a pre-existing account will have to transfer CSPR tokens
	> to the newly created account's main purse to finalize the setup. The
	> source account needs to transfer CSPR tokens to the
	> hexadecimal-encoded public key of the target account. This transfer
	> will automatically create the target account if it does not exist.
	> Currently, this is the only way to create an account on Mainnet._

4. Active Address :  Let start with 1 address A. A transfers X tokens to addresses B and C. And validators V1 to Vj participate to transaction verification and consensus, Vi (i in [1;j]) add this transaction to the blockchain. How many addresses are "active" in that case ? 1 ? 3 ? 3+1 ? or 3 + j ? 

# Ideas 
1.  Gas Usage Distribution: A chart that shows the distribution of gas usage across different types of deploys (smart contracts, token transfers, etc.) in a given period of time. 
2.  Block size : A chart that shows the average size (number of deploy) on each blockover time. This can help identify trends in network congestion and performance. 
3. Token Holders Distribution: A chart that shows the distribution of token holders by balance range. This can help identify patterns in wealth concentration and potential liquidity issues. 
4.  Transaction Volume: A chart that shows the number of transactions (transfers and smart contract interactions) in the network over time. This can help identify trends in adoption and usage. 
5.  Active Nodes: A chart that shows the number of active nodes in the network over time. This can help identify trends in network participation and resilience. 
6. Gas Used by Smart Contracts: A chart that shows the top smart contracts by gas usage in the network over time. This can help identify potential inefficiencies and popular dApps and detect smart contracts with hight gas fees  
7.  Active validators over time: This chart shows the number of active validators in the Casper Network over a given time period, which can be used to analyze trends in network participation. 
8. Total gas consumption over time: This chart shows the total gas consumption in the Casper Network over a given time period, which can be used to analyze network usage
9.  Gas consumption by contract: This chart shows the gas consumption by different smart contracts in the Casper Network, which can be used to analyze the popularity and efficiency of different applications.
10.  Transaction volume over time: This chart shows the number of transactions in the Casper Network over a given time period, which can be used to analyze network activity. 
11.  Validator earnings over time: This chart shows the earnings of validators in the Casper Network over a given time period, which can be used to analyze network incentives. 
12.  Transaction fees by type: This chart shows the transaction fees for different types of transactions in the Casper Network, which can be used to analyze network usage. 
13. Node distribution by country: This chart shows the distribution of network nodes by country, which can be used to analyze network decentralization. 
14. Network participation rate: This chart shows the percentage of CSPR that is actively participating in the network, which can be used to analyze network security. 
15. Daily new accounts: This chart shows the number of new accounts created in the Casper Network each day, which can be used to analyze network growth.
