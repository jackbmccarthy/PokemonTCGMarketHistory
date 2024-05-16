import { PokemonCards } from "../database";


export default async function getLatestTCGPlayerPriceDate(){
    let maxPriceDate = await PokemonCards.findOne({
        limit: 1,
        attributes:["tcgplayerpricedate"],
        order:[["tcgplayerpricedate", "desc"]]
    })
    let result = <Date>maxPriceDate?.get("tcgplayerpricedate")
    return result.toISOString()
   //console.log(maxPriceDate?.toJSON())
}