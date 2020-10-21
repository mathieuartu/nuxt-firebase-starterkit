export interface User {
    createdRecipes?: Array<string>
    createdShoppingLists?: Array<string>
    email?: string
    emailVerified?: boolean
    favoriteRecipes?: Array<string>
    favoriteShoppingLists?: Array<string>
    name?: string
    photoUrl?: string
    uid?: string
}

export class User {
    constructor(user: User) {
        this.createdRecipes = user.createdRecipes || []
        this.createdShoppingLists = user.createdShoppingLists || []
        this.email = user.email || undefined
        this.emailVerified = !!user.emailVerified
        this.favoriteRecipes = user.favoriteRecipes || []
        this.name = user.name || undefined
        this.photoUrl = user.photoUrl || undefined
        this.uid = user.uid || undefined
    }
}
