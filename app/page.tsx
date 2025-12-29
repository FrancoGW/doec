import { getEmpresas } from '@/lib/db';
import DirectoryClient from './components/DirectoryClient';

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

export default async function Home() {
  let empresas: Empresa[] = [];
  let error: string | null = null;

  try {
    const results = await getEmpresas();
    empresas = results as Empresa[];
  } catch (err: any) {
    error = err.message || 'Error al conectar con la base de datos';
    console.error('Error fetching empresas:', err);
  }

  return <DirectoryClient empresas={empresas} error={error} />;
}

