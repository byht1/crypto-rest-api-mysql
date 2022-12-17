export interface ICoinmarketcap {
  status: Status;
  data: Datum[];
}

interface Datum {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  num_market_pairs: number;
  date_added: Date;
  tags: string[];
  max_supply: number | null;
  circulating_supply: number;
  total_supply: number;
  platform: Platform | null;
  cmc_rank: number;
  self_reported_circulating_supply: number | null;
  self_reported_market_cap: number | null;
  tvl_ratio: number | null;
  last_updated: Date;
  quote: Quote;
}

interface Platform {
  id: number;
  name: Name;
  symbol: Symbol;
  slug: Slug;
  token_address: string;
}

enum Name {
  Aptos = "Aptos",
  Arbitrum = "Arbitrum",
  Bnb = "BNB",
  Ethereum = "Ethereum",
  TRON = "TRON",
}

enum Slug {
  Aptos = "aptos",
  ArbitrumEthereum = "arbitrum-ethereum",
  Bnb = "bnb",
  Ethereum = "ethereum",
  TRON = "tron",
}

enum Symbol {
  Apt = "APT",
  Arbitrum = "ARBITRUM",
  Bnb = "BNB",
  Eth = "ETH",
  Trx = "TRX",
}

interface Quote {
  USD: Usd;
}

interface Usd {
  price: number;
  volume_24h: number;
  volume_change_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_60d: number;
  percent_change_90d: number;
  market_cap: number;
  market_cap_dominance: number;
  fully_diluted_market_cap: number;
  tvl: number | null;
  last_updated: Date;
}

interface Status {
  timestamp: Date;
  error_code: number;
  error_message: null;
  elapsed: number;
  credit_count: number;
  notice: null;
  total_count: number;
}
