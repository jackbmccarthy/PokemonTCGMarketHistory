import { Optional } from "sequelize";
import { MarketChanges, PokemonCards } from "./database";
import getAllCardsOnDate from "./src/getAllCardsOnDate";
import getCountOfCardsOnDate from "./src/getCountOfCardsOnDate";
import getLatestTCGPlayerPriceDate from "./src/getLatestTCGPlayerDate";
import insertMarketData from "./src/insertMarketData";
import { PokemonCardType } from "./types/PokemondCard";
import { MarketChangesType } from "./types/MarketChanges";


async function comparePricesByDate(cardId: string, startDate: string, endDate: string) {

    // let [startCard, endCard] = await Promise.all([
    //     ,
        
    // ])

    const startCard = await PokemonCards.findOne(({
            where: <PokemonCardType>{
                cardid: cardId,
                tcgplayerpricedate: startDate,
            }
        }))

        const endCard = await PokemonCards.findOne(({
            where: <PokemonCardType>{
                cardid: cardId,
                tcgplayerpricedate: endDate,
            }
        }))

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

        // console.log(holoPriceChange, holoPriceChange && holoPriceChange < 0)
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
            isHoloPriceChangePositive: holoPriceChange && holoPriceChange < 0 ? true : false,
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



async function getMarketAdjustments(cardId: string, latestDate:Date|string = new Date(new Date().setHours(0, 0, 0, 0))) {
    //const today = new Date(new Date().setHours(0, 0, 0, 0))
    const today = new Date(latestDate)
    const yesterday = new Date(new Date(new Date().setHours(0, 0, 0, 0)).setDate(today.getDate() - 1))
    const dayBeforeyesterday = new Date(new Date(new Date().setHours(0, 0, 0, 0)).setDate(today.getDate() - 2))
    const sevenDaysAgo = new Date(new Date(new Date().setHours(0, 0, 0, 0)).setDate(today.getDate() - 7))
    const eightDaysAgo = new Date(new Date(new Date().setHours(0, 0, 0, 0)).setDate(today.getDate() - 8))
    const thirtyDaysAgo = new Date(new Date(new Date().setHours(0, 0, 0, 0)).setDate(today.getDate() - 30))
    const thirtyOneDaysAgo = new Date(new Date(new Date().setHours(0, 0, 0, 0)).setDate(today.getDate() - 31))
    //console.log(today, yesterday)
    //console.log(comparePricesByDate("sv4pt5-186", "2024-05-08", "2024-05-09"))
    // Get 1 day difference

    let [market1, market7, market30] = [
        await comparePricesByDate(cardId, yesterday.toISOString(), today.toISOString()), 
        await comparePricesByDate(cardId, sevenDaysAgo.toISOString(), today.toISOString()),
        await comparePricesByDate(cardId, thirtyDaysAgo.toISOString(), today.toISOString())
    ]

 
    if (!market1) {
        market1 = await comparePricesByDate(cardId, dayBeforeyesterday.toISOString(), today.toISOString())
    }
  
    if (!market7) {
        market7 = await comparePricesByDate(cardId, eightDaysAgo.toISOString(), today.toISOString())
    }

    if (!market30) {
        market30 = await comparePricesByDate(cardId, thirtyOneDaysAgo.toISOString(), today.toISOString())
    }
    //const yesterday
    //Get 7 day Difference
    // let [market1, market7, market30] = await Promise.all([

    //     ,

    // ])

    const marketMovement = {
        "1": market1,
        "7": market7,
        "30": market30
    }
    //console.log(marketMovement)

    return marketMovement
}


async function runMarketWatcher() {
    let latestDate = await getLatestTCGPlayerPriceDate()
    console.log("Processing cards on date", latestDate)
    if (typeof latestDate === "string") {
        const cardCount = await getCountOfCardsOnDate(latestDate)
        console.log("There are this many cards for this day", cardCount)
        if (cardCount > 0) {
            const cardIDList = await getAllCardsOnDate(latestDate)
            console.log("The length of the list of cards",cardIDList.length)
            for (const cardid of cardIDList) {
                await insertMarketData(await getMarketAdjustments(cardid["cardid"]))
            }
            // let changes = await Promise.all([...cardIDList.map(async (cardid)=>{
            //     console.log("processing", cardid["cardid"])
            //     return  

            // })])
            // let newChanges = changes.filter((change)=>{
            //     return change ? true :false
            // })
            // let thenewChanges = newChanges.map((change)=>{
            //     return {...change}
            // })
            // console.log("loading all changes to db")
            // console.log(thenewChanges)
            //await MarketChanges.bulkCreate(thenewChanges)
           
        }
    }

}



runMarketWatcher()