module.exports = {
    isDevelopment: process.env.NODE_ENV ? process.env.NODE_ENV == "development" : true,
    port: process.env.PORT || 3000
}