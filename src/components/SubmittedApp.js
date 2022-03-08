import { React, useState } from 'react';
// CSS
import '../styles/submitted.css';
// Arrows
import arrowTop from '../images/arrowTop.png';
import arrowBottom from '../images/arrowBottom.png';
import calendar from '../images/calendar.png';

const SubmittedApp = ({ data, index, skills }) => {

  const [ showFull, setShowFull ] = useState(false);

  return (
    <div className="submitted-app">
      <div style={{ cursor: 'pointer' }} className="submitted-top" onClick={() => setShowFull(!showFull)}>
        {index + 1}
        <img src={showFull ? arrowTop : arrowBottom} style={{ background: "inherit" }} alt="arrow" />
      </div>
      <div className="submitted-bottom" style={{ display: showFull ? 'flex' : 'none' }}>

        <div className="submitted-left-div">
          <div className="submitted-pers-info inner-div">
            <p className="submitted-p">Personal Information</p>
            <div>
              <p className="submitted-pers-key">First Name</p>
              <p className="submitted-pers-value">{data.first_name}</p>
            </div>
            <div>
              <p className="submitted-pers-key">Last Name</p>
              <p className="submitted-pers-value">{data.last_name}</p>
            </div>
            <div>
              <p className="submitted-pers-key">Email</p>
              <p className="submitted-pers-value">{data.email}</p>
            </div>
            <div style={{ display: data.phone ? '' : 'none' }}>
              <p className="submitted-pers-key">Phone</p>
              <p className="submitted-pers-value">{data.phone ? data.phone : ''}</p>
            </div>
          </div>
          <div className="submitted-covid inner-div">
            <p className="submitted-p">Covid Situation</p>
            <div>
              <p>how would you prefer to work?</p>
              <form>
                <div>
                  <input type="radio" disabled checked={data.work_preference === 'from_office' && true} />
                  <label>From Sairme Office</label>
                </div>

                <div>
                  <input type="radio" disabled checked={data.work_preference === 'from_home' && true} />
                  <label>From Home</label>
                </div>

                <div>
                  <input type="radio" disabled checked={data.work_preference === 'hybrid' && true} />
                  <label>Hybrid</label>
                </div>
              </form>
            </div>

            <div>
              <p>Did you have covid 19?</p>
              <form>
                <div>
                  <input type="radio" disabled checked={data.had_covid === true && true} />
                  <label>Yes</label>
                </div>

                <div>
                  <input type="radio" disabled checked={data.had_covid === false && true} />
                  <label>No</label>
                </div>
              </form>
            </div>

            <div className="date-div" style={{ display: data.had_covid ? 'flex' : 'none' }}>
              <p>When did you have covid 19?</p>
              <input type="date" disabled value={data.had_covid_at ? data.had_covid_at : ''} />
              <img src={calendar} alt="calendar" />
            </div>

            <div>
              <p>Have you been vaccinated?</p>
              <form>
                <div>
                  <input type="radio" disabled checked={data.vaccinated === true && true} />
                  <label>Yes</label>
                </div>

                <div>
                  <input type="radio" disabled checked={data.vaccinated === false && true} />
                  <label>No</label>
                </div>
              </form>
            </div>

            <div className="date-div" style={{ display: data.vaccinated ? 'flex' : 'none' }}>
              <p>When did you get covid vaccine?</p>
              <input type="date" disabled value={data.vaccinated_at ? data.vaccinated_at : '' } />
              <img src={calendar} alt="calendar" />
            </div>
          </div>
        </div>
        {/*  */}
        <div className="submitted-right-div">
          <div className="submitted-skills inner-div">
            <p className="submitted-p">Skillset</p>
            <div>
              {data.skills.map((i, index) => {
                return (
                  <div className="submitted-skills-list-div" key={index}>
                    <p>{skills.length !== 0 ? skills.find(a => a.id === i.id).title : ''}</p>
                    <p>Years of Experience: {i.experience}</p>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="submitted-insigts inner-div">
            <p className="submitted-p">Insigts</p>
            <div>
              <p>Would you attend Devtalks and maybe also organize your own?</p>
              <form>
                <div>
                  <input type="radio" disabled checked={data.will_organize_devtalk && true} />
                  <label>Yes</label>
                </div>

                <div>
                  <input type="radio" disabled checked={!data.will_organize_devtalk && true} />
                  <label>No</label>
                </div>
              </form>
            </div>

            <div style={{ display: data.will_organize_devtalk ? '' : 'none' }}>
              <p>What would you speak about at Devtalk?</p>
              <textarea disabled value={data.will_organize_devtalk ? data.devtalk_topic : ''} />
            </div>
            
            <div>
              <p>Tell us somthing special</p>
              <textarea disabled value={data.something_special} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmittedApp;