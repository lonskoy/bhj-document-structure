const arrLink = [...document.getElementsByClassName('has-tooltip')];
let helpDiv = document.createElement('div');
let xParrent = null;
let widthParrent = null;
let count = 0;  //счетчик для скрытия подсказки при повторном щелчке

function createDiv(elem) { 
    helpDiv.innerText = elem.getAttribute('title');
    helpDiv.className = 'tooltip';
    helpDiv.setAttribute('id', 'helpDiv');
    helpDiv.setAttribute('data-position', 'right'); // --------!!! Установи где будет появляться подсказка !!!------------------
    let {left, top, width} = elem.getBoundingClientRect(); // Получаем координаты родителя
    xParrent = left; // Выводим значение левого угла родителя во внешнюю переменную
    widthParrent = width;  // Выводим значение ширины родителя во внешнюю переменную

    switch(helpDiv.getAttribute('data-position')) {
        case 'top' : 
            helpDiv.style.left = left + 'px';
            helpDiv.style.top = (top - 30) + 'px'; 
        break;

        case 'down' :
            helpDiv.style.left = left + 'px';
            helpDiv.style.top = (top + 20) + 'px'; 
        break;

        case 'left' :
            helpDiv.style.top = (top -10) + 'px';

        break;

        case 'right' :
            helpDiv.style.top = (top -10) + 'px';
            
        break;

        default:
            console.log('Нет такого занчения позиции');
    }

    return helpDiv;
}

arrLink.forEach(elem => {
    elem.addEventListener('click', (event) => {
        event.preventDefault();
        if(count === 0) {
            elem.appendChild(createDiv(elem)).classList.toggle('tooltip_active');    //Вставляем подсказку в DOM- дерево, в качестве потомка элемента на который кликнули
            let widthDiv = helpDiv.offsetWidth;                                      //Получаем ширины подсказки

            switch(helpDiv.getAttribute('data-position')) {
                case 'left' :
                    helpDiv.style.left = (xParrent - widthDiv - 5) + 'px'; 
                    ++count;
        
                break;
        
                case 'right' :
                    helpDiv.style.left = (xParrent + widthParrent + 5) + 'px';
                    ++count;
                    
                break;
        
                default:
                    return
            }
        }
        else {
            elem.appendChild(createDiv(elem)).classList.remove('tooltip_active');
            count = 0;
        }

    });

});