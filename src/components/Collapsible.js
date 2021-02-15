import React from "react";

export default function Collapsible(props) {
  const student = props.data;
  const [open, setOpen] = React.useState("");
  const [tag, setTag] = React.useState('')
  const [originalTag, setOriginalTag] = React.useState([student.tags])

  const togglePanel = (e) => {
    setOpen({ open: !open });
  };

  const addTagHandler = ()=>{
setOriginalTag([...originalTag, tag])
  }

  const onChangeTag = (event) => {
    let newTag = event.target.value;
    console.log(newTag);
    setTag(newTag);
  };

  return (
    <div>
      <div onClick={(e) => togglePanel(e)} className="header">
        <h1>+</h1>
        {open && (
          <div>
            {student.grades.map((grade, index) => {
              return (
                <div>
                  <p>
                    Test{index + 1} {grade}
                  </p>
                </div>
              );
            })}
            {originalTag.map((studentTag)=>{
              return (
              <p>{studentTag}</p>
              )
            })}
            <div>
            <input
                type="text"
                placeholder="Add tag"
                value={tag}
                onChange={onChangeTag}
              />
              <button onClick={()=>addTagHandler()}>Add Tag</button>
            </div>
          </div>
        )}
       
      </div>
    </div>
  );
}
