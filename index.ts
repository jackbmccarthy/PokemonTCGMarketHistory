import extractCardData from "./src/extractCardData"
import getCardsInSet from "./src/getCardsInSet"
import getSets from "./src/getSets"
import insertPokemonCardToDatabase from "./src/insertPokemonCardToDatabase"
import { SupportedSeries } from "./types/Series"
require('@dotenvx/dotenvx').config()
const seriesList = <SupportedSeries[]>["Sun & Moon", "Sword & Shield", "Scarlet & Violet"]

async function downloadCardInfo(seriesName: SupportedSeries) {
    const setsInSeries = await getSets(seriesName)
    for (const cardSet of setsInSeries) {
        console.log(cardSet.name, cardSet.printedTotal, cardSet.total)
        const cardsInSet = await getCardsInSet(cardSet.id, cardSet.total)

        for (const card of cardsInSet) {
            console.log(card)
            const pokemonCard = extractCardData(card)
            await insertPokemonCardToDatabase(pokemonCard)
        }

    }
}


async function main() {
    for (const seriesName of seriesList) {
        await downloadCardInfo(seriesName)
    }
}

main()