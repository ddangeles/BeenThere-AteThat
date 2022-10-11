const Restaurant = require('./Restaurant');
const User = require('./User');
const Comment = require('./Comment');

User.hasMany(Restaurant, {
    foreignKey: "userId",
    onDelete: "CASCADE"
});

User.hasMany(Comment, {
    foreignKey: "userId",
    onDelete: "CASCADE"
});

Restaurant.belongsTo(User, {
    foreignKey: "userId"
});

Restaurant.belongsTo(Comment, {
    foreignKey: "restaurantId"
});

Comment.belongsTo(User, {
    foreignKey: "userId"
});

Comment.hasMany(Restaurant, {
    foreignKey: "restaurantId"
});


module.exports = { Restaurant, User, Comment };
