
import react,{ useEffect, useState }  from "react";
import './style.css';
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";


const filterData=[
    {
        filterType:"Location",
        array:["Delhi", "Ahemdabad","Bangalore" ,"Surat"," Vadodara","Mumbai","Mumbai"]

    },
    {
        filterType:"Industry",
        array:["Fullstack Developer","Machine Learning","Devops"]

    },
    {
        filterType:"Salary",
        array:["0k-50k", "50k-1lakh","1lakh-9lakh"]

    }
]
const FilterCard= ()=>{

    const [selectedValue, setSelectedValue] = useState("");
    const dispatch=useDispatch();
    const changeHandler = (value) => {
        setSelectedValue(value);
    }

    useEffect(()=>{
        dispatch(setSearchedQuery(selectedValue));
    },[selectedValue]);

    return(

        <div className="filtercard-container">
            <h4>Filter jobs</h4>
            <hr />
        <div className="filter-content" value={selectedValue} >
            {

                /*
                key={itemId}: every element in map must have unique id to prevent rendering issues
                name={data.filterType}:only one value in radio btn can be selected at one time
                value={item} :actual value of the rdiobtn
                id={itemId}:id of every element so that it can be recognised
                checked={selectedValue === item} />: This ensures the selection remains consistent with state.


                */
                filterData.map((data,index)=>(
                    
                    <div>
                        <h4>{data.filterType}</h4>
                        {
                            data.array.map((item,idx)=>{
                                const itemId=`id${index}-${idx}`;  //This creates an unique id for each item in radiobtn
                                return (
                                <div key={itemId} className="filter-option">
                                    <input onChange={(e) => changeHandler(e.target.value)} type="radio" name={data.filterType} value={item} id={itemId}  />
                                    <label htmlFor={itemId}>{item}</label>
                                </div>
                                )
                            })
                        }
                    </div>
                ))
            }
      </div>
        </div>
    )
}

export default FilterCard;