// Массив с 10 гифками (замените на свои URL)
const gifs = [
    'https://media.giphy.com/media/3o7aTskHEUdgCQAXde/giphy.gif',
    'https://media.giphy.com/media/l0HlNQ03J5JxX6lva/giphy.gif',
    'https://media.giphy.com/media/3o7abGQa0aRsohveX6/giphy.gif',
    'https://media.giphy.com/media/3o7TKsQ7U1hmgZXnBC/giphy.gif',
    'https://media.giphy.com/media/3o7TKz2eMX36bnyqSY/giphy.gif',
    'https://media.giphy.com/media/3o7TKsQ8U1hmgZXnBC/giphy.gif',
    'https://media.giphy.com/media/3o7TKsR8U1hmgZXnBC/giphy.gif',
    'https://media.giphy.com/media/3o7TKsT8U1hmgZXnBC/giphy.gif',
    'https://media.giphy.com/media/3o7TKsU8U1hmgZXnBC/giphy.gif',
    'https://media.giphy.com/media/3o7TKsV8U1hmgZXnBC/giphy.gif'
];

// Массив с 10 музыкальными файлами (замените на свои URL)
const musicFiles = [
    'music/song1.mp3',
    'music/song2.mp3',
    'music/song3.mp3',
    'music/song4.mp3',
    'music/song5.mp3',
    'music/song6.mp3',
    'music/song7.mp3',
    'music/song8.mp3',
    'music/song9.mp3',
    'music/song10.mp3'
];

// Функция для получения случайного элемента из массива
function getRandomItem(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

// Функция для показа сообщения
function showMessage(text, duration = 3000) {
    const message = document.createElement('div');
    message.className = 'loading-message';
    message.textContent = text;
    document.body.appendChild(message);
    
    setTimeout(() => {
        if (message.parentNode) {
            message.parentNode.removeChild(message);
        }
    }, duration);
    
    return message;
}

// Функция для настройки случайных медиа
function setupRandomMedia() {
    const randomGif = getRandomItem(gifs);
    const randomMusic = getRandomItem(musicFiles);
    
    // Устанавливаем случайную гифку
    const gifElement = document.getElementById('backgroundGif');
    gifElement.src = randomGif;
    gifElement.classList.add('media-loading');
    
    // Устанавливаем случайную музыку
    const musicElement = document.getElementById('backgroundMusic');
    musicElement.innerHTML = `<source src="${randomMusic}" type="audio/mpeg">`;
    musicElement.load(); // Перезагружаем audio элемент
    
    console.log('Выбрана гифка:', randomGif);
    console.log('Выбрана музыка:', randomMusic);
    
    return { musicElement, gifElement };
}

// Функция для запуска воспроизведения
function startPlayback(musicElement, gifElement) {
    musicElement.volume = 0.5;
    
    // Показываем гифку когда она загрузится
    gifElement.onload = function() {
        gifElement.classList.remove('media-loading');
        gifElement.classList.add('media-loaded');
    };
    
    // Пытаемся воспроизвести музыку
    musicElement.play().then(() => {
        console.log('Музыка успешно запущена');
    }).catch(error => {
        console.log('Автовоспроизведение заблокировано:', error);
        showMessage('Кликните anywhere для воспроизведения музыки', 5000);
    });
}

// Функция для перенаправления на другой сайт
function redirectToSite() {
    window.location.href = 'https://example.com';
}

// Основная функция инициализации
function init() {
    const { musicElement, gifElement } = setupRandomMedia();
    
    // Запускаем воспроизведение когда медиа готовы
    musicElement.addEventListener('canplaythrough', () => {
        startPlayback(musicElement, gifElement);
    });
    
    // На случай если медиа уже готово
    if (musicElement.readyState >= 4) {
        startPlayback(musicElement, gifElement);
    }
    
    // Таймаут на случай проблем с загрузкой
    setTimeout(() => {
        startPlayback(musicElement, gifElement);
    }, 2000);
}

// Обработчики для ручного запуска музыки
function setupInteractionHandlers() {
    const startOnInteraction = function() {
        const music = document.getElementById('backgroundMusic');
        const gif = document.getElementById('backgroundGif');
        
        if (music.paused) {
            music.play().catch(console.error);
        }
        
        gif.classList.remove('media-loading');
        gif.classList.add('media-loaded');
    };

    document.addEventListener('click', startOnInteraction, { once: true });
    document.addEventListener('touchstart', startOnInteraction, { once: true });
    document.addEventListener('keydown', startOnInteraction, { once: true });
}

// Запуск при загрузке страницы
window.addEventListener('load', function() {
    init();
    setupInteractionHandlers();
});