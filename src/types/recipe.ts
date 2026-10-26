// Campos de uma receita que o app usa (modelados a partir do JSON da DummyJSON)
export interface Recipe {
  id: number
  name: string
  ingredients: string[]
  instructions: string[]
  prepTimeMinutes: number
  cookTimeMinutes: number
  servings: number
  difficulty: string
  cuisine: string
  tags: string[]
  mealType: string[]
  image: string
  rating: number
}

// A lista não vem como array direto, vem dentro deste objeto
export interface RecipesResponse {
  recipes: Recipe[]
  total: number
  skip: number
  limit: number
}
