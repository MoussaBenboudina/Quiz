
import { useEffect, useMemo, useState ,createContext} from 'react'
import './index.css'
import Trivia from './component/Trivia';
import Timer from './component/Timer';
import data from './data.json'


export const timeContext = createContext();
function App() {

const monyePyramid = useMemo(()=> 
  [
    {id:1 , amount : "$ 100"},
    {id:2 , amount : "$ 200"},
    {id:3 , amount : "$ 300"},
    {id:4 , amount : "$ 400"},
    {id:5 , amount : "$ 500"},
    {id:6 , amount : "$ 1000"},
    {id:7 , amount : "$ 2000"},
    {id:8 , amount : "$ 4000"},
    {id:9 , amount : "$ 8000"},
    {id:10 , amount : "$ 16000"},
    {id:11 , amount : "$ 32000"},
    {id:12 , amount : "$ 64000"},
    {id:13 , amount : "$ 125000"},
    {id:14 , amount : "$ 500000"},
    {id:15 , amount : "$ 1000000"}
  ],)

const [questionNumber , setQuestionNumber] = useState(1);
useEffect(() => {
setEarned(questionNumber > 1 ?  monyePyramid[questionNumber - 2].amount : 0)
},[questionNumber])

const [stop , setStop] = useState(false);
const [earned , setEarned] = useState(0);
const [time ,setTime ] = useState(false);
// useEffect(() => {
//   console.log(stop)
// },[stop])




  return (
    <timeContext.Provider value={[time , setTime]}>
     <div className="app h-screen w-full flex text-white">
  
    <div className="main w-full flex flex-col justify-end items-center gap-6 py-8 relative">
      <div className='bg'></div>
   
    {stop ? <h1 className=' my-auto text-4xl'>you earned : {earned} </h1> : (
      <>
    <div className="timer flex justify-center items-center rounded-s-full w-32 h-32 text-3xl"><Timer setStop={setStop} questionNumber={questionNumber} /></div>
    <div className='w-5/6 h-fit text-center'> <Trivia 
    data={data}
    setStop={setStop}
    questionNumber={questionNumber}
    setQuestionNumber={setQuestionNumber}
    /></div>
    </>
    )}
</div>
 

      <div className="pyramid w-1/4 bg-blue-950 flex flex-col justify-center items-center">
      <ul className="monyeList flex flex-col justify-center gap-2 w-10/12 ">
      {monyePyramid.toReversed().map(m => 
      <li key={m.id} className={questionNumber === m.id ? "monyeListItem active" : "monyeListItem" }>
        <span>{m.id}</span>
        <span>{m.amount}</span>
      </li>)}
      </ul>
      </div>
     </div>
     </timeContext.Provider>
  )
}


export default App


