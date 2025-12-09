'use client';

export default function NavMenu() {
  const closeMenu = () => {
    const checkbox = document.getElementById('nav-toggle') as HTMLInputElement;
    if (checkbox) checkbox.checked = false;
  };

  return (
    <div className="nav-links-wrapper" onClick={(e) => {
      // Cerrar al hacer click en el overlay (fondo oscuro)
      if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains('nav-overlay')) {
        closeMenu();
      }
    }}>
      <div className="nav-links">
        <button 
          className="nav-close-btn" 
          onClick={closeMenu}
          aria-label="Cerrar menú"
        >
          ×
        </button>
        <ul>
          <li>
            <a href="#top" onClick={closeMenu}>
              Inicio
            </a>
          </li>
          <li>
            <a href="#filtros" onClick={closeMenu}>
              Categorías
            </a>
          </li>
        </ul>
        <button className="btn-outline nav-cta" onClick={closeMenu}>
          Iniciar sesión
        </button>
      </div>
    </div>
  );
}


