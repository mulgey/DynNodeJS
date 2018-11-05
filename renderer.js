const fs = require("fs");

function view (templateName, values, yanıt) {
    // Read from the template file
    var dosyaİçeriği = fs.readFileSync('./views/' + templateName + '.html')
    // Insert values into the content

    // Write out the contents to the response 
    yanıt.write(dosyaİçeriği);
}

module.exports.görüş = view;