const { commerce, internet, image, datatype } = require('faker');
const mediaService = require('./media.service');

async function productCreate(userId, name, description, price, tags, files){
    try {
        const resolvedMedia = await Promise.all( files.map(mediaService.mediaCreate) );
        const filtered = resolvedMedia.filter( result => result.err );
        if(filtered.length !== 0)
            return { code: filtered[0].code, err: filtered[0].err };
        const media = resolvedMedia.map(m=>m.data);

        const data = {
            id: datatype.uuid(),
            userid: userId,
            name,
            price,
            tags,
            description,
            media
        };

        return { code: 200, data };

    } catch (e) {
        return { code: 500, err: e.message };
    }
}

async function productFind(id){
    try {
        const data = {
            id,
            name: commerce.productName(),
            description: commerce.productDescription(),
            price: commerce.price(),
            tags: Array.from('x'.repeat(4)).map(()=>commerce.department()),
            media: Array.from('x'.repeat(3)).map(()=>image.imageUrl())
        };

        return { code: 200, data };
    } catch (e) {
        return { code: 500, err: e.message };
    }
}

async function productFindMultiple(...ids){
    try {
        const data = ids.map(id=>({
            id,
            name: commerce.productName(),
            description: commerce.productDescription(),
            price: commerce.price,
            tags: Array.from('x'.repeat(4)).map(()=>commerce.department()),
            media: Array.from('x'.repeat(3)).map(()=>image.imageUrl())
        }));

        return { code: 200, data };
    } catch (e) {
        return { code: 500, err: e.message };
    }
}

async function productAll(){
    try {
        const data = Array.from('x'.repeat(40)).map(()=>({
            id: datatype.uuid(),
            name: commerce.productName(),
            description: commerce.productDescription(),
            price: commerce.price(),
            tags: Array.from('x'.repeat(4)).map(()=>commerce.department()),
            media: Array.from('x'.repeat(3)).map(()=>image.imageUrl())
        }));

        return { code: 200, data };
    } catch (e) {
        return { code: 500, err: e.message };
    }
}

async function productUpdate( userid, id, updatedData){
    try {
        const data = {
            id,
            userid,
            name: commerce.productName(),
            description: commerce.productDescription(),
            price: commerce.price(),
            tags: Array.from('x'.repeat(4)).map(()=>commerce.department()),
            media: Array.from('x'.repeat(3)).map(()=>image.imageUrl()),
            ...updatedData
        };

        return { code: 200, data };
    } catch (e) {
        return { code: 500, err: e.message };
    }
}

async function productDelete(id){
    try {
        const data = {
            id,
            name: commerce.productName(),
            description: commerce.productDescription(),
            price: commerce.price(),
            tags: Array.from('x'.repeat(4)).map(()=>commerce.department()),
            media: Array.from('x'.repeat(3)).map(()=>image.imageUrl())
        };

        return { code: 200, data };
    } catch (e) {
        return { code: 500, err: e.message };
    }
}

async function productSearch(query){
    const q = query.toLowerCase();
    try {
        const data = Array.from('x'.repeat(40)).map(()=>({
            id: datatype.uuid(),
            name: commerce.productName(),
            description: commerce.productDescription(),
            price: commerce.price(),
            tags: Array.from('x'.repeat(4)).map(()=>commerce.department()),
            media: Array.from('x'.repeat(3)).map(()=>image.imageUrl())
        }))
        .filter(x=> x.name.toLowerCase().includes(q));

        return { code: 200, data };
    } catch (e) {
        return { code: 500, err: e.message };
    }
}

module.exports = {
    productCreate,
    productFind,
    productFindMultiple,
    productAll,
    productUpdate,
    productDelete,

    productSearch,
};
