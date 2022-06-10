export async function loadTransactions() {
  const res = await fetch(`http://localhost:3311/transactions`)
  const transactions = await res.json();
  return transactions;
}