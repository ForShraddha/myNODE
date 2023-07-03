const AsyncHandler = require('express-async-handler')
const {gdtotEntity, filepressEntity, gdflixEntity} = require('../models/linkModel')

const identifyLinkType = AsyncHandler(async(url) => {
    const gdtot = /https?:\/\/.+\.gdtot\.\S+/.test(url);
    const gdflix = /https?:\/\/(gdflix)\.\S+/.test(url);
    const filepress = /https?:\/\/(filepress|filebee)\.\S+/.test(url);

    if (gdtot) {
        return "GDTOT";
    } else if (gdflix) {
        return "GDFLIX";
    } else if (filepress) {
        return "FILEPRESS";
    } else {
        return "INVALID_URL";
    }
})

const defCollection = AsyncHandler(async(type) => {
    if (type === 'GDTOT'){
        return gdtotEntity;
    } else if (type === 'GDFLIX'){
        return gdflixEntity;
    } else if (type === 'FILEPRESS'){
        return filepressEntity;
    } else {
        return null
    }
})

module.exports = {identifyLinkType, defCollection};
