
// Создание переменных для блоков и элементов

const places = document.querySelector('.places');
const templatePlace = document.querySelector('#placeTemplate').content;

const popupImage = document.querySelector('.popup_role_image');
const buttonCloseImagePopup = popupImage.querySelector('.popup__close');

const openPopup = (popup) => {
    popup.classList.add('popup_opened');
}

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
}
const openPopupImage = (card) => {

    openPopup(popupImage);
    popupImage.querySelector('.popup__image').src = card.link;
    popupImage.querySelector('.popup__caption').textContent = `${card.name} — ${card.caption}`;

}

const closePopupImage = () => {
    closePopup(popupImage);
}

const openHref = (card) => {
    window.open(card.href, '_blank').focus();
}

const createPlace = (card) => {

    const elementPlace = templatePlace.querySelector('.place').cloneNode(true);

    if(card.row && card.column && window.innerWidth > 1024) {
        elementPlace.style.gridColumn = card.column;
        elementPlace.style.gridRow = card.row;
    }

    elementPlace.querySelector('.place__image').style.backgroundImage = `url(${card.link})`;
    elementPlace.querySelector('.place__heading').textContent = card.name;
    elementPlace.querySelector('.place__caption').textContent = card.caption;

    elementPlace.addEventListener('click', () => {
        if(card.href) {
            openHref(card);
        } else {
            openPopupImage(card);
        }
    });

    return elementPlace;

}

const renderPlace = (elementPlace, prepand) => {
    if(prepand) {
        places.prepend(elementPlace);
    } else {
        places.append(elementPlace);
    }

}

// Добавление элементов по-умолчанию

initialCards.forEach((card, index) => {
    renderPlace(createPlace(card), false);
})

buttonCloseImagePopup.addEventListener('click', closePopupImage);