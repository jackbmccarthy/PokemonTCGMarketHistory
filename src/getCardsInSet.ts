import { PokemonTCG } from 'pokemon-tcg-sdk-typescript'
import { TCGCard } from '../types/TCGCard'
import { Card } from 'pokemon-tcg-sdk-typescript/dist/sdk'

export default async function getCardsInSet(setId:string, cardTotal:number){

    let query = "set.id:"+setId
    const numberOfPages = Math.ceil(cardTotal/250)
    let cardList:PokemonTCG.Card[] = []
    for (let index = 0; index < numberOfPages; index++) {
       const pageCards = await PokemonTCG.findCardsByQueries({q:query, page:index+1 })
        for (const card of pageCards) {
            cardList.push(card)
        }
    }
  
    return cardList as TCGCard[]
    
}

