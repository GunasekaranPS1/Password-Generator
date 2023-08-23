import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';
import './App.css'; // Assuming your CSS file is named PassGenerator.css

function PassGenerator() {
  const resultEl = React.useRef(null);
  const lengthEl = React.useRef(null);
  const uppercaseEl = React.useRef(null);
  const lowercaseEl = React.useRef(null);
  const numbersEl = React.useRef(null);
  const symbolsEl = React.useRef(null);

  const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
  };

  const handleClipboardClick = () => {
    const password = resultEl.current.innerText;

    if (!password) {
      return;
    }

    navigator.clipboard.writeText(password)
      .then(() => alert('Password copied to clipboard'))
      .catch(err => console.error('Could not copy password: ', err));
  };

  const handleGenerateClick = () => {
    const length = +lengthEl.current.value;
    const hasLower = lowercaseEl.current.checked;
    const hasUpper = uppercaseEl.current.checked;
    const hasNumber = numbersEl.current.checked;
    const hasSymbol = symbolsEl.current.checked;

    resultEl.current.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
  };

  function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);

    if (typesCount === 0) {
      return '';
    }

    for (let i = 0; i < length; i += typesCount) {
      typesArr.forEach(type => {
        const funcName = Object.keys(type)[0];
        generatedPassword += randomFunc[funcName]();
      });
    }

    const finalPassword = generatedPassword.slice(0, length);

    return finalPassword;
  }

  function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  }

  function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  }

  function getRandomNumber() {
    return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  }

  function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
  }

  return (
    <div>
      <div className="container">
        <h2>Password Generator</h2>
        <div className="result-container">
          <span ref={resultEl} id="result"></span>
          <button className="btn" id="clipboard" onClick={handleClipboardClick}>
            <FontAwesomeIcon icon={faClipboard} />
          </button>
        </div>
        <div className="settings">
          <div className="setting">
            <label>Password length</label>
            <input type="number" ref={lengthEl} min="1" max="20" defaultValue="20" />
          </div>
          <div className="setting">
            <label>Include uppercase letters</label>
            <input type="checkbox" ref={uppercaseEl} defaultChecked />
          </div>
          <div className="setting">
            <label>Include lowercase letters</label>
            <input type="checkbox" ref={lowercaseEl} defaultChecked />
          </div>
          <div className="setting">
            <label>Include numbers</label>
            <input type="checkbox" ref={numbersEl} defaultChecked />
          </div>
          <div className="setting">
            <label>Include symbols</label>
            <input type="checkbox" ref={symbolsEl} defaultChecked />
          </div>
        </div>
        <button className="btn btn-large" onClick={handleGenerateClick}>
          Generate passwords
        </button>
      </div>
    </div>
  );
}

export default PassGenerator;
