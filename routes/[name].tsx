import { Handlers, PageProps } from "$fresh/server.ts";

interface Pokemon {
  name: "string";
  types: Array<{ type: { name: string } }>;
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

export default function Greet(props: PageProps<Pokemon | null>) {
  const { data } = props;

  if (!data) {
    return <h1>No Pokemon here!</h1>;
  }

  return (
    <>
      <div>I choose you, {data.name}!</div>
      <div>{data.types[0].type.name}</div>
    </>
  );
}
