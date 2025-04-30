import react,{useState,useRef } from 'react';
import './style.css';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "../component/ui/carousel";
import { Button } from "../component/ui/button";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const categories=[
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "DevOps",
    "Data Science",
    "Machine Learning",
]

export default function Filters() {
  const carouselRef = useRef(null);
  const dispatch= useDispatch();
  const navigate=useNavigate();
  const [query, setQuery] = useState("");

   const searchJobHandler = (query) => {
      dispatch(setSearchedQuery(query));
      navigate("/browse");
  }

  // Function to scroll when the user drags
  const handleScroll = (event) => {
      if (carouselRef.current) {
          carouselRef.current.scrollLeft += event.deltaY;
      }
  };

  return (
      <div className="home-img" style={{ width: "100%", maxWidth: "600px", margin: "50px auto", overflow: "hidden" }}>
         
            <Carousel>
              <div
                  ref={carouselRef}
                  style={{
                      display: "flex",
                      gap: "70px",
                      overflowX: "auto",
                      scrollBehavior: "smooth",
                      scrollbarWidth: "none", // Hide scrollbar for Firefox
                      msOverflowStyle: "none", // Hide scrollbar for IE/Edge
                  }}
                  onWheel={handleScroll} // Allow scrolling with mouse wheel
              >
                  {categories.map((query, index) => (
                      <CarouselItem key={index} style={{ flex: "0 0 auto" }}>
                          <Button onClick={()=>searchJobHandler(query)}    style={{ padding: "10px 20px", borderRadius: "50px", border: "2px solid #007bff", background: " black", color: "white", cursor: "pointer" }}>
                              {query}
                          </Button>
                      </CarouselItem>
                  ))}
             
              </div>
          </Carousel>
        
      </div>
      
  );
}