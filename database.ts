import { Sequelize, DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'pokemon.sqlite'
});
export const PokemonCards = sequelize.define('PokemonCards', {
    carduuid: DataTypes.UUIDV4,
    cardid: DataTypes.STRING,
    name: DataTypes.STRING,
    supertype: DataTypes.STRING,
    artist: DataTypes.STRING,
    rarity: DataTypes.STRING,
    regulationmark: DataTypes.STRING,
    imageurl: DataTypes.TEXT,
    tcgplayerurl: DataTypes.TEXT,
    tcgplayerpricedate: DataTypes.DATE,
    tcgplayernormalprice: DataTypes.FLOAT,
    tcgplayerreverseholoprice: DataTypes.FLOAT,
    tcgplayerholofoilprice: DataTypes.FLOAT
});

sequelize.sync()