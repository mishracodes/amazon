import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";

export default function Home(props) {
  return (
    <div className="bg-gray-100 relative">
      <Head>
        <title>Amazon 2.0</title>
      </Head>

      <Header />

      {/* Banner */}
      <Banner />

      <main className="absolute top-1/2  max-w-screen-2xlg mx-auto z-20">
        {/* Product */}
        <ProductFeed products={props.products}/>
      </main>
    </div>
  );
}

export async function getServerSideProps(context){
  const products = await fetch('https://fakestoreapi.com/products')
  .then(res=>res.json())
  
  return {props:{products}}
}
