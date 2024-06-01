import { Sequelize, DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
require('@dotenvx/dotenvx').config()

const sequelize = new Sequelize({
    dialect: 'postgres',
    host:process.env.SQL_HOST,
   // storage: 'pokemon.sqlite', 
    database:"Pokemon",
    username:process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD,
    logging:false
});
export const PokemonCards = sequelize.define('PokemonCards', {
    carduuid: DataTypes.UUID,
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

export const MarketChanges = sequelize.define('MarketChanges', {
    marketchangeuuid:DataTypes.UUID,
    pricedate:DataTypes.DATE,
    cardid: DataTypes.STRING,
    cardtype:DataTypes.STRING,
    startcarduuid1: DataTypes.UUID,
    endcarduuid1:DataTypes.UUID,
    startcarduuid7: DataTypes.UUID,
    endcarduuid7:DataTypes.UUID,
    startcarduuid30: DataTypes.UUID,
    endcarduuid30:DataTypes.UUID,
    pricechangedollars1: DataTypes.FLOAT,
    pricechangepercent1: DataTypes.FLOAT,
    pricechangedollars7: DataTypes.FLOAT,
    pricechangepercent7: DataTypes.FLOAT,
    pricechangedollars30: DataTypes.FLOAT,
    pricechangepercent30: DataTypes.FLOAT,
    
    
});

export const PokemonSets = sequelize.define('PokemonSets', {
    setkey: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
      },
      setid: {
        type: DataTypes.STRING,
        allowNull: false
      },
      setname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      setlogourl: {
        type: DataTypes.STRING,
        allowNull: false
      },
      setsymbolurl: {
        type: DataTypes.STRING,
        allowNull: false
      },
      setreleasedate: {
        type: DataTypes.DATE,
        allowNull: false
      }
  }, {
    timestamps: true,
    paranoid: true,
    freezeTableName: true,

  });

sequelize.sync()