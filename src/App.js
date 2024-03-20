import React from 'react';
import './App.css';
import { useQueryClient } from '@tanstack/react-query';
import { useCounter } from './store/useCounter';


const App = () => {
  // const { data, isPending, isLoading, error } = useQuery({
  //   queryKey: ['mainKey', { type: 'testUniqueQuery' }],
  //   queryFn: () =>
  //     fetch('https://api.github.com/repos/TanStack/query').then((res) =>
  //       res.json(),
  //     ),
  // })

  // Change query client default
  const testChangeQueryClient = "test change here";

  const queryClient = useQueryClient(testChangeQueryClient)

  const { count, addCount, subCount } = useCounter();

  console.log("queryClient: ", queryClient)

  return (
    <div>
      <button onClick={() => addCount()}>Count Add</button>
      <button onClick={() => subCount()}>Count Sub</button>
      <div>
        <span>{count}</span>
      </div>
    </div>
  );
}

export default App;