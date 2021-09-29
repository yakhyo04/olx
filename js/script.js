const elForm = document.querySelector('#form');
const elSearch = elForm.querySelector('#search');
const elSelect = elForm.querySelector('#main__select');
const elSelect2 = elForm.querySelector('#main__select_2');
const elBtn = elForm.querySelector('#main__btn');
const elList = document.querySelector('.home__card')

function renderTypes(dataArr, element){
    let result = []
    dataArr.forEach(data =>{
        data.type.forEach((types) =>{
            if(!result.includes(types)){
                result.push(types)
            }
        })
    })
    result.forEach((types) =>{
        let newOption = document.querySelector('option');
        newOption.textContent = types;
        newOption.value = types;
        element.appendChild(newOption)
    })
}

renderTypes(datas, elSelect)

function renderDatas(datas, element){
    element.innerHTML = null;
    datas.forEach((data) =>{
        let newLi = document.createElement('li');
        let newImg = document.createElement('img');
        let newNum = document.createElement('b');
        let newTitle = document.createElement('h2');
        let newTime = document.createElement('time');
        let newOverview = document.createElement('p');
        let newPrice = document.createElement('i');
        let newRooms = document.createElement('h3')
        let newDiv = document.createElement('div')

        let date = new Date(data.release_date)
        let month = date.getMonth() +1;
        let day = date.getDate();
        let year = date.getFullYear();

        newLi.setAttribute('class', 'datas__card');
        newTime.setAttribute('datetime', `${day}.${month}.${year}`);
        newTime.textContent =  `${day}.${month}.${year}`;
        newTime.setAttribute('class', 'datas__time');
        newOverview.setAttribute('class', 'datas__overview');
        newImg.setAttribute('src', data.img);
        newImg.setAttribute('class', 'datas__img')
        newTitle.setAttribute('class', 'datas__sub--title');
        newTitle.textContent = data.title;
        newOverview.textContent = data.overview;
        newNum.setAttribute('class', 'datas__num');
        newNum.textContent = data.num
        newPrice.setAttribute('class', 'datas__price')
        newPrice.textContent = "$ " + data.price
        newRooms.setAttribute('class', 'datas__rooms');
        newRooms.textContent = "rooms: " + data.rooms
        newDiv.setAttribute('class', 'datas__div')

        newDiv.appendChild(newImg)
        newLi.appendChild(newDiv)
        newLi.appendChild(newTime)
        newLi.appendChild(newNum)
        newLi.appendChild(newRooms)
        newLi.appendChild(newTitle)
        newLi.appendChild(newOverview)
        newLi.appendChild(newPrice)

        elList.appendChild(newLi);
    })
}

renderDatas(datas, elList)

elForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    const searchValue = elSearch.value.trim();
    const selectValue = elSelect.value.trim();
    const selectValue2 = elSelect2.value.trim();
    const regex = new RegExp(searchValue, 'gi')

    const filteredArray = datas.filter((data) => data.title.match(regex));

    let selectArray = []

    if(selectValue === 'All'){
        selectArray = filteredArray
    }else{
        selectArray = filteredArray.filter(data => data.type.includes(selectValue))
    }


    if(selectValue2 === 'cheap-expensive'){
        selectArray.sort((a,b) =>{
            if(a.price > b.price){
                return 1
            }else if(a.price < b.price){
                return -1
            }else{
                return 0
            }
        })
    }if(selectValue2 === 'expensive-cheap'){
        selectArray.sort((a,b) =>{
            if(a.price > b.price){
                return -1
            }else if(a.price < b.price){
                return 1
            }else{
                return 0
            }
        })
    }if(selectValue2 === 'old-new'){
        selectArray.sort((a,b) =>{
            if(a.release_date > b.release_date){
                return 1
            }else if(a.release_date < b.release_date){
                return -1
            }else{
                return 0
            }
        })
    }if(selectValue2 === 'new-old'){
        selectArray.sort((a,b) =>{
            if(a.release_date > b.release_date){
                return -1
            }else if(a.release_date < b.release_date){
                return 1
            }else{
                return 0
            }
        })
    }


    elSearch.value = null
    
    renderDatas(selectArray, elList)
})


function openNav() {
    document.getElementById("mySidenav").style.width = "300px";
    document.getElementById("love-icon").style.marginLeft = "300px";
  }

  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("love-icon").style.marginLeft= "0";
}  