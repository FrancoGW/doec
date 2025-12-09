// Cargar variables de entorno desde .env.local
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(__dirname, '../.env.local') });

import { testConnection, getEmpresas } from '../lib/db';

async function main() {
  console.log('🔍 Probando conexión a la base de datos...\n');
  
  // Verificar que las variables de entorno estén cargadas
  console.log('📋 Configuración:');
  console.log('  Host:', process.env.DB_HOST || 'NO CONFIGURADO');
  console.log('  Puerto:', process.env.DB_PORT || 'NO CONFIGURADO');
  console.log('  Usuario:', process.env.DB_USER || 'NO CONFIGURADO');
  console.log('  Base de datos:', process.env.DB_NAME || 'NO CONFIGURADO');
  console.log('  Contraseña:', process.env.DB_PASSWORD ? '***' : 'NO CONFIGURADO');
  console.log('');
  
  // Probar conexión
  const connectionTest = await testConnection();
  console.log(connectionTest.success ? '✅' : '❌', connectionTest.message);
  
  if (connectionTest.success) {
    console.log('\n📊 Obteniendo empresas...\n');
    try {
      const empresas = await getEmpresas();
      console.log(`✅ Se encontraron ${Array.isArray(empresas) ? empresas.length : 0} empresas`);
      if (Array.isArray(empresas) && empresas.length > 0) {
        console.log('\nPrimera empresa:', JSON.stringify(empresas[0], null, 2));
      }
    } catch (error: any) {
      console.error('❌ Error al obtener empresas:', error.message);
      console.error('Stack:', error.stack);
    }
  } else {
    console.error('\n❌ Detalles del error:', connectionTest.error);
    if (connectionTest.code) {
      console.error('   Código de error:', connectionTest.code);
    }
    if (connectionTest.stack) {
      console.error('\n📚 Stack trace:');
      console.error(connectionTest.stack);
    }
  }
  
  process.exit(connectionTest.success ? 0 : 1);
}

main();

