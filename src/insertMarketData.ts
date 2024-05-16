import { v4 as uuidv4 } from 'uuid';

import { PokemonCardType } from "../types/PokemondCard";
import { DailyMarketData, MarketChangesType } from '../types/MarketChanges';
import { MarketChanges } from '../database';
export default async function insertMarketData(dailyMarketData: DailyMarketData) {
    const isHolo = dailyMarketData[1]?.isHolo

    let marketChanges = <MarketChangesType>{}
    
    if (isHolo) {
        marketChanges.cardtype = "holo"

            let data = dailyMarketData[1]
            marketChanges.cardid = dailyMarketData[1]?.start.cardid
            marketChanges.pricedate = dailyMarketData[1]?.end.tcgplayerpricedate

            if (data && data.holoPriceChange && data.holoPriceChangePercent) {
                marketChanges.startcarduuid1 = data.start.carduuid
                marketChanges.endcarduuid1 = data.end.carduuid
                console.log(data.isHoloPriceChangePositive, data.holoPriceChange)
                marketChanges.pricechangedollars1 = -1 * data.holoPriceChange
                marketChanges.pricechangepercent1 = -1 * parseFloat(data.holoPriceChangePercent)
            }

            data = dailyMarketData[7]
            if (data && data.holoPriceChange && data.holoPriceChangePercent) {
                marketChanges.startcarduuid7 = data.start.carduuid
                marketChanges.endcarduuid7 = data.end.carduuid
                marketChanges.pricechangedollars7 = -1 * data.holoPriceChange
                marketChanges.pricechangepercent7 = -1 * parseFloat(data.holoPriceChangePercent)
            }

            data = dailyMarketData[30]
            if (data && data.holoPriceChange && data.holoPriceChangePercent) {
                marketChanges.startcarduuid30 = data.start.carduuid
                marketChanges.endcarduuid30 = data.end.carduuid
                marketChanges.pricechangedollars30 = -1 * data.holoPriceChange
                marketChanges.pricechangepercent30 = -1 * parseFloat(data.holoPriceChangePercent)
            }

            
            const insertedChanges = await MarketChanges.create(marketChanges)
            //console.log(insertedChanges.toJSON())
            return insertedChanges
        
    }

    





}