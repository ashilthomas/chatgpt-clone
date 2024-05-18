import { createContext, useState } from "react";
import runChat from "../Config/geminiai";

export const Context =createContext()

const ContextProvider = (props)=>{
    const [input,setInput]=useState('') // get input from input field
    const [recentPrompt,setRecentPrompt]=useState('') 
    const [prevPromts,setPrevPromts]= useState([])//all promts save
    const [showResult,setShowResult]= useState(false) // datas kanikkan onSet function click avumbol enthu kanikkanikknam
    const [loading,setLoding]=useState(false)
    const[resultData,setResultData]= useState('')// result kanikkan
    const delayPara = (index, nextWord) => {
        
        setTimeout(() => {
           
            setResultData(prev=>prev+nextWord)
            
          
        }, 75 * index);
    };

    const newChat = ()=>{
        setLoding(false)
        setShowResult(false)
    }
    const onSent = async (prompt)=>{

         setResultData('')
         setLoding(true)
         setShowResult(true)
         let response;
         if(prompt !== undefined){

            response = await runChat(prompt);
           
            setRecentPrompt(prompt)


         }else{
            setPrevPromts(prev=>[...prev,input])
            setRecentPrompt(input)
           
            response = await runChat(input); 
         }
     
        let resposeArray = response.split('**')
        let newResponce = "";

        for(let i = 0;i<resposeArray.length;i++){
            if(i == 0 || i%2 !== 1 ){
                newResponce += resposeArray[i]
            }else{
                newResponce += "<b>"+resposeArray[i]+"</b>"
            }
        }
        let newResponse2 = newResponce.split("*").join("</br>");
       
        let newResponseArray = newResponse2.split(" ");
        
        for (let i =0; i < newResponseArray.length; i++) {
           const nextWord = newResponseArray[i]
           delayPara(i,nextWord+" ")
           
           
        }
        setLoding(false)
        setInput('')
    }

    const contextValue = {
           
        prevPromts,
        setPrevPromts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat


    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider


// all functions

// user input data will be store 
// and respose equel to the user input => setShowResult()
// set recent use input and we can show user serch history =>setRecentPrompt("")
// loading  data fetching  time show loding and after data fetch no loading => loading(false)
// all user input store a array =>setPrevPromts([])
// fetched data store a state =>result("")

// when click a onsent() will exicute the state