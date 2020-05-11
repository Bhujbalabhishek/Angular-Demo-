import { Ingredient } from '../shared/ingrdient.model';

export class Recipe{
public name:string;
public description:string;
public ImagePath:string;
public ingredients:Ingredient[];

constructor(name: string, desc: string, path: string, ingredients: Ingredient[])
{
    this.name = name;
    this.description = desc;
    this.ImagePath = path;
    this.ingredients = ingredients;
}
}