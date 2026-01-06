import type { Metadata } from 'next'
import Image from 'next/image'
import './globals.css'
import logoCorrientes from './assets/logo2.svg'
import logoIfe from './assets/Ife_logo_svg.svg'
import iconMail from './assets/Vector-correo-General-verde.svg'
import iconPhone from './assets/Vector-Dirección-General-verde.svg'
import iconLocation from './assets/Vector-Dirección-General-verde.svg'
import logoCorrExporta from './assets/logo-corrientes-exporta-transp.svg'
import logoIfeFooter from './assets/ife (2).png'
import NavMenu from './components/NavMenu'

export const metadata: Metadata = {
  title: 'Corrientes Exporta - Empresas',
  description: 'Directorio de empresas exportadoras de Corrientes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body id="top">
        <header className="bg-white shadow-sm sticky top-0 z-20 w-full overflow-x-hidden">
          <div className="flex gap-6 justify-center items-center py-2 px-6 text-sm bg-gray-200 text-gray-700 w-full max-w-full overflow-x-hidden flex-wrap box-border">
            <div className="inline-flex items-center gap-2 whitespace-nowrap">
              <Image src={iconLocation} alt="Dirección" className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Yrigoyen 2289, Corrientes Capital, CP 3400</span>
            </div>
            <div className="inline-flex items-center gap-2 whitespace-nowrap">
              <Image src={iconPhone} alt="Teléfono" className="w-3.5 h-3.5 flex-shrink-0" />
              <span>(+54) 3794 660454</span>
            </div>
            <div className="inline-flex items-center gap-2 whitespace-nowrap">
              <Image src={iconMail} alt="Correo electrónico" className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Info@corrientesexporta.gov.ar</span>
            </div>
          </div>

          <nav className="flex items-center justify-between gap-10 max-w-6xl mx-auto py-4 px-6 relative w-full box-border">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Image
                  src={logoCorrientes}
                  alt="Corrientes Exporta"
                  className="h-[70px] w-auto max-w-full object-contain"
                  priority
                />
                <Image
                  src={logoIfe}
                  alt="Instituto de Fomento Empresarial"
                  className="h-[70px] w-auto max-w-full object-contain"
                  priority
                />
              </div>
            </div>
            
            <NavMenu />
          </nav>
        </header>

        <main>{children}</main>

        <footer className="site-footer">
          <div className="footer-top">
            <div className="footer-top-left">
              <span>Llámanos (+54) 3794 660454</span>
            </div>
            <div className="footer-top-right">
              <span>Casa Central: H. Yrigoyen 2289 / Corrientes Capital / C.P. 3400</span>
            </div>
          </div>

          <div className="footer-divider"></div>

          <div className="footer-middle">
            <div className="footer-column">
              <h4 className="footer-title">Redes Sociales</h4>
              <div className="social-icons">
                <a href="https://www.facebook.com/CorrientesExporta/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="currentColor"/>
                  </svg>
                </a>
                <a href="https://x.com/CtesExporta" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="social-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" fill="currentColor"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="footer-column">
              <h4 className="footer-title">Programas</h4>
              <ul className="footer-list">
                <li><a href="https://argentina.ar/es/promargentina/exporta/argentina-exporta" target="_blank" rel="noopener noreferrer">ARGENTINA EXPORTA</a></li>
                <li><a href="https://argentina.ar/es/promargentina/exporta/gerenciamiento-exportador-asociativo" target="_blank" rel="noopener noreferrer">GERENCIAMIENTO EXPORTADOR ASOCIATIVO</a></li>
                <li><a href="https://www.youtube.com/@ExportarTV" target="_blank" rel="noopener noreferrer">CAPACITACIONES VIRTUALES</a></li>
              </ul>
            </div>

            <div className="footer-column footer-logos">
              <Image
                src={logoCorrExporta}
                alt="Corrientes Exporta"
                className="footer-logo"
              />
              <Image
                src={logoIfeFooter}
                alt="IFE"
                className="footer-logo"
              />
            </div>
          </div>

          <div className="footer-divider"></div>

          <div className="footer-bottom">
            <p>Copyright Copyright © 2025 IFE - Instituto del Fomento Empresarial.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}

