const { UserModel, UserType, RestaurantType, RestaurantModel, RestaurantRequestModel, RestaurantRequestType, TableType, TableInputType, ReviewType, ReviewModel } = require('./Models.js')

const {
    GraphQLInt,
    GraphQLObjectType,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLString,
} = require('graphql')
const GraphQLDate = require('graphql-date')

const bcrypt = require('bcrypt')

const generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

const validPassword = (password, storedPassword) => {
    return bcrypt.compareSync(password, storedPassword);
}

const MainSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields: {
            users: {
                type: GraphQLList(UserType),
                resolve: (root, args, context, info) => {
                    return UserModel.find().exec();
                }
            },
            restaurants: {
                type: GraphQLList(RestaurantType),
                args: {
                    search_text: { type: GraphQLString },
                    judet: { type: GraphQLString },
                },
                resolve: (root, args, context, info) => {
                    const search_text = args.search_text || ''
                    const search_texts = search_text.split(' ')
                    const searchRegexps = search_texts.reduce((acc, text) => {
                        acc.push({ judet: { $regex: new RegExp(`.*${text}.*`, 'i') } })
                        acc.push({ nume: { $regex: new RegExp(`.*${text}.*`, 'i') } })
                        acc.push({ oras: { $regex: new RegExp(`.*${text}.*`, 'i') } })
                        acc.push({ adresa: { $regex: new RegExp(`.*${text}.*`, 'i') } })
                        return acc
                    }, [])
                    const searchFields = {}
                    if (args.judet) searchFields.judet = args.judet
                    return RestaurantModel.find({
                        $or: searchRegexps,
                        ...searchFields,
                    }).exec();
                }
            },
            reviews: {
                type: GraphQLList(RestaurantType),
                args: {
                    restaurant_id: { type: GraphQLInt },
                },
                resolve: (root, args, context, info) => {
                    const searchFields = {}
                    if (args.restaurant_id !== undefined) searchFields.restaurant_id = args.restaurant_id
                    return RestaurantModel.find(searchFields).exec()
                }
            },
            restaurantsRequests: {
                type: GraphQLList(RestaurantRequestType),
                resolve: (root, args, context, info) => {
                    return RestaurantRequestModel.find().exec();
                }
            },
            userByID: {
                type: UserType,
                args: {
                    id: { type: GraphQLNonNull(GraphQLInt) }
                },
                resolve: (root, args, context, info) => {
                    return UserModel.findById(args.id).exec()
                }
            },
            userByEmail: {
                type: GraphQLList(UserType),
                args: {
                    email: { type: GraphQLString }
                },
                resolve: (root, args, context, info) => {
                    return UserModel.find({ 'email': args.email }).exec();
                }
            },
            login: {
                type: UserType,
                args: {
                    email: { type: GraphQLString },
                    parola: { type: GraphQLString }
                },
                resolve: async (root, args, context, info) => {
                    const response = await UserModel.find({ 'email': args.email }).lean().exec()
                    const user = response[0]
                    if (validPassword(args.parola, user.parola)) {
                        return user
                    } else {
                        throw new Error()
                    }
                }
            }
        }
    }),

    mutation: new GraphQLObjectType({
        name: "Mutate",
        fields: {
            adauga_user: {
                type: UserType,
                args: {
                    id: { type: GraphQLInt },
                    nume: { type: GraphQLString },
                    prenume: { type: GraphQLString },
                    judet: { type: GraphQLString },
                    oras: { type: GraphQLString },
                    adresa: { type: GraphQLString },
                    data_nasterii: { type: GraphQLDate },
                    email: { type: GraphQLString },
                    parola: { type: GraphQLString },
                },
                resolve: async (root, args, context, info) => {
                    let lastUserID = -1
                    try {
                        lastUserID = await UserModel.findOne().sort({ _id: 1 }).limit(1).lean().id || -1
                    } catch (e) { }

                    args.parola = generateHash(args.parola)
                    const user = new UserModel({ ...args, id: lastUserID + 1 });
                    return user.save();
                }
            },
            adauga_restaurant: {
                type: RestaurantType,
                args: {
                    id: { type: GraphQLInt },
                    nume: { type: GraphQLString },
                    judet: { type: GraphQLString },
                    oras: { type: GraphQLString },
                    adresa: { type: GraphQLString },
                    mese: { type: GraphQLList(TableInputType) },
                },
                resolve: async (root, args, context, info) => {
                    let lastRestaurantID = -1
                    try {
                        const restaurant = await RestaurantRequestModel.findOne().sort({ _id: -1 }).limit(1).lean()
                        lastRestaurantID = restaurant.id !== undefined ? restaurant.id : -1
                    } catch (e) { }

                    const restaurant = new RestaurantRequestModel({ ...args, id: lastRestaurantID + 1 });
                    return restaurant.save();
                }
            },
            adauga_review: {
                type: ReviewType,
                args: {
                    restaurant_id: { type: GraphQLInt },
                    user_id: { type: GraphQLInt },
                    message: { type: GraphQLString },
                    stars: { type: GraphQLInt },
                },
                resolve: async (root, args, context, info) => {
                    const review = new ReviewModel({
                        ...args
                    })
                    return review.save()
                }
            },
            confirm_restaurant: {
                type: RestaurantType,
                args: {
                    id: { type: GraphQLInt },
                    nume: { type: GraphQLString },
                    judet: { type: GraphQLString },
                    oras: { type: GraphQLString },
                    adresa: { type: GraphQLString },
                    mese: { type: GraphQLList(TableInputType) },
                },
                resolve: async (root, args, context, info) => {
                    const result = await RestaurantRequestModel.findOneAndDelete({ id: args.id })
                    let lastRestaurantID = -1
                    try {
                        const restaurant = await RestaurantModel.findOne().sort({ _id: 1 }).limit(1).lean()
                        lastRestaurantID = restaurant.id !== undefined ? restaurant.id : -1
                    } catch (e) { }

                    const restaurant = new RestaurantModel({ ...args, id: lastRestaurantID + 1 })
                    return restaurant.save()
                }
            },
            respinge_restaurant: {
                type: RestaurantType,
                args: {
                    id: { type: GraphQLInt },
                },
                resolve: async (root, args, context, info) => {
                    await RestaurantRequestModel.findOneAndDelete({ id: args.id })
                    return 'succes'
                }
            },
        }
    }),
})

module.exports = {
    MainSchema,
}