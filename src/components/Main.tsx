import React from 'react'

interface WeatherInfo {
    humidity: number;
    pressure: number;
    dayTemp: number;
    nightTemp: number;
    windSpeed: number;
}

function Main({ ...weather }: WeatherInfo) {
    return (
        <main>
            <div className='temp'>
                <div className='temp-day'>
                    <p>Днём: <span>{Math.round(weather.dayTemp)}°С</span></p>
                </div>
                <div style={{ marginLeft: '10px' }} className='temp-night'>
                    <p>Ночью: <span>{Math.round(weather.nightTemp)}°C</span></p>
                </div>
            </div>
            <div className='humidity'>
                <p>Влажность, %: <span>{weather.humidity}</span></p>
            </div>
            <div className='wind'>
                <p>Ветер м/с: <span>{weather.windSpeed.toFixed(1)}</span></p>
            </div>
            <div className='pressure'>
                <p>Давление, мм: <span>{Math.round(weather.pressure / 1.333)}</span></p>
            </div>
        </main>
    )
}

export default Main