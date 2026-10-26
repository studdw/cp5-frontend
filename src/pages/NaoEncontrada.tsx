import { Link } from 'react-router-dom'

function NaoEncontrada() {
  return (
    <div className="aviso">
      <h1>404 - Página não encontrada</h1>
      <p>O endereço que você acessou não existe.</p>
      <Link to="/">Voltar ao catálogo</Link>
    </div>
  )
}

export default NaoEncontrada
