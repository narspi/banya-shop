module.exports = function(options) {
    console.log(this);
    var bolder = '<strong>' + options.fn(this) + '</strong>';
    return bolder;
}