const { lorem, datatype } = require('faker');
const userService = require('./user.service');
const productService = require('./product.service');

async function commentCreate(userid, productid, content){
    const { code:userCode, err:userErr, data:user } =  await userService.userFind(userid);
    if(userErr)
        return {code: userCode, err: userErr};

    const { code:productCode, err:productErr, data:product } = await productService.productFind(productid);
    if(productErr)
        return {code: productCode, err: productErr };
    
    try {
        const data = {
            id: datatype.uuid(),
            user,
            product,
            content
        };
    
        return {code: 200, data};
    } catch (e) {
        return { code: 500, err: e.message };
    }
}

async function commentFind(id){
    // simulate comment's user
    const { code:userCode, err:userErr, data:user } =  await userService.userFind(datatype.uuid());
    if(userErr)
        return {code: userCode, err: userErr};

    // simulate comment's product
    const { code:productCode, err:productErr, data:product } = await productService.productFind(datatype.uuid());
    if(productErr)
        return {code: productCode, err: productErr };
        
        try {
            const data = {
                id,
                user,
                product,
                content: lorem.sentence(),
            };
        
            return {code: 200, data};
        } catch (e) {
            return { code: 500, err: e.message };
        }
}

async function commentFromProduct(productId){
    const { code:userCode, err:userErr, data:users } =  await userService.userAll();
    if(userErr)
        return {code: userCode, err: userErr};

    const { code:productCode, err:productErr, data:product } = await productService.productFind(productId);
    if(productErr)
        return {code: productCode, err: productErr };
    
    try {
        const data = Array.from('x'.repeat(4)).map((x,i)=>({
            id: datatype.uuid(),
            user: users[Math.floor(Math.random()*users.length)],
            product,
            content: lorem.sentence(),
        }));
    
        return {code:200, data};
    } catch (e) {
        return { code: 500, err: e.message };
    }
}

async function commentFromUser(userId){
    const { code:userCode, err:userErr, data:user } =  await userService.userFind(userId);
    if(userErr)
        return {code: userCode, err: userErr};

    const { code:productCode, err:productErr, data:products } = await productService.productAll();
    if(productErr)
        return {code: productCode, err: productErr };
    
    try {
        const data = Array.from('x'.repeat(4)).map((x,i)=>({
            id: datatype.uuid(),
            user,
            product: products[Math.floor(Math.random()*products.length)],
            content: lorem.sentence(),
        }));
    
        return {code:200, data};
    } catch (e) {
        return { code: 500, err: e.message };
    }
}

async function commentUpdate(id, content){

    // simulate comment's user
    const { code:userCode, err:userErr, data:user } =  await userService.userFind(datatype.uuid());
    if(userErr)
        return {code: userCode, err: userErr};

    // simulate comment's product
    const { code:productCode, err:productErr, data:product } = await productService.productFind(datatype.uuid());
    if(productErr)
        return {code: productCode, err: productErr };

    try {
        const data = {
            id,
            user,
            product,
            content
        };

        return {code:200, data};
    } catch (e) {
        return { code: 500, err: e.message };
    }
}

async function commentDelete(id){
    const { code:userCode, err:userErr, data:user } =  await userService.userFind(datatype.uuid());
    if(userErr)
        return {code: userCode, err: userErr};

    const { code:productCode, err:productErr, data:product } = await productService.productFind(datatype.uuid());
    if(productErr)
        return {code: productCode, err: productErr };

    try {
        const data = {
            id,
            user,
            product,
            content: lorem.sentence(),
        };

        return {code:200, data};
    } catch (e) {
        return { code: 500, err: e.message };
    }
}


module.exports = {
    commentCreate,
    commentFind,
    commentFromProduct,
    commentFromUser,
    commentUpdate,
    commentDelete
};
