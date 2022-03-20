import '../styles/App.css';
import { useAppSelector } from '../hooks/hooks'
import Card from './Card';
import Serch from './Serch';


function App() {

  let { weatherInfo } = useAppSelector(item => item.weather)

  let { dataCity } = useAppSelector(city => city.weather)

  let { status } = useAppSelector(status => status.weather)

  let { correctNameCity } = useAppSelector(currect => currect.weather)

  let { error } = useAppSelector(error => error.weather)


  return (
    <div className="App">
      <div className='cityName'>
        {correctNameCity && <h2>{dataCity.cityName} <span>{dataCity.country}</span></h2>}
      </div>
      <div className='wrapper-card'>
        {status === null
          && correctNameCity
          && error === undefined
          && <h1>
            Здесь будут данные о погоде
          </h1>}

        {status === 'rejected'
          && correctNameCity === true
          && <h1>
            {error}
          </h1>}

        {status === 'pending'
          && <h1>
            Загрузка...
          </h1>}

        {correctNameCity === false
          && <h1>
            Введите корректное название
          </h1>}

        {status === 'fulfilled'
          && correctNameCity
          && weatherInfo.map(item => <Card infoWeather={item} key={Math.random()} />)}
      </div>
      <Serch />
    </div>
  );
}

export default App;
