
const ShoefyModel = require("../models/ShoefyModel");
const ImagesModel = require("../models/ImagesModel");


function stichService(farm){
        stichLayers(farm.currentLayer, farm.categoryName, farm.assignedNFT);

        return farm;
    
    }

}

module.exports = stichService;

function stichLayers(layerNum, shoeTypes, assignedNFT) {
    if (layerNum == 0) {
      
        var query = {shoetype: shoeTypes, sNFTNumber :assignedNFT};
		
        ShoefyModel.find(query).then(shoefy => {
            ImagesModel.find(query)

            query = { layerNum: 1, shoeType: shoeTypes,categoryName:shoefy[0].categoryName.toUpperCase(), traitType:"BACKGROUND",imageName:shoefy[0].background}
            console.log("query",query)
            
            ImagesModel.find(query).then(images => {
                console.log("images::::",images)
             });

            // set farm img to this image
        });

        // return 1, img, 15
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



function updatenextUpdatedTimestamp(){

}