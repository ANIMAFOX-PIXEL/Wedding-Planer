const mediaService = require('../service/media.service');

function validateImageRead(id){
    return !id ? 'Path must specify image with id' : null;
}
async function imageRead(req, res){
    const { id } = req.params;

    const userErr = validateImageRead(id);
    if(userErr)
        return res.status(400).send(userErr);

    const {code, err, data} = await mediaService.mediaFind(id);
    if(err)
        return res.status(code).send(err);
    
    return res.status(200).json(data);
}

module.exports = {
    imageRead
};
