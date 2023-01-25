import React, { useEffect, useState } from 'react';
import './App.css';
import { Card } from './components/Card/Card';
import { Navbar } from './components/Navbar/Navbar';
import { Pokemon, PokemonParameter } from './types/Pokemon';
import { getAllPokemon, getPokemon } from './utils/pokemon';

function App() {
  const initialURL = 'https://pokeapi.co/api/v2/pokemon';
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState<PokemonParameter[] | null>(
    null
  );
  const [nextURL, setNextURL] = useState<string>('');
  const [prevURL, setPrevURL] = useState<string>('');

  useEffect(() => {
    const fetchPokemonData = async () => {
      //全てのポケモンデータを取得
      const res = await getAllPokemon(initialURL);
      // const res = axios.get('https://pokeapi.co/api/v2/pokemon');
      //各ポケモンの詳細なデータを取得
      loadPokemon(res.results);
      setNextURL(res.next);
      console.log(res);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data: Pokemon[]) => {
    let _pokemonData = await Promise.all<PokemonParameter[]>(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };
  // console.log(pokemonData);

  const handleNextPage = async () => {
    if (!nextURL) return;
    setLoading(true);
    let data = await getAllPokemon(nextURL);
    // console.log(data);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };
  const handlePrevPage = async () => {
    if (!prevURL) return;
    setLoading(true);
    let data = await getAllPokemon(prevURL);
    // console.log(data);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className='App'>
        {loading ? (
          <h1>ロード中・・・</h1>
        ) : (
          <>
            <div className='pokemonCardContainer'>
              {pokemonData?.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />;
              })}
            </div>
            <div className='btn'>
              <button onClick={handlePrevPage}>前へ</button>
              <button onClick={handleNextPage}>次へ</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
