import { React, useState, useEffect } from 'react';
// CSS
import '../styles/tech-skills.css';
// Icons
import vector from '../images/Vector.png';
import remove from '../images/Remove.png';
import next from '../images/Next.png';
import prev from '../images/Previous.png';
// Axios
import axios from 'axios';

const TechSkills  = ({ changePage }) => {
  // Skills array from server
  let [ skillsArray, setSkillsArray ] = useState([]);
  // Added skills array
  let [ skills, setSkills ] = useState([]);

  let [ skill, setSkill ] = useState('');
  let [ experience, setExperience ] = useState('');
  // Validation
  let [ skillError, setSkillError ] = useState('');
  let [ experienceError, setExperienceError ] = useState('');

  useEffect(() => {
    setSkillsArray(skillsArray = []);
    const localStorageArray = localStorage.getItem('skills');
    if(localStorageArray){
      setSkills(skills = []);
      setSkills(skills.concat(JSON.parse(localStorageArray)));
    }
    axios.get('https://bootcamp-2022.devtest.ge/api/skills')
      .then(response => setSkillsArray(skillsArray.concat(response.data)))
      .catch(error => console.log(error.message))
  }, [])

  const handlePage = (num) => {
    if(num === 1){
      localStorage.removeItem('skills');
      localStorage.setItem('skills', JSON.stringify(skills))
      changePage(num);
    }else{
      if(skills.length === 0){
        setSkillError('* select skills');
      }else{
        localStorage.removeItem('skills');
        localStorage.setItem('skills', JSON.stringify(skills))
        changePage(num);
      }
    }
  }

  const handleAddition = () => {
    const experienceRegex = /^[0-9]{2}$/;
    const experienceRegex2 = /^[0-9]{1}$/;
    setSkillError('');
    setExperienceError('');
    if(!skill){
      setSkillError('* select skills');
    }else if(experience === ''){
      setExperienceError('* add experience');
    }else if(experience.match(experienceRegex) ||
             experience.match(experienceRegex2)){
      const skillObj = skillsArray.find(i => i.title === skill);
      if(skills.find(i => i.id === skillObj.id)){
        setSkillError('* this skill is already selected');
        setSkill('');
        setExperience('');
      }else{
        const newObj = { 
          id: skillObj.id,
          title: skillObj.title,
          experience: experience
        }
        setSkills(skills.concat(newObj));
        setSkill('');
        setExperience('');
      }
    }else{
      setExperienceError('* invalid experience');
    }
  }

  const removeSkill = (id) => {
    const newArray = skills.filter(i => i.id !== id);
    setSkills(newArray);
  }

  return (
    <div className="form-container">
      {/* Left Div */}
      <div className="form-container-left-div">
        {/* Header */}
        <div className="form-container-left-header">
          <h4 style={{ width: "100%" }}>Tell us about your skills</h4>
        </div>
        {/* Form */}
        <div className="skills-div">
          <div className="skills-top-div">
            <div className="skills-list-div" style={{ width: "100%" }}>
              <select className="input" style={{ width: "100%" }}
                onChange={({ target }) => setSkill(target.value)}
                value={skill ? skill : "skillDefault"}>

                <option value="skillDefault" disabled hidden>Skills</option>
                {skillsArray.length !== 0 && skillsArray.map(i => {
                  return(
                    <option key={i.id}>{i.title}</option>
                  )
                })}

              </select>
              {skillError && <p className="validation-p" style={{ paddingLeft: "57px" }}>
                {skillError}</p>}
              <img src={vector} className="vector" alt="arrow" />
            </div>

            <div style={{ position: 'relative', width: "100%" }}>
              <div>
                <input className="input" type="text" placeholder="Experience Duration in Years"
                  maxLength="2"  onChange={({ target }) => setExperience(target.value)} value={experience}
                  style={{ borderColor: experienceError ? "#FE3B1F" : "#525557", width: "100%" }} />
                {experienceError && <p className="validation-p" style={{ paddingLeft: "57px" }}>
                  {experienceError}</p>}
              </div>
            </div>

            <div>
              <button onClick={handleAddition}>Add Programming Language</button>
            </div>
          </div>

          <div className="skills-bottom-div">
            {skills.length !== 0 && skills.map(i => {
              return (
                <div key={i.id}>
                  <div>
                    <p>{i.title}</p>
                    <p>Years of Experience: {i.experience}</p>
                  </div>
                  <img src={remove} onClick={() => removeSkill(i.id)} alt="remove" />
                </div>
              )
            })}
          </div>
        </div>
        {/* Navigation */}
        <div className="navigation-container">
          <span className="nav-span nav-prev" onClick={() => handlePage(1)}>
            <img src={prev} alt="prev" />
          </span>
          <span className="nav-span nav-full" onClick={() => handlePage(1)}></span>
          <span className="nav-span nav-full"></span>
          <span className="nav-span"></span>
          <span className="nav-span"></span>
          <span className="nav-span"></span>
          <span className="nav-span nav-next" onClick={() => handlePage(3)}>
            <img src={next} alt="next" />
          </span>
        </div>
      </div>
      {/* Right Div */}
      <div className="form-container-right-div">
        <h3>A bit about our battles</h3>
        <p>
          As we said, Redberry has been on the field for quite some time now,
          and we have touched and embraced a variety of programming languages, technologies,
          philosophies, and frameworks. We are battle-tested in PHP Laravel Stack with Vue.js,
          refined in React, and allies with Serverside technologies like Docker and Kubernetes,
          and now we have set foot in the web3 industry.
        </p>
      </div>
    </div>
  );
}

export default TechSkills;