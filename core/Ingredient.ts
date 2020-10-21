export interface Ingredient {
    name?: string
    photoUrl?: string
    createdBy?: string
    uid?: string
}

export class Ingredient {
    constructor(ingredient: Ingredient) {
        this.name = ingredient.name || undefined
        this.photoUrl = ingredient.photoUrl || undefined
        this.createdBy = ingredient.createdBy || undefined
        this.uid = ingredient.uid || undefined
    }
}
