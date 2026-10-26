import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { Recipe } from '../types/recipe'

function Detalhe() {
  const { id } = useParams()
  const [receita, setReceita] = useState<Recipe | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [naoExiste, setNaoExiste] = useState(false)
  const [erro, setErro] = useState('')

  useEffect(() => {
    async function buscarReceita() {
      setCarregando(true)
      setNaoExiste(false)
      setErro('')
      try {
        const resposta = await fetch(`https://dummyjson.com/recipes/${id}`)
        if (resposta.status === 404) {
          setNaoExiste(true)
          return
        }
        if (!resposta.ok) {
          throw new Error('Erro na API')
        }
        const dados: Recipe = await resposta.json()
        setReceita(dados)
      } catch {
        setErro('Não foi possível carregar a receita. Tente novamente mais tarde.')
      } finally {
        setCarregando(false)
      }
    }
    buscarReceita()
  }, [id])

  if (carregando) {
    return <p className="aviso">Carregando receita...</p>
  }

  if (naoExiste) {
    return (
      <div className="aviso">
        <h1>Receita não encontrada</h1>
        <p>Não existe receita com o id {id}.</p>
        <Link to="/">Voltar ao catálogo</Link>
      </div>
    )
  }

  if (erro || !receita) {
    return (
      <div className="aviso">
        <p>{erro}</p>
        <Link to="/">Voltar ao catálogo</Link>
      </div>
    )
  }

  return (
    <article className="detalhe">
      <Link to="/" className="voltar">← Voltar ao catálogo</Link>

      <div className="detalhe-topo">
        <img src={receita.image} alt={receita.name} />
        <div>
          <h1>{receita.name}</h1>
          <p>{receita.cuisine} · {receita.difficulty}</p>
          <ul className="tempos">
            <li>Preparo: {receita.prepTimeMinutes} min</li>
            <li>Cozimento: {receita.cookTimeMinutes} min</li>
            <li>Total: {receita.prepTimeMinutes + receita.cookTimeMinutes} min</li>
            <li>Rende: {receita.servings} porções</li>
          </ul>
        </div>
      </div>

      <div className="detalhe-colunas">
        <section>
          <h2>Ingredientes</h2>
          <ul>
            {receita.ingredients.map((ingrediente, index) => (
              <li key={index}>{ingrediente}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2>Modo de preparo</h2>
          <ol>
            {receita.instructions.map((passo, index) => (
              <li key={index}>{passo}</li>
            ))}
          </ol>
        </section>
      </div>
    </article>
  )
}

export default Detalhe
