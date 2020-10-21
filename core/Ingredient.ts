export interface Ingredient {
    name: string | null
    photoUrl: string | null
    createdBy: string | null
    uid: string | null
}

export class Ingredient {
    constructor(ingredient: Ingredient) {
        this.name = ingredient.name || null
        this.photoUrl = ingredient.photoUrl || null
        this.createdBy = ingredient.createdBy || null
        this.uid = ingredient.uid || null
    }
}
