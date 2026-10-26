import { useEffect, useState } from 'react'
import RecipeCard from '../components/RecipeCard'
import type { Recipe, RecipesResponse } from '../types/recipe'

function Catalogo() {
  const [receitas, setReceitas] = useState<Recipe[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [busca, setBusca] = useState('')
  const [culinaria, setCulinaria] = useState('')
  const [favoritas, setFavoritas] = useState<number[]>([])
  const [somenteFavoritas, setSomenteFavoritas] = useState(false)

  useEffect(() => {
    async function buscarReceitas() {
      try {
        const resposta = await fetch('https://dummyjson.com/recipes?limit=0')
        if (!resposta.ok) {
          throw new Error('Erro na API')
        }
        const dados: RecipesResponse = await resposta.json()
        setReceitas(dados.recipes)
      } catch {
        setErro('Não foi possível carregar as receitas. Tente novamente mais tarde.')
      } finally {
        setCarregando(false)
      }
    }
    buscarReceitas()
  }, [])

  // lista de culinárias montada a partir dos dados da API (sem repetir)
  const culinarias: string[] = []
  receitas.forEach((receita) => {
    if (!culinarias.includes(receita.cuisine)) {
      culinarias.push(receita.cuisine)
    }
  })
  culinarias.sort()

  // busca, filtro de culinária e filtro de favoritas funcionando juntos
  const receitasFiltradas = receitas.filter((receita) => {
    const nomeBate = receita.name.toLowerCase().includes(busca.toLowerCase())
    const culinariaBate = culinaria === '' || receita.cuisine === culinaria
    const favoritaBate = !somenteFavoritas || favoritas.includes(receita.id)
    return nomeBate && culinariaBate && favoritaBate
  })

  function alternarFavorito(id: number) {
    if (favoritas.includes(id)) {
      setFavoritas(favoritas.filter((fav) => fav !== id))
    } else {
      setFavoritas([...favoritas, id])
    }
  }

  if (carregando) {
    return <p className="aviso">Carregando receitas...</p>
  }

  if (erro) {
    return <p className="aviso">{erro}</p>
  }

  return (
    <section>
      <div className="topo-catalogo">
        <h1>Catálogo de receitas</h1>
        <span className="contador">{favoritas.length} favoritas</span>
      </div>

      <div className="filtros">
        <input
          type="text"
          placeholder="Buscar por nome..."
          aria-label="Buscar receita por nome"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <select
          value={culinaria}
          onChange={(e) => setCulinaria(e.target.value)}
          aria-label="Filtrar por culinária"
        >
          <option value="">Todas as culinárias</option>
          {culinarias.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <label className="check-favoritas">
          <input
            type="checkbox"
            checked={somenteFavoritas}
            onChange={(e) => setSomenteFavoritas(e.target.checked)}
          />
          Só favoritas
        </label>
      </div>

      {receitasFiltradas.length === 0 ? (
        <p className="aviso">
          {somenteFavoritas && favoritas.length === 0
            ? 'Você ainda não favoritou nenhuma receita.'
            : 'Nenhuma receita encontrada com esses filtros.'}
        </p>
      ) : (
        <div className="grid">
          {receitasFiltradas.map((receita) => (
            <RecipeCard
              key={receita.id}
              receita={receita}
              favorita={favoritas.includes(receita.id)}
              onFavoritar={alternarFavorito}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default Catalogo
