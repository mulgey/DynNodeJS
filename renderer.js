const fs = require("fs");

function değerleriBirleştir(değerler, içerik) {
    //Cycle over the keys
    for (var anahtar in değerler) {
        //Replace all {{key}} with the value from the values object
        içerik = içerik.replace("{{" + anahtar + "}}", değerler[anahtar]);
    }
    //return merged content
    return içerik;
}

function view (templateName, değerler, yanıt) {
    // Read from the template file
    var dosyaİçeriği = fs.readFileSync('./views/' + templateName + '.html', {encoding: "utf8"});
    // Insert values into the content
    dosyaİçeriği = değerleriBirleştir (değerler, dosyaİçeriği);
    // Write out the contents to the response 
    yanıt.write(dosyaİçeriği);
}

module.exports.görüş = view;