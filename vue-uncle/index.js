module.exports = (api) => {
    api.chainWebpack(config => {
        config.external({'ciao':'mbare'});
    });      
}