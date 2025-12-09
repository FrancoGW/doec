'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import aliadosEstrategicos from '../assets/aliados-estrategicos-3.png';
import logoIfeFondo from '../assets/Logo IFE (jpg con fondo).svg';
import logoCorrExportaBanner from '../assets/logo-corrientes-exporta-transp.svg';
import logoMinisterio from '../assets/untitled.png';

interface Empresa {
  id: number;
  empresa?: string;
  contacto?: string;
  email?: string;
  telefono?: string;
  direccion?: string;
  ciudad?: string;
  web?: string;
  sector?: string;
  [key: string]: any;
}

interface Props {
  empresas: Empresa[];
  error: string | null;
}

export default function DirectoryClient({ empresas, error }: Props) {
  const [query, setQuery] = useState('');
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState('');
  const [sectorSeleccionado, setSectorSeleccionado] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const empresasUnicas = useMemo(
    () =>
      Array.from(
        new Set(
          empresas
            .map((e) => e.empresa)
            .filter(Boolean) as string[],
        ),
      ).sort(),
    [empresas],
  );

  const sectoresUnicos = useMemo(
    () =>
      Array.from(
        new Set(
          empresas
            .map((e) => e.sector)
            .filter(Boolean) as string[],
        ),
      ).sort(),
    [empresas],
  );

  const empresasFiltradas = useMemo(() => {
    const q = query.trim().toLowerCase();
    return empresas.filter((e) => {
      const nombre = (e.empresa || '').toLowerCase();
      const sector = (e.sector || '').toLowerCase();
      const contacto = (e.contacto || '').toLowerCase();
      const texto = `${nombre} ${sector} ${contacto}`;

      if (empresaSeleccionada && e.empresa !== empresaSeleccionada) return false;
      if (sectorSeleccionado && e.sector !== sectorSeleccionado) return false;
      if (q && !texto.includes(q)) return false;
      return true;
    });
  }, [empresas, empresaSeleccionada, sectorSeleccionado, query]);

  if (error) {
    return (
      <section className="container">
        <div className="error">
          <h3>Error de conexión</h3>
          <p>{error}</p>
          <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
            Por favor, verifica que las variables de entorno estén configuradas correctamente.
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="hero">
        <div className="hero-image" />
        <div className="hero-overlay" />

        <div className="hero-content">
          <p className="hero-kicker">Conectamos tu negocio con el mundo</p>
          <h1 className="hero-title">
            Descubrí las oportunidades de exportación de Corrientes
          </h1>
          <p className="hero-subtitle">
            Te acercamos el directorio más completo de exportadores y servicios de la provincia.
          </p>

          <div className="search-card">
            <h2 className="search-title">Buscar en el Directorio</h2>

            <form className="search-form" onSubmit={(e) => e.preventDefault()}>
              <div className="search-row">
                <label className="field">
                  <span className="field-label">Empresas</span>
                  <input
                    type="text"
                    className="input"
                    placeholder="Busque un producto, empresa o posición arancelaria"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </label>
              </div>

              <div className="filter-row">
                <label className="field">
                  <span className="field-label">Empresas</span>
                  <select
                    className="select"
                    value={empresaSeleccionada}
                    onChange={(e) => setEmpresaSeleccionada(e.target.value)}
                  >
                    <option value="">Todas las empresas</option>
                    {empresasUnicas.map((nombre) => (
                      <option key={nombre} value={nombre}>
                        {nombre}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="field">
                  <span className="field-label">Categorías</span>
                  <select
                    className="select"
                    value={sectorSeleccionado}
                    onChange={(e) => setSectorSeleccionado(e.target.value)}
                  >
                    <option value="">Todas las categorías</option>
                    {sectoresUnicos.map((sector) => (
                      <option key={sector} value={sector}>
                        {sector}
                      </option>
                    ))}
                  </select>
                </label>

                <button className="btn-primary" type="button">
                  Filtrar búsqueda
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <div className="gov-banner">
        <Image
          src={aliadosEstrategicos}
          alt="Aliados estratégicos"
          className="gov-logo"
          priority
        />
        <Image
          src={logoIfeFondo}
          alt="Logo IFE"
          className="gov-logo"
          priority
        />
        <Image
          src={logoCorrExportaBanner}
          alt="Corrientes Exporta"
          className="gov-logo"
          priority
        />
        <Image
          src={logoMinisterio}
          alt="Ministerio de Producción"
          className="gov-logo"
          priority
        />
      </div>

      <section className="container" id="filtros">
        <div className="directory-layout">
          <div className="directory-content">
            <div className="directory-header">
              <h2 className="section-title">Directorio de empresas</h2>
              <button className="btn-outline filters-trigger" onClick={() => setShowFilters(true)}>
                Filtros
              </button>
            </div>

            {empresasFiltradas.length === 0 ? (
              <div className="loading">
                <p>No se encontraron empresas con esos filtros.</p>
              </div>
            ) : (
              <div className="empresas-list">
                {empresasFiltradas.map((empresa) => (
                  <div key={empresa.id} className="empresa-card">
                    <div className="empresa-content">
                      <div className="empresa-info">
                        <h3 className="empresa-name">
                          {empresa.empresa || `Empresa #${empresa.id}`}
                        </h3>
                        <div className="empresa-details">
                          {empresa.direccion && (
                            <div className="detail-item">
                              <svg width="16" height="16" viewBox="0 0 12 17" fill="none" className="icon">
                                <path d="M6.74062 15.6887C8.34375 13.7549 12 9.06813 12 6.43557C12 3.24275 9.3125 0.652359 6 0.652359C2.6875 0.652359 0 3.24275 0 6.43557C0 9.06813 3.65625 13.7549 5.25938 15.6887C5.64375 16.1495 6.35625 16.1495 6.74062 15.6887ZM6 4.50783C6.53043 4.50783 7.03914 4.71093 7.41421 5.07245C7.78929 5.43397 8 5.9243 8 6.43557C8 6.94683 7.78929 7.43716 7.41421 7.79868C7.03914 8.1602 6.53043 8.3633 6 8.3633C5.46957 8.3633 4.96086 8.1602 4.58579 7.79868C4.21071 7.43716 4 6.94683 4 6.43557C4 5.9243 4.21071 5.43397 4.58579 5.07245C4.96086 4.71093 5.46957 4.50783 6 4.50783Z" fill="#FF5C00"/>
                              </svg>
                              <span>{empresa.direccion}</span>
                            </div>
                          )}
                          {empresa.telefono && (
                            <div className="detail-item">
                              <svg width="15" height="16" viewBox="0 0 15 16" fill="none" className="icon">
                                <path d="M4.83084 1.34583C4.60527 0.821978 4.01057 0.543154 3.44223 0.692424L0.86422 1.36836C0.354477 1.50355 0 1.94854 0 2.45549C0 9.42326 5.87669 15.073 13.1244 15.073C13.6517 15.073 14.1146 14.7322 14.2552 14.2421L14.9583 11.7637C15.1136 11.2173 14.8236 10.6456 14.2787 10.4287L11.4663 9.30216C10.9888 9.11064 10.4351 9.24301 10.1099 9.62886L8.92636 11.0173C6.86396 10.0795 5.19411 8.47414 4.21856 6.49139L5.66284 5.35638C6.06419 5.04095 6.20187 4.51146 6.00266 4.05239L4.83084 1.34864V1.34583Z" fill="#FF5C00"/>
                              </svg>
                              <span>{empresa.telefono}</span>
                            </div>
                          )}
                          {empresa.email && (
                            <div className="detail-item">
                              <svg width="16" height="12" viewBox="0 0 17 13" fill="none" className="icon">
                                <path d="M15.4062 0.613735C16.2861 0.613735 17 1.30003 17 2.14592C17 2.62793 16.7643 3.0812 16.3625 3.37168L9.1375 8.58112C8.75898 8.85244 8.24102 8.85244 7.8625 8.58112L0.637501 3.37168C0.235743 3.0812 0 2.62793 0 2.14592C0 1.30003 0.713867 0.613735 1.59375 0.613735H15.4062ZM17 4.18884V10.8283C17 11.9551 16.0471 12.8712 14.875 12.8712H2.125C0.95293 12.8712 0 11.9551 0 10.8283V4.18884L7.225 9.39828C7.98203 9.94413 9.01797 9.94413 9.775 9.39828L17 4.18884Z" fill="#FF5C00"/>
                              </svg>
                              <span>{empresa.email}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="empresa-image">
                        <div className="image-placeholder"></div>
                        {empresa.web && (
                          <a 
                            href={empresa.web.startsWith('http') ? empresa.web : `https://${empresa.web}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-visitar-web"
                          >
                            Visitar web
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {showFilters && (
          <div className="filters-modal">
            <div className="filters-panel">
              <div className="filters-panel-header">
                <h3>Filtros</h3>
                <button className="filters-close" onClick={() => setShowFilters(false)} aria-label="Cerrar filtros">
                  ×
                </button>
              </div>

              <div className="filters-content">
                <div className="filters-block">
                  <h4>Categorías</h4>
                  <ul className="filter-list">
                    <li>
                      <button
                        className={`filter-item ${sectorSeleccionado === '' ? 'active' : ''}`}
                        onClick={() => setSectorSeleccionado('')}
                      >
                        <span className="filter-dot"></span>
                        <span>Todas las categorías</span>
                      </button>
                    </li>
                    {sectoresUnicos.map((sector) => (
                      <li key={sector}>
                        <button
                          className={`filter-item ${sectorSeleccionado === sector ? 'active' : ''}`}
                          onClick={() => setSectorSeleccionado(sector)}
                        >
                          <span className="filter-dot"></span>
                          <span>{sector}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="filters-block">
                  <h4>Empresas</h4>
                  <ul className="filter-list">
                    <li>
                      <button
                        className={`filter-item ${empresaSeleccionada === '' ? 'active' : ''}`}
                        onClick={() => setEmpresaSeleccionada('')}
                      >
                        <span className="filter-dot"></span>
                        <span>Todas las empresas</span>
                      </button>
                    </li>
                    {empresasUnicas.map((nombre) => (
                      <li key={nombre}>
                        <button
                          className={`filter-item ${empresaSeleccionada === nombre ? 'active' : ''}`}
                          onClick={() => setEmpresaSeleccionada(nombre)}
                        >
                          <span className="filter-dot"></span>
                          <span>{nombre}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="filters-actions">
                <button className="btn-primary" type="button" onClick={() => setShowFilters(false)}>
                  Aplicar filtros
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

