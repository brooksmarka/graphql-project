const graphql = require('graphql')
var _ = require('lodash')

//dummy data
var usersData = [
    {id: '1', name: 'Bond', age: 36, profession: "agent"},
    {id: '13', name: 'Anna', age: 26, profession: "banker"},
    {id: '211', name: 'Bella', age: 16, profession: "painter"},
    {id: '19', name: 'Gina', age: 26, profession: "carpenter"},
    {id: '150', name: 'Georgina', age: 36, profession: "actress"},

]

var hobbiesData = [
    {id: '1', title: 'Programing', description: "use computers to build stuff", userId:'1'},
    {id: '2', title: 'Brewing', description: "make delicious beer", userId:'1'},
    {id: '3', title: 'Skiing', description: "Shredding sweet snow", userId:'211'},
    {id: '4', title: 'Hiking', description: "Exploring cool spots to camp", userId:'19'},
    {id: '5', title: 'Camping', description: "being in nature", userId:'150'},
    {id: '6', title: 'Biking', description: "Shredding sweet dirt", userId:'13'},

]

var PostsData = [
    {id: '1', comment: 'Much amazing', userId:'1'},
    {id: '2', comment: 'Cool stuff', userId:'1'},
    {id: '3', comment: 'This is neat', userId:'19'},
    {id: '3', comment: 'This is frickin neat', userId:'211'},
    {id: '3', comment: 'This is completely insane', userId:'19'},
    {id: '3', comment: 'This is special', userId:'150'},
]


const{ 
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema

} = graphql

//Create types
const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Documentation for user...',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        profession: { type: GraphQLString}

    })

});

const HobbyType = new GraphQLObjectType({
    name: 'Hobby',
    description: 'Hobby description',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: { type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args){
                return _.find(usersData, {id: parent.userId})
            }
        }

    })

});

const PostType = new GraphQLObjectType({
    name: 'Post',
    description: 'Post description',
    fields: () => ({
        id: {type: GraphQLID},
        comment: {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args){
                return _.find(usersData, {id: parent.userId})
            }  
        }

    })

});

//RootQuery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Description',
    fields: {
        user: {
            type: UserType,
            args: {id: {type: GraphQLID}},

            resolve(parent, args){
               return _.find(usersData, {id: args.id})

            }

        },

        hobby: {
            type: HobbyType,
            args: {id: {type: GraphQLID}},

            resolve(parent, args){
               return _.find(hobbiesData, {id: args.id})

            }
        },

        post:{
            type: PostType,
            args: {id: {type: GraphQLID}},

            resolve(parent, args){
               return _.find(PostsData, {id: args.id})

            }
        }
    }

});

module.exports = new GraphQLSchema({
    query: RootQuery
})


