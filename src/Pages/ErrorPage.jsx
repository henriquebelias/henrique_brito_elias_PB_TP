import { Link } from 'react-router-dom';

export function ErrorPage() {
  return (
    <div className="flex flex-col m-8">
      <h1 className="text-3xl font-bold underline">Erro</h1>
      <p className="text-2xl my-8">Página não encontrada!</p>

      <Link to="/" className="text-2xl w-fit">
        VOLTAR
      </Link>
    </div>
  );
}
