

function stichService(farm){

    if (Date.now() > farm.nextUpdatedTimestamp){
        stichlayers();
        updatenextUpdatedTimestamp();
        
    }



}

module.exports = stichService;



function stichlayers(){
    // check current layer number of farm. 
    // stich next layer on the existing stored image. 

    if (layerNum =  0){
        image = background // query {shoe type, categoryName, background: } on shoefies and images table 
        layer +=1;
    }

    if(layerNum = 1){
        nextLayer1 = baseshoes // query {shoe type, categoryName, baseshoes: }
        nextlayer2 = front 
        image = image+ nextLayer;
        image = image + front;
        layer +=3;
    }
    if (layerNum = 3){
        nextLayer = baseshoes // query {shoe type, categoryName, baseshoes: }
        image = image+ nextLayer;
    }


}

function updatenextUpdatedTimestamp(){

}