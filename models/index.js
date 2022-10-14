const Restaurant = require('./Restaurant');
const User = require('./User');
const Comment = require('./Comment');
const BeenThere = require('./beenthere');
const Image = require('./Image')

User.hasMany(Restaurant, {
    foreignKey: "userId",
    onDelete: "CASCADE"
});

User.hasMany(Comment, {
    foreignKey: "userId",
    onDelete: "CASCADE"
});

User.hasMany(Image, {
    foreignKey: "userId",
    onDelete: "CASCADE"
});

User.hasMany(BeenThere, {
    foreignKey: "userId",
    onDelete: "Cascade"
});

Restaurant.belongsTo(User, {
    foreignKey: "userId"
});

Restaurant.hasMany(Comment, {
    foreignKey: "restaurantId"
});

Restaurant.hasMany(Image, {
    foreignKey: "restaurantId"
});


Comment.belongsTo(Restaurant, {
    foreignKey: "restaurantId"
});

Comment.belongsTo(User, {
    foreignKey: "userId"
});

Image.belongsTo(User, {
    foreignKey: "userId"
});

Image.belongsTo(Restaurant, {
    foreignKey: "restaurantId"
});

BeenThere.belongsTo(User,{
    foreignKey: "userId"
});


module.exports = { Restaurant, User, Comment, BeenThere, Image };
