export type PokemonCardType = {
    carduuid: string,
    cardid: string,
    name: string,
    supertype: string,
    artist: string| null |undefined,
    rarity: string,
    regulationmark: string | null |undefined,
    imageurl: string,
    tcgplayerurl: string| null |undefined,
    tcgplayerpricedate: string| null |undefined,
    tcgplayernormalprice: number| null |undefined,
    tcgplayerreverseholoprice: number| null |undefined,
    tcgplayerholofoilprice:number| null |undefined
}