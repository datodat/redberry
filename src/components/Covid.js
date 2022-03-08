import { React, useState, useEffect } from 'react';
// CSS
import '../styles/covid.css';
// Icons
import calendar from '../images/calendar.png';
import next from '../images/Next.png';
import prev from '../images/Previous.png';

const Covid = ({ changePage }) => {
  const [ workPreference, setWorkPreference ] = useState('');
  const [ hadCovid, setHadCovid ] = useState('');
  const [ covidDate, setCovidDate ] = useState('');
  const [ vaccinated, setVaccinated ] = useState('');
  const [ vaccinatedDate, setVaccinatedDate ] = useState('');
  // Validation
  const [ workError, setWorkError ] = useState('');
  const [ covidError, setCovidError ] = useState('');
  const [ covidDateError, setCovidDateError ] = useState('');
  const [ vaccinatedError, setVaccinatedError ] = useState('');
  const [ vaccinatedDateError, setVaccinatedDateError ] = useState('');

  useEffect(() => {
    const storageWork = localStorage.getItem('work_preference');
    const storageCovid = localStorage.getItem('had_covid');
    const storageCovidDate = localStorage.getItem('had_covid_at');
    const storageVaccinated = localStorage.getItem('vaccinated');
    const storageVaccinatedDate = localStorage.getItem('vaccinated_at');
    if(storageWork){
      setWorkPreference(storageWork);
    }
    if(storageCovid){
      setHadCovid(JSON.parse(storageCovid));
    }
    if(storageCovidDate){
      setCovidDate(storageCovidDate);
    }
    if(storageVaccinated){
      setVaccinated(JSON.parse(storageVaccinated));
    }
    if(storageVaccinatedDate){
      setVaccinatedDate(storageVaccinatedDate);
    }
  }, [])

  const handleNextPage = (page) => {
    setWorkError('');
    setCovidError('');
    setCovidDateError('');
    setVaccinatedError('');
    setVaccinatedDateError('');

    if(page === 4){
      if(workPreference === ''){
        setWorkError('* select work preference');
      }else if(hadCovid === ''){
        setCovidError('* this field is required');
      }else if(hadCovid === true && covidDate === ''){
        setCovidDateError('* select covid date');
      }else if(vaccinated === ''){
        setVaccinatedError('* this field is required');
      }else if(vaccinated === true && vaccinatedDate === ''){
        setVaccinatedDateError('* select vaccinated date');
      }else{
        localStorage.setItem('work_preference', workPreference);
        localStorage.setItem('had_covid', hadCovid);
        localStorage.setItem('vaccinated', vaccinated);
        if(covidDate !== ''){
          localStorage.setItem('had_covid_at', covidDate);
        }else{
          localStorage.removeItem('had_covid_at');
        }
        if(vaccinatedDate !== ''){
          localStorage.setItem('vaccinated_at', vaccinatedDate);
        }else{
          localStorage.removeItem('vaccinated_at');
        }
        changePage(page);
      }
    }else{
      if(workPreference !== ''){
        localStorage.setItem('work_preference', workPreference);
      }else{
        localStorage.removeItem('work_preference');
      }

      if(hadCovid !== ''){
        localStorage.setItem('had_covid', hadCovid);
      }else{
        localStorage.removeItem('had_covid');
      }

      if(vaccinated !== ''){
        localStorage.setItem('vaccinated', vaccinated);
      }else{
        localStorage.removeItem('vaccinated');
      }

      if(covidDate !== ''){
        localStorage.setItem('had_covid_at', covidDate);
      }else{
        localStorage.removeItem('had_covid_at');
      } 
      
      if(vaccinatedDate !== ''){
        localStorage.setItem('vaccinated_at', vaccinatedDate);
      }else{
        localStorage.removeItem('vaccinated_at');
      }
      changePage(page);
    }
  }

  const handleCovid = (value) => {
    if(value === 'yes'){
      setHadCovid(true);
    }else{
      setHadCovid(false);
      setCovidDate('');
    }
  }

  const handleVaccinated = (value) => {
    if(value === 'yes'){
      setVaccinated(true);
    }else{
      setVaccinated(false);
      setVaccinatedDate('');
    }
  }

  return (
    <div className="form-container">
      {/* Left Div */}
      <div className="form-container-left-div">
        {/* Header */}
        <div className="form-container-left-header">
          <h4 style={{ width: "100%" }}>Covid Stuff</h4>
        </div>
        {/* Form */}
        <div className="covid-form-div">
          {/* Work Preference */}
          <div className="radio-div">
            <p>how would you prefer to work?</p>
            {workError && <p className="validation-p validation-work">{workError}</p>}
            <form onChange={({ target }) => setWorkPreference(target.value)}>
              <div>
                <input name="work_preference" type="radio" id="office" value="from_office"
                  checked={workPreference === 'from_office' ? true : false}
                  onChange={({ target }) => console.log(target.value)} />
                <label htmlFor="office">From Sairme Office</label>
              </div>

              <div>
                <input name="work_preference" type="radio" id="home" value="from_home"
                  checked={workPreference === 'from_home' ? true : false}
                  onChange={({ target }) => console.log(target.value)} />
                <label htmlFor="home">From Home</label>
              </div>

              <div>
                <input name="work_preference" type="radio" id="hybrid" value="hybrid"
                  checked={workPreference === 'hybrid' ? true : false}
                  onChange={({ target }) => console.log(target.value)} />
                <label htmlFor="hybrid">Hybrid</label>
              </div>
            </form>
          </div>
          {/* Had Covid */}
          <div>
            <p>Did you contact covid 19? :(</p>
            {covidError && <p className="validation-p validation-covid">{covidError}</p>}
            <form onChange={({ target }) => handleCovid(target.value)}>
              <div>
                <input name="had_covid" type="radio" id="covid-yes" value="yes"
                  checked={hadCovid === true ? true : false}
                  onChange={({ target }) => console.log(target.value)} />
                <label htmlFor="covid-yes">Yes</label>
              </div>

              <div>
                <input name="had_covid" type="radio" id="covid-no" value="no" 
                  checked={hadCovid === false ? true : false}
                  onChange={({ target }) => console.log(target.value)} />
                <label htmlFor="covid-no">No</label>
              </div>
            </form>
          </div>
          {/* Covid Date */}
          <div className="hidden-div" style={{ display: hadCovid ? 'flex' : 'none' }}>
            <p>When?</p>
            {covidDateError && <p className="validation-p validation-covid-date">{covidDateError}</p>}
            <input type="date" placeholder={covidDate !== '' ? covidDate : 'Date'}
              onChange={({ target }) => setCovidDate(target.value)} value={covidDate}
              style={{ borderColor: covidDateError ? "#FE3B1F" : "#525557" }} />
            <img className="calendar" src={calendar} alt="calendar" />
          </div>
          {/* Vaccinated */}
          <div>
            <p>Have you been vaccinated?</p>
            {vaccinatedError && <p className="validation-p validation-vaccinated">{vaccinatedError}</p>}
            <form onChange={({ target }) => handleVaccinated(target.value)}>
              <div>
                <input name="vaccinated" type="radio" id="vaccinated-yes" value="yes"
                  checked={vaccinated === true ? true : false}
                  onChange={({ target }) => console.log(target.value)} />
                <label htmlFor="vaccinated-yes">Yes</label>
              </div>

              <div>
                <input name="vaccinated" type="radio" id="vaccinated-no" value="no"
                  checked={vaccinated === false ? true : false}
                  onChange={({ target }) => console.log(target.value)} />
                <label htmlFor="vaccinated-no">No</label>
              </div>
            </form>
          </div>
          {/* Vaccinated Date */}
          <div className="hidden-div" style={{ display: vaccinated ? 'flex' : 'none' }}>
            <p>When did you get your last covid vaccine?</p>
            {vaccinatedDateError && <p className="validation-p validation-vaccinated-date">{vaccinatedDateError}</p>}
            <input type="date" placeholder={vaccinatedDate !== '' ? vaccinatedDate : 'Date'}
              onChange={({ target }) => setVaccinatedDate(target.value)} value={vaccinatedDate}
              style={{ borderColor: vaccinatedDateError ? "#FE3B1F" : "#525557" }} />
            <img className="calendar" src={calendar} alt="calendar" />
          </div>
        </div>
        {/* Navigation */}
        <div className="navigation-container">
          <span className="nav-span nav-prev" onClick={() => handleNextPage(2)}>
            <img src={prev} alt="prev" />
          </span>
          <span className="nav-span nav-full" onClick={() => handleNextPage(1)}></span>
          <span className="nav-span nav-full" onClick={() => handleNextPage(2)}></span>
          <span className="nav-span nav-full"></span>
          <span className="nav-span"></span>
          <span className="nav-span"></span>
          <span className="nav-span nav-next" onClick={() => handleNextPage(4)}>
            <img src={next} alt="next" />
          </span>
        </div>
      </div>
      {/* Right Div */}
      <div className="form-container-right-div">
        <h3>Redberry Covid Policies</h3>
        <p>
          As this infamous pandemic took over the world, we adjusted our working practices
          so that our employees can be as safe and comfortable as possible.
          We have a hybrid work environment, so you can either work from home
          or visit our lovely office on Sairme Street. If it was up to us,
          we would love you to see us in the office because we think face-to-face communications
          {">"} Zoom meetings. Both on the fun and productivity scales. 
        </p>
      </div>
    </div>
  );
}

export default Covid;