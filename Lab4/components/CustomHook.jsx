import { useFetch } from "../hooks/useFetch";
import { useCounter } from "../hooks/useCounter";
import { LoadingMessage } from "./Loading";
import { Card } from "./Card";

export const CustomHook = () => {
  const { counter, decrement, increment } = useCounter(1);
  const { data, hasError, isLoading } = useFetch(
    `https://rickandmortyapi.com/api/character/${counter}`
  );
  return (
    <>
      <hr />
      {isLoading ? (
        <LoadingMessage />
      ) : (
        <Card
          data = {data}
        />
      )}
      <div className="button-wrapper">
      <button className="btn outline" onClick={() => decrement()}>
        Anterior
      </button>
      <button className="btn fill" onClick={() => increment()}>
        Siguiente
      </button>
      </div>
      
    </>
  );
};
