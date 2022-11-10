require('dotenv').config();
const { CONNECTION_STRING } = process.env;

const Sequelize = require('sequelize');
const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

module.exports = {
    seed: (req, res) => {
        sequelize.query(`

        DROP TABLE IF EXISTS adventures;
        DROP TABLE IF EXISTS countries;

        CREATE TABLE countries (
            country_id SERIAL PRIMARY KEY,
            country_name VARCHAR
        );

        CREATE TABLE adventures (
            adventure_id SERIAL PRIMARY KEY,
            adventure_name VARCHAR(50) NOT NULL,
            adventure_cost VARCHAR(20),
            description VARCHAR(1500) NOT NULL,
            country_id INTEGER REFERENCES countries(country_id)
        );

        INSERT INTO countries (country_name) 
        values ('Netherlands'),
        ('Spain'),
        ('France'),
        ('Indonesia'),
        ('England'),
        ('Argentina');

        `).then(() => {
            console.log('Database seeded')
            res.sendStatus(200)
        }).catch(err => console.log('Error seeding database', err))
    },

    getCountries: (req, res) => {
        sequelize.query(`
        SELECT * FROM countries;
        `)
        .then((dbRes) => {
            res.status(200).send(dbRes[0])
        })
        .catch((err) => {
            console.log(err)
        })
    },

    submitAdventure: (req, res) => {

        const { countryId, adventureName, adventureCost, adventureDescription } = req.body

        sequelize.query(`
        INSERT INTO adventures 
        (adventure_name, adventure_cost, description, country_id)
        VALUES
        ('${adventureName}', '${adventureCost}', '${adventureDescription}', ${countryId});
        `)
        .then((dbRes) => {
            res.status(200).send(dbRes[0])
        })
        .catch(err => console.log('Error submitting adventure', err))
    },

    getAdventure: (req, res) => {

        const { countryid } = req.params

        sequelize.query(`
        SELECT adventures.adventure_name AS adventure, adventures.adventure_cost, adventures.description, countries.country_name as country
        FROM adventures
        JOIN countries
        ON adventures.country_id = countries.country_id
        WHERE adventures.country_id = ${countryid}
        ORDER BY RANDOM()
        LIMIT 1;
        `)
        .then((dbRes) => {
            res.status(200).send(dbRes[0])
        })
        .catch(err => console.log('Error retrieving random adventure', err))
    }

}
