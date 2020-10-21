export interface Recipe {
    ingredients?: Array<string>
    name: string | null
    photoUrl: string | null
    createdBy: string | null
    uid: string | null
}

export class Recipe {
    constructor(recipe: Recipe) {
        this.ingredients = recipe.ingredients || []
        this.name = recipe.name || null
        this.photoUrl = recipe.photoUrl || null
        this.createdBy = recipe.createdBy || null
        this.uid = recipe.uid || null
    }
}
