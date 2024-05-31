import { Sequelize, DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'pokemon.sqlite', 
    logging:true
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

export const MarketChanges = sequelize.define('MarketChanges', {
    marketchangeuuid:DataTypes.UUIDV4,
    pricedate:DataTypes.DATE,
    cardid: DataTypes.STRING,
    cardtype:DataTypes.STRING,
    startcarduuid1: DataTypes.UUIDV4,
    endcarduuid1:DataTypes.UUIDV4,
    startcarduuid7: DataTypes.UUIDV4,
    endcarduuid7:DataTypes.UUIDV4,
    startcarduuid30: DataTypes.UUIDV4,
    endcarduuid30:DataTypes.UUIDV4,
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