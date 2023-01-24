export type Pokemon = {
  name: string;
  url: string;
};

export type PokemonParameter = {
  abilities: {
    ability: { name: string; url: string };
    is_hidden: boolean;
    slot: number;
  }[];
  base_experience: number;
  forms: object[];
  game_indices: object[];
  height: number;
  held_items: object[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: object[];
  name: string;
  order: number;
  past_types: object[];
  species: {
    name: string;
    url: string;
  };
  sprites: {
    back_default: string;
    back_female: string | null;
    back_shiny: string;
    back_shiny_female: string | null;
    front_default: string;
    front_female: string | null;
    front_shiny: string;
    front_shiny_female: string | null;
    other: object;
    versions: object;
  };
  stats: object[];
  types: { slot: number; type: { name: string; url: string } }[];
  weight: number;
};
