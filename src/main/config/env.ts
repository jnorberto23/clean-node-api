export default {
  mongoUrl: process.env.mongoUri || 'mongodb://127.0.0.1:27017/clean-node-api',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.jwtSecret || 'soakdo123919951!!sjkio'
}
