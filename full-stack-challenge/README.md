## Full-Stack DeFi Dashboard Challenge

### Objective
Build a DeFi dashboard using TypeScript, Next.js with the app router, Express, and React Query, integrating Web3 wallet connectivity.

### Demo

#### Explore Page

This will be the home page `/` route, and you will need to take the `token.json` data, or any token data of your choosing, and display the tokens in a list and using the appropriate APIs to fetch the missing data (i.e. price data)

![Explore Page]("/images/explore-page.png")

##### Token Detail Page

This will be the page that loads when a user clicks on a token `/[slug]`.

Here you will render the details of the token like the description, company url and socials, as well as displaying the historical prices of that token in a chart.

The chart will have toggeable filters for the timeframe (1 year, 1 month, 1 week, 1 hour) and it will change the timeframe used to diplay the historical token price data (does not need to be real-time).

Additionally, render out the key statistics of the returns of the day, month, year etc.

![Token Detail Page]("/images/token-detail-page.png")

##### Account Page

This will be the page that loads when a user connects their wallet `/account`. Must only be visible when the wallet is connected, and must be protected if wallet is NOT connected.

DO THIS ONLY FOR 1 CHAIN (of your choice)

- Assets

Here you will render out the asstes the wallet holds, the price of each asset, balance and value, as shown in the picture.

- NFTs

Show also the NFTs the user holds.

- Transaction History (Optional if choosing Solana)

Show the transaction history associated with the account

![Account Page - Tokens]("/images/acount-page.png")
![Account Page - NFTs]("/images/acount-page-1.png")
![Account Page - History]("/images/acount-page-2.png")


### Requirements

#### Frontend (Next.js)
1. **Pages:**
   - **Dashboard Page:**
     - Display current prices and detailed information for major tokens (e.g., BTC, ETH, BNB).
     - Include a button to login with a Web3 wallet connector of your choice.
     - **Token Detail Page:**
       - Display detailed information for a selected token including a graph of the historical price.
       - Include buttons to filter the historical price graph by time frames (e.g., 1D, 7D, 1M, 1Y).
       - Show additional information such as name, description, social media links, website, and logo.
   - **Portfolio Page:**
     - Display the connected wallet's portfolio value, balance, token holdings, and transaction history.
2. **Components:**
   - **TokenPrices:** Display token prices.
   - **TokenInfo:** Display detailed token information.
   - **WalletConnector:** Button to connect a Web3 wallet.
   - **Portfolio:** Display the user's portfolio details including holdings and transaction history.
   - **TokenDetail:** Display detailed token information including the historical price graph and filters.
3. **Custom Hooks:**
   - **useTokenPrices:** Fetch token prices.
   - **useTokenInfo:** Fetch detailed token information.
   - **useWallet:** Manage wallet connection and state.
   - **usePortfolioBalance:** Fetch the user's portfolio balance based on their wallet address.
   - **useTokenHoldings:** Fetch specific token holdings in the user's portfolio.
   - **useTransactionHistory:** Fetch the transaction history for the wallet address.
   - **useTokenHistory:** Fetch historical price data for a specific token.
4. **Data Fetching:**
   - Use React Query for data fetching from the backend.

#### Backend (Express)
1. **API Endpoints:**
   - **GET /api/defi/prices:** Fetch current prices for specified tokens.
   - **GET /api/defi/info:** Fetch detailed information for specified tokens.
   - **GET /api/defi/history:** Fetch historical price data for specified tokens.
   - **GET /api/portfolio/:address:** Fetch portfolio balance and holdings for a given wallet address.
   - **GET /api/portfolio/:address/holdings:** Fetch specific token holdings.
   - **GET /api/transactions/:address:** Fetch transaction history for a given wallet address.
2. **Architecture:**
   - Use the router-controller-service pattern, grouped by resource.
   - Structure should look like this:
     ```plaintext
     server
     ├── src
     │   ├── resources
     │   │   ├── resource1
     │   │   │   ├── resource1.controller.ts
     │   │   │   ├── resource1.service.ts
     │   │   │   ├── resource1.router.ts
     │   │   ├── resource2
     │   │   │   ├── resource2.controller.ts
     │   │   │   ├── resource2.service.ts
     │   │   │   ├── resource2.router.ts
     │   └── index.ts
     ├── .env
     ├── tsconfig.json
     └── package.json
     ```
3. **Blockchain Interaction:**
   - Use web3.js or ethers.js to interact with the blockchain and fetch real-time data.
4. **No Database:**
   - Fetch all data directly from external APIs and the blockchain.

### Instructions
1. **Setup:**
   - **Client:** Initialize a Next.js project with the app router.
   - **Server:** Set up an Express server with TypeScript.
2. **Frontend Implementation:**
   - Create the required pages and components.
   - Implement custom hooks for data fetching.
   - Integrate Web3 wallet connector for wallet login.
3. **Backend Implementation:**
   - Create the necessary API endpoints.
   - Implement services to fetch data from external APIs (e.g., CoinGecko) and blockchain.
   - Use the router-controller-service pattern, grouped by resource.
4. **Deployment:**
   - Provide deployment instructions (e.g., Docker, Vercel for frontend, Heroku for backend).

### Evaluation Criteria
1. **Functionality:** Completeness and correctness of the dashboard and portfolio features.
2. **Code Quality:** Clean, well-documented, and maintainable code.
3. **Performance:** Efficient data fetching and rendering.
4. **User Experience:** Responsive design and smooth interactions.
5. **Blockchain Integration:** Correct and secure integration with the Web3 wallet and blockchain data.
6. **Architecture:** Proper use of the router-controller-service pattern, grouped by resource.

This challenge assesses your ability to build a full-stack application with real-time data fetching and blockchain integration. Good luck!