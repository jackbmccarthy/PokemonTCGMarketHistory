import { Card } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { v4 as uuidv4 } from 'uuid';
import { TCGCard } from "../types/TCGCard";
import { PokemonCardType } from "../types/PokemondCard";
export default function extractCardData(card:TCGCard){
    let pokemonCard:PokemonCardType = {
        carduuid:uuidv4(),
        artist: card.artist,
        supertype: card.supertype,
        tcgplayerholofoilprice:card.tcgplayer?.prices?.holofoil?.market,
        tcgplayernormalprice:card.tcgplayer?.prices?.normal?.market,
        tcgplayerpricedate: card.tcgplayer?.updatedAt,
        tcgplayerreverseholoprice:card.tcgplayer?.prices?.reverseHolofoil?.market,
        name:card.name,
        cardid:card.id,
        imageurl:card?.images?.large,
        regulationmark:card.regulationMark,
        rarity:card.rarity,
        tcgplayerurl:card.tcgplayer?.url
    }
    return pokemonCard


    
    
}
