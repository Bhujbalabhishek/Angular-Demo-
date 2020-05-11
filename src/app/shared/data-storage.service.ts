import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn:'root'})
export class DataStorageService
{

    constructor(private http:HttpClient, private recipeService:RecipeService,
        private authService:AuthService){}

    storeRecipes()
    {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://fir-a2671.firebaseio.com/recipes.json',recipes).subscribe(
            resposne => {
                console.log(resposne);
            }
        );
    }

    fetchRecipes(){
            return this.http.get<Recipe[]>('https://fir-a2671.firebaseio.com/recipes.json')
    .pipe(
            map(
            recipes =>
            {
                //javascripe array method
                return recipes.map(recipe =>
                    {
                        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
                    });
            }),
            tap(recipes =>
                {
                    this.recipeService.setRecipes(recipes);
                }),
    );
    }
}   
