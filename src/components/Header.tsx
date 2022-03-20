
interface Date {
    dateInfo: number;
    icons: [{
        icon: string
    }];
}


let days = ['Воскресение', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

let mouth = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']


function Header({ dateInfo, icons }: Date) {


    let date = new Date(dateInfo * 1000)

    let day = days[date.getDay()]

    let mounthDay = date.getDate()

    let mounth = mouth[date.getMonth()]


    return (
        <header className='header'>
            <div className='date'>
                <p>{day}</p>
                <p><span>{mounthDay}</span>{mounth}</p>
            </div>
            <div className='description'>
                <img src={`http://openweathermap.org/img/wn/${icons[0].icon}@2x.png`} alt="" />
            </div>
        </header>
    )
}

export default Header