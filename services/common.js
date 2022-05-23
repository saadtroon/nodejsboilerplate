
const ShoefyModel = require("../models/ShoefyModel");
const ImagesModel = require("../models/ImagesModel");


function stichService(farm){
    console.log(farm.currentLayer);
    console.log(Date.now(),farm.nextUpdatedTimestamp)
    if (Date.now() > farm.nextUpdatedTimestamp){
        stichLayers(farm.currentLayer, farm.categoryName, farm.assignedNFT);
        updatenextUpdatedTimestamp();
    
    }

}

module.exports = stichService;

function stichLayers(layerNum, shoeTypes, assignedNFT) {
    if (layerNum == 0) {
        console.log("saad");

        var query = {shoetype: shoeTypes, sNFTNumber :assignedNFT};
		
        ShoefyModel.find(query).then(shoefy => {
            ImagesModel.find(query)

            query = { layerNum: 1, shoeType: shoeTypes,categoryName:shoefy[0].categoryName.toUpperCase(), traitType:"BACKGROUND",imageName:shoefy[0].background}
            console.log("query",query)
            
            
            ImagesModel.find(query).then(images => {
                console.log("images::::",images)
             });


        });


    }
}

// function stichlayers(){
//     // check current layer number of farm. 
//     // stich next layer on the existing stored image. 

//     if (layerNum =  0){
//         image = background // query {shoe type, categoryName, background: } on shoefies and images table 
//         layer +=1;
//     }

//     if(layerNum = 1){
//         nextLayer1 = baseshoes // query {shoe type, categoryName, baseshoes: }
//         nextlayer2 = front 
//         image = image+ nextLayer;
//         image = image + front;
//         layer +=3;
//     }
//     if (layerNum = 3){
//         nextLayer = baseshoes // query {shoe type, categoryName, baseshoes: }
//         image = image+ nextLayer;
//     }


// }

function updatenextUpdatedTimestamp(){

}