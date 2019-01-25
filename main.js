let today = new Date();
let year = today.getFullYear();
let month = today.getMonth();

let calendar = document.querySelector('#calendar');
let prev = calendar.querySelector('.prev');
let next = calendar.querySelector('.next');
let dates = calendar.querySelector('.dates');


let currentMoment = {
    curYear: year,
    curDate: today.getDate(),
    curMonth: month,
};

initCalendar(year, month, calendar);

function initCalendar(year, month, calendar){
    let dates = calendar.querySelector('.dates');
    let info = calendar.querySelector('.info');

    drawDates(year, month, dates);
    showInfo(year, month, info);
    
};

function showInfo(year, month, info){
    info.innerHTML = `${getMonthName(month)} ${year}`;
};

function getMonthName(momth){
    let monthes = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    return monthes[month];
};

function drawDates(year, month, dates){
    let arr = [];
    let firstDateOfMonth = 1;
    let lastDateOfMonth = getLastDayOfMonth(year, month);   
 
    let unshiftElemsNum = getUnshiftElemsNum(year, month);
 
    let pushElemsNum = getPushElemsNum(year, month);

    arr = createArr(firstDateOfMonth, lastDateOfMonth);   

    arr = unshiftElems(unshiftElemsNum, '', arr);

    arr = pushElems(pushElemsNum, '', arr);
    
    arr = chunkArr(7, arr);
      
    createTable(arr, dates);

    showCurrentDate(year, month, currentMoment, dates);

};

//arr имеет вид [['', '', 1, 2, 3, 4, 5,], [].[]]
function createTable(arr, parent){
    parent.innerHTML = '';
    for(let i = 0; i < arr.length; i++){
        let tr = document.createElement('tr');
        for (let j = 0; j < arr[i].length; j++){
            let td = document.createElement('td');
            td.innerHTML = arr[i][j];
            tr.appendChild(td);
        }
        parent.appendChild(tr);
    }
};

//подстветка текущей даты
function showCurrentDate(year, month, currentMoment, dates){
    if(year == currentMoment.curYear && month == currentMoment.curMonth){
        let tds = dates.querySelectorAll('td');
        for(let i = 0; i < tds.length; i++ ){
            if(tds[i].innerHTML == currentMoment.curDate){
                tds[i].classList.add('active');
                break;
            }
        }
    }
}

function createArr(from, to){
    let arr =[];

    for(let i = from; i <= to; i++){
        arr.push(i);
    }
    return arr;
};

function unshiftElems(num, elem, arr){
    for(let i = 0; i < num; i++){
        arr.unshift(elem);
    }

    return arr;
};

function pushElems(num, elem, arr){
    for(let i = 0; i < num; i++){
        arr.push(elem);
    }

    return arr;
};

function getLastDayOfMonth(year, month){
    if(month == 1){
        if(isLeap(year)){
            return 29;
        }else{
            return 28;
        }
    } else {
    let days = [31, undefined, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return days[month];
    }

    /*еще способ получить кол-во дней в месяце
    let date = new Date(year, month + 1, 0);
    return date.getDate();
    */
};

function isLeap(year){
    if((year % 4 == 0  && year % 100 != 0) || year % 400 == 0){
        return true;
    } else{
        return false;
    }
};

function getUnshiftElemsNum(year, month){
    let jsDayNum = getFirstWeekDayOfMonthNum(year, month);
    let realDayNum = getRealDayofWeekNum(jsDayNum);

    return realDayNum - 1;
};

function getPushElemsNum(year, month){
    let jsDayNum = getLastWeekDayOfMonthNum(year, month);
    let realDayNum = getRealDayofWeekNum(jsDayNum);

    return 7 - realDayNum;
};

function chunkArr(num, arr){
    let result = [];
    let chunk = [];
    let iterCount = arr.length / num;

    for(let i = 0; i < iterCount; i++){
        chunk = arr.splice(0, num);
        result.push(chunk);
    }
       return result;          
};
    


function getRealDayofWeekNum(jsNumOfDay){
    if(jsNumOfDay == 0){
        return 7;
    }else{
        return jsNumOfDay;
    }
};

function getFirstWeekDayOfMonthNum(year, month){
    let date = new Date(year, month, 1);
    return date.getDay();
};


function getLastWeekDayOfMonthNum(year, month){
    let date = new Date(year, month + 1, 0);
    return date.getDay();
};



prev.addEventListener('click', function(){
    year = getPrevYear(year, month);
    month = getPrevMonth(month);

    initCalendar(year, month, calendar);
});

function getPrevYear(year, month){
    if(month == 0){
        return year - 1;
    }
    else{
        return year;
    }
};

function getPrevMonth(month){
    if(month == 0){
        return 11;
    }
    else{
        return month - 1;
    }
};

next.addEventListener('click', function(){
    year = getNextYear(year, month);
    month = getNextMonth(month);
    
    initCalendar(year, month, calendar);
});

function getNextYear(year, month){
    if(month == 11){
        return year + 1;
    }
    else{
        return year;
    }
}

function getNextMonth(month){
    if(month == 11){
        return 0;
    }
    else{
        return month + 1;
    }
}