const fs = require("fs");
const path = require("path");
const argv = require("./argv");
const sortByDate = require("./utils").sortByDate;
const newFileName = require("./utils").newFileName;

/** TEST: node index.js --dir 'files' --ext 'png' --format 'photo-$$$' */

/*

1. Sprawdź poprawność podanych argumentów.
2. Odczytaj pliki z katalogu.
3. Przefiltruj tylko te z podanym rozszerzeniem.
4. Posortuj tablicę wg daty.
5. Zmień nazwę każdego pliku na format zamieniając $$$ na 001 itd.

*/

//--- 1. Sprawdź poprawność podanych argumentów
if ( !argv.validate(['dir', 'ext', 'format']) ) {
    throw new Error('Nie podano poprawnych parametrów.');
}

//--- 2. Odczytaj pliki z katalogu.
var dir = path.join(__dirname, argv.get('dir'));

fs.readdir(dir, function (err, files) {

    if (err) {
        throw err;
    }

    //--- 3. Przefiltruj tylko te z podanym rozszerzeniem.
    /** node index.js --dir 'images' --ext 'png' --format 'photo-$$$' */
    // console.log(files);

    var validFiles = files.filter(function (file) { // PS. Moja funkcja zwroci 'png' bez '.' - zadbam o to tutaj.

       return path.extname(file).slice(1) === argv.get('ext')

    })

    // console.log(validFiles)

    //--- 4. Posortuj tablicę wg daty.
    // Nadpisuje zmienna, ta sama tablica, tylko posortowana juz przez moja funkcje
    validFiles = sortByDate(validFiles, dir);

    // console.log(validFiles)

    //--- 5. Zmień nazwę każdego pliku na format zamieniając $$$ na 001 itd.
    validFiles.forEach(function (file, index) { // PS. Nasz przyklad z podawaniem argumentów jest typu CLI. Nie ma problemu przy braku metod async

        try{
            fs.renameSync(path.join(dir, file), path.join(dir, newFileName( argv.get('format'), argv.get('ext'), index+1 )));
        }
        catch (e) {
            throw new Error(`Nie można było zmienić nazwy pliku: ${file}\nBłąd: ${e.message}`);
        }

    })

})