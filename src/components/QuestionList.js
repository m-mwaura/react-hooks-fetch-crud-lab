import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data));

  }, []);

  function handleDelete(deletedId) {
    fetch(`http://localhost:4000/questions/${deletedId}`,{
      method: "DELETE",
    })
   .then((res) => {
    if(!res.ok) {
      throw new Error("Failed to delete question.");
    }
    return res.json();
   })
   .then(() => {
    console.log("Before deleting:", questions);
    setQuestions((prevQuestions) => 
      prevQuestions.filter((question) => question.id !== deletedId)
    );
    console.log("After deleting:", questions);
   })
   .catch((error) => console.error("Error deleting question:", error));
  }
  

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem 
          key={question.id} 
          question={question}
          onDelete={handleDelete}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
