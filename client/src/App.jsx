import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from "react";
import './App.css';
import Select from "react-select"

function App() {


  var cities=[
    {
      value:0,
      label:"Ho Chi Minh"
    },
    {
      value:1,
      label:"Singapore"
    },
    {
      value:2,
      label:"Kuala Lumpur"
    },
    {
      value:3,
      label:"Tokyo"
    },
    {
      value:4,
      label:"Athens"
    }
  ]



  const apiKey = "f56f24967aaf51182d1d4df628297c6d"
  const [data, setData] = useState({})
  const [hval, setHval]=useState(cities.label)

  const getWetherDetails = () => {
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + hval + "&appid=" + apiKey;
    axios.get(apiURL).then((res) => {
      console.log("response", res.data)
      setData(res.data)
    }).catch((err) => {
      console.log("err", err)
    })
  }


  const selectHandler=(e)=>{
    setHval(e.label)
console.log(hval)
  }

  const handleSearch = (e) => {
    setHval(e.label)
    getWetherDetails(hval)
  }


  return (
    <div >
      <div >
        <h1 className="heading">Weather App</h1>
        <div>     
          <Select options={cities} onChange={handleSearch}/>
        </div>
      </div>

      {Object.keys(data).length > 0 &&
        <div className="col-md-12 text-center mt-5">

          <div className="shadow rounded wetherResultBox">
            <img className="weathorIcon"
              src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png" />

            <h5 className="weathorCity">
              {data?.name}
            </h5>
            <h6 className="weathorTemp">{((data?.main?.temp) - 273.15).toFixed(2)}°C</h6>
          </div>
        </div>
      }

    </div>
  );
}

export default App;