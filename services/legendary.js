var Jimp = require('jimp');
const { promisify } = require('util');

const ShoefyModel = require("../models/ShoefyModel");
const ImagesModel = require("../models/ImagesModel");

var glayerNumbers,gImage,gtime;

// let oneday = 86400000;
let oneday = 60000;
var error = "";

async function stichService(farm) {
        console.log("stiching legendary");
        await stichLayers(farm.currentLayer, farm.categoryName, farm.assignedNFT, farm.image);
        farm.image = gImage;
        farm.currentLayer = glayerNumbers;
        console.log("farm:",farm.currentLayer)
        let timestamp =  parseInt( farm.nextUpdatedTimestamp );
        timestamp = timestamp + (gtime * oneday);
        farm.nextUpdatedTimestamp = timestamp.toString();
        if (glayerNumbers == 10) {farm.mintStatus = "Completed"}
        return farm;
    }

module.exports = stichService;

async function stichLayers(layerNum, shoeTypes, assignedNFT, baseImage) {

    if (layerNum == 0) {
      
        var query = {shoetype: shoeTypes, sNFTNumber: assignedNFT};
		var finalImage;

        finalImage = await ShoefyModel.find(query).then(async function(shoefy) {
            ImagesModel.find(query);
            if(shoefy.length <= 0) {
                console.log("error in query:",query);
                return;
            }
            console.log("we here" ,shoefy.length);
            query = { layerNum: 1, shoeType: shoeTypes, categoryName: shoefy[0].categoryName.toUpperCase(), imageName:shoefy[0].background}
                return await ImagesModel.find(query).then(async function(images) {
                    return images[0].image;
                }, function(err) {
                    console.log(err);
                });

        }, function(err) {
            console.log(err);
        });

        setGlobalValues(1, finalImage, 15);

    }
    if (layerNum == 1) {
        var query = {shoetype: shoeTypes, sNFTNumber :assignedNFT};
		
        finalImage = await ShoefyModel.find(query).then( async function(shoefy) {
            ImagesModel.find(query)

            query1 = { layerNum: 2, shoeType: shoeTypes,categoryName:shoefy[0].categoryName.toUpperCase(), imageName:shoefy[0].baseShoe}
            query2 = { layerNum: 3, shoeType: shoeTypes,categoryName:shoefy[0].categoryName.toUpperCase(), imageName:shoefy[0].pattern}
            console.log("query1:query1:",query1);

            let firstLayer =  await ImagesModel.find(query1).then(async function(images) {
                return images[0].image;
            }, function(err) {
                console.log(err);
            });
            console.log("query2:",query2);
            let secondLayer = await ImagesModel.find(query2).then(async function(images) {
                if (images.length <= 0 ){
                    console.log("error in query", query2);
                } else {
                return images[0].image;
                }
            }, function(err) {
                console.log(err);
            });

            baseImage = await stichImages(baseImage, firstLayer);
            baseImage = await stichImages(baseImage, secondLayer);
            return baseImage;

            // stich farm img with img 1 and img 2 
        });
        console.log("finalImage:",finalImage)
        setGlobalValues(3, finalImage, 15);
    }

    if (layerNum == 3) {
        var query = {shoetype: shoeTypes, sNFTNumber :assignedNFT};
        
        finalImage = await ShoefyModel.find(query).then( async function(shoefy) {
            ImagesModel.find(query)

            query1 = { layerNum: 4, shoeType: shoeTypes,categoryName:shoefy[0].categoryName.toUpperCase(), imageName:shoefy[0].shoeSideColourGradient}
            query2 = { layerNum: 5, shoeType: shoeTypes,categoryName:shoefy[0].categoryName.toUpperCase(), imageName:shoefy[0].tribe}
            
            let firstLayer =  await ImagesModel.find(query1).then(async function(images) {
                return images[0].image;
            }, function(err) {
                console.log(err);
            });
            let secondLayer = await ImagesModel.find(query2).then(async function(images) {
                if (images.length <= 0 ){
                    console.log("error in query", query2);
                } else {
                return images[0].image;
                }
            }, function(err) {
                console.log(err);
            });

            baseImage = await stichImages(baseImage, firstLayer);
            baseImage = await stichImages(baseImage, secondLayer);
            return baseImage;

        });
        setGlobalValues(5, finalImage, 15);
    }
    if (layerNum == 5) {
        var query = {shoetype: shoeTypes, sNFTNumber :assignedNFT};
        
        finalImage = await ShoefyModel.find(query).then( async function(shoefy) {
            ImagesModel.find(query)

            query = { layerNum: 6, shoeType: shoeTypes,categoryName:shoefy[0].categoryName.toUpperCase(),imageName:shoefy[0].front}
            
            let firstLayer =  await ImagesModel.find(query).then(async function(images) {
                return images[0].image;
            }, function(err) {
                console.log(err);
            });

            baseImage = await stichImages(baseImage, firstLayer);
            return baseImage;
        });
        setGlobalValues(6, finalImage, 15);
    }

    if (layerNum == 6) {
        var query = {shoetype: shoeTypes, sNFTNumber :assignedNFT};
        
        finalImage = await ShoefyModel.find(query).then( async function(shoefy) {
            ImagesModel.find(query)

            query = { layerNum: 7, shoeType: shoeTypes,categoryName:shoefy[0].categoryName.toUpperCase(),imageName:shoefy[0].side}
            
            let firstLayer =  await ImagesModel.find(query).then(async function(images) {
                if (images.length <= 0 ){
                    console.log("error in query", query);
                } else {
                    return images[0].image;
                }
            }, function(err) {
                console.log(err);
            });

            baseImage = await stichImages(baseImage, firstLayer);
            return baseImage;
        });
        setGlobalValues(7, finalImage, 30);
    }

    if (layerNum == 7) {
        var query = {shoetype: shoeTypes, sNFTNumber :assignedNFT};
        
        finalImage = await ShoefyModel.find(query).then( async function(shoefy) {
            ImagesModel.find(query)

            query = { layerNum: 8, shoeType: shoeTypes,categoryName:shoefy[0].categoryName.toUpperCase(),imageName:shoefy[0].back}
            
            let firstLayer =  await ImagesModel.find(query).then(async function(images) {
                if (images.length <= 0 ) {
                    console.log("error in query", query);
                    error = "error in query"+ query;
                } else {
                    return images[0].image;
                }
            }, function(err) {
                console.log(err);
            });
            if(error == "") {
                baseImage = await stichImages(baseImage, firstLayer);
            }
            return baseImage;
        });
        setGlobalValues(8, finalImage, 30);
    }

    if (layerNum == 8) {
        var query = {shoetype: shoeTypes, sNFTNumber :assignedNFT};
        
        finalImage = await ShoefyModel.find(query).then( async function(shoefy) {
            ImagesModel.find(query)

            query = { layerNum: 9, shoeType: shoeTypes,categoryName:shoefy[0].categoryName.toUpperCase(),imageName:shoefy[0].accessories}
            
            let firstLayer =  await ImagesModel.find(query).then(async function(images) {
                if (images.length <= 0 ) {
                    console.log("error in query", query);
                    error = "error in query"+ query;
                } else {
                    return images[0].image;
                }
            }, function(err) {
                console.log(err);
            });
            if(error == "") {
                baseImage = await stichImages(baseImage, firstLayer);
            }
            return baseImage;
        });
        setGlobalValues(9, finalImage, 30);
    }

    if (layerNum == 9) {
        var query = {shoetype: shoeTypes, sNFTNumber :assignedNFT};
        
        finalImage = await ShoefyModel.find(query).then( async function(shoefy) {
            ImagesModel.find(query)

            query = { layerNum: 10, shoeType: shoeTypes,categoryName:shoefy[0].categoryName.toUpperCase(),imageName:shoefy[0].weapon}
            
            let firstLayer =  await ImagesModel.find(query).then(async function(images) {
                if (images.length <= 0 ) {
                    console.log("error in query", query);
                    error = "error in query"+ query;
                } else {
                    return images[0].image;
                }
            }, function(err) {
                console.log(err);
            });
            if(error == "") {
                baseImage = await stichImages(baseImage, firstLayer);
            }
            return baseImage;
        });
        setGlobalValues(10, finalImage, 30);
    }
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