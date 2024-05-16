import { PokemonCards } from "../database";


export default async function getCountOfCardsOnDate(date:string){
    let result = await PokemonCards.count({
        where:{
            tcgplayerpricedate:date
        }
    })
    return result
   //console.log(maxPriceDate?.toJSON())
}