export interface User {
    createdRecipes?: Array<string>
    createdShoppingLists?: Array<string>
    email: string | null
    emailVerified: boolean
    favoriteRecipes?: Array<string>
    favoriteShoppingLists?: Array<string>
    name?: string | null
    photoUrl?: string | null
    uid: string | null
}

export class User {
    constructor(user: User) {
        this.createdRecipes = user.createdRecipes || []
        this.createdShoppingLists = user.createdShoppingLists || []
        this.email = user.email || null
        this.emailVerified = !!user.emailVerified
        this.favoriteRecipes = user.favoriteRecipes || []
        this.name = user.name || null
        this.photoUrl = user.photoUrl || null
        this.uid = user.uid || null
    }
}
