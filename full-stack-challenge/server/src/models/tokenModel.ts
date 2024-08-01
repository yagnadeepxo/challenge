class TokenModel {
    walletBalance: string;
    symbol: string;
    token_address: string;
    calculatedBalance: number;
    usdPrice: number;

    constructor(tokenBalance: any, tokenPrice: any) {
        this.walletBalance = tokenBalance.balance;
        this.symbol = tokenBalance.symbol;
        this.token_address = tokenBalance.token_address;
        this.calculatedBalance = Number(
            (Number(tokenBalance.balance) / 10 ** tokenBalance.decimals).toFixed(4)
        );
        this.usdPrice = tokenPrice.usdPrice;
    }
}

export default TokenModel;