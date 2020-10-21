export interface Recipe {
    ingredients?: Array<string>
    name?: string
    photoUrl?: string
    createdBy?: string
    uid?: string
}

export class Recipe {
    constructor(recipe: Recipe) {
        this.ingredients = recipe.ingredients || []
        this.name = recipe.name || undefined
        this.photoUrl = recipe.photoUrl || undefined
        this.createdBy = recipe.createdBy || undefined
        this.uid = recipe.uid || undefined
    }
}
