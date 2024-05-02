# Pokemon TCG Market History

This project is used to utilize the Pokemon TCG api to grab daily prices of all the pokemon cards in a set, and storing the data in a sqlite database for it to be used for market watch applications.

This project is pretty limited in scope, so the current limitations are:

    1. Only gathers data for Sun and Moon, Sword & Shield, and Scarlet & Violet generations/series.
    2. There is no historical database, if you run this script on a daily basis, your data will start at the first date you ran it.

## .env File

If you do not have an API key for the [Pokemon TCG API](https://pokemontcg.io/), please [sign up](https://dev.pokemontcg.io/) for an account and get your API key.

Once you have the api key, inside your **.env** file, add this line.
```
POKEMONTCG_API_KEY=<YOUR API KEY>
```

## Run the script

```
npm start
```