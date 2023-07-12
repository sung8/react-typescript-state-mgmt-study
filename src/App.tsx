import { useEffect, useState, createContext, useContext } from 'react';

interface Pokemon {
  id: number;
  name: string;
  type: string[];
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}

function usePokemon(): {
  pokemon: Pokemon[];
} {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetch('/pokemon.json')
      .then((response) => response.json())
      .then((data) => setPokemon(data));
  }, []);

  return { pokemon };
}

const PokemonContext = createContext({
  pokemon: [] as Pokemon[],
});

const PokemonList = () => {
  const { pokemon } = useContext(PokemonContext);
  return (
    <div>
      {pokemon.map((p) => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  );
};

function App() {
  return (
    <PokemonContext.Provider value={usePokemon()}>
      <PokemonList />;
    </PokemonContext.Provider>
  );
}

export default App;
