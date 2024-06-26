import { Op } from "sequelize";
import { PokemonCards } from "../database";


export default async function getAllCardsOnDate(date:string){
    let result = await PokemonCards.findAll({
        attributes: ["cardid"],
        where:{
            tcgplayerpricedate:date,
            tcgplayerholofoilprice:{[Op.ne]:null}
        },
        group:["cardid"]
    })
    if(result.length > 0 ){
        return result.map((card)=>{
       return  card.toJSON()
    })
    }
    else{
        return []
    }
}