
import { useEffect, useState ,useContext } from 'react'
import '../index.css'
import useSound  from 'use-sound';
import wrong from '../sounds/wrong.mp3';
import { timeContext } from '../App';


export default function Timer({setStop , questionNumber }) {
    const contextTime = useContext(timeContext);
    const [timer , setTimer] = useState(30);
    const [timeOut] = useSound(wrong);
    useEffect(() => {
        let interval;
        if(contextTime[0] == true) {
            return () => clearInterval(interval);
        }
        if(timer === 0 ){
            timeOut();
            setStop(true);
        }else if (timer <= 5) {
            const time = document.querySelector('div.timer').classList.add('colorRed')
        }
        interval =   setInterval(() => {
             setTimer(prev => prev - 1)
            }, 1000)
            return () => clearInterval(interval);
        } 
  , [setStop , timer , contextTime])


        useEffect(() => {
            setTimer(30);
            contextTime[1](false)
            const time = document.querySelector('div.timer').classList.remove('colorRed')
        },[questionNumber])

  return timer
}
