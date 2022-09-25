const { datatype } = require('faker');
const userService = require('./user.service');
const productService = require('./product.service');

async function plannerCreate(userid, date, productids=[]){
    try {

        const {code, err, data:products} = await productService.productFindMultiple(...productids);
        if(err)
            return {code, err};

        const {code:userCode, err:userErr, data:user } = await userService.userFind(userid);
        if(userErr) 
            return {code: userCode, err: userErr};

        const data = {
            id: datatype.uuid(),
            products,
            date: date,
            state: 'in progress',
        };

        return { code: 200, data };
    } catch (e) {
        return { code: 500, err: e.message };
    }
}

async function plannerFind(id){
    try{
        const {productsCode, productsErr, data:allProducts } = await productService.productAll();
        if(productsErr)
            return { code: productsCode, err: productsErr };

        const {code, err, data:product } = await productService.productFind(productid);
        if(err)
            return { code, err };
        
        const data = {
            id,
            products: [...allProducts.slice(0, 5), product],
            date: datatype.datetime(),
            state: 'in progress',
        };

        return { code: 200, data };
    } catch(e){
        return { code: 500, err: e.message };
    } 
}

// async function plannerFind(id){
//     try{
//         const {productsCode, productsErr, data:allProducts } = await productService.productAll();
//         if(productsErr)
//             return { code: productsCode, err: productsErr };

//         const {code, err, data:product } = await productService.productFind(productid);
//         if(err)
//             return { code, err };
        
//         const data = {
//             id,
//             products: [...allProducts.slice(0, 5), product],
//             date: datatype.datetime(),
//             state: 'in progress',
//         };

//         return { code: 200, data };
//     } catch(e){
//         return { code: 500, err: e.message };
//     } 
// }

async function plannerAddProduct(id, productid){
    try{
        const {productsCode, productsErr, data:allProducts } = await productService.productAll();
        if(productsErr)
            return { code: productsCode, err: productsErr };

        const {code, err, data:product } = await productService.productFind(productid);
        if(err)
            return { code, err };
        
        const data = {
            id,
            products: [...allProducts.slice(0, 5), product],
            date: datatype.datetime(),
            state: 'in progress',
        };

        return { code: 200, data };
    } catch(e){
        return { code: 500, err: e.message };
    }
}

async function plannerRemoveProduct(id, productid){
    try{
        const {productsCode, productsErr, data:allProducts } = await productService.productAll();
        if(productsErr)
            return { code: productsCode, err: productsErr };
        

        const data = {
            id,
            products: allProducts.slice(0, 5).filter(x=>x.id!==productid),
            date: datatype.datetime(),
            state: 'in progress',
        };

        return { code: 200, data };
    } catch(e){
        return { code: 500, err: e.message };
    }
}

async function plannerReschedule(id, date){
    try{
        const {productsCode, productsErr, data:allProducts } = await productService.productAll();
        if(productsErr)
            return { code: productsCode, err: productsErr };
        
        const data = {
            id,
            products: allProducts.slice(0, 3),
            date,
            state: 'in progress',
        };

        return { code: 200, data };
    } catch(e){
        return { code: 500, err: e.message };
    }
}

async function plannerBuy(id){
    try{
        const {productsCode, productsErr, data:allProducts } = await productService.productAll();
        if(productsErr)
            return { code: productsCode, err: productsErr };
        
        const data = {
            id,
            products: allProducts.slice(0, 5),
            date: datatype.datetime(),
            state: 'bought',
        };

        return { code: 200, data };
    } catch(e){
        return { code: 500, err: e.message };
    }
}

async function plannerDelete(id){
    try{
        const {productsCode, productsErr, data:allProducts } = await productService.productAll();
        if(productsErr)
            return { code: productsCode, err: productsErr };
        
        const data = {
            id,
            products: allProducts.slice(0, 5),
            date: datatype.datetime(),
            state: 'deleted',
        };

        return { code: 200, data };
    } catch(e){
        return { code: 500, err: e.message };
    }
}

module.exports = {
    plannerCreate,
    plannerFind,
    plannerAddProduct,
    plannerRemoveProduct,
    plannerReschedule,
    plannerBuy,
    plannerDelete,
};
