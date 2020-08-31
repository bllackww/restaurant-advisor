const mongoose = require('mongoose')

const {
    GraphQLInt,
    GraphQLString,
    GraphQLObjectType,
    GraphQLList,
    GraphQLInputObjectType,
} = require('graphql')
const GraphQLDate = require('graphql-date')
const { GraphQLBoolean } = require('graphql')

const UserModel = mongoose.model('user', {
    id: Number,
    nume: String,
    prenume: String,
    judet: String,
    oras: String,
    adresa: String,
    data_nasterii: Date,
    email: { type: String, unique: true },
    parola: String,
    tip_cont: String,
}, 'user')

const RestaurantModel = mongoose.model('restaurant', {
    id: Number,
    nume: String,
    judet: String,
    oras: String,
    adresa: String,
    mese: [{ id: Number, selected: Boolean, numar_locuri: Number }],
    imagini: [String]
}, 'restaurant')

const RestaurantRequestModel = mongoose.model('restaurant_request', {
    id: Number,
    nume: String,
    judet: String,
    oras: String,
    adresa: String,
    mese: [{ id: Number, selected: Boolean, numar_locuri: Number }],
}, 'restaurant_request')

const ReviewModel = mongoose.model('review', {
    user_id: Number,
    restaurant_id: Number,
    message: String,
    stars: Number,
}, 'review')

const BookingModel = mongoose.model('booking', {
    user_id: Number,
    restaurant_id: Number,
    data_si_ora: Date,
    durata_ore: Number,
}, 'booking')

const ReviewType = new GraphQLObjectType({
    name: 'Review',
    fields: {
        restaurant_id: { type: GraphQLInt },
        user_id: { type: GraphQLInt },
        message: { type: GraphQLString },
        stars: { type: GraphQLInt },
    }
})

const BookingType = new GraphQLObjectType({
    name: 'Booking',
    fields: {
        restaurant_id: { type: GraphQLInt },
        user_id: { type: GraphQLInt },
        data_si_ora: { type: GraphQLDate },
        durata_ore: { type: GraphQLInt },
    }
})


const UserType = new GraphQLObjectType({
    name: 'user',
    fields: {
        id: { type: GraphQLInt },
        nume: { type: GraphQLString },
        prenume: { type: GraphQLString },
        judet: { type: GraphQLString },
        oras: { type: GraphQLString },
        adresa: { type: GraphQLString },
        data_nasterii: { type: GraphQLDate },
        email: { type: GraphQLString },
        parola: { type: GraphQLString },
        tip_cont: { type: GraphQLString },
        reviews: {
            type: GraphQLList(ReviewType),
            resolve(parent, args) {
                return ReviewModel.find({ user_id: parent.id })
            }
        },
        rezervari: {
            type: GraphQLList(BookingType),
            resolve(parent, args) {
                return BookingModel.find({ user_id: parent.id })
            },
        },
    }
})

const TableType = new GraphQLObjectType({
    name: 'table',
    fields: {
        id: { type: GraphQLInt },
        selected: { type: GraphQLBoolean },
        numar_locuri: { type: GraphQLInt },
    }
})

const TableInputType = new GraphQLInputObjectType({
    name: 'table_input',
    fields: {
        id: { type: GraphQLInt },
        selected: { type: GraphQLBoolean },
        numar_locuri: { type: GraphQLInt },
    }
})

const RestaurantType = new GraphQLObjectType({
    name: 'restaurant',
    fields: {
        id: { type: GraphQLInt },
        nume: { type: GraphQLString },
        judet: { type: GraphQLString },
        oras: { type: GraphQLString },
        adresa: { type: GraphQLString },
        mese: { type: GraphQLList(TableType) },
        imagini: { type: GraphQLList(GraphQLString) },
        reviews: {
            type: GraphQLList(ReviewType),
            resolve(parent, args) {
                return ReviewModel.find({ restaurant_id: parent.id })
            },
        },
        rezervari: {
            type: GraphQLList(BookingType),
            resolve(parent, args) {
                return ReviewModel.find({ restaurant_id: parent.id })
            },
        },
    }
})

const RestaurantRequestType = new GraphQLObjectType({
    name: 'restaurant_request',
    fields: {
        id: { type: GraphQLInt },
        nume: { type: GraphQLString },
        judet: { type: GraphQLString },
        oras: { type: GraphQLString },
        adresa: { type: GraphQLString },
        mese: { type: GraphQLList(TableType) },
    }
})


module.exports = {
    UserModel,
    UserType,
    RestaurantModel,
    RestaurantType,
    ReviewModel,
    ReviewType,
    BookingModel,
    BookingType,
    RestaurantRequestModel,
    RestaurantRequestType,
    TableType,
    TableInputType,
}