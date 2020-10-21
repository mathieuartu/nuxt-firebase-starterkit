export interface ShoppingList {
    recipes?: Array<string>
    name?: string
    createdBy?: string
    uid?: string
}

export class ShoppingList {
    constructor(shoppingList: ShoppingList) {
        this.recipes = shoppingList.recipes || []
        this.name = shoppingList.name || undefined
        this.createdBy = shoppingList.createdBy || undefined
        this.uid = shoppingList.uid || undefined
    }
}
