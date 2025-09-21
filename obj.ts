// const userBalances = { alice: 100, bob: 250, charlie: 50 }

// Object.keys(userBalances)
// Object.values(userBalances)
// Object.entries(userBalances)

// Object.fromEntries(userBalances) // for example

// if('alice' in userBalances)

// type Balances = Record<string, number>
// const userBalances: Balances = { alice: 100, bob: 250 }



type Transaction = {
    id: string;
    user: string;
    amount: number;
    type: 'deposit' | 'withdraw';
    date: string; // ISO
  };
  
  const transactions: Transaction[] = [
    { id: 't1', user: 'Alice',   amount: 500, type: 'deposit',  date: '2025-09-19T09:00:00Z' },
    { id: 't2', user: 'Bob',     amount: 300, type: 'withdraw', date: '2025-09-19T11:00:00Z' },
    { id: 't3', user: 'Alice',   amount: 200, type: 'withdraw', date: '2025-09-20T08:00:00Z' },
    { id: 't4', user: 'Charlie', amount: 400, type: 'deposit',  date: '2025-09-20T12:00:00Z' },
    { id: 't5', user: 'Bob',     amount: 150, type: 'deposit',  date: '2025-09-20T14:00:00Z' },
  ];
  