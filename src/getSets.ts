import { PokemonTCG } from 'pokemon-tcg-sdk-typescript'
import { SupportedSeries } from '../types/Series';
export default async function getSets(seriesName:SupportedSeries){
    let allSets = await PokemonTCG.getAllSets()
    
    let mySet =  allSets.filter( (element) => {
        return seriesName === element.series
    });
    return mySet
}