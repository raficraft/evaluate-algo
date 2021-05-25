class GetData{

    constructor(){
      
        this.recipes = dataJSON                  
        this.JSON = alterate.JSON
        this.flatJSON = alterate.flatJSON

        console.log('dictionnary',this.flatJSON);
       // console.log(this.JSON);

    }

    /**
     * METHOD 01 { NormalizeJSON }
     */

    normalizeJSON_V1(keyWords){

            const keyWordsArray = keyWords.trim().replace(/  +/g, ' ').split(' ')    
    
            const result = new Set()
    
            keyWordsArray.forEach(keyword => {
                if(!stopwords.includes(keyword)){
                    this.JSON.forEach(recipe=>{
        
                        if(!result.has(recipe.id)){
                            if(recipe.name || recipe.description){
        
                                let context = ''
        
                                if(recipe.name){
                                    context = 'name'
                                }else if(recipe.description){
                                    context = 'description'
                                }
        
                                if(recipe.name.includes(keyword) || recipe.description.includes(keyword)){
                                    result.add({
                                    id : recipe.id,
                                    value : recipe[context],
                                    context : context,
                                    fields : context,
                                    depth : 'root',
                                    search : keyword
                                    })
                                }
                            }                    
                            
                            if(recipe.ingredients){
        
                                recipe.ingredients.forEach(ing => {
                                    if(ing.ingredient.includes(keyword)){
                                        result.add({
                                            id : recipe.id,
                                            value : ing.ingredient,
                                            context : 'ingredients',
                                            fields : 'ingredient',
                                            depth : 'lowerLevel',
                                            search : keyword
                                        })
                                    }
                                    
                                });
                            }
                        }
        
                    })
                } 
            });
    
            return result
    
    } 

    normalizeJSON_V2(keyWords){

            
        const optionsLenght  = init.globalOptions.length
        const keyWordsArray = keyWords.trim().replace(/  +/g, ' ').split(' ') 
        const keyWordLength = keyWordsArray.length
        const finalResult = new Set()

        //On boucle pour chaque mots saisie dans la barre de recherche
        for(let inc = 0 ; inc < keyWordLength ; inc++){

            if(!stopwords.includes(keyWordsArray[inc])){

                for(let incOptions = 0 ; incOptions < optionsLenght ; incOptions++){

                    const fields = init.globalOptions[incOptions]['fields']
                    let context = init.globalOptions[incOptions]['context']
                    const depth = init.globalOptions[incOptions]['depth']

                    

                    
                        const regex = new RegExp(keyWordsArray[inc], 'g');
                        const jsonLength = this.JSON.length

                        for(let incJson = 0 ; incJson < jsonLength ; incJson++){

                            if(depth === 'root'){

                                if(this.JSON[incJson][context].match(regex)){
                                    finalResult.add({
                                        id: this.JSON[incJson]['id']
                                    })
                                }
                            }

                            if(depth === 'lowerLevel'){

                                this.JSON[incJson][context].forEach(ing => { 
                                if(ing[fields].match(regex)){
                                    finalResult.add({
                                        id: this.JSON[incJson]['id']
                                    })
                                }
                            });   
                            }
                        }
                    }
                }
            }

        // On boucle sur les tableau D'id pour ne conserver que les id uniques

        const uniqueID = []

        finalResult.forEach((data) => {     

            if(!uniqueID.includes(data.id)){
                uniqueID.push(data.id)
            }
             
    });

  
    
    const id = getData.getRecipeByID(uniqueID);

 
    return id

    }


    normalizeJSON_V3(options){

        let result = []
        switch(options.depth){

            case 'root':
                this.JSON.forEach((recipe) => {  
                    if(recipe[options.fields].includes(options.search)){
                        result.push({
                            id: recipe.id,
                            value: recipe[options.fields],
                            context: options.context,
                            fields: options.fields,
                            depth: options.depth,
                            search: options.search,
                        });
                    }
                })  

                
            break;

            case 'lowerLevel': 
                this.JSON.forEach(recipe => {
                
                    const thisArray = recipe[options.context]          
        
                    thisArray.filter((el) => {
        
                        if(options.fields !== options.context){ el = el[options.fields]}
                        
                        if(el.includes(options.search)){ 
                            result.push({
                            id: recipe.id,
                            value: el,
                            context: options.context,
                            fields: options.fields,
                            depth: options.depth,
                            search: options.search,
                            });
                        }
                    })             
                })    

            break;
        }
        return result

    }

    normalizeJSON_V4(keyWords){

        const options = init.globalOptions
        let result = []

        const keyWordsArray = keyWords.trim().replace(/  +/g, ' ').split(' ') 

        for (const key in keyWordsArray) {
             
                if (Object.hasOwnProperty.call(keyWordsArray, key)) {
                    const keyword = keyWordsArray[key];

                    const lineResult = []
                    if(!stopwords.includes(keyword)){
                        for (const key in options) {
                            if (Object.hasOwnProperty.call(options, key)) {

                                const lineResult =[]
                                const option = options[key];

                                switch(option.depth){

                                    case 'root': 

                                    for (const key in this.JSON) {
                                        if (Object.hasOwnProperty.call(this.JSON, key)) {
                                            const element = this.JSON[key];
                                

                                            if(element[option.fields].includes(keyword)){
                                                lineResult.push({id : element.id})
                                            }
                                            
                                        }
                                    }
                                    
                                    break;
                                    case 'lowerLevel': 

                                    for (const key in this.JSON) {
                                        if (Object.hasOwnProperty.call(this.JSON, key)) {
                                            const recipe = this.JSON[key];                

                                            const fieldParent = recipe[option.context]

                                            for (const key in fieldParent) {
                                                if (Object.hasOwnProperty.call(fieldParent, key)) {
                                                    const el = fieldParent[key];

                                                    if(el[option.fields].includes(keyword)){
                                                        lineResult.push({
                                                            id : recipe.id
                                                        })
                                                    }

                                                    
                                                }
                                            }
                                            
                                            
                                        }
                                    }
                                    
                                    break;
                                }
                                result.push(lineResult)                    
                            }                
                        }
                    }
                
            }
        }

        return result
      
    }


    normalizeJSON_V5(keyWords){

        const keyWordsArray = keyWords.trim().replace(/  +/g, ' ').split(' ') 

        const options = init.globalOptions
        let result = []
        for (const keyword of keyWordsArray) {
                if(!stopwords.includes(keyword)){
                const lineResult = []

                for (const option of options) {

                    const field = option.fields

                    switch (option.depth){

                        case 'root' : 

                        for (const recipe of this.JSON) {

                            if(recipe[field].includes(keyword)){
                                lineResult.push({id : recipe.id})
                            }
                            
                        }
                        
                        break;


                        case 'lowerLevel' : 

                        for (const recipe of this.JSON) {

                        // console.log(recipe[option.context]);
                            const parentField = recipe[option.context]

                            for (const element of parentField) {

                                const childField = option.fields

                                //console.log(element[childField]);
                                if(element[childField].includes(keyword)){

                                    lineResult.push({id : recipe.id})

                                }
                                
                            }
                        }               
                        
                        break;
                    }
                }
                result.push(lineResult)
            }
        }

        return result

    }

    normalizeJSON_V6(keyWords){

        const result = []
        const options = init.globalOptions
        const keyWordsArray = keyWords.trim().replace(/  +/g, ' ').split(' ') 

    keyWordsArray.forEach(keyword => {
        if(!stopwords.includes(keyword)){
            options.forEach(option => {

                
                if(option.depth === 'root'){
                //console.log(this.JSON.filter(data => data[option.context].includes(keyWords)));
                    result.push(this.JSON.filter(data => data[option.context].includes(keyword)));
                }

                if(option.depth === 'lowerLevel'){
                result.push(this.JSON.filter(data => 
                    data[option.context].some(dataLowerLevel => dataLowerLevel[option.fields].includes(keyword))
                    ))
                }   
                
               
            });
        }
    })      

        return result

    }


    /**
     * METHOD 02 { Dictionnary } 
     */
    
     dictionnary_V1(keyWords){

        const keyWordsArray = keyWords.trim().replace(/  +/g, ' ').split(' ')  
        const result = new Set()
        const keyWordLength = keyWordsArray.length
        
        for(let inc = 0 ; inc < keyWordLength ; inc++){

            if(!stopwords.includes(keyWordsArray[inc])){

                const regex = new RegExp(keyWordsArray[inc], 'g');
                const jsonLength = this.JSON.length

                for(let incJson = 1 ; incJson <= jsonLength ; incJson++){

                    if(this.flatJSON[incJson].match(regex)){                
                        result.add(incJson)                
                    
                    }
                }
            }
        }

        return result
    }


     dictionnary_V2(keyWords){

        const keyWordsArray = keyWords.trim().replace(/  +/g, ' ').split(' ') 
        const result = new Set()

        keyWordsArray.forEach(keyword => {
            if(!stopwords.includes(keyword)){

                this.flatJSON.forEach((recipe,key )=> {
                    if(recipe.includes(keyword)){
                        result.add(key)
                    }                
                });
            }
        })

        return result
    }


    dictionnary_V3(keyWords){

        const keyWordsArray = keyWords.trim().replace(/  +/g, ' ').split(' ') 
        const result = new Set()

        for (const key in keyWordsArray) {
            if (Object.hasOwnProperty.call(keyWordsArray, key)) {
                const keyword = keyWordsArray[key];

                if(!stopwords.includes(keyword)){
                    for (const id in this.flatJSON) {
                        if (Object.hasOwnProperty.call(this.flatJSON, id)) {

                            if(this.flatJSON[id].includes(keyword)){
                                result.add(parseInt(id))
                            } 
                            
                        }
                    }    
                }            
            }
        }
      
        return result    
    }

    dictionnary_V4(keyWords){

        const keyWordsArray = keyWords.trim().replace(/  +/g, ' ').split(' ') 
        const result = new Set()

        for (const keyword of keyWordsArray) {
            if(!stopwords.includes(keyword)){

                let thisKey = 0 
                for (const element of this.flatJSON) {

                if(element){

                    if(element.includes(keyword)){
                        result.add(thisKey)
                    }
                }
                thisKey++                   
                }
            }           
        } 

        return result
    }

    dictionnary_V5(keyWords){

        const keyWordsArray = keyWords.trim().replace(/  +/g, ' ').split(' ') 
        let result = new Set()

        keyWordsArray.forEach(keyword => {
            if(!stopwords.includes(keyword)){                
        
                this.flatJSON.filter((data,key)=> {
                    if(data.includes(keyword)){
                        result.add(data)
                    }                    
                })
            }
            
        })

        return result

    }

    getRecipeByID(data){
        let result = []
        data.forEach((el)=>{           
            result.push(this.recipes.find(recipes => recipes.id === el))
        })
        return result
    }
}

const getData = new GetData()
