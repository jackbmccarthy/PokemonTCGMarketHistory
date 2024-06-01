import { Op } from "sequelize";
import { PokemonCards } from "../database";


export default async function getLatestTCGPlayerPriceDate(){
    let maxPriceDate = await PokemonCards.findOne({
        limit: 1,
        attributes:["tcgplayerpricedate"],
        where:{
            tcgplayerpricedate:{[Op.ne]: null}
        },
        order:[["tcgplayerpricedate", "desc"]],
        logging:true
    })
    let result = <Date>maxPriceDate?.get("tcgplayerpricedate")
    return new Date(result).toISOString()
   //console.log(maxPriceDate?.toJSON())
}