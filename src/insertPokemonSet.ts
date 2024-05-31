import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import { PokemonCards, PokemonSets } from "../database";
import { PokemonCardType } from "../types/PokemondCard";


export default async function insertPokemonSetToDatabase(pokemonSet:PokemonTCG.Set){
    
//console.log(pokemonSet)
    const cardExistsCount = await PokemonSets.count({
        where: {
            setid : pokemonSet.id
        }
    })
    if(cardExistsCount === 0 ){
       await  PokemonSets.create({
        setid: pokemonSet.id,
        setname:pokemonSet.name,
        setlogourl:pokemonSet.images.logo,
        setsymbolurl:pokemonSet.images.symbol,
        setreleasedate:pokemonSet.releaseDate
       })
    }
    else{
        console.log("set exists:", pokemonSet.id)
    }
}