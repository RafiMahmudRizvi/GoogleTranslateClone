import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Arrows from './components/Arrows';
import TextBox from './components/TextBox';
import Button from './components/Button';
import Modal from './components/Modal';


function App() {

  const [showModal, setShowModal] = useState(null)
  const [inputLanguage, setInputLanguage] = useState("English");
  const [outputLanguage, setOutputLanguage] = useState("Polish");
  const [languages, setLanguages] = useState(null);
  const [textToTranslate, setTextToTranslate] = useState('');
  const [translatedText, setTranslatedText] = useState('')

  
  const getLanguages = async () => {
    const response = await axios.get('http://localhost:8000/languages')
    setLanguages(response.data)
  }
  useEffect(() => {
    getLanguages()
  }, [])

  const translate = async () => {
    console.log('trainsalte')
    const data = {
      textToTranslate, outputLanguage, inputLanguage
    }
    const response = await axios.get('http://localhost:8000/translation', {
      params : data
    })
    console.log('response', response)
    setTranslatedText(response.data)
  }
    
 
 

  function handelClick() {
    setInputLanguage(outputLanguage);
    setOutputLanguage(inputLanguage);
  }




  return (
    <div className="app">
     {!showModal &&<>
        <TextBox
         setShowModal={setShowModal} 
         style={'input'}
         setLanguage= {inputLanguage}
         textToTranslate = {textToTranslate}
         setTextToTranslate = {setTextToTranslate}  
        setTranslatedText = {setTranslatedText}

          
           />

        <div className="arrow-container" onClick={handelClick}>
           <Arrows />
        </div>

        <TextBox  
        setShowModal={setShowModal} 
        setLanguage={outputLanguage} 
        style={'output'} 
        translatedText  = {translatedText}
        />

        <div className="button-container" onClick={translate}>
          <Button />
        </div>
     </>} 
     { showModal &&
      <Modal 
     setShowModal={setShowModal} 
     languages={languages}
     chosenLanguage = {showModal=='input' ? inputLanguage : outputLanguage}
     setChosenLanguage = {showModal=='input' ? setInputLanguage : setOutputLanguage}

     /> }
    </div>
  );
}

export default App;
