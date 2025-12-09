import mysql from 'mysql2/promise';

// Función para obtener la configuración de la base de datos
function getDbConfig() {
  return {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || '',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  };
}

// Crear pool de conexiones
let pool: mysql.Pool | null = null;

export function getPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool(getDbConfig());
  }
  return pool;
}

// Función para ejecutar consultas
export async function query(sql: string, params?: any[]) {
  const connection = await getPool().getConnection();
  try {
    const [results] = await connection.execute(sql, params);
    return results;
  } finally {
    connection.release();
  }
}

// Función para obtener todas las empresas
export async function getEmpresas() {
  const sql = 'SELECT * FROM empresas ORDER BY id ASC';
  return await query(sql);
}

// Función para obtener una empresa por ID
export async function getEmpresaById(id: number) {
  const sql = 'SELECT * FROM empresas WHERE id = ?';
  const results = await query(sql, [id]);
  return Array.isArray(results) && results.length > 0 ? results[0] : null;
}

// Función para probar la conexión a la base de datos
export async function testConnection() {
  try {
    const connection = await getPool().getConnection();
    await connection.ping();
    connection.release();
    return { success: true, message: 'Conexión exitosa a la base de datos' };
  } catch (error: any) {
    let errorMessage = error.message || String(error);
    let errorDetails = '';
    
    // Si es un AggregateError, obtener más detalles
    if (error.name === 'AggregateError' && error.errors) {
      errorDetails = error.errors.map((e: any) => e.message || String(e)).join('; ');
      errorMessage = `AggregateError: ${errorDetails}`;
    }
    
    // Si tiene código de error de MySQL, incluirlo
    if (error.code) {
      errorMessage += ` (Código: ${error.code})`;
    }
    
    return { 
      success: false, 
      message: 'Error al conectar con la base de datos', 
      error: errorMessage,
      stack: error.stack,
      code: error.code
    };
  }
}

