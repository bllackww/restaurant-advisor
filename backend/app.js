const fs = require('fs')
const Express = require('express')
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose')
const cors = require('cors')
const { MainSchema } = require('./GraphQLSchemas')
const { RestaurantModel } = require('./Models')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: './images',
    filename: function (req, file, cb) {
        cb(null, `${req.params.id}_${file.originalname}`)
    }
})

const upload = multer({ storage: storage }).array('files', 100)



const app = Express()
const PORT = 5000

app.use(cors())

mongoose
    .connect('mongodb://admin:password1@ds113923.mlab.com:13923/restaurant_advisor', { useNewUrlParser: true })
    .then(() => console.log('Connected to Mongo DB'))
    .catch(e => 'There was a problem connecting to Mongo DB')

app.use("/main", graphqlHTTP({ schema: MainSchema, graphiql: true }));

app.post('/upload-images/:id', upload, async (req, res, next) => {
    const restaurant = await RestaurantModel.findOneAndUpdate({ id: req.params.id }, { imagini: req.files.map(f => f.filename) })
    res.send('ok')
})

app.get('/image/:id', async (req, res, next) => {
    if (fs.existsSync(`./images/${req.params.id}`)) {
        const img = fs.createReadStream(`./images/${req.params.id}`)
        img.pipe(res)
    } else {
        res.send('ok')
    }
})

app.listen(PORT, (err) => {
    if (!err) {
        console.log(`Server up and running on port ${PORT}`)
    } else {
        console.log(err)
    }
})
