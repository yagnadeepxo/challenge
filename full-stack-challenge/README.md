## Wysdom Full-Stack Challenge - DeFi Dashboard

Clone this repo to get started!

### Objective

Build a DeFi dashboard using TypeScript, Next.js with the app router, Express, Prisma, and React Query, integrating Web3 wallet connectivity.

#### Tech Stack Used

- Client: Next.js
- Server: Express.js, REST
- UI: Tailwind and ShadCN
- DB: Prisma, PostgreSQL
- Blockchain: web3.js / ethers / wagmi (or any equivalent)

### Data

- `tokens.json` contains a few example tokens you can use within the challenge. These will be the initial data for your db, and needs to be seeded `npx prisma db seed`

### Demo

#### Explore Page

This will be the home page `/` route, and you will need to take the `token.json` data, or any token data of your choosing, and display the tokens in a list and using the appropriate APIs to fetch the missing data (i.e. price data)

**CRUD FUNCTIONALITY:**

There also needs to be a button on the explore page that creates a new token (anyone can call it)

- Add Token Button: There should be a button to add a new token.
- Add Token Modal: When the user clicks the "Add Token" button, a modal appears with a form to add a new token.
- Form Validation: The form should be validated using Zod.
- Form Implementation: Use react-hook-form for the form implementation.
- Create Token Hook: Upon form submission, call the useCreateToken hook.
- Create Token API: The useCreateToken hook should call the /api/token/ endpoint to create a new token in the database.
- Cache Invalidation: Ensure cache invalidation is properly implemented when a new token is created.
- Toast Notifications: Show toast notifications for both success and failure of the token creation.


![Explore Page](https://github.com/Wysdom-xyz/engineering-challenges/blob/main/full-stack-challenge/public/images/explore-page.png?raw=true)

![Explore Page](https://github.com/Wysdom-xyz/engineering-challenges/blob/main/full-stack-challenge/public/images/explore-page-1.png?raw=true)

##### Token Detail Page

This will be the page that loads when a user clicks on a token `/[slug]`.

Here you will render the details of the token like the description, company url and socials, as well as displaying the historical prices of that token in a chart.

The chart will have toggeable filters for the timeframe (1 year, 1 month, 1 week, 1 hour) and it will change the timeframe used to diplay the historical token price data (does not need to be real-time).

Additionally, render out the key statistics of the returns of the day, month, year etc.

![Token Detail Page](https://github.com/Wysdom-xyz/engineering-challenges/blob/main/full-stack-challenge/public/images/token-detail-page.png?raw=true)

##### Account Page

This will be the page that loads when a user connects their wallet `/account`. Must only be visible when the wallet is connected, and must be protected if wallet is NOT connected.

DO THIS ONLY FOR 1 CHAIN (of your choice)

- Assets

Here you will render out the asstes the wallet holds, the price of each asset, balance and value, as shown in the picture.

- NFTs

Show also the NFTs the user holds.

- Transaction History (Optional if choosing Solana)

Show the transaction history associated with the account

![Account Page - Tokens](https://github.com/Wysdom-xyz/engineering-challenges/blob/main/full-stack-challenge/public/images/account-page.png?raw=true)
![Account Page - NFTs](https://github.com/Wysdom-xyz/engineering-challenges/blob/main/full-stack-challenge/public/images/account-page-1.png?raw=true)
![Account Page - History](https://github.com/Wysdom-xyz/engineering-challenges/blob/main/full-stack-challenge/public/images/account-page-2.png?raw=true)

#### Log List Page

Display a list of all api calls saved in the Logger db model.

A simple table will suffice.

![Logs Page](https://github.com/Wysdom-xyz/engineering-challenges/blob/main/full-stack-challenge/public/images/logs-page.png?raw=true)

#### Log List Page

### Requirements

#### Frontend (Next.js)
1. **Pages:**
   - **Explore Page:**
     - Display current prices and detailed information for major tokens (e.g., BTC, ETH, BNB).
     - Include a button to login with a Web3 wallet connector of your choice.
     - Add Token Modal: Include a button to add a new token.
        - When clicked, a modal should appear with a form to add a new token.
        - The form should be validated using Zod.
        - The form should be implemented using react-hook-form.
        - On form submission, call the useCreateToken hook to create the token via the /api/token/ endpoint.
        - Properly implement cache invalidation after creating a new token (so the token list updates in real time)
        - Display toast notifications for both success and failure of the token creation.
     - **Token Detail Page:**
       - Display detailed information for a selected token including a graph of the historical price.
       - Include buttons to filter the historical price graph by time frames (e.g., 1D, 7D, 1M, 1Y).
       - Show additional information such as name, description, social media links, website, and logo.
   - **Account Page:**
     - Display the connected wallet's portfolio value, balance, token holdings, and transaction history.
   - **Log List Page:**
     - Display the logs present in the Logger db model.

2. **Components:**
(this is non exhuastive list of components - if you need to implement any more, you should do so with complete autonomy)

    - **TokenList**: Display a list of tokens with current prices.
    - **TokenDetail**: Display detailed token information, historical price graph, and filters.
    - **TokenStats**: Show additional token information like description, social media links, and website.
WalletConnector: Button to connect a Web3 wallet.
    - **Portfolio**: Display the user's portfolio details including holdings and transaction history.
    - **PortfolioAssets**: Display the user's token holdings, balance, and value.
    - **PortfolioNFTs**: Show the NFTs the user holds.
    - **PortfolioTransactions**: Show the transaction history associated with the account.
    - **TimeframeFilters**: Buttons to filter the historical price graph by timeframes.
    - **Logs**: A simple table that displays the logs
3. **Custom Hooks:**

(this is non exhuastive list of hooks - if you need to implement any more, you should do so with complete autonomy)

Token Hooks: 
   - **useTokens:** Fetch all tokens.
   - **useToken:** Fetch a token.
   - **useTokenPrice:** Fetch token prices.
   - **useTokenInfo:** Fetch detailed token information.
   - **useTokenHistory:** Fetch historical price data for a specific token.
    - **useCreateToken**: Hook to create a new token in the database, invalidate the cache, and handle success/failure notifications.

Connection Hooks: 
   - **useWallet:** Manage wallet connection and state.

Portfolio Hooks: 
   - **usePortfolioBalance:** Fetch the user's portfolio balance based on their wallet address.
   - **useTokenHoldings:** Fetch specific token holdings in the user's portfolio.
   - **useTransactionHistory:** Fetch the transaction history for the wallet address.

Logger Hooks:
   - **useCreateAPILog**: Hook to create API logs for recording API calls.
    - **useAPILogs**: Hook to fetch and display API logs for monitoring purposes.

4. **Data Fetching:**
   - Use React Query for data fetching from the backend, using custom hooks. 
   - Log all API calls to the database within the onSuccess callback for each api call

- Sample custom hook
```typescript
"use client";

import { useQuery } from "react-query";
import { apiClient } from "./api-client";

export const useItems = () => {
  const query = useQuery("items", async () => {
    const endpoint = '/items/';
    const method = 'GET';

    const response = await apiClient.get(endpoint);
    return response.data.data;
  }, {
    onSuccess: () => {
     // LOG HERE
    }
  });

  return {
    items: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching
  };
};
```

#### Backend (Express)
1. **API Endpoints:**

(this is non exhuastive list of endpoints - if you need to implement any more, you should do so with complete autonomy)

   - **GET /api/token/** - Get all the tokens
   - **POST /api/token/** - Create a new token in the database.
   - **GET /api/token/:token/price** - Fetch current price for specified token.
   - **GET /api/token/:token/info** - Fetch detailed information for specified token.
   - **GET /api/token/:token/history:** - Fetch historical price data for specified token.
   - **GET /api/token/:token/stats/:timeFrame** -  Fetch the return stats for the specified timeframe (1m/1y/1w)
   - **GET /api/portfolio/:address** - Fetch portfolio balance and holdings for a given wallet address.
   - **GET /api/portfolio/:address/holdings** - Fetch specific token holdings.
   - **GET /api/portfolio/:address/nfts** - Fetch nfts for a given wallet address.
   - **GET /api/portfolio/:address/transactions** - Fetch transaction history for a given wallet address.
   - **GET /api/logger/** - Fetch all the logs.
   - **POST /api/logger/** - Create a new log entry in the db.

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
     └── .eslintrc.js
     ├── tsconfig.json
     └── package.json
     ```
3. **Blockchain Interaction:**

   - Use web3.js or ethers.js or wagmi to interact with the blockchain and fetch real-time data.

4. **Database:**

4.1 Create a Token model with the structure defined in `public/data/tokens.json` and use the json as the initial data for the model (seed the db using Prisma)

4.2 Use Prisma to log all API calls to a database in a non-blocking way.
Define the Prisma schema for logging API calls:

- Logger Model must contain the endpoint used, the timestamp (createdAt) and the method ("GET", "POST", etc.)
- The logger MUST BE CALLED IN THE CLIENT, NOT IN THE SERVER (as illustrated in the data fetching portion)
   
### Instructions
1. **Setup:**
   - **Client:** Initialize a Next.js project with the app router.
   - **Server:** Set up an Express server with TypeScript. (Use Nodemon for `npm run dev`)
2. **Frontend Implementation:**
   - Create the required pages and components.
   - Implement custom hooks for data fetching.
   - Integrate Web3 wallet connector for wallet login.
3. **Backend Implementation:**
   - Create the necessary API endpoints.
   - Implement services to fetch data from external APIs (e.g., CoinGecko) and blockchain.
   - Use the router-controller-service pattern, grouped by resource.
4. **Database:**
   - Implement a Token model and seed it with the initial data avaiable in `/public/data/tokens.json`
   - Implement a logger model that records every api call done througout the web app.
5. **Deployment:**
   - Provide working deployed link (Vercel for frontend, vercel for backend and any free service for db).

### Evaluation Criteria
1. **Functionality:** Completeness and correctness of the dashboard and portfolio features.
2. **Code Quality:** Clean, well-documented, and maintainable code. This also includes:
 - Regular git commits 
3. **Performance:** Efficient data fetching and rendering.
4. **User Experience:** Responsive design and smooth interactions.
5. **Blockchain Integration:** Correct and secure integration with the Web3 wallet and blockchain data.
6. **Architecture:** Proper use of the router-controller-service pattern, grouped by resource.

This challenge assesses your ability to build a full-stack application with real-time data fetching and blockchain integration. Good luck!
