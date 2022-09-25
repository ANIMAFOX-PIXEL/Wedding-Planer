const { image, datatype } = require('faker');

async function mediaCreate(file){
    try {
        const url = image.imageUrl();
        const isURL = true;
        const data = { id: datatype.uuid(), url, isURL};
        return {code: 200, data};
    } catch (e) {
        return {code: 500, err: e.message};
    } 
}

function mediaFind(id){
    try {
        const url = image.imageUrl();
        const isURL = true;
        const data = { id, url, isURL};
        return {code: 200, data};
    } catch (e) {
        return {code: 500, err: e.message};
    }    
}

module.exports = {
    mediaCreate,
    mediaFind
};
