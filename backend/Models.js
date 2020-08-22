const mongoose = require('mongoose')

const {
    GraphQLID,
    GraphQLString,
    GraphQLObjectType,
    GraphQLList,
    GraphQLInt,
} = require('graphql')
const GraphQLDate = require('graphql-date')

const UserModel = mongoose.model('user', {
    id: String,
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
    id: String,
    nume: String,
    judet: String,
    oras: String,
    adresa: String,
}, 'restaurant')

const RestaurantRequestModel = mongoose.model('restaurant_request', {
    id: String,
    nume: String,
    judet: String,
    oras: String,
    adresa: String,
}, 'restaurant_request')

const ReviewModel = mongoose.model('review', {
    user_id: String,
    restaurant_id: String,
    message: String,
    stars: Number,
}, 'review')

const BookingModel = mongoose.model('booking', {
    user_id: String,
    restaurant_id: String,
    data_si_ora: Date,
    durata_ore: Number,
}, 'booking')

const ReviewType = new GraphQLObjectType({
    name: 'Review',
    fields: {
        restaurant_id: { type: GraphQLID },
        user_id: { type: GraphQLID },
        message: { type: GraphQLString },
        stars: { type: GraphQLInt },
    }
})

const BookingType = new GraphQLObjectType({
    name: 'Booking',
    fields: {
        restaurant_id: { type: GraphQLID },
        user_id: { type: GraphQLID },
        data_si_ora: { type: GraphQLDate },
        durata_ore: { type: GraphQLInt },
    }
})


const UserType = new GraphQLObjectType({
    name: 'user',
    fields: {
        id: { type: GraphQLID },
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

const RestaurantType = new GraphQLObjectType({
    name: 'restaurant',
    fields: {
        id: { type: GraphQLID },
        nume: { type: GraphQLString },
        judet: { type: GraphQLString },
        oras: { type: GraphQLString },
        adresa: { type: GraphQLString },
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
        id: { type: GraphQLID },
        nume: { type: GraphQLString },
        judet: { type: GraphQLString },
        oras: { type: GraphQLString },
        adresa: { type: GraphQLString },
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
}