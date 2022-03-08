import { React, useState, useEffect } from 'react';
// CSS
import '../styles/devtalk.css';
// Arrows
import next from '../images/Next.png';
import prev from '../images/Previous.png';

const Devtalk = ({ changePage, createObject }) => {
  const [ devtalk, setDevtalk ] = useState('');
  const [ devtalkTopic, setDevtalkTopic ] = useState('');
  const [ somethingSpecial, setSomethingSpecial ] = useState('');
  // Validation
  const [ devtalkError, setDevtalkError ] = useState('');
  const [ devtalkTopicError, setDevtalkTopicError ] = useState('');
  const [ somethingSpecialError, setSomethingSpecialError ] = useState('');

  useEffect(() => {
    const storageDevtalk = localStorage.getItem('devtalk');
    const storageDevTopic = localStorage.getItem('devtalk_topic');
    const storageSomeSpecial = localStorage.getItem('something_special');

    if(storageDevtalk){
      setDevtalk(JSON.parse(storageDevtalk));
    }
    if(storageDevTopic){
      setDevtalkTopic(storageDevTopic);
    }
    if(storageSomeSpecial){
      setSomethingSpecial(storageSomeSpecial);
    }
    
  }, [])

  const handleNextPage = (page) => {
    setDevtalkError('');
    setDevtalkTopicError('');
    setSomethingSpecialError('');
    if(page === 5){
      if(devtalk === ''){
        setDevtalkError('* this field is required');
      }else if(devtalk === true && devtalkTopic === ''){
        setDevtalkTopicError('* this field is required');
      }else if(somethingSpecial === ''){
        setSomethingSpecialError('* this field is required');
      }else{
        localStorage.removeItem('devtalk');
        localStorage.setItem('devtalk', JSON.stringify(devtalk));
        localStorage.removeItem('devtalk_topic');
        localStorage.setItem('devtalk_topic', devtalkTopic);
        localStorage.removeItem('something_special');
        localStorage.setItem('something_special', somethingSpecial);

        createObject();
        changePage(page)
      }
    }else{
      if(devtalk !== ''){
        localStorage.removeItem('devtalk');
        localStorage.setItem('devtalk', JSON.stringify(devtalk));
      }else{
        localStorage.removeItem('devtalk');
      }
      if(devtalkTopic !== ''){
        localStorage.removeItem('devtalk_topic');
        localStorage.setItem('devtalk_topic', devtalkTopic);
      }else{
        localStorage.removeItem('devtalk_topic');
      }
      if(somethingSpecial !== ''){
        localStorage.removeItem('something_special');
        localStorage.setItem('something_special', somethingSpecial);
      }else{
        localStorage.removeItem('something_special');
      }
      changePage(page);
    }
  }

  const handleDevtalk = (value) => {
    if(value === 'yes'){
      setDevtalk(true);
    }else{
      setDevtalk(false);
    }
  }

  return (
    <div className="form-container">
      {/* Left Div */}
      <div className="form-container-left-div">
        {/* Header */}
        <div className="form-container-left-header">
          <h4>What about you?</h4>
        </div>
        {/* Form */}
        <div className="devtalk-container">
          {/* Devtalk */}
          <div>
            <p>Would you attend Devtalks and maybe also organize your own?</p>
            {devtalkError && <p className="validation-p">{devtalkError}</p>}
            <form onChange={({ target }) => handleDevtalk(target.value)}>
              <div>
                <input id="devtalk_yes" name="devtalk" type="radio" value="yes"
                  checked={ devtalk === true ? true : false }
                  onChange={({ target }) => console.log(target.value)} />
                <label htmlFor="devtalk_yes">Yes</label>
              </div>

              <div>
                <input id="devtalk_no" name="devtalk" type="radio" value="no"
                  checked={ devtalk === false ? true : false }
                  onChange={({ target }) => console.log(target.value)} />
                <label htmlFor="devtalk_no" >No</label>
              </div>
            </form>
          </div>
          {/* Devtalk Topic */}
          <div style={{ display: devtalk === true ? '' : 'none' }}>
            <p>Would you attend Devtalks and maybe also organize your own?</p>
            {devtalkTopicError && <p className="validation-p">{devtalkTopicError}</p>}
            <textarea placeholder="I would..." 
              style={{ height: "122px", borderColor: devtalkTopicError ? '#FE3B1F' : '#525557' }}
              onChange={({ target }) => setDevtalkTopic(target.value)}
              value={devtalkTopic} />
          </div>
          {/* Something Special */}
          <div>
            <p>Tell us something special</p>
            {somethingSpecialError && <p className="validation-p">{somethingSpecialError}</p>}
            <textarea placeholder="I..." 
              style={{ height: "89px", borderColor: somethingSpecialError ? '#FE3B1F' : '#525557' }}
              onChange={({ target }) => setSomethingSpecial(target.value)}
              value={somethingSpecial} />
          </div>
        </div>
        {/* Navigation */}
        <div className="navigation-container">
          <span className="nav-span nav-prev" onClick={() => handleNextPage(3)}>
            <img src={prev} alt="prev" />
          </span>
          <span className="nav-span nav-full" onClick={() => handleNextPage(1)}></span>
          <span className="nav-span nav-full" onClick={() => handleNextPage(2)}></span>
          <span className="nav-span nav-full" onClick={() => handleNextPage(3)}></span>
          <span className="nav-span nav-full"></span>
          <span className="nav-span"></span>
          <span className="nav-span nav-next" onClick={() => handleNextPage(5)}>
            <img src={next} alt="next" />
          </span>
        </div>
      </div>
      {/* Right Div */}
      <div className="form-container-right-div">
        <h3>Redberrian Insights</h3>
        <p>
          We were soo much fun before the pandemic started! Parties almost every
          weekend and lavish employee birthday celebrations! Unfortunately,
          covid ruined that fun like it did almost everything else in the world.
          But we try our best to zhuzh it up a bit. For example, we host biweekly
          Devtalks where our senior and lead developers talk about topics they
          are passionate about. Previous topics have included Web3, NFT, Laravel 9,
          Kubernetes, etc. We hold these talks in the office but you can join
          our Zoom broadcast as well. Feel free to join either as an attendee or a speaker!
        </p>
      </div>
    </div>
  );
}

export default Devtalk;