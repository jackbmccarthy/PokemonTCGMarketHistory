import { PokemonCards } from "./database";
import getAllCardsOnDate from "./src/getAllCardsOnDate";
import getCountOfCardsOnDate from "./src/getCountOfCardsOnDate";
import getLatestTCGPlayerPriceDate from "./src/getLatestTCGPlayerDate";
import insertMarketData from "./src/insertMarketData";
import { PokemonCardType } from "./types/PokemondCard";


async function comparePricesByDate(cardId: string, startDate: string, endDate: string) {
  
    let [startCard, endCard] = await Promise.all([
        PokemonCards.findOne(({
            where: <PokemonCardType>{
                cardid: cardId,
                tcgplayerpricedate: startDate,
            }
        })),
        PokemonCards.findOne(({
            where: <PokemonCardType>{
                cardid: cardId,
                tcgplayerpricedate: endDate,
            }
        }))
    ])

    let startJSON = startCard?.toJSON<PokemonCardType>()
    let endJSON = endCard?.toJSON<PokemonCardType>()
    //console.log(startJSON, endJSON)
    if (startJSON && endJSON) {
        const isHolo = startJSON?.tcgplayerholofoilprice ? true : false
        const isRevHolo = startJSON?.tcgplayerreverseholoprice ? true : false
        const isNonHolo = startJSON?.tcgplayernormalprice ? true : false

        let holoPriceChange = isHolo && startJSON?.tcgplayerholofoilprice && endJSON?.tcgplayerholofoilprice ? startJSON?.tcgplayerholofoilprice - endJSON?.tcgplayerholofoilprice : null
        let revHoloPriceChange = isRevHolo && startJSON?.tcgplayerreverseholoprice && endJSON?.tcgplayerreverseholoprice ? startJSON?.tcgplayerreverseholoprice - endJSON?.tcgplayerreverseholoprice : null
        let nonHoloPriceChange = isNonHolo && startJSON?.tcgplayernormalprice && endJSON?.tcgplayernormalprice ? startJSON?.tcgplayernormalprice - endJSON?.tcgplayernormalprice : null

        console.log(holoPriceChange, holoPriceChange && holoPriceChange < 0 ) 
        const cardPricing = {
            isHolo: isHolo,
            isRevHolo: isRevHolo,
            isNonHolo: isNonHolo,
            holoPriceChange: holoPriceChange,
            revHoloPriceChange: revHoloPriceChange,
            nonHoloPriceChange: nonHoloPriceChange,
            holoPriceChangePercent: holoPriceChange && startJSON?.tcgplayerholofoilprice ? (holoPriceChange / startJSON?.tcgplayerholofoilprice * 100).toFixed(2) : null,
            revHoloPriceChangePercent: revHoloPriceChange && startJSON?.tcgplayerreverseholoprice ? (revHoloPriceChange / startJSON?.tcgplayerreverseholoprice * 100).toFixed(2) : null,
            nonHoloPriceChangePercent: nonHoloPriceChange && startJSON?.tcgplayernormalprice ? (nonHoloPriceChange / startJSON?.tcgplayernormalprice * 100).toFixed(2) : null,
            isHoloPriceChangePositive: holoPriceChange && holoPriceChange < 0 ?  true : false,
            isRevHoloPriceChangePositive: revHoloPriceChange && revHoloPriceChange < 0 ? true : false,
            isNonHoloPriceChangePositive: nonHoloPriceChange && nonHoloPriceChange < 0 ? true : false,
            start: startJSON,
            end: endJSON,
        }
        // console.log(cardPricing)
        return cardPricing
    }
    else {
        return null
    }

}



async function getMarketAdjustments(cardId: string) {
    const today = new Date(new Date().setHours(0, 0, 0, 0))
    const yesterday = new Date(new Date(new Date().setHours(0, 0, 0, 0)).setDate(new Date().getDate() - 1))
    const sevenDaysAgo = new Date(new Date(new Date().setHours(0, 0, 0, 0)).setDate(new Date().getDate() - 7))
    const thirtyDaysAgo = new Date(new Date(new Date().setHours(0, 0, 0, 0)).setDate(new Date().getDate() - 30))
    console.log(today, yesterday)
    //console.log(comparePricesByDate("sv4pt5-186", "2024-05-08", "2024-05-09"))
    // Get 1 day difference
    //const yesterday
    //Get 7 day Difference
    let [market1, market7, market30] = await Promise.all([
        comparePricesByDate(cardId, yesterday.toISOString(), today.toISOString()),
        comparePricesByDate(cardId, sevenDaysAgo.toISOString(), today.toISOString()),
        comparePricesByDate(cardId, thirtyDaysAgo.toISOString(), today.toISOString())
    ])

    const marketMovement = {
        "1": market1 ,
        "7": market7 ,
        "30": market30 
    }
    //console.log(marketMovement)

    return marketMovement
}


async function runMarketWatcher() {
    let latestDate = await getLatestTCGPlayerPriceDate()
    if (typeof latestDate === "string") {
        const cardCount = await getCountOfCardsOnDate(latestDate)
        if (cardCount > 0) {
            const cardIDList = await getAllCardsOnDate(latestDate)
            Promise.all(cardIDList.map(async ({ cardid }) => {
                return insertMarketData(await getMarketAdjustments(cardid))
            }))
        }
    }

   

    // console.log(typeof latestDate)
    // if(typeof latestDate ==="string"){
    //    await getCountOfCardsOnDate("2024-05-09")
    // }


}
//console.log(comparePricesByDate("sv4pt5-186", "2024-05-08", "2024-05-09"))
// async function test(){
//    insertMarketData(await getMarketAdjustments("sv5-157"))
//  insertMarketData(await getMarketAdjustments("sv1-212")) 
// }
// test()
 

runMarketWatcher()