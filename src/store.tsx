import {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
  useReducer,
} from 'react';

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

function usePokemonSource(): {
  pokemon: Pokemon[];
  search: string;
} {
  // const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  // const [search, setSearch] = useState('');

  type PokemonState = {
    pokemon: Pokemon[];
    search: string;
  };

  type PokemonAction = { type: 'setPokemon'; payload: Pokemon[] };

  const [{ pokemon, search }, dispatch] = useReducer(
    (state: PokemonState, action: PokemonAction) => {
      switch (action.type) {
        case 'setPokemon':
          return { ...state, pokemon: action.payload };
      }
    },
    {
      pokemon: [],
      search: 'foo',
    }
  );

  useEffect(() => {
    fetch('/pokemon.json')
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: 'setPokemon',
          payload: data,
        })
      );
  }, []);

  return { pokemon, search };
}

const PokemonContext = createContext<ReturnType<typeof usePokemonSource>>(
  {} as unknown as ReturnType<typeof usePokemonSource>
);

export function usePokemon() {
  return useContext(PokemonContext);
}

export function PokemonProvider({ children }: { children: React.ReactNode }) {
  return (
    <PokemonContext.Provider value={usePokemonSource()}>
      {children}
    </PokemonContext.Provider>
  );
}
