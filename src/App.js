import React from "react";
import "./App.css";
import Collapsible from "./components/Collapsible";
import axios from "axios";

function App() {
  const [studentData, setStudentData] = React.useState([]);
  const [searchName, setName] = React.useState("");
  const [searchTag, setSearchTag] = React.useState('');
  console.log(studentData);
  React.useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const response = await axios.get(
        `https://api.hatchways.io/assessment/students`
      );
      let result = response.data.students;
      let studentWithTag = [];
      result.map((student) => {
        let addTags = student;
        addTags.tags = [];
        studentWithTag.push(addTags);
      });

      setStudentData(studentWithTag);

    } catch (error) {
      console.log(error.message);
    }
  };


  const calAverage = (grades) => {
    let sum = 0;
    grades.map((grade) => {
      sum += parseInt(grade);
    });
    let avg = sum / grades.length;
    return avg;
  };


  const nameHandler = (e) => {
    const inputText = e.target.value.toLowerCase();
    if(inputText){
      setName(inputText);

    const filteredName = studentData.filter((student) => {
      return (
        student.firstName.toLowerCase().indexOf(searchName) !== -1 ||
        student.lastName.toLowerCase().indexOf(searchName) !== -1
      );
    });
    setStudentData(filteredName);
    }
  };

  const tagHandler = (e) => {
    const inputTag = e.target.value.toLowerCase();
    setSearchTag(inputTag);
    const filteredTag = studentData.filter((student) => {
      return (
        <div>
          {student.tags.filter((tag) => {
            return tag.toLowerCase().indexOf(searchTag) !== -1
          })}
        </div>
      );
    });
    setStudentData(filteredTag);
  };

  return (
    <div className="App">
      <div className="form">
        <form>
          <div>
            <input
              type="text"
              placeholder="Search by name"
              value={searchName}
              onChange={nameHandler}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Search by tag"
              value={searchTag}
              onChange={tagHandler}
            />
          </div>
        </form>
      </div>
      <div>
        {studentData.map((student) => {
          return (
            <div className="image-content">
              <div className="image">
                <img src={student.pic} />
              </div>
              <div>
                <h2>
                  {student.firstName} {student.lastName}
                </h2>
                <p>Email: {student.email}</p>
                <p>Company: {student.company}</p>
                <p>Skill: {student.skill}</p>
                <p>Average: {calAverage(student.grades)}%</p>
                <Collapsible data={student} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
