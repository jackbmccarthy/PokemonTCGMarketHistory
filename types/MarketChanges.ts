import { PokemonCardType } from "./PokemondCard"

export type MarketChangesType = {
  
        cardid?: string,
        pricedate?:string |  null,
        cardtype:CardType,
        startcarduuid1: string,
        endcarduuid1:string,
        startcarduuid7: string,
        endcarduuid7:string,
        startcarduuid30: string,
        endcarduuid30:string,
        pricechangedollars1: number,
        pricechangepercent1: number,
        pricechangedollars7: number,
        pricechangepercent7: number,
        pricechangedollars30: number,
        pricechangepercent30: number,
       
}

export type CardType = "holo" | "revHolo" | "nonHolo"

export type ProcessedMarketData = {
    isHolo: boolean,
    isRevHolo: boolean,
    isNonHolo: boolean,
    holoPriceChange:  number | null,
    revHoloPriceChange: number | null,
    nonHoloPriceChange: number | null,
    holoPriceChangePercent: string | null,
    revHoloPriceChangePercent: string | null,
    nonHoloPriceChangePercent: string | null,
    isHoloPriceChangePositive: boolean,
    isRevHoloPriceChangePositive: boolean,
    isNonHoloPriceChangePositive: boolean,
    end: PokemonCardType,
    start: PokemonCardType
}

export type DailyMarketData = {
    "1": ProcessedMarketData | null,
    "7": ProcessedMarketData | null,
    "30": ProcessedMarketData | null
}