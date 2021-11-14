import React, {useState,useEffect} from "react"
import axios from "axios"


const App =(props)=> {
    const [candidateId,setCandidateId] = useState("")
    const [percentile,setPercentile] = useState([0,0])
    const [error,setError] = useState("")


    const handleSubmit = async(e) => {
        e.preventDefault()
        if (candidateId===""){
            setError("please enter a valid candidate id") 

        }else {
            const candidatePercentile = (await axios.get(`api/percentile/`,{params:{id:candidateId}})).data
            setPercentile(candidatePercentile)
            setError("")
        }

    }

    return <div>
        <form onSubmit={handleSubmit}>
        <div style={{flexDirection:"column",display:"flex",width:"50%",fontSize:"30px"}}>
            <label>Enter a candidate id</label>
            <input placeholder="Enter a candidate id from 889 to 947" style={{height:"30px",fontSize:"20px"}} type="Number" onChange={(e)=>{
                setCandidateId(e.target.value)
            }} value={candidateId} min = "889" max = "947"></input>
            <div style={{color:"red"}}>{error}</div>
            <br />
            </div>
            <button style={{height:"30px",fontSize:"20px"}} type="submit">Search</button>
        </form>
        <br />
        <div style={{fontSize:"30px"}}>Communication score pencentile is : {percentile[0]}%</div>
        <div style={{fontSize:"30px"}}>Coding score pencentile is: {percentile[1]}%</div>

    </div>
    }


export default App