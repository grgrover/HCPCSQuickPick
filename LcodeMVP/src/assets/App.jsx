import { useState, useEffect } from 'react'
import './App.css'
import ButtonAppBar from './Appbar.jsx'
import Demographics from './Demographics.jsx'
import axios from 'axios';
import LCodesAll from './Lcodes/LCodesAll.jsx'
import Output from './Output.jsx'
import { useForm, Controller } from "react-hook-form";


function App() {
  const [billingZone, setBillingZone] = useState('')
  const [right, setRight] = useState(false)
  const [left, setLeft] = useState(false)
  const [kLevel, setKLevel] = useState('K2')
  const [levelR, setLevelR] = useState(null)
  const [levelL, setLevelL] = useState(null)
  const [discount, setDiscount] = useState('');
  const [lCodes, setLCodes] = useState([]);
  const [noShow, setNoShow] = useState(true)
  const [priceArray, setPriceArray] = useState(false);
  const [formData, setFormData] = useState({})
  const [totalCost, setTotalCost] = useState(0)
  const [patientCost, setPatientCost] = useState(0)
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      right: false,
      left: false,
      height: '',
      weight: '',
      discount: '',
      billingZone: '',
      kLevel: '',
    }
  })

  useEffect(() => {
    axios.get('http://localhost:3005/data')
      .then((data) => {
        setLCodes(data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
    , [])

  const onSubmit = (data) => {
    var codesForPricing = []
    for (var key in data) {
      if (data[key] === '') {
        delete data[key]
      } else {
        if (key[0] === 'L') {
          codesForPricing.push(key)
        }
      }
    }
    setFormData(data);
    var options = {
      method: 'get',
      url: 'http://localhost:3005/cost',
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        codes: codesForPricing,
        billingZone: data.billingZone,
      }
    }
    axios(options).then(response => {
      var priceData = response.data
      var sumCost = 0;
      var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });
      priceData.forEach(price => {
        var unitCost = parseFloat(price[data['billingZone'].toLowerCase()]) * (100 - parseFloat(data.discount)) / 100
        price.unitCost = formatter.format(unitCost)
        price.quantity = data[price.hcpcs]
        var unitTotal = (parseFloat(price[data['billingZone'].toLowerCase()]) * (100 - parseFloat(data.discount)) / 100 * parseInt(data[price.hcpcs]))
        price.unitTotal = formatter.format(unitTotal)
        sumCost += parseFloat(unitTotal);
      })
      var rounded = formatter.format(sumCost)
      var patient = formatter.format(sumCost * 0.2)
      setPriceArray(priceData)
      setTotalCost(rounded)
      setPatientCost(patient)
    }).catch(err => { console.log(err) })
  }

  return (
    <div className="App">
      <ButtonAppBar
        setLCodes={setLCodes} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Demographics
          setBillingZone={setBillingZone}
          billingZone={billingZone}
          setRight={setRight}
          right={right}
          left={left}
          setLeft={setLeft}
          setKLevel={setKLevel}
          kLevel={kLevel}
          levelL={levelL}
          levelR={levelR}
          discount={discount}
          setLevelL={setLevelL}
          setLevelR={setLevelR}
          setDiscount={setDiscount}
          control={control} />
        {lCodes &&
          <LCodesAll
            lCodes={lCodes}
            levelL={levelL}
            levelR={levelR}
            control={control}
          />}
        {priceArray && <Output
          formData={formData}
          priceArray={priceArray}
          levelL={levelL}
          levelR={levelR}
          totalCost={totalCost}
          patientCost={patientCost}
        />}
      </form>
    </div>
  )
}

export default App
