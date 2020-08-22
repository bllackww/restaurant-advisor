const { UserModel, UserType, RestaurantType, RestaurantModel, RestaurantRequestModel, RestaurantRequestType } = require('./Models.js')

const {
    GraphQLID,
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
                    search_text: { type: GraphQLString }
                },
                resolve: (root, args, context, info) => {
                    const search_text = "\"" + (args.search_text || '') + "\""
                    return RestaurantModel.find({ $text: { $search: search_text } }).exec();
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
                    id: { type: GraphQLNonNull(GraphQLID) }
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
                    id: { type: GraphQLID },
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
                    id: { type: GraphQLID },
                    nume: { type: GraphQLString },
                    judet: { type: GraphQLString },
                    oras: { type: GraphQLString },
                    adresa: { type: GraphQLString },
                },
                resolve: async (root, args, context, info) => {
                    let lastRestaurantID = -1
                    try {
                        lastRestaurantID = await RestaurantRequestModel.findOne().sort({ _id: 1 }).limit(1).lean().id || -1
                    } catch (e) { }

                    const restaurant = new RestaurantRequestModel({ ...args, id: lastRestaurantID + 1 });
                    return restaurant.save();
                }
            }
        }
    }),
})

module.exports = {
    MainSchema,
}