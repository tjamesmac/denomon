import { Handlers, PageProps } from "$fresh/server.ts";

type SpriteNormal =
  | "back_default"
  | "back_female"
  | "back_shiny"
  | "back_shiny_female"
  | "front_default"
  | "front_female"
  | "front_shiny"
  | "front_shiny_female";

type SpriteOther = {
  other: {
    dream_world: {
      front_default: string;
      front_female: string;
    };
    home: {
      front_default: string;
      front_female: string;
      front_shiny: string;
      front_shiny_female: string;
    };
    "official-artwork": {
      front_default: string;
    };
  };
};

type Sprites = Record<SpriteNormal, string>;

type AllSprites = Sprites & SpriteOther;

interface Pokemon {
  name: "string";
  types: Array<{ type: { name: string } }>;
  sprites: AllSprites;
}

export const handler: Handlers<Pokemon | null> = {
  async GET(_, ctx) {
    const { name } = ctx.params;
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

    if (resp.status === 404) {
      return ctx.render(null);
    }

    const pokemon: Pokemon = await resp.json();
    return ctx.render(pokemon);
  },
};

export default function PokemonPage(props: PageProps<Pokemon | null>) {
  const { data } = props;

  if (!data) {
    return <h1>No Pokemon here!</h1>;
  }

  return (
    <>
      <div>I choose you, {data.name}!</div>
      <div>{data.types[0].type.name}</div>
      <img src={data.sprites.front_default} />
    </>
  );
}
