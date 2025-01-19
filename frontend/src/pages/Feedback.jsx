import React, { useState ,useEffect} from 'react'
import axios  from 'axios'
import './Feedback.css'
import { Link } from 'react-scroll';


const Feedback = () => {
  // feedback url 
  const Apiurl = ''


  const [feedbackData, setFeedbackData] = useState({
    name: "",
    rating: 0,
    comments: ""    
});
  const [allFeedback, setAllFeedback] = useState([]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData({ ...feedbackData, [name]: value });
};

const handleRating = (rating) => {
  setFeedbackData({ ...feedbackData, rating });
};

// post data in feedback url
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
      await axios.post("https://mitmart-4276b-default-rtdb.firebaseio.com/feedback.json", feedbackData);
      setFeedbackData({ name: "", rating: 0, comments: "" });
      fetchFeedback(); 
  
  } catch (error) {
      console.log("error", error);
  }
};

// show on ui
const fetchFeedback = async () => {
  try {
      const response = await axios.get("https://mitmart-4276b-default-rtdb.firebaseio.com/feedback.json");
      if (response.data) {
          const formattedData = Object.entries(response.data).map(([id, data]) => ({
              id,
              ...data,
          }));
          setAllFeedback(formattedData);
      }
  } catch (error) {
      console.log("Error fetching feedback:", error);
  }
};

useEffect(() => {
  fetchFeedback();
}, []);


 useEffect(()=>{
    window.scrollTo({top:0,left:0})
  },[])




  return (
             <div className='feedback_COntainer'>
             {/* post data */}
             <div className="feed_img">   
              <Link className='form_link' to="form">Feedback Form</Link>
              <Link className='form_link' to="User_Feedbacks">Users Feedbacks</Link>
              <Link className='form_link' to="guidelines"> See Guidelines</Link>  
             </div>
             <div className='feed-nav'>  
             
             <div > <h1>Your Voice Matters</h1>
            <marquee> <h2>Share your thoughts and help us improve. Your feedback shapes our future.</h2></marquee></div>
             </div>
             <div className="feedback-container">
              <h1>Share Your Feedback</h1>
              <form onSubmit={handleSubmit}  id="form" >
                            <label className='lable_text'>Name</label> <br></br>
                            <input 
                                type="text" 
                                name="name" 
                                value={feedbackData.name} 
                                onChange={handleChange} 
                                placeholder="Enter your name" 
                                required 
                            />  
                            <br></br>
                            <label  className='lable_text'>Rating (1 to 5)</label>
                            <div className="stars">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        className={`star ${feedbackData.rating >= star ? "selected" : ""}`}
                                        onClick={() => handleRating(star)}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>

                            <label  className='lable_text'>Comments</label><br></br>
                            <textarea
                                name="comments"
                                value={feedbackData.comments}
                                onChange={handleChange}
                                placeholder="Share your thoughts about your experience with us..."
                                required
                            ></textarea>
                            
                            <button type="submit">Submit Feedback</button>
                           
                        </form>
                        </div>

{/* fetch data */} 
                        <div className="feed-list" id="User_Feedbacks">
                <h2>USERS FEEDBACKS</h2>
                <div className="feedback-cards">
                    {allFeedback.map((feedback) => (
                        <div className="feedback-card" key={feedback.id}>
                            <div className="feedback-name">
                                <strong>{feedback.name}</strong> 
                            </div>
                            <div className="feedback-comments">
                                <strong>Feedback:</strong> {feedback.comments}
                            </div>
                            <div className="feedback-rating">
                                <strong>Rating:</strong> ⭐ {feedback.rating} / 5
                            </div>
                        </div>
                    ))} 
                </div>
            </div>
           <h2> Feedback Guidelines </h2>
            <div className="guidelines">
           
  {[ 
    { front: "Do's", back: "Be specific, constructive, relevant, respectful, detailed, and include examples when possible.", colorFront: "#007bff", colorBack: "#ffc107" },
    { front: "Don't", back: "Do not use inappropriate language, share personal information, make unfounded accusations, spam, or include promotional content.", colorFront: "#28a745", colorBack: "#17a2b8" },
    { front: "Best Practices", back: "Use clear and concise language, include relevant screenshots, describe expected outcomes, follow up when requested, and review before submitting.", colorFront: "#dc3545", colorBack: "#6f42c1" },
  ].map((card, index) => (
    <div className="flip-card" key={index}>
      <div className="flip-card-inner">
        <div
          className="flip-card-front"
          style={{ backgroundColor: card.colorFront }}
        >
          <p>{card.front}</p>
        </div>
        <div
          className="flip-card-back"
          style={{ backgroundColor: card.colorBack }}
        >
          <p>{card.back}</p>
        </div>
      </div>
    </div>
  ))}
</div>



                        </div>
  )
}

export default Feedback
