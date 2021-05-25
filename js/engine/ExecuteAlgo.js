class Exec{

    constructor(){

        
        this.params = {
            useCache : false,
            iteration : 1,
            keyWords : '',
            storage : 'sessions',
            storageArray : []
        }    


    }
    /**
     *  MAGIC STRING
     */

    method01_normalizeAlgo_V1(){ 


        const thisAlgo = () => {            

            const getID = getData.normalizeJSON_V1(this.keyWords) 
            const uniqueID = getUniqueIDinSingleLoop(getID)
            const result = getData.getRecipeByID(uniqueID)              

            return [ result, uniqueID ]
        }  
        
       
        this.benchAlgo(thisAlgo,'table .method2 .algo1')
        const [result , uniqueID] = thisAlgo()
        this.showResult(result,'table .resultMethod2 .result1', 'Methode 1 Algo V1') 
        //uniqueID is a set
        this.params.storageArray = JSON.stringify([...uniqueID])


        if(this.storageManager(this.keyWords,this.params.storageArray) === true){             
            this.checkStorage()            
        }            
    }

    method01_normalizeAlgo_V2(){

        const thisAlgo = () => { 
            const result = getData.normalizeJSON_V2(this.keyWords)
            return result
        }

        this.benchAlgo(thisAlgo,'table .method2 .algo2')

        const result = thisAlgo()
        this.showResult(result,'table .resultMethod2 .result2', 'Methode 1 Algo V2')           

    }

    method01_normalizeAlgo_V3(){

        const thisAlgo = () => {

            const keyWordsArray = this.keyWords.trim().replace(/  +/g, ' ').split(' ')        
            const idByGlobal = idByGlobalSearch(keyWordsArray)
            const uniqueID = getUniqueID(idByGlobal) 

            return  uniqueID;  
        }

        this.benchAlgo(thisAlgo,'table .method2 .algo3')

        const result = thisAlgo()
        this.showResult(result,'table .resultMethod2 .result3', 'Methode 1 Algo V3') 

    }

    method01_normalizeAlgo_V4(){

        const thisAlgo = () => {
            const idByGlobal = getData.normalizeJSON_V4(this.keyWords)
            const uniqueID = getUniqueID(idByGlobal) 
            return  uniqueID;                 
        }         

        this.benchAlgo(thisAlgo,'table .method2 .algo4')

        const result = thisAlgo()
        this.showResult(result,'table .resultMethod2 .result4', 'Methode 1 Algo V4') 
      
    }


    method01_normalizeAlgo_V5(){

        const thisAlgo = () => {
            const idByGlobal = getData.normalizeJSON_V5(this.keyWords)
            const uniqueID = getUniqueID(idByGlobal) 
            return  uniqueID;
                          
        }        
        
        this.benchAlgo(thisAlgo,'table .method2 .algo5')

        const result = thisAlgo()
        this.showResult(result,'table .resultMethod2 .result5', 'Methode 1 Algo V5')

      
    }

    method01_normalizeAlgo_V6(){

        const thisAlgo = () => {
           
            const idByGlobal = getData.normalizeJSON_V6(this.keyWords)
            const uniqueID = getUniqueIdWithFilterResult(idByGlobal) 
            return  uniqueID;

        }              

        
        this.benchAlgo(thisAlgo,'table .method2 .algo6')

        const result = thisAlgo()
        this.showResult(result,'table .resultMethod2 .result6', 'Methode 1 Algo V5')

      
    }

    method02_dictionnaryAlgo_V1(){

        const thisAlgo = () => {
            const getID = getData.dictionnary_V1(this.keyWords)
            const result = getData.getRecipeByID(getID) 

            return result
        }

        this.benchAlgo(thisAlgo,'table .method3 .algo2')

        const result = thisAlgo()
        this.showResult(result,'table .resultMethod3 .result2', 'Methode 2 Algo V1') 

    }

    method02_dictionnaryAlgo_V2(){

        const thisAlgo = () => {
            const getID = getData.dictionnary_V2(this.keyWords)
            const result = getData.getRecipeByID(getID)

            return result
        }

        this.benchAlgo(thisAlgo,'table .method3 .algo3')

        const result = thisAlgo()
        this.showResult(result,'table .resultMethod3 .result3', 'Methode 2 Algo V2') 
    }

    method02_dictionnaryAlgo_V3(){

        const thisAlgo = () => {
            const getID = getData.dictionnary_V3(this.keyWords)
            const result = getData.getRecipeByID(getID)
          
            return result
        }        
        
          this.benchAlgo(thisAlgo,'table .method3 .algo4')

          const result = thisAlgo()
          this.showResult(result,'table .resultMethod3 .result4', 'Methode 2 Algo V3')       
    }

    method02_dictionnaryAlgo_V4(){

        const thisAlgo = () => {
            const getID = getData.dictionnary_V4(this.keyWords)
            const result = getData.getRecipeByID(getID)
          
            return result
        }        
        
          this.benchAlgo(thisAlgo,'table .method3 .algo5')

          const result = thisAlgo()
          this.showResult(result,'table .resultMethod3 .result5', 'Methode 2 Algo V4')        
    }

    method02_dictionnaryAlgo_V5(){

        const thisAlgo = () => {
            const result = getData.dictionnary_V5(this.keyWords)                     
            return result
        }        

        thisAlgo()
        
          this.benchAlgo(thisAlgo,'table .method3 .algo6')

          const result = thisAlgo()
          this.showResult(result,'table .resultMethod3 .result6', 'Methode 2 Algo V4')  
          
         
    }

    

    benchAlgo(callback,injectHere){

       const t0 = performance.now();
       for(let i = 0; i < this.iteration; i++){
        callback();   
       }
       const timing = performance.now() - t0  
       const resultTarget = document.querySelector(injectHere)
       resultTarget.innerHTML = `${Math.round(timing * 100) / 100} ms`
      
    }

    showResult(result, injectHere, version ){

       
        let val = ''
        !result.length ?  val = result.size : val = result.length
       
        //console.log(`Tableau des recette renvoyé ${version} `, result);
        const resultCount = document.querySelector(injectHere)
        resultCount.innerHTML = `${val}`

    }

    storageManager(keyWords,storage){

        const storageMessage = document.querySelector('table .method4 .algo1')
        storageMessage.innerHTML = ''
        const storageResult = document.querySelector('table .resultMethod4 .result1')
        storageResult.innerHTML = ''

        function extractCookies() {
            return document.cookie.split('; ').reduce((acc, curr) => {
              const pair = curr.split('=');
              acc[pair[0]] = pair[1];
              return acc;
            }, {})
        }
      
        switch(this.params.storage){
            case 'cookies':

                const cookiesArray = extractCookies()          

                if(cookiesArray[keyWords]){
                    return true
                }else{
                    document.cookie = `${keyWords}=${storage}`
                    return false
                }
          
                break;
            case 'sessions':



                if(sessionStorage.getItem(keyWords)){ 


                    return true

                }else{

                    sessionStorage.setItem(this.keyWords, storage);
                    storageMessage.innerHTML = 'Insertion de la recherche dans le gestionnaire de storage'                   
                    storageResult.innerHTML = 'none'
                    return false
                }
                  
            break;

            case 'locale':

                if(localStorage.getItem(keyWords)){
                    return true
                }else{
                    localStorage.setItem(this.keyWords, storage);
                    storageMessage.innerHTML = 'Insertion de la recherche dans le gestionnaire de storage'                   
                    storageResult.innerHTML = 'none'
                  
                    return false
                }

                break;
        }  

        return false

    }

    checkStorage(){

        const getResultStorage = () => {            

            const uniqueID = JSON.parse(this.params.storageArray) 
            const result = getData.getRecipeByID(uniqueID)  
            return result
        }    

        const resultCookies = getResultStorage()
        //Bench
        this.benchAlgo(getResultStorage,'table .method4 .algo1')
        this.showResult(resultCookies,'table .resultMethod4 .result1', `resultat avec ${this.params.storage}`)    
       
     
    }
}