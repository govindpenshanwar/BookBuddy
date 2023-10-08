import react ,{useState}from "react";
import Card from "./Card";
import Footer from "./Footer";
import axios from "axios";
const Main=()=>{
    const [search,setSearch]=useState("");
    const [bookData,setData]=useState([]);
    const [error, setError] = useState(null);
    const searchBook=(evt)=>{
        if(evt.key==="Enter")
        {
            axios.get("https://www.googleapis.com/books/v1/volumes?q="+search+"&key=AIzaSyCJtjb6uz2DfMgz8Ww9wWX5lzIr-N829j0"+'&maxResults=40')
            .then(res=>setData(res.data.items)(setError(null)))
            .catch(err=>console.log(err)( setError("Error fetching data. Please try again.")))
        }
    }
    return(
        <>
        
            <div className="header">
                <div className="row1">
                    <h1>A room without books is like<br/> a body without a soul.</h1>
                </div>
                <div className="row2">
                    <h2>Find Your Book</h2>
                    <div className="search">
                        <input type="text" placeholder="Enter Your Book Name"
                        value={search} onChange={e=>setSearch(e.target.value)}
                        onKeyPress={searchBook}/>
                        <button className="input-btn"><i className="fas fa-search"></i></button>
                    </div>
                    <img src="./images/bg9.png" alt="A boy Reading Book" />
                </div>
            </div>

            <div className="container">
              {
                    <Card book={bookData}/>
              }  
            </div>
            <Footer/>
        </>
    )
}
export default Main;