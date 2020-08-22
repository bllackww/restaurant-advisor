const Express = require('express')
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose')
const cors = require('cors')

const { MainSchema } = require('./GraphQLSchemas')

const app = Express()
const PORT = 5000

app.use(cors())

mongoose
    .connect('mongodb://admin:password1@ds113923.mlab.com:13923/restaurant_advisor', { useNewUrlParser: true })
    .then(() => console.log('Connected to Mongo DB'))
    .catch(e => 'There was a problem connecting to Mongo DB')

app.use("/main", graphqlHTTP({ schema: MainSchema, graphiql: true }));

app.listen(PORT, (err) => {
    if (!err) {
        console.log(`Server up and running on port ${PORT}`)
    } else {
        console.log(err)
    }
})
