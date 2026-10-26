import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">🍲 Receitário</Link>
      <nav>
        <Link to="/">Catálogo</Link>
      </nav>
    </header>
  )
}

export default Header
