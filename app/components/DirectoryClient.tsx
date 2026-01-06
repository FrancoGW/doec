'use client';

import { useMemo, useState, useEffect } from 'react';
import Image from 'next/image';
import logoCorrientesSomosTodos from '../assets/Corrientes_Somos_Todos.png';
import logoIfeFondo from '../assets/I.F.E.png';
import logoCorrExportaBanner from '../assets/Corrientes_Exporta .png';
import logoMinisterio from '../assets/Ministerio_Produccion.png';

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
  pa?: string;
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
  const [empresasAMostrar, setEmpresasAMostrar] = useState(10);

  // Función para parsear los productos desde el campo pa
  const parseProductos = (pa: string | undefined): string[] => {
    if (!pa) return [];
    try {
      const parsed = JSON.parse(pa);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      // Si no es JSON válido, intentar como string simple
      return pa ? [pa] : [];
    }
  };

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

  // Resetear el contador cuando cambien los filtros
  useEffect(() => {
    setEmpresasAMostrar(10);
  }, [query, empresaSeleccionada, sectorSeleccionado]);

  // Empresas a mostrar según el contador
  const empresasMostradas = useMemo(() => {
    const sinFiltros = !query.trim() && !empresaSeleccionada && !sectorSeleccionado;
    if (sinFiltros) {
      return empresasFiltradas.slice(0, empresasAMostrar);
    }
    return empresasFiltradas;
  }, [empresasFiltradas, empresasAMostrar, query, empresaSeleccionada, sectorSeleccionado]);

  const hayMasEmpresas = useMemo(() => {
    const sinFiltros = !query.trim() && !empresaSeleccionada && !sectorSeleccionado;
    if (sinFiltros) {
      return empresasFiltradas.length > empresasAMostrar;
    }
    return false;
  }, [empresasFiltradas, empresasAMostrar, query, empresaSeleccionada, sectorSeleccionado]);

  const verMas = () => {
    setEmpresasAMostrar(prev => prev + 10);
  };

  const limpiarFiltros = () => {
    setQuery('');
    setEmpresaSeleccionada('');
    setSectorSeleccionado('');
  };

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
          <h1 className="hero-title text-white">
            Descubrí las oportunidades<br />
            de exportación de Corrientes
          </h1>
          <p className="hero-subtitle text-white">
            Conectamos tu negocio con el mundo a través del directorio más<br />
            completo de exportadores de la provincia.
          </p>

          <div className="mb-4 text-center">
            <h2 className="text-white text-xl font-bold">Buscar en el Directorio</h2>
          </div>

          <div className="search-card bg-white/80 backdrop-blur-sm">
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

                <div className="filter-buttons">
                  <button className="btn-primary" type="button">
                    Filtrar búsqueda
                  </button>
                  <button 
                    className="btn-secondary" 
                    type="button"
                    onClick={limpiarFiltros}
                  >
                    Borrar filtros
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      <div className="gov-banner">
        <Image
          src={logoCorrientesSomosTodos}
          alt="Corrientes somos todos"
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
        <div className="flex gap-8">
          {/* Sidebar Filtros - Desktop */}
          <aside className="hidden md:block w-80 flex-shrink-0">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Filtros</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Categorías</h4>
                  <ul className="space-y-2">
                    <li>
                      <button
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center gap-2 ${
                          sectorSeleccionado === '' 
                            ? 'bg-green-50 text-[#0b6623] font-medium' 
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                        onClick={() => setSectorSeleccionado('')}
                      >
                        <span className={`w-2 h-2 rounded-full border-2 ${
                          sectorSeleccionado === '' 
                            ? 'bg-[#0b6623] border-[#0b6623]' 
                            : 'border-gray-300'
                        }`}></span>
                        <span>Todas las categorías</span>
                      </button>
                    </li>
                    {sectoresUnicos.map((sector) => (
                      <li key={sector}>
                        <button
                          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center gap-2 ${
                            sectorSeleccionado === sector 
                              ? 'bg-green-50 text-[#0b6623] font-medium' 
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                          onClick={() => setSectorSeleccionado(sector)}
                        >
                          <span className={`w-2 h-2 rounded-full border-2 ${
                            sectorSeleccionado === sector 
                              ? 'bg-[#0b6623] border-[#0b6623]' 
                              : 'border-gray-300'
                          }`}></span>
                          <span>{sector}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Empresas</h4>
                  <ul className="space-y-2 max-h-96 overflow-y-auto">
                    <li>
                      <button
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center gap-2 ${
                          empresaSeleccionada === '' 
                            ? 'bg-green-50 text-[#0b6623] font-medium' 
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                        onClick={() => setEmpresaSeleccionada('')}
                      >
                        <span className={`w-2 h-2 rounded-full border-2 ${
                          empresaSeleccionada === '' 
                            ? 'bg-[#0b6623] border-[#0b6623]' 
                            : 'border-gray-300'
                        }`}></span>
                        <span>Todas las empresas</span>
                      </button>
                    </li>
                    {empresasUnicas.map((nombre) => (
                      <li key={nombre}>
                        <button
                          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center gap-2 ${
                            empresaSeleccionada === nombre 
                              ? 'bg-green-50 text-[#0b6623] font-medium' 
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                          onClick={() => setEmpresaSeleccionada(nombre)}
                        >
                          <span className={`w-2 h-2 rounded-full border-2 ${
                            empresaSeleccionada === nombre 
                              ? 'bg-[#0b6623] border-[#0b6623]' 
                              : 'border-gray-300'
                          }`}></span>
                          <span>{nombre}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </aside>

          {/* Contenido Principal */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Directorio de empresas</h2>
              <button 
                className="md:hidden px-4 py-2 border border-[#0b6623] bg-white text-[#0b6623] font-semibold text-sm rounded-md hover:bg-green-50"
                onClick={() => setShowFilters(true)}
              >
                Filtros
              </button>
            </div>

            {empresasFiltradas.length === 0 ? (
              <div className="loading">
                <p>No se encontraron empresas con esos filtros.</p>
              </div>
            ) : (
              <>
                <div className="empresas-list">
                  {empresasMostradas.map((empresa) => (
                  <div key={empresa.id} className="empresa-card">
                    <div className="empresa-content">
                      <div className="empresa-info">
                        <h3 className="empresa-name">
                          {empresa.empresa || `Empresa #${empresa.id}`}
                        </h3>
                        <div className="empresa-details">
                          {(empresa.direccion || empresa.ciudad) && (
                            <div className="detail-item">
                              <svg width="16" height="16" viewBox="0 0 12 17" fill="none" className="icon">
                                <path d="M6.74062 15.6887C8.34375 13.7549 12 9.06813 12 6.43557C12 3.24275 9.3125 0.652359 6 0.652359C2.6875 0.652359 0 3.24275 0 6.43557C0 9.06813 3.65625 13.7549 5.25938 15.6887C5.64375 16.1495 6.35625 16.1495 6.74062 15.6887ZM6 4.50783C6.53043 4.50783 7.03914 4.71093 7.41421 5.07245C7.78929 5.43397 8 5.9243 8 6.43557C8 6.94683 7.78929 7.43716 7.41421 7.79868C7.03914 8.1602 6.53043 8.3633 6 8.3633C5.46957 8.3633 4.96086 8.1602 4.58579 7.79868C4.21071 7.43716 4 6.94683 4 6.43557C4 5.9243 4.21071 5.43397 4.58579 5.07245C4.96086 4.71093 5.46957 4.50783 6 4.50783Z" fill="#FF5C00"/>
                              </svg>
                              <span>
                                {empresa.direccion}
                                {empresa.direccion && empresa.ciudad && ' - '}
                                {empresa.ciudad}
                              </span>
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
                          {parseProductos(empresa.pa).length > 0 && (
                            <div className="detail-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                              <div className="flex items-center gap-2 mb-2">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="icon">
                                  <path d="M2 2H4V14H2V2ZM6 2H14V4H6V2ZM6 6H14V8H6V6ZM6 10H14V12H6V10Z" fill="#FF5C00"/>
                                </svg>
                                <span className="font-semibold text-gray-800">Productos:</span>
                              </div>
                              <ul className="list-disc list-inside ml-6 space-y-1 mt-1">
                                {parseProductos(empresa.pa).map((producto, idx) => (
                                  <li key={idx} className="text-gray-700">{producto}</li>
                                ))}
                              </ul>
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
                {hayMasEmpresas && (
                  <div className="flex justify-center mt-6">
                    <button
                      onClick={verMas}
                      className="px-6 py-3 bg-[#0b6623] text-white font-semibold rounded-md hover:bg-[#0a5a1f] transition-colors"
                    >
                      Ver más
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Modal Filtros - Mobile */}
        {showFilters && (
          <div 
            className="md:hidden fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowFilters(false)}
          >
            <div 
              className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800">Filtros</h3>
                <button 
                  className="text-2xl text-gray-500 hover:text-gray-800 w-8 h-8 flex items-center justify-center"
                  onClick={() => setShowFilters(false)}
                  aria-label="Cerrar filtros"
                >
                  ×
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Categorías</h4>
                  <ul className="space-y-2">
                    <li>
                      <button
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center gap-2 ${
                          sectorSeleccionado === '' 
                            ? 'bg-green-50 text-[#0b6623] font-medium' 
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                        onClick={() => setSectorSeleccionado('')}
                      >
                        <span className={`w-2 h-2 rounded-full border-2 ${
                          sectorSeleccionado === '' 
                            ? 'bg-[#0b6623] border-[#0b6623]' 
                            : 'border-gray-300'
                        }`}></span>
                        <span>Todas las categorías</span>
                      </button>
                    </li>
                    {sectoresUnicos.map((sector) => (
                      <li key={sector}>
                        <button
                          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center gap-2 ${
                            sectorSeleccionado === sector 
                              ? 'bg-green-50 text-[#0b6623] font-medium' 
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                          onClick={() => setSectorSeleccionado(sector)}
                        >
                          <span className={`w-2 h-2 rounded-full border-2 ${
                            sectorSeleccionado === sector 
                              ? 'bg-[#0b6623] border-[#0b6623]' 
                              : 'border-gray-300'
                          }`}></span>
                          <span>{sector}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Empresas</h4>
                  <ul className="space-y-2 max-h-64 overflow-y-auto">
                    <li>
                      <button
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center gap-2 ${
                          empresaSeleccionada === '' 
                            ? 'bg-green-50 text-[#0b6623] font-medium' 
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                        onClick={() => setEmpresaSeleccionada('')}
                      >
                        <span className={`w-2 h-2 rounded-full border-2 ${
                          empresaSeleccionada === '' 
                            ? 'bg-[#0b6623] border-[#0b6623]' 
                            : 'border-gray-300'
                        }`}></span>
                        <span>Todas las empresas</span>
                      </button>
                    </li>
                    {empresasUnicas.map((nombre) => (
                      <li key={nombre}>
                        <button
                          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center gap-2 ${
                            empresaSeleccionada === nombre 
                              ? 'bg-green-50 text-[#0b6623] font-medium' 
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                          onClick={() => setEmpresaSeleccionada(nombre)}
                        >
                          <span className={`w-2 h-2 rounded-full border-2 ${
                            empresaSeleccionada === nombre 
                              ? 'bg-[#0b6623] border-[#0b6623]' 
                              : 'border-gray-300'
                          }`}></span>
                          <span>{nombre}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
                <button 
                  className="w-full px-6 py-3 bg-[#0b6623] text-white font-semibold rounded-md hover:bg-[#0a5a1f] transition-colors"
                  onClick={() => setShowFilters(false)}
                >
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

