const fs = require('fs');
const path = require('path');

// 4.
function sortByDate(files, dir) { // przymuje teblice z plikami

    files.sort( function (a, b) {

        var aStat = fs.statSync(path.join(dir, a));
        var bStat = fs.statSync(path.join(dir, b));

        return aStat.birthtime.getTime() - bStat.birthtime.getTime();

    })

    return files;
}

// 5.
function newFileName(format, ext, index) {

    // Przewaznie 2 param, to to na co chcemy zamienic wyszukany ciag znakow. U nas to funkcja
    var formatted = format.replace(/(\$+)/, function (match) {

        // console.log(match);
        /**
         * Odwolujac sie do konstruktora String, mam lancuch(a nie liczbne):
         * '1'.length = 1,  '9'.length = 1,  '10'.length = 2 */
        var diff = match.length - String(index).length;

        /**
         * Gdyby ktos podal arg 'photo-$', to dla liczby 10, byloby: 1-2 = -1
         * repeat() nie przyjmuje ujemych liczb, dlatego warunek. */
        return '0'.repeat(diff < 0 ? 0 : diff) + index;

    })

    return formatted + '.' + ext;

}

module.exports = {
    sortByDate: sortByDate,
    newFileName: newFileName
};