class GetResult{

    constructor(){

        this.inputSearch = document.querySelector('input[name="search"]')
        this.radioStorage = document.querySelectorAll('input[name="storage"]')
        this.inputIteration = document.querySelector('input[name="iteration"]')
        this.storage = 'sessions'

        this.radioStorage.forEach(radio => {
            radio.addEventListener('click', (e)=>{
                this.storage = e.target.value   
                console.log(this.storage);             
            })            
        });
        
        this.inputSearch.addEventListener('keyup',debounce((e)=>{              
            
            this.inputIteration.value ? this.iteration = this.inputIteration.value : this.iteration = 1
            this.findResult()

        },300))         
    }

    findResult(){

        const keyWords = normalizeString(this.inputSearch.value)
        
        /* Method Nurméro 2 { normalize JSON }*/  
          
         const exec = new Exec()

         exec.iteration = this.iteration
         exec.keyWords = keyWords 
         exec.params.storage = this.storage

         exec.method01_normalizeAlgo_V1()
         exec.method01_normalizeAlgo_V2()
         exec.method01_normalizeAlgo_V3()
         exec.method01_normalizeAlgo_V4()
         exec.method01_normalizeAlgo_V5()
         exec.method01_normalizeAlgo_V6()

         exec.method02_dictionnaryAlgo_V1()
         exec.method02_dictionnaryAlgo_V2()
         exec.method02_dictionnaryAlgo_V3()
         exec.method02_dictionnaryAlgo_V4()
         exec.method02_dictionnaryAlgo_V5()

    }
}

const getResult = new GetResult()