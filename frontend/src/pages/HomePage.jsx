import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Loading } from '../components/Loading';


export const HomePage = () => {
  const [superheroes, setSuperheroes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSuperheroes = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/superheroes', { credentials: 'include' });
      if (!res.ok) {
        throw new Error(`error del servidor ${res.status}`);
      }
      const data = await res.json();
      setSuperheroes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error al traer los superheroes:', err);
      setError('No se pudieron cargar los superheroes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuperheroes();
  }, []);

  return (
    <div className="container mx-auto px-4 pb-8">
      <h1 className="text-4xl font-bold text-center mt-8 mb-4 text-gray-800">
        Galería de Superhéroes
      </h1>

      <div className="flex justify-center mb-8">
        <button
          onClick={fetchSuperheroes}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition-colors"
        >
          Recargar
        </button>
      </div>

      {loading && (
        <div className="flex justify-center">
          <Loading />
        </div>
      )}

      {error && (
        <div className="text-center text-red-600 mb-6">{error}</div>
      )}

      {!loading && !error && superheroes.length === 0 && (
        <div className="text-center text-gray-600">No hay superhéroes para mostrar.</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {superheroes.map((hero) => (
          <div
            key={hero.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <img
              src={hero.image}
              alt={hero.superhero}
              className="h-64 object-cover w-full"
            />

            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {hero.superhero}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
