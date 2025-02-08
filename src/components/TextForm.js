import React, { useState } from 'react'


export default function TextForm(props) {
    const handleUpClick = () => {
        let newText = text.toUpperCase();
        setText(newText)
        props.showAlert("Converted to uppercase!", "success");
    }

    const handleLoClick = () => {
        let newText = text.toLowerCase();
        setText(newText)
        props.showAlert("Converted to lowercase!", "success");
    }

    const handleClearClick = () => {
        let newText = '';
        setText(newText)
        props.showAlert("Text Cleared!", "success");
    }

    const handleOnChange = (event) => {
        setText(event.target.value);
    };


    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        props.showAlert("Copied to Clipboard!", "success");
    }

    const handleExtraSpaces = () => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert("Extra spaces removed!", "success");
    }

    const handleBold = () => {
        setBold(!isBold)
        props.showAlert("Text Bold!", "success");
    };

    const handleItalic = () => {
        setItalic(!isItalic);
        props.showAlert("Text Italic!", "success");
    };
    const handletitleClick = () => {
        let newText = text.toLowerCase().split(' ').map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(' ');
        setText(newText);
        props.showAlert("Converted to Titlecase!", "success");
    }

    const handleSentenceClick = () => {
        let newText = text.trim();
        newText = newText.toLowerCase();
        newText = newText.charAt(0).toUpperCase() + newText.slice(1);
        setText(newText);
        props.showAlert("Converted to Sentence Case!", "success");
    }

    const handleDownload = () => {
        const element = document.createElement("a");
        const file = new Blob([text], { type: "text/plain" });
        element.href = URL.createObjectURL(file);
        element.download = "textfile.txt";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        props.showAlert("Text downloaded!", "success");
    };
    
    
    const [utterance, setUtterance] = useState(null);
    const synth = window.speechSynthesis;
    const handleSpeak = () => {
        if (synth.speaking) {
            synth.cancel();
            props.showAlert("Speech Stopped!", "warning");
            return;
        }
        if (text.trim().length === 0) {
            props.showAlert("Nothing to speak!", "warning");
            return;
        }
        const newUtterance = new SpeechSynthesisUtterance(text);
        setUtterance(newUtterance); 
        synth.speak(newUtterance);
        props.showAlert("Speaking your text!", "success");
    };

    
    const handleTogglePauseResume = () => {
        if (!synth.speaking) return;

        if (synth.paused) {
            synth.resume();
            setIsPaused(false);
            props.showAlert("Speech Resumed!", "success");
        } else {
            synth.pause();
            setIsPaused(true);
            props.showAlert("Speech Paused!", "success");
        }
    };
    
    
    
    const [isBold, setBold] = useState(false);
    const [isItalic, setItalic] = useState(false);
    const [text, setText] = useState('');
    const [isPaused, setIsPaused] = useState(false);
    

    return (
        <>
            <div className="container" style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>
                <h1 className='mb-4 '>{props.heading}</h1>
                <div className="mb-3">
                    <textarea className="form-control" value={text} onChange={handleOnChange} style={{ backgroundColor: props.mode === 'dark' ? '#13466e' : 'white', color: props.mode === 'dark' ? 'white' : '#042743', fontWeight: isBold ? 'bold' : 'normal', fontStyle: isItalic ? 'italic' : 'normal' }} id="myBox" rows="8"></textarea>
                </div>
                <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>Convert to Uppercase</button>
                <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleLoClick}>Convert to Lowercase</button>
                <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handletitleClick}>Convert to TitleCase</button>
                <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleSentenceClick}>Convert to SentenceCase</button>
                <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleCopy}>Copy Text</button>
                <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleBold}>Text Bold</button>
                <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleItalic}>Text Italic</button>
                <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
                <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleDownload}>Download Text</button>
                <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleSpeak}>{synth.speaking ? "Stop Speaking" : "Speak Text"}</button>
                <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleTogglePauseResume}>{isPaused ? "Resume Speech" : "Pause Speech"}</button>
                <button disabled={text.length === 0} className="btn btn-danger mx-1 my-1" onClick={handleClearClick}>Clear Text</button>
            </div>
            <div className="container my-3" style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>
                <h3>Your Text Summary</h3>
                <p>{text.split(/\s+/).filter((element) => { return element.length !== 0 }).length} words and {text.length} characters</p>
                <p>{0.008 * text.split(/\s+/).filter((element) => { return element.length !== 0 }).length} Minutes read</p>
                <h2>Preview</h2>
                <p  style={{ fontWeight: isBold ? "bold" : "normal", fontStyle: isItalic ? 'italic' : 'normal'}}>{text.length > 0 ? text : "Nothing to preview!"}</p>
            </div>
        </>
    )
}