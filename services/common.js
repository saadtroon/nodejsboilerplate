var Jimp = require('jimp');
const { promisify } = require('util');

const ShoefyModel = require("../models/ShoefyModel");
const ImagesModel = require("../models/ImagesModel");
var glayerNumbers,gfinalImage,gtime;


async function stichService(farm){
       var layerNumbers,finalImage,time = await stichLayers(farm.currentLayer, farm.categoryName, farm.assignedNFT);
        console.log("asdsadsad",glayerNumbers,gfinalImage,gtime);
        return farm;
    
    }




module.exports = stichService;

async function stichLayers(layerNum, shoeTypes, assignedNFT) {

    if (layerNum == 0) {
      
        var query = {shoetype: shoeTypes, sNFTNumber :assignedNFT};
		var layerNumbers,finalImage,time;

        layerNumbers,finalImage,time = await ShoefyModel.find(query).then(async function(shoefy) {
            ImagesModel.find(query)

            query = { layerNum: 1, shoeType: shoeTypes,categoryName:shoefy[0].categoryName.toUpperCase(), traitType:"BACKGROUND",imageName:shoefy[0].background}
          //  console.log("query",query)
            
                return await ImagesModel.find(query).then(async function(images) {
              //  console.log("images::::",images);
                    layerNumbers = 1;
                    finalImage = images[0].image;
                    time = 15;
                    return layerNumbers,finalImage,time
                }, function(err) {
                    console.log(err);
                });
               // return layerNumber,finalImage,time
            // set farm img to this image
        }, function(err) {
            console.log(err);
        });
        glayerNumbers = layerNumbers
        gfinalImage = finalImage
        gtime = time
        return layerNumbers,finalImage,time;
    }
    if (layerNum == 1){
        var query = {shoetype: shoeTypes, sNFTNumber :assignedNFT};
		
        ShoefyModel.find(query).then(shoefy => {
            ImagesModel.find(query)

            query1 = { layerNum: 2, shoeType: shoeTypes,categoryName:shoefy[0].categoryName.toUpperCase(), traitType:"BASESHOE",imageName:shoefy[0].baseShoe}
            query2 = { layerNum: 3, shoeType: shoeTypes,categoryName:shoefy[0].categoryName.toUpperCase(), traitType:"FRONT",imageName:shoefy[0].front}
            
            ImagesModel.find(query1).then(images => {
                console.log("images::::",images)
             });
            ImagesModel.find(query2).then(images => {
                console.log("images::::",images)
             });

            // stich farm img with img 1 and img 2 
        });
    }

    if (layerNum == 3){
        var query = {shoetype: shoeTypes, sNFTNumber :assignedNFT};
        
        ShoefyModel.find(query).then(shoefy => {
            ImagesModel.find(query)

            query1 = { layerNum: 4, shoeType: shoeTypes,categoryName:shoefy[0].categoryName.toUpperCase(), traitType:"SIDE",imageName:shoefy[0].side}
            query2 = { layerNum: 5, shoeType: shoeTypes,categoryName:shoefy[0].categoryName.toUpperCase(), traitType:"BACK",imageName:shoefy[0].back}
            
            ImagesModel.find(query1).then(images => {
                console.log("images::::",images)
                });
            ImagesModel.find(query2).then(images => {
                console.log("images::::",images)
                });

            // stich farm img with img 1 and img 2 
        });
    }
    if (layerNum == 5){
        var query = {shoetype: shoeTypes, sNFTNumber :assignedNFT};
        
        ShoefyModel.find(query).then(shoefy => {
            ImagesModel.find(query)

            query = { layerNum: 6, shoeType: shoeTypes,categoryName:shoefy[0].categoryName.toUpperCase(), traitType:"SIDE",imageName:shoefy[0].shoeSideColourGradient}
            
            ImagesModel.find(query).then(images => {
                console.log("images::::",images)
            });    
            // stich farm img with img
        });                  
    }
}



async function stichImages(img1, img2){
    const MIME_TYPE = 'image/png';
    
    const image = await Jimp.read(Buffer.from(img1, 'base64'));
    const image2 = await Jimp.read(Buffer.from(img2, 'base64'));

    image.resize(600,600);
    image.blit(image2,0,0);

    const toBase64 = promisify(image.getBase64).bind(image);
    // image.write('new_imgae.png');

    return await toBase64(MIME_TYPE);
}