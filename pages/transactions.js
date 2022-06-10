import Link from "next/link";
import { loadTransactions } from "../lib/fetch-transactions"


function Item( props ){
  let sign = props.item.isIncoming? '+':'-';

  return (
    <li className="group block rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3">
      <strong>{sign}{props.item.amount}</strong><br />
      {props.item.destination}<br />
      {props.item.origin}<br />
      {props.item.notes}<br/>
      {props.item.date}<br/>
      <CategoriesList categories={props.item.categories} />
    </li>
  );
}

function CategoriesList( props ){

  return(
    <ul role="list">
      {props.categories.map((cat) => {
        return <li key={`${cat}${Math.round(Math.random()*1000)}`}><span >{cat}</span></li>;
      })}
    </ul>
  )
}

// posts will be populated at build time by getStaticProps()
function List( { transactions } ) {

  return (
    <div>
      <Link href="/">
        <a className="bg-sky-500 hover:bg-sky-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white">Back to home</a>
      </Link>
      <ul role="list" className="grid grid-cols-4 gap-6 m-6">
        {transactions.map((item) => (
          <Item item={item} key={item._id} />
        ))}
      </ul>
    </div>
  )
}

export async function getStaticProps() {
  const transactions = await loadTransactions();
  return { props: { transactions } }
}

export default List