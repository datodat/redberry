import { React, useState, useEffect } from 'react';
// Css
import '../styles/personal-info.css';
// Arrows
import next from '../images/Next.png';
import prev from '../images/Previous.png';

const PersonalInfo  = ({ changePage }) => {
  // Values
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ phone, setPhone ] = useState('');
  // Errors
  const [ firstNameError, setFirstNameError ] = useState('');
  const [ lastNameError, setLastNameErrore ] = useState('');
  const [ emailError, setEmailError ] = useState('');
  const [ phoneError, setPhoneError ] = useState('');

  // Effect
  useEffect(() => {
    const storageFirstName = localStorage.getItem('firstName');
    const storageLastName = localStorage.getItem('lastName');
    const storageEmail = localStorage.getItem('email');
    const storagePhone = localStorage.getItem('phone');

    if(storageFirstName){
      setFirstName(storageFirstName);
    }
    if(storageLastName){
      setLastName(storageLastName);
    }
    if(storageEmail){
      setEmail(storageEmail);
    }
    if(storagePhone){
      setPhone(storagePhone);
    }
  }, [])

  // Validators
  const style = {
    paddingLeft: "57px",
    marginTop: "5px"
  }

  const validateFirstName = () => {
    setFirstNameError('');
    if(firstName === ''){
      setFirstNameError('* first name is required');
      localStorage.removeItem('firstName');
      return false;
    }else if(firstName.length < 2){
      setFirstNameError('* first name should include 2 or more characters');
      localStorage.removeItem('firstName');
      return false;
    }else{
      localStorage.removeItem('firstName');
      localStorage.setItem('firstName', firstName);
      return true;
    }
  }

  const validateLastName = () => {
    setLastNameErrore('');
    if(lastName === ''){
      setLastNameErrore('* last name is required');
      localStorage.removeItem('lastName');
      return false;
    }else if(lastName.length < 2){
      setLastNameErrore('* last name should include 2 or more characters');
      localStorage.removeItem('lastName');
      return false;
    }else{
      localStorage.removeItem('lastName');
      localStorage.setItem('lastName', lastName);
      return true;
    }
  }

  const validateEmail = () => {
    setEmailError('');
    const emailRegex = /\S+@\S+\.\S+/;
    if(email === ''){
      setEmailError('* email is required');
      localStorage.removeItem('email');
      return false;
    }else if(!email.match(emailRegex)){
      setEmailError('* email address is invalid');
      localStorage.removeItem('email');
      return false;
    }else{
      localStorage.removeItem('email');
      localStorage.setItem('email', email);
      return true;
    }
  }

  const validatePhone = () => {

    const validPhone1 = /^\+995\s*5[0-9]{8}$/;
    const validPhone2 = /^\+995\s?5[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}$/;
    const validPhone3 = /^\+995\s*5[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}$/;
    const validPhone4 = /^\+995\s*5[0-9]{2}\s?[0-9]{3}\s?[0-9]{3}$/;
    const validPhone5 = /^\+995\s*5[0-9]{2}-[0-9]{3}-[0-9]{3}$/;

    setPhoneError('');
    if(phone === ''){
      localStorage.removeItem('phone');
      return true;
    }else if(phone.match(validPhone1) || 
             phone.match(validPhone2) ||
             phone.match(validPhone3) ||
             phone.match(validPhone4) ||
             phone.match(validPhone5)){
      localStorage.removeItem('phone');
      localStorage.setItem('phone', phone);
      return true;
    }else{
      setPhoneError('* phone number is invalid');
      localStorage.removeItem('phone');
      return false;
    }
  }

  // Next Page
  const handleNextPage = () => {
    validateFirstName();
    validateLastName();
    validateEmail();
    validatePhone();
    if(validateFirstName() &&
       validateLastName() &&
       validateEmail() &&
       validatePhone()){
      
      changePage(2)

    }
  }

  return (
    <div className="form-container">
      {/* Left Div */}
      <div className="form-container-left-div">
        {/* Header */}
        <div className="form-container-left-header">
          <h4 style={{ width: "80%" }}>Hey, Rocketeer, what are your coordinates?</h4>
        </div>
        {/* Form */}
        <form className="personal-info-form">

          <div>
            <input className="input" type="text" placeholder="First Name" maxLength="40" onBlur={validateFirstName}
              onChange={({ target }) => setFirstName(target.value)} value={firstName}
              style={{ borderColor: firstNameError ? "#FE3B1F" : "#525557" }} />
            {firstNameError && <p className="validation-p" style={style}>{firstNameError}</p>}
          </div>

          <div>
            <input className="input" type="text" placeholder="Last Name" maxLength="50" onBlur={validateLastName}
              onChange={({ target }) => setLastName(target.value)} value={lastName}
              style={{ borderColor: lastNameError ? "#FE3B1F" : "#525557" }} />
            {lastNameError && <p className="validation-p" style={style}>{lastNameError}</p>}
          </div>

          <div>
            <input className="input" type="text" placeholder="E Mail" maxLength="40" onBlur={validateEmail}
              onChange={({ target }) => setEmail(target.value)} value={email}
              style={{ borderColor: emailError ? "#FE3B1F" : "#525557" }} />
            {emailError && <p className="validation-p" style={style}>{emailError}</p>}
          </div>

          <div>
            <input className="input" type="text" placeholder="+995 5__ __ __ __" onBlur={validatePhone}
              onChange={({ target }) => setPhone(target.value)} value={phone}
              style={{ borderColor: phoneError ? "#FE3B1F" : "#525557" }} />
            {phoneError && <p className="validation-p" style={style}>{phoneError}</p>}
          </div>

        </form>
        {/* Navigation */}
        <div className="navigation-container">
          <span className="nav-span nav-prev" onClick={() => changePage(0)}>
            <img src={prev} alt="prev" />
          </span>
          <span className="nav-span nav-full"></span>
          <span className="nav-span"></span>
          <span className="nav-span"></span>
          <span className="nav-span"></span>
          <span className="nav-span"></span>
          <span className="nav-span nav-next" onClick={handleNextPage}>
            <img src={next} alt="next" />
          </span>
        </div>
      </div>
      {/* Rignt Div */}
      <div className="form-container-right-div">
        <h3>Redberry Origins</h3>
        <p>
          You watch “What? Where? When?” Yeah. Our founders used to play it.
          That’s where they got a question about a famous American author and screenwriter Ray Bradbury.
          Albeit, our CEO Gaga Darsalia forgot the exact name and he answered Ray Redberry.
          And at that moment, a name for a yet to be born company was inspired - Redberry 😇
        </p>
      </div>
    </div>
  );
}

export default PersonalInfo;