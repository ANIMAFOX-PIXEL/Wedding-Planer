const { datatype } = require('faker');
const userService = require('./user.service');
const productService = require('./product.service');

async function reviewCreateOrUpdate(productId, userId, value){
    const { code:userCode, err:userErr, data:user } =  await userService.userFind(userId);
    if(userErr)
        return {code: userCode, err: userErr};

    const { code:productCode, err:productErr, data:product } = await productService.productFind(productId);
    if(productErr)
        return {code: productCode, err: productErr };
    
    try {
        const data = {
            id: datatype.uuid(),
            user,
            product,
            value,
        };
    
        return {code: 200, data};
    } catch (e) {
        return { code: 500, err: e.message };
    }
}

function overallResponseString(score){
    if(score >= 4 )
        return 'amazing!';
    else if(score >= 3)
        return 'good';
    else if(score >= 2)
        return 'medium';
    return 'poor';
}
async function reviewFromProduct(productId){
    try {

        // simulate a product's reviews
        const reviews = Array.from('x'.repeat(Math.floor(Math.random()* 14)+1)).map(()=>({
            id: datatype.uuid(),
            value: Math.floor(Math.random() * 5) + 1
        })); 
    
        const count = reviews.length; 
        const score = reviews.reduce((prev,curr) => prev+curr.value, 0) / count;
        const data = {
            count,
            score,
            overallResponse: overallResponseString(score),
        };
    
        return {code: 200, data};
    } catch (e) {
        return {code: 500, err: e.message };   
    }
}

async function reviewDelete(id){
    // get user and product review
    const { code:userCode, err:userErr, data:user } =  await userService.userFind(datatype.uuid());
    if(userErr)
        return {code: userCode, err: userErr};

    const { code:productCode, err:productErr, data:product } = await productService.productFind(datatype.uuid());
    if(productErr)
        return {code: productCode, err: productErr };

    try {
        const data = {
            id: datatype.uuid(),
            user,
            product,
            value: Math.floor(Math.random() * 4)+1,
        };

        return {code: 200, data};
    } catch (e) {
        return { code: 500, err: e.message };
    }
}

module.exports = { 
    reviewCreateOrUpdate,
    reviewFromProduct,
    reviewDelete
};
