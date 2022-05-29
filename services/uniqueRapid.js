var Jimp = require('jimp');
const { promisify } = require('util');

const ShoefyModel = require("../models/ShoefyModel");
const ImagesModel = require("../models/ImagesModel");

var glayerNumbers,gImage,gtime;

let oneday = 86400000;


async function stichService(farm) {
        await stichLayers(farm.currentLayer, farm.categoryName, farm.assignedNFT, farm.image);
        farm.image = gImage;
        farm.currentLayer = glayerNumbers;
        let timestamp =  parseInt( farm.nextUpdatedTimestamp );
        timestamp = timestamp + (gtime * oneday);
        farm.nextUpdatedTimestamp = timestamp.toString();
        if (glayerNumbers == 7) {farm.mintStatus = "Complete"}
        return farm;
    
    }

module.exports = stichService;

async function stichLayers(layerNum, shoeTypes, assignedNFT, baseImage) {

    if (layerNum == 0) {
      
        var query = {shoetype: shoeTypes, sNFTNumber: assignedNFT};
		var finalImage;

        baseImage = await ShoefyModel.find(query).then(async function(shoefy) {
            ImagesModel.find(query);

            query = { layerNum: 1, shoeType: shoeTypes,categoryName:shoefy[0].categoryName.toUpperCase(), imageName:shoefy[0].background}
            
                return await ImagesModel.find(query).then(async function(images) {
                    return images[0].image;
                }, function(err) {
                    console.log(err);
                });

        }, function(err) {
            console.log(err);
        });
        
        finalImage = await ShoefyModel.find(query).then( async function(shoefy) {
            ImagesModel.find(query);

            var query1 = { layerNum: 2, shoeType: shoeTypes,categoryName:shoefy[0].categoryName.toUpperCase(), imageName:shoefy[0].baseShoe}
            var query2 = { layerNum: 3, shoeType: shoeTypes,categoryName:shoefy[0].categoryName.toUpperCase(), traitType:"FRONT",imageName: shoefy[0].front}
            var query3 = { layerNum: 4, shoeType: shoeTypes,categoryName:shoefy[0].categoryName.toUpperCase(), traitType:"SIDE",imageName: shoefy[0].side}
            
            let firstLayer =  await ImagesModel.find(query1).then(async function(images) {
                return images[0].image;
            }, function(err) {
                console.log(err);
            });

            let secondLayer = await ImagesModel.find(query2).then(async function(images) {
                return images[0].image;
            }, function(err) {
                console.log(err);
            });

            let thirdLayer = await ImagesModel.find(query3).then(async function(images) {
                return images[0].image;
            }, function(err) {
                console.log(err);
            });

            baseImage = await stichImages(baseImage, firstLayer);
            baseImage = await stichImages(baseImage, secondLayer);
            baseImage = await stichImages(baseImage, thirdLayer);

            return baseImage;

            // stich farm img with img 1 img2 img3 img4 img5 
        });

        setGlobalValues(4, finalImage, 20);
    }

    if (layerNum == 4) {
        var query = {shoetype: shoeTypes, sNFTNumber :assignedNFT};
        
        finalImage = await ShoefyModel.find(query).then( async function(shoefy) {
            ImagesModel.find(query)

            query = { layerNum: 5, shoeType: shoeTypes,categoryName:shoefy[0].categoryName.toUpperCase(),imageName:shoefy[0].back}
            
            let firstLayer =  await ImagesModel.find(query).then(async function(images) {
                if (images.length <= 0 ){
                    console.log("error in query", query);
                } else {
                    return images[0].image;
                }
            }, function(err) {
                console.log(err);
            });

            query = { layerNum: 6, shoeType: shoeTypes,categoryName:shoefy[0].categoryName.toUpperCase(),imageName:shoefy[0].back}

            let secondLayer =  await ImagesModel.find(query).then(async function(images) {
                if (images.length <= 0 ){
                    console.log("error in query", query);
                } else {
                    return images[0].image;
                }
            }, function(err) {
                console.log(err);
            });

            query = { layerNum: 7, shoeType: shoeTypes,categoryName:shoefy[0].categoryName.toUpperCase(),imageName:shoefy[0].back}

            let thirdLayer =  await ImagesModel.find(query).then(async function(images) {
                if (images.length <= 0 ){
                    console.log("error in query", query);
                } else {
                    return images[0].image;
                }
            }, function(err) {
                console.log(err);
            });

            baseImage = await stichImages(baseImage, firstLayer);
            baseImage = await stichImages(baseImage, secondLayer);
            baseImage = await stichImages(baseImage, thirdLayer);


            return baseImage;
        });
        setGlobalValues(7, finalImage, 15);
    
}

function setGlobalValues(layer, image, days){
    glayerNumbers = layer;
    gtime = days;
    gImage = image;
}


async function stichImages(img1, img2){
    const MIME_TYPE = 'image/png';
    
    const image = await Jimp.read(Buffer.from(img1, 'base64'));
    const image2 = await Jimp.read(Buffer.from(img2, 'base64'));

    image.resize(600,600);
    image.blit(image2,0,0);

    const toBase64 = promisify(image.getBase64).bind(image);
    // image.write('new_imgae.png');

    let imgData = await toBase64(MIME_TYPE);
    const stichedImg = imgData.split(',').pop();
    return stichedImg;
}