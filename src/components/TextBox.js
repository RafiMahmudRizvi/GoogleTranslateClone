import SelectDropDown from './SelectDropDown'

export default function TextBox({  setShowModal, style, setLanguage, textToTranslate, setTextToTranslate,  translatedText, setTranslatedText }) {
   function handelClick() {
       setTextToTranslate('')
       setTranslatedText('')
   }
    return(
        <div className={style}>
            <SelectDropDown  setShowModal={setShowModal} style={style} setLanguage={setLanguage}/>
            <textarea 
                placeholder={style === 'input' ?'Enter Text' : 'Translation'}
                disabled = {style === 'output'}
                onChange =  {(e)=>setTextToTranslate(e.target.value)}
                value = {style == 'input' ? textToTranslate : translatedText}
            />
            {style == 'input' &&(
                <div className="delete" onClick={handelClick}>⨯</div>
            )
            }

        </div>
    )
}