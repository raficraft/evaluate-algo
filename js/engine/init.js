
class Init{
    
    constructor(){
      //On passe le JSON dans l'atelier pour obtenir le Bloc HTML
      //qui affiche toutes les recettes

      this.globalOptions = [
        {context : 'name', fields : 'name',depth : 'root'},
        {context : 'ingredients', fields : 'ingredient', depth : 'lowerLevel'},
        {context : 'description', fields : 'description', depth : 'root' }
    ]          
    console.log(this.globalOptions);
    console.log(navigator.languages);
    } 


    

}


const init = new Init()

