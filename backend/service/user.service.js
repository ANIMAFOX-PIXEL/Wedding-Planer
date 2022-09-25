const jwt = require('jsonwebtoken');
const { name, internet, image, datatype } = require('faker');

async function userCreate(username, email, name, password){
    try {
        // asume password awas encrypted and user uploaded to db
        const data = {
            id: datatype.uuid(),
            username,
            name,
            email,
            profilePic: image.imageUrl(),
        };

        return {code: 200, data};
    } catch (e) {
        return {code: 500, err: e.message};
    }
}

async function userFind(id){
    try {
        // asume password was encrypted and user uploaded to db
        const data = {
            id,
            username: internet.userName(),
            email: internet.email(),
            profilePic: image.imageUrl(),
            name: name.findName()
        };

        return {code: 200, data};
    } catch (e) {
        return {code: 500, err: e.message};
    }
}

async function userAll(){
    try {
        const data = Array.from('_'.repeat(40)).map(()=>({
            id: datatype.uuid(), 
            username: internet.userName(),
            email: internet.email(),
            profilePic: image.imageUrl(),
            name: name.findName()
        }));

        return {code: 200, data};
    } catch (e) {
        return {code: 500, err: e.message};
    }
}

async function userUpdate(id, updateData){
    try {
        // asume password awas encrypted and user uploaded to db
        const data = {
            id,
            username: internet.userName(),
            email: internet.email(),
            profilePic: image.imageUrl(),
            name: name.findName(),
            ...updateData
        };

        return {code: 200, data};
    } catch (e) {
        return {code: 500, err: e.message};
    }
}

async function userDelete(id){
    try {
        const data = {
            id,
            username: internet.userName(),
            email: internet.email(),
            profilePic: image.imageUrl(),
            name: name.findName()
        };

        return {code: 200, data};
    } catch (e) {
        return {code: 500, err: e.message};
    }
}

// Search
async function userSearch(query){
    const q = query.toLowerCase();
    try {
        const data = Array.from('_'.repeat(40)).map(()=>({
            id: datatype.uuid(), 
            username: internet.userName(),
            email: internet.email(),
            profilePic: image.imageUrl(),
            name: name.findName()
        }))
        .filter( x=> x.name.toLowerCase().includes(q) || x.username.toLowerCase().includes(q));

        return {code: 200, data};
    } catch (e) {
        return {code: 500, err: e.message};
    }
}

// Auth
async function userLogin(email, password){
    try {
        const user = {
            id: datatype.uuid(),
            username: internet.userName(),
            email,
            profilePic: image.imageUrl(),
            name: name.findName()
        };

        const token = jwt.sign( {user}, process.env.SECRET, {expiresIn: "3y"});
        const data = { token };

        return {code: 200, data};
    } catch (e) {
        return {code: 500, err: e.message};
    }
}

module.exports = {
    userCreate,
    userFind,
    userAll,
    userUpdate,
    userDelete,

    userSearch,

    userLogin,
};