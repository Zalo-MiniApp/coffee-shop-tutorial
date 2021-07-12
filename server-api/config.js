const env = process.env.NODE_ENV || 'development';
const config = {
    development: {
        mongodbUrl: process.env.MONGODB_URL
    },
    production: {
        mongodbUrl: process.env.MONGODB_URL
    }
}

module.exports = config[env];