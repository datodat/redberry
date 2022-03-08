import { React, useState } from 'react';
// Css
import './styles/app.css';
// Components
import Langing from './components/Langing';
import PersonalInfo from './components/PersonalInfo';
import TechSkills from './components/TechSkills';
import Covid from './components/Covid';
import Devtalk from './components/Devtalk';
import Submit from './components/Submit';
import Thanks from './components/Thanks';
import Submitted from './components/Submitted';
// Axios
import axios from 'axios';

const App = () => {
  // For Pagination
  const [ page, setPage ] = useState(0);

  const [ showSubmitted, setShowSubmitted ] = useState(false);

  const [ token ] = useState("8a3eb9b0-268a-403a-bff3-6cc898586c56")
  // User Object
  const [ userObject, setUserObject ] = useState(null);

  const changePage = (pageNum) => {
    setPage(pageNum);
  }

  const handleSubmitted = () => {
    setShowSubmitted(true);
  }

  const clearStorage = () => {
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('email');
    localStorage.removeItem('phone');
    localStorage.removeItem('skills');
    localStorage.removeItem('had_covid');
    localStorage.removeItem('had_covid_at');
    localStorage.removeItem('work_preference');
    localStorage.removeItem('vaccinated');
    localStorage.removeItem('vaccinated_at');
    localStorage.removeItem('devtalk');
    localStorage.removeItem('devtalk_topic');
    localStorage.removeItem('something_special');
  }

  const createObject = () => {
    const fName = localStorage.getItem('firstName');
    const lName = localStorage.getItem('lastName');
    const email = localStorage.getItem('email');
    const phone = localStorage.getItem('phone');

    const skills = JSON.parse(localStorage.getItem('skills'));

    const work = localStorage.getItem('work_preference');
    const covid = JSON.parse(localStorage.getItem('had_covid'));
    const covidDate = localStorage.getItem('had_covid_at');
    const vac = JSON.parse(localStorage.getItem('vaccinated'));
    const vacDate = localStorage.getItem('vaccinated_at');

    const devtalk = JSON.parse(localStorage.getItem('devtalk'));
    const devTopic = localStorage.getItem('devtalk_topic');
    const special = localStorage.getItem('something_special');

    const obj = {
      token: token,
      first_name: fName,
      last_name: lName,
      email: email,
      skills: skills,
      work_preference: work,
      had_covid: covid,
      vaccinated: vac,
      will_organize_devtalk: devtalk,
      something_special: special
    }

    if(phone){
      obj.phone = phone;
    }
    if(covid === true){
      obj.had_covid_at = covidDate;
    }
    if(vac === true){
      obj.vaccinated_at = vacDate;
    }
    if(devtalk === true){
      obj.devtalk_topic = devTopic;
    }

    setUserObject(obj);

  }

  const removeObject = () => {
    setUserObject(null);
  }

  const handleSubmit = () => {
    if(userObject){
      axios.post('https://bootcamp-2022.devtest.ge/api/application', userObject)
      .then(response => {
        setUserObject(null);
        clearStorage();
        setPage(6);
        setTimeout(() => {
          setPage(0);
        }, 3000)
      })
      .catch(error => console.log(error))
    }else{
      return;
    }
  }

  return (
    <main className="main-container">
      { showSubmitted && <Submitted token={token} /> }
      { (page === 0 && !showSubmitted) && <Langing handleStart={changePage} handleSubmitted={handleSubmitted} /> }
      { page === 1 && <PersonalInfo changePage={changePage} /> }
      { page === 2 && <TechSkills changePage={changePage} /> }
      { page === 3 && <Covid changePage={changePage} /> }
      { page === 4 && <Devtalk changePage={changePage} createObject={createObject} /> }
      { page === 5 && <Submit changePage={changePage} handleSubmit={handleSubmit} removeObject={removeObject} /> }
      { page === 6 && <Thanks /> }
    </main>
  );
}

export default App;