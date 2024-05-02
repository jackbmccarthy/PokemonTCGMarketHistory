import { PokemonCards } from "../database";
import { PokemonCardType } from "../types/PokemondCard";


export default async function insertPokemonCardToDatabase(pokemonCard:PokemonCardType){


    const cardExistsCount = await PokemonCards.count({
        where: {
            cardid:pokemonCard.cardid,
            tcgplayerpricedate: typeof pokemonCard.tcgplayerpricedate === "undefined" ? null : pokemonCard.tcgplayerpricedate
        }
    })
    if(cardExistsCount === 0 ){
       await  PokemonCards.create(pokemonCard)
    }
    else{
        console.log("card exists:", pokemonCard.cardid)
    }
}