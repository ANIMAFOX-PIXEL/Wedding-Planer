const { commerce, datatype} = require('faker');
const userService = require('./user.service');
const productService = require('./product.service');

async function orderCreate(userid, productid, quantity){
    try {
        const {code, err, data:product }= await productService.productFind(productid);
        if(err)
            return {code, err};

        const {code:userCode, err:userErr, data:user } = await userService.userFind(userid);
        if(userErr) 
            return {code: userCode, err: userErr};

        const data = {
            id: datatype.uuid(),
            user, 
            product,
            quantity,
            total: product.price * quantity
        };

        return { code: 200, data };
    } catch (e) {
        return { code: 500, err: e.message };
    }
}

async function orderFind(id){
    try {
        const {code, err, data:[product] }= await productService.productAll();
        if(err)
            return {code, err};

        const {code:userCode, err:userErr, data:[user] } = await userService.userAll();
        if(userErr) 
            return {code: userCode, err: userErr};

        const data = {
            id,
            user,
            product,
            quantity: datatype.number(),
            total: commerce.price(),
        };

        return { code: 200, data };
    } catch (e) {
        return { code: 500, err: e.message };
    }
}

async function orderAll(){
    try {
        const {code, err, data:products }= await productService.productAll();
        if(err)
            return {code, err};

        const {code:userCode, err:userErr, data:users } = await userService.userAll();
        if(userErr) 
            return {code: userCode, err: userErr};

        const data = Array.from('x'.repeat(40)).map((x,i)=>({
            id: datatype.uuid(),
            user: users[i],
            product: products[i],
            quantity: datatype.number(),
            total: commerce.price(),
        })).slice(0,5);

        return { code: 200, data };
    } catch (e) {
        return { code: 500, err: e.message };
    }
}

async function orderFromUser(userid){
    try {
        const {code, err, data:products }= await productService.productAll();
        if(err)
            return {code, err};

        const {code:userCode, err:userErr, data:user } = await userService.userFind(userid);
        if(userErr) 
            return {code: userCode, err: userErr};

        const data = Array.from('x'.repeat(40)).map((x,i)=>({
            id: datatype.uuid(),
            user,
            product: products[i],
            quantity: datatype.number(),
            total: commerce.price(),
        })).slice(0,3);

        return { code: 200, data };
    } catch (e) {
        return { code: 500, err: e.message };
    }
}


module.exports = {
    orderCreate,
    orderFind,
    orderAll,
    orderFromUser,
};
