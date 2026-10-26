import { Link } from 'react-router-dom'
import type { Recipe } from '../types/recipe'

interface RecipeCardProps {
  receita: Recipe
  favorita: boolean
  onFavoritar: (id: number) => void
}

function RecipeCard({ receita, favorita, onFavoritar }: RecipeCardProps) {
  // tempo total calculado no front
  const tempoTotal = receita.prepTimeMinutes + receita.cookTimeMinutes

  return (
    <article className="card">
      <Link to={`/receitas/${receita.id}`}>
        <img src={receita.image} alt={receita.name} />
      </Link>
      <div className="card-info">
        <Link to={`/receitas/${receita.id}`} className="card-titulo">
          {receita.name}
        </Link>
        <p>{receita.cuisine}</p>
        <p>⏱ {tempoTotal} min</p>
        <button
          className={favorita ? 'botao-favorito ativo' : 'botao-favorito'}
          onClick={() => onFavoritar(receita.id)}
        >
          {favorita ? '♥ Favorita' : '♡ Favoritar'}
        </button>
      </div>
    </article>
  )
}

export default RecipeCard
