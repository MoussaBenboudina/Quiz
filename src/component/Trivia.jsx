import React, { useContext, useEffect, useState } from 'react'
import '../index.css';
import useSound  from 'use-sound';
import play from '../sounds/play.mp3';
import correct from '../sounds/correct.mp3';
import wrong from '../sounds/wrong.mp3';
import wait from '../sounds/wait.mp3';
import { timeContext } from '../App';


export default function Trivia({
    data ,
    setStop ,
    questionNumber ,
    setQuestionNumber})
          {

          
            const [question , setQuestion] = useState(null);
            useEffect(()=> {
                setQuestion(data[questionNumber - 1][Math.floor(Math.random() * 4)])
            } , [data , questionNumber])
            const [stopTime , setStopTime] = useState(false);
            const [selectedAnswer ,setSelectedAnswer] = useState(null)
            const [className , setClassName] = useState('answer');
            const [litsPlay] = useSound(play);
            const [correctAnswr] = useSound(correct);
            const [wrongAnswer] = useSound(wrong);

            useEffect(() => {
              litsPlay();
            }, [])

            const delay = (duration , callback) => {
            setTimeout(()=> {
            callback()
            } , duration)}
            
            const contextTime = useContext(timeContext);
            
            const handelClick = (a) => {
              contextTime[1](true)
              setStopTime(true);
              document.querySelector('.QandA').classList.add('eventsNon');
              setSelectedAnswer(a);
              setClassName('answer active');
              delay(3000 , () =>  setClassName(a.correct ? "answer correct" : "answer wrong"))
              delay(4500 , () => {a.correct ? correctAnswr() : wrongAnswer()})
              delay(6000 , () => {
                if(a.correct) { 
                  setQuestionNumber(prev => prev + 1);
                  setSelectedAnswer(null);
                  document.querySelector('.QandA').classList.remove('eventsNon')
                }else {
                  setStop(true);
                }
              })

          }

return (
    <div className='QandA flex flex-col gap-y-6'>      
        <div className="question  w-full bg-red-800 h-24 rounded-lg flex justify-center items-center text-xl">{question?.question}</div>
        <div className="answers w-full h-44 flex-wrap flex justify-center items-center gap-x-8 text-xl">
            {question?.answer.map(a => a.map(a => <div className={selectedAnswer === a ? className : "answer"}  onClick={() => {handelClick(a)} }>{a.text}</div>))}
        </div>
    </div>
  )
}
