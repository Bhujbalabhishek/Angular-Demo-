import { Ingredient } from '../shared/ingrdient.model';
import { Subject } from 'rxjs/internal/Subject';
//import { EventEmitter } from '@angular/core';


export class ShoppingListService{
    ingredientsChanged =new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    private ingredients : Ingredient[] = [

        new Ingredient('rice',10),
        new Ingredient('Tomato',3)
    
      ];
      getIngredients()
      {
          return this.ingredients.slice();
      }
      getIngredient(index : number){
        return this.ingredients[index];
      }
      
      addIngrdient(ingredient : Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
      }
      addIngredients(ingredients : Ingredient[])
      {
        //   for(let ingredient of ingredients )
        //   {
        //       this.addIngrdient(ingredient);
        //   }

        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      updateIngredient(index : number,newIngredient : Ingredient)
      {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      deleteIngredient(index : number){
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
      }
    }