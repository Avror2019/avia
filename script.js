const formSearch = document.querySelector('.form-search'),
    inputCitiesFrom = document.querySelector('.input__cities-from'),
    dropdownCitiesFrom = document.querySelector('.dropdown__cities-from'),
    inputCitiesTo = document.querySelector('.input__cities-to'),
    dropdownCitiesTo = document.querySelector('.dropdown__cities-to'),
    inputDateDepart = document.querySelector('input__date-depart');

const cityApi = 'http://api.travelpayouts.com/data/ru/cities.json',
    proxy = 'https://cors-anywhere.herokuapp.com/',
    API_KEY = '17b84efe8b317ac98d9d1f4c815c2c73',
    calendar = 'http://min-prices.aviasales.ru/calendar_preload';

let city = [];




const getData = (url, callback) => {
    const requrst = new XMLHttpRequest();
    requrst.open('GET', url);

    requrst.addEventListener('readystatechange', () => {
        if (requrst.readyState !== 4) return;

        if (requrst.status === 200) {
            callback(requrst.response)
        } else {
            console.error(requrst.status);
        }
    });
    requrst.send();
};


const showCity = (input, list) => {
    list.textContent = '';
    if (input.value !== '') {


        const filterCity = city.filter((item) => {
            
            const fixItem = item.name.toLowerCase();
            return fixItem.includes(input.value.toLowerCase());
     
        });

        filterCity.forEach((item) => {
            const li = document.createElement('li');
            li.classList.add('dropdown__city');
            li.textContent = item.name;
            list.append(li)
        });
    }
};

const selectCity = (event, input, list) => {
    const target = event.target;
    if (target.tagName.toLowerCase() === 'li') {
        input.value = target.textContent;
        list.textContent = '';
    }
};

inputCitiesFrom.addEventListener('input', () => {
    showCity(inputCitiesFrom, dropdownCitiesFrom)
});

dropdownCitiesFrom.addEventListener('click', (event) =>
    selectCity(event, inputCitiesFrom, dropdownCitiesFrom));

inputCitiesTo.addEventListener('input', () => {
    showCity(inputCitiesTo, dropdownCitiesTo)
});

dropdownCitiesTo.addEventListener('click', (event) =>
    selectCity(event, inputCitiesTo, dropdownCitiesTo));


getData(cityApi, (data) => {
    city = JSON.parse(data).filter((item) => {
        return item.name;
    });
})


formSearch.addEventListener('submit', (event)=>{
event.preventDefault()

const cityFrom = city.find((item) => inputCitiesFrom.value === item.name);
const cityTo = city.find((item)=> inputCitiesTo.value === item.name);
const formData = {
    from: cityFrom.code,
    to: cityTo.code,
    when: inputDateDepart.value,
}
const requestData = '?depart_date=' + formData.when + '&origin=' + formData.from + 
'&destination=' + formData.to +
'&one_way=true&token' + API_KEY;
console.log(requestData)
})


// getData(proxy + calendar + '?depart_date=2020-05-25&origin-SVX&destination=KGD&one_way=true&token=' + API_KEY, (data) =>{
// const cheapTicket = JSON.parse(data).best_prices.filter(item => item.depart_date === '2020-05-29')
// console.log(cheapTicket);
// });

