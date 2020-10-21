export interface ShoppingList {
    recipes?: Array<string>
    name: string | null
    createdBy: string | null
    uid: string | null
}

export class ShoppingList {
    constructor(shoppingList: ShoppingList) {
        this.recipes = shoppingList.recipes || []
        this.name = shoppingList.name || null
        this.createdBy = shoppingList.createdBy || null
        this.uid = shoppingList.uid || null
    }
}
