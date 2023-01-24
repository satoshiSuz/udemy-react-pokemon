import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import { Card } from './components/Card/Card';
import { Pokemon, PokemonParameter } from './types/Pokemon';
import { getAllPokemon, getPokemon } from './utils/pokemon';

function App() {
  const initialURL = 'https://pokeapi.co/api/v2/pokemon';
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState<PokemonParameter[] | null>(
    null
  );

  useEffect(() => {
    const fetchPokemonData = async () => {
      //全てのポケモンデータを取得
      const res = await getAllPokemon(initialURL);
      // const res = axios.get('https://pokeapi.co/api/v2/pokemon');
      //各ポケモンの詳細なデータを取得
      loadPokemon(res.results);

      // console.log(res.results);
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
  console.log(pokemonData);

  return (
    <div className='App'>
      {loading ? (
        <h1>ロード中・・・</h1>
      ) : (
        <div className='pokemonCardContainer'>
          {pokemonData?.map((pokemon, i) => {
            return <Card key={i} pokemon={pokemon} />;
          })}
        </div>
      )}
    </div>
  );
}

export default App;
