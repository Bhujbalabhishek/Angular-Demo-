
import { Ingredient } from 'src/app/shared/ingrdient.model';
import * as ShoppingListActions from './shopping-list.actions';

const initialState = {
    ingredients : [

        new Ingredient('rice',10),
        new Ingredient('Tomato',3)
    
      ]

};

export function shoppingListReducer (state = initialState, action: ShoppingListActions.ShoppingListActions ){
    switch(action.type){
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };
            default:
              return state;
    }
}