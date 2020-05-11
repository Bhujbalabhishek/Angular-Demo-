import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingrdient.model';
// import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs/internal/Subject';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';


@Injectable()
export class RecipeService{

  recipesChnaged = new Subject<Recipe[]>();
  
   constructor(
    //  private shoppingListService : ShoppingListService,
     private store: Store<{shoppingList : { ingredients : Ingredient[] } }>
     ){}
  //  private recipes: Recipe[] = [
    
  //       new Recipe('biryani Recipe','the veg biryani',
  //       'https://c1.peakpx.com/wallpaper/172/344/1007/food-caribian-food-rise-wallpaper-preview.jpg',
  //       [
  //           new Ingredient('vegetables', 5),
  //           new Ingredient('paneer', 4)
  //       ]
  //       ), 
  //       new Recipe('biryani Recipe','the Non-veg biryani',
  //       'https://c1.peakpx.com/wallpaper/172/344/1007/food-caribian-food-rise-wallpaper-preview.jpg',
  //       [
  //           new Ingredient('chicken', 4),
  //           new Ingredient('Mutton', 3)
  //       ] 
  //       )
  //     ];

  private recipes :Recipe[] = [] ;


    setRecipes(recipe:Recipe[]){
      this.recipes =recipe;
      this.recipesChnaged.next(this.recipes.slice());
    }

    getRecipes()
    {
          return this.recipes.slice();
    }

    getRecipe(index:number)
    {
      return this.recipes[index];
    }

    addIngrdientsToShoppingList(ingredients : Ingredient[])
    {
        // this.shoppingListService.addIngredients(ingredients);

        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    }
    addRecipe(recipe:Recipe)
    {
      this.recipes.push(recipe);
      this.recipesChnaged.next(this.recipes.slice());
    }

    updateRecipe(index:number,newRecipe : Recipe)
    {
      this.recipes[index] = newRecipe;
      this.recipesChnaged.next(this.recipes.slice());
    }
    
    deleteRecipe(index : number){
      this.recipes.splice(index, 1);
      this.recipesChnaged.next(this.recipes.slice());
    }
}