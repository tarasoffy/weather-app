import '../styles/Card.css'
import Header from './Header'
import Main from './Main'

interface WeatherInfo {
    infoWeather: {
        dt: number;
        humidity: number;
        pressure: number;
        temp: {
            day: number;
            night: number;
        },
        wind_speed: number;
        weather: [{
            icon: string
        }]
    }
}


function Card({ infoWeather }: WeatherInfo) {

    return (
        <div className='Card'>
            <Header dateInfo={infoWeather.dt} icons={infoWeather.weather} />
            <Main
                dayTemp={infoWeather.temp.day}
                nightTemp={infoWeather.temp.night}
                humidity={infoWeather.humidity}
                windSpeed={infoWeather.wind_speed}
                pressure={infoWeather.pressure}
            />
        </div>
    )
}

export default Card