type Transaction = {
    id: string;
    user: string;
    amount: number;
    date: string | number; // ISO
    status: 'active' | 'pending' | 'failed';
    type: 'deposit' | 'withdraw';
};

type transactionsWithTimesTamp= Omit<Transaction, 'date'> & {date: number}
  
const transactions: Transaction[] = [
{ id: 't1', user: 'Alice', amount: 1200, date: '2025-09-20T10:30:00Z', status: 'active', type: 'deposit' },
{ id: 't2', user: 'Bob', amount: 500, date: '2025-09-19T14:20:00Z', status: 'pending', type: 'withdraw' },
{ id: 't3', user: 'Alice', amount: 200, date: '2025-09-18T08:15:00Z', status: 'failed', type: 'deposit' },
{ id: 't4', user: 'Charlie', amount: 300, date: '2025-09-21T12:45:00Z', status: 'active', type: 'withdraw' },
{ id: 't5', user: 'Bob', amount: 700, date: '2025-09-21T09:00:00Z', status: 'active', type: 'deposit' },
];
  


const activeTransactions : transactionsWithTimesTamp[]  = transactions.filter(transaction => 
    transaction.status === 'active').map(activeTransaction => ({...activeTransaction, date : new Date(activeTransaction.date).getTime()}))

const newActiveTransactions = activeTransactions.sort((a, b) => a.date - b.date) //возврастание
const oldActiveTransactions = activeTransactions.sort((a, b) => b.date - a.date) //убыванию

// let sumDeposit = 0
let sumWithdraw = 0

// for (let i=0; i < transactions.length; i++){
//     if(transactions[i].type === 'deposit'){
//         sumDeposit+=transactions[i].amount
//     }else{
//         sumWithdraw+=transactions[i].amount
//     }
// }

const  count = transactions.reduce((acc , {type , amount}) => {
    type === 'deposit' ?  acc.sumDeposit += amount : acc.sumWithdraw += amount
    return acc

}, {sumWithdraw: 0, sumDeposit: 0 })

const arr = [1 , 2 , 3 , 4 , 5]
const bar : number[] = []
arr.forEach((a => bar.push(a)))

const bar2 = arr.map(a => a)


const groupByNameMy = transactions.reduce<GroupedByUser>((acc, transaction ) => {
    if(!acc[transaction.user]) acc[transaction.user] = []
    acc[transaction.user].push(transaction)
    return acc
}, {})

const grouped: GroupedByUser = {};
transactions.forEach(t => {
  if (!grouped[t.user]) grouped[t.user] = [];
  grouped[t.user].push(t);
});

type GroupedByUser = Record<string, Transaction[]>