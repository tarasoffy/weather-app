import { takeCoord } from '../store/weatherSlice';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../hooks/hooks';
import '../styles/Serch.css'



function Serch() {

  let [inpValue, setInpValue] = useState('');

  let dispatch = useAppDispatch()

  const takeWeather = () => {
    if (inpValue.trim().length > 1) {
      dispatch(takeCoord(inpValue))
    } else {
      alert('Введите название города')
    }
    setInpValue('')
  }


  return (
    <div className='serch'>
      <input type="text" value={inpValue} onChange={e => setInpValue(e.target.value)} placeholder='Введите название города' />
      <button onClick={takeWeather}>Показать погоду</button>
    </div>
  )
}

export default Serch