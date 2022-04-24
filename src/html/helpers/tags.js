module.exports = function(options) {
    const text =  options.fn(this);
    const simbols = [
        {
            raw: "&",
            htmlEscaped: "&amp;"
        },
        {
            raw: "<",
            htmlEscaped: "&lt;"
        },
        {
            raw: ">",
            htmlEscaped: "&gt;"
        },
        {
            raw: '"',
            htmlEscaped: "&quot;"
        },
        {
            raw: "'",
            htmlEscaped: "&#x27;"
        },
        {
            raw: "`",
            htmlEscaped: "&#x60;"
        },
        {
            raw: "=",
            htmlEscaped: "&#x3D;"
        },
 
    ];
    let newText = text;
    simbols.forEach(element => {
        const regex = new RegExp(`${element.htmlEscaped}`,'g');
        newText = newText.replace(regex,element.raw);
    });

    return newText;
}