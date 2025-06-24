import { useState } from 'react'
import Header from "./components/Header.jsx";
import Tasks from "./components/Tasks.jsx";


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className={'flex justify-center w-full min-h-[400px] bg-yellodw-400'}>
     <div className={'flex flex-col items-center justify-center w-2/3 bg-redd-700 h-full mt-10 shadow-2xl'}>
       <Header />
       <Tasks />

     </div>
    </div>
  )
}

export default App
