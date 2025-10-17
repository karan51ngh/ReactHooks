import { useFetch } from "../hooks/UseFetchCustomHook";
import type { Product } from "../constants";

type UseFetchUsageProps = {
  url: string;
}
export default function UseFetchUsage(props: UseFetchUsageProps) {


  const { data, loading, error, refetch } = useFetch<Product>(props.url);

  return (
    <>
      {"Hello Friend.\n"}
      <button onClick={() => refetch()} disabled={loading}>
        {loading ? "Refreshing" : "Refresh"}
      </button>

      {!loading && (<div>

        <br />
        <br />
        {data?.title}
        <br />
        <br />
        {data?.brand}
        <br />
        <br />
        {data?.description}
        <br />
        <br />
        {data?.category}
        <br />
        <br />

      </div>)}

      {loading && (<div>
        {"Loading... (Artificial 5 second delay)\n"}
      </div>)}

      {error && (<div>
        {"Error Occured\n"}
      </div>)}
    </>
  )

}
