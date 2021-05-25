/** * 
 * @param {string} str 
 * @returns Une chaine de caratère standart
 */
 const normalizeString = (str) =>{
    return str
        .toString()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
  }
  
  
  /*Empeche la function passé en callBack 
  de se déclenché à chaque event dans un certain délai.
   Elle ne ce déclenchera que si le délay passé et 
   supérieur entre deux event de même nature
  */
  
  debounce = (callback, delay) => {
    let timer;
    return function(){
        let args = arguments;
        let context = this;
        clearTimeout(timer);
        timer = setTimeout(function(){
            callback.apply(context, args);
        }, delay)
    }
  }

class AlterateJSON{

    constructor(){

        this.recipes = dataJSON

        this.dictionnaryFields = [
            {context : 'name', fields : 'name' , depth : 'root' },
            {context : 'ingredients', fields : 'ingredient' , depth : 'lowerLevel' },
            {context : 'description', fields : 'description' , depth : 'root' },
        ] 
        this.dictionnary = this.createDictionnary()
        this.JSON = this.normalizeJSON(dataJSON)
        this.flatJSON = this.flatJson() 

    }


        
    flatJson(){

        const result = []


        this.dictionnaryFields.forEach(options => {

            switch(options.depth){
                case 'root' :

                    this.JSON.forEach((recipe) => { 
                        

                        if(!result[recipe.id]){
                            result[recipe.id] = []
                        }
                        if(options.fields === 'description'){
                        const cleanEntries = this.removeStopWords(recipe[options.fields],this.dictionnary,'keep')                       
                        
                    
                            result[recipe.id] += normalizeString(` ${cleanEntries} `)
                           

                        }else{
                            result[recipe.id] += normalizeString(` ${recipe[options.fields]} `)
                          
                        }                        
                    })
                break;

                case 'lowerLevel':

                    this.recipes.forEach(recipe => {
    
                        recipe[options.context].forEach(el => {
                            
                            if(!result[recipe.id]){  result[recipe.id] = [] }
                            if(options.context !== options.fields){el = el[options.fields]}
                               
                            result[recipe.id] += normalizeString(`${el} `)
                                                  

                         })
                    })
                break;
            }            
        });
        return result
 
    }
    /**
     * 
     * @returns 
     */
    createDictionnary(){

        const dictionnary = []    

        this.recipes.forEach(recipe =>{

            const recipesKeys = Object.keys(recipe)

            recipesKeys.forEach(key =>{
                if(key === 'name' || key === 'ingredients' || key === 'appliance' || key === 'ustensils'){
                    if(typeof(recipe[key]) !== 'object'){
                    
                    if(!dictionnary.includes(recipe[key])){

                        //console.log(this.removeStopWords(recipe[key],stopwords,'remove'));
                        dictionnary.push(normalizeString(recipe[key]))
                        //On explose les termes composé afin de les nettoyer des mots en trop type {de,les,la,à...}
                        //On explose la string obtenue et ajoute chaque terme au dictionnaire
                        const cleanTermsArray =  this.removeStopWords(recipe[key],stopwords,'remove').split(' ')
                       

                            cleanTermsArray.forEach(cleanTerms => {
                                const normalizeCleanTerm = normalizeString(cleanTerms) 

                                if(!dictionnary.includes(normalizeCleanTerm)){
                                    dictionnary.push(normalizeString(normalizeCleanTerm))
                                }                                      
                            });
                        
                    }

                   
                    }else if(typeof(recipe[key]) === 'object'){

                        recipe[key].forEach(element => {
                                                       
                            if(typeof(element)  === 'string'){
                                if(!dictionnary.includes(element)){
                                    dictionnary.push(normalizeString(element))
                                }
                            }else{
                                
                                if(!dictionnary.includes(element['ingredient'])){
                                    dictionnary.push(normalizeString(element['ingredient']))
                                    const cleanTermsArray =  this.removeStopWords(element['ingredient'],stopwords,'remove').split(' ')
                                   
                                    cleanTermsArray.forEach(cleanTerms => {
                                        const normalizeCleanTerm = normalizeString(cleanTerms) 

                                        if(!dictionnary.includes(normalizeCleanTerm)){
                                            dictionnary.push(normalizeString(normalizeCleanTerm))
                                        }                                      
                                    });
                                    
                                }
                            }
                            
                        });
                    }
                }
            })
        })


        return dictionnary;

    }

    /**
     * 
     * @param {*} str 
     * @param {*} dictionnary 
     * @param {*} action 
     * @returns 
     */
    removeStopWords(str,dictionnary,action){

        str = str.toString()
        const res = []
        const words = str.split(' ')
        for(let i=0;i<words.length;i++) {
            let word_clean = words[i].split(".").join("")           
            if(action === 'remove'){
                if(!dictionnary.includes(word_clean)) {
                    res.push(word_clean)
                }
            }else if(action === 'keep'){                     
                if(dictionnary.includes(word_clean)) {             
                    res.push(word_clean)
                }
            }
        }
        return(res.join(' '))
    }

    /**
     * Vire Tout les accents présent dans les champs de type string du fichier Json
     * @param {*} JSON 
     * @returns newJson
     */

     normalizeJSON(JSON){

        // console.log(JSON);
  
          const newJSON = []
  
          JSON.forEach((recipe,key) => {
  
          //  console.log(recipe);
              const thisKey = Object.keys(recipe)
              newJSON[key] = {}
             
  
              thisKey.forEach(fields => {
                  
                  
                 // console.log(typeof(recipe[fields]));
  
                  switch(typeof(recipe[fields])){
  
                      case 'string': 
  
                      newJSON[key][fields] = normalizeString(recipe[fields])                  
                      
                      break
                      case 'number':
                      newJSON[key][fields] = recipe[fields]
                      break
                      case 'object': 
  
                      newJSON[key][fields] = []
  
                      recipe[fields].forEach(lowerLevel => {
  
                          switch(typeof(lowerLevel)){
  
                              case 'string':
  
                              newJSON[key][fields].push(normalizeString(lowerLevel))
                                  
                              break;
                              case 'object': 
  
                              const newEntries = {}

                              const lowerLevelKeys = Object.keys(lowerLevel)
                              lowerLevelKeys.forEach(thisKeys => {
                                  
                                  newEntries[thisKeys] = normalizeString(lowerLevel[thisKeys])
  
                              });

                              newJSON[key][fields].push(newEntries)
                              
                              //console.log(newEntries);
                              
                              break;
                          }
                          
                      });
                       
                      break
                  }
              });
  
              
          });
          
          return newJSON
    }


}

const alterate = new AlterateJSON()