import { Component, OnInit, OnDestroy} from '@angular/core';
import { Ingredient } from '../shared/ingrdient.model';
import { ShoppingListService } from './shopping-list.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy  {
  ingredients : Observable<{ ingredients: Ingredient[] }>;
  // private idChanged : Subscription

  constructor(
    private shoppinListService : ShoppingListService,
    private store: Store<{shoppingList : { ingredients : Ingredient[] } }>
    ){}

ngOnInit()
{
  this.ingredients = this.store.select('shoppingList');
//  this.ingredients =  this.shoppinListService.getIngredients();
//  this.idChanged = this.shoppinListService.ingredientsChanged.subscribe(
//    (ingredient  : Ingredient[]) => 
//    {
//      this.ingredients = ingredient;
//    }
//  )
}
ngOnDestroy()
{
  // this.idChanged.unsubscribe();
}

onEditItem(index : number){
  this.shoppinListService.startedEditing.next(index);
}
}
