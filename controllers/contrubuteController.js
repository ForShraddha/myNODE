const asyncHandler = require('express-async-handler');
const {identifyLinkType, defCollection} = require('../controllers/identifyLink');

// create a product
const createDoc = asyncHandler(async(req, res) => {
    try {
        const linkType = await identifyLinkType((req.body)['link']);
        if (linkType !== 'INVALID_URL') {
            const entity = await defCollection(linkType);
            const isDup = await findDuplicate((req.body)['link'], entity);
            if (isDup === false){
                const linkEntity = await entity.create(req.body);
                res.status(200).json(linkEntity);
            } else {
                res.status(200).json({message: `Thanks for Your Contribution !`});
            }

        } else {
            res.status(500).json({message: `Don't mess with PAPA !`});
        }

    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

const findDuplicate = asyncHandler(async(url, entity) => {
    const listOfItems = await entity.find({link: url});
    if (listOfItems.length > 0){
        return true;
    } else {
        return false;
    }
});

module.exports = createDoc;