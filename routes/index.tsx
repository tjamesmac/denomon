import { Handlers, PageProps } from "$fresh/server.ts";

// TODO: type this
type PokeList = { name: string; url: string };
type Pokemon = PokeList[];

export const handler: Handlers<Pokemon | null> = {
  async GET(_, ctx) {
    const offset = ctx.state.data || "";
    const resp = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=100${
        !offset ? "" : `&${offset}`
      }`
    );

    if (resp.status === 404) {
      return ctx.render(null);
    }

    const pokemon: Pokemon = await resp.json();
    return ctx.render(pokemon);
  },
};

export default function Home(props: PageProps<Pokemon | null>) {
  const { data } = props;

  return (
    <div class="p-4 mx-auto max-w-screen-md">
      <img
        src="/logo.svg"
        class="w-32 h-32"
        alt="the fresh logo: a sliced lemon dripping with juice"
      />
      <ul>
        {data.results.map((pokemon: PokeList) => {
          return <li>{pokemon.name}</li>;
        })}
      </ul>
      {data.previous && (
        <a href={`?${data.previous.split("?")[1]}`}>previous</a>
      )}
      {data.next && <a href={`?${data.next.split("?")[1]}`}>next</a>}
    </div>
  );
}
