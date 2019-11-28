/**
 * forEach async way
 * @function asyncForEach
 * @param {array} array of items.
 * @param {any} callback second parameter.
 * @returns
 */
async function asyncForEach (array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

module.exports = asyncForEach;