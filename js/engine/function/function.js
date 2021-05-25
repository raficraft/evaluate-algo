    
/**
 * Recheche les ID des recettes par mots clef
 * Renvoie un Tableau d'object contenant les resultat obtenue
 * sur les 3 champs de la recherche global
 * {name , description, ingredients} * 
 * @param {string} keyWords 
 * @returns {array} 
 */
 const idByGlobalSearch = (keyWords)=>{

    const idByGlobal = [] 

    keyWords.forEach(search => {  
      
      if(!stopwords.includes(search)){

        init.globalOptions.forEach(Options => {

        Options.search = search
        const result  = getData.normalizeJSON_V3(Options) 

      
            idByGlobal.push(result);   
          

            

        }); 
      }
        
    });
    //console.log('log v3 : ',idByGlobal);
    return idByGlobal
}

/**
 * Trie les ID des différents tableaux de resultat {getIdBy...}
 * pour ne conserver que les ID unique et obtenir un
 * tableau de comparaison. [refactoring voir new set à utiliser en amont ??]
 * @param {*} thisData 
 * @returns 
 */
const getUniqueID = (thisData) =>{  

    comparaisonChart = []
  
    thisData.forEach((data) => {
      data.forEach((value) => {
        if (!comparaisonChart.includes(value.id)) {
            comparaisonChart.push(value.id);
        }
      });
    });
    return comparaisonChart  
  }

const getUniqueIdWithFilterResult = (thisData) =>{  

    comparaisonChart = []
  
    thisData.forEach((data) => {
      data.forEach((value) => {
        if (!comparaisonChart.includes(value.id)) {
            comparaisonChart.push(value.id);
        }
      });
    });
    return comparaisonChart  
  }
  

/**
 * Trie les ID des différents tableaux de resultat {getIdBy...}
 * pour ne conserver que les ID unique et obtenir un
 * tableau de comparaison. [refactoring voir new set à utiliser en amont ??]
 * @param {*} thisData 
 * @returns 
 */
const getUniqueIDinSingleLoop = (thisData) =>{ 

    comparaisonChart = new Set()

    thisData.forEach((data) => { 
        let hasValid = comparaisonChart.has(data.id)
        if(!hasValid){
        comparaisonChart.add(data.id)    
        }         
    });


    return comparaisonChart
}    

const algoBasique = (keyWords)=>{

    //Nettoyage de tous les espaces comprit dans la chaîne de caractères 
    const keyWordsArray = keyWords.trim().replace(/  +/g, ' ').split(' ')        
    const idByGlobal = idByGlobalSearch(keyWordsArray)
    const uniqueID = getUniqueID(idByGlobal) 
    return  getData.getRecipeByID(uniqueID);  
  
}


const algoV5 = (keyWords)=>{
    const keyWordsArray = keyWords.trim().replace(/  +/g, ' ').split(' ') 
    const resultV5 = getData
    .algoV5(keyWordsArray)
    const uniqueIDV5 = getUniqueIDinSingleLoop(resultV5)
    return getData
    .getRecipeByID(uniqueIDV5)
}


