// Переключение вкладок калькулятора
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Обработка всех форм калькулятора
    const calculatorForms = {
        'city': {
            form: document.getElementById('calculator-form-city'),
            tripType: 'trip-type',
            time: 'time',
            weight: 'weight',
            floor: 'floor',
            distance: null,
            result: 'total-price',
            resultContainer: 'calculator-result'
        },
        'country': {
            form: document.getElementById('calculator-form-country'),
            tripType: 'trip-type-country',
            time: 'time-country',
            weight: 'weight-country',
            floor: 'floor-country',
            distance: 'distance-country',
            result: 'total-price-country',
            resultContainer: 'calculator-result-country'
        },
        'cis': {
            form: document.getElementById('calculator-form-cis'),
            tripType: 'trip-type-cis',
            time: 'time-cis',
            weight: 'weight-cis',
            floor: 'floor-cis',
            distance: 'distance-cis',
            result: 'total-price-cis',
            resultContainer: 'calculator-result-cis'
        }
    };

    // Функция для переключения вкладок
    function switchTab(targetTabId) {
        // Убираем активный класс у всех кнопок и контента
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
            btn.setAttribute('tabindex', '-1');
        });
        
        tabContents.forEach(content => {
            content.classList.remove('active');
            content.setAttribute('aria-hidden', 'true');
        });

        // Находим кнопку и контент для выбранной вкладки
        const activeButton = document.querySelector(`.tab-btn[data-tab="${targetTabId}"]`);
        const activeContent = document.getElementById(targetTabId + '-tab');

        if (activeButton && activeContent) {
            // Активируем кнопку
            activeButton.classList.add('active');
            activeButton.setAttribute('aria-selected', 'true');
            activeButton.setAttribute('tabindex', '0');

            // Показываем контент
            activeContent.classList.add('active');
            activeContent.setAttribute('aria-hidden', 'false');
            
            // Пересчитываем цену для активной вкладки
            const config = calculatorForms[targetTabId];
            if (config) {
                setTimeout(() => {
                    calculatePrice(targetTabId, config);
                }, 100);
            }
        }
    }

    // Обработчики для кнопок вкладок
    tabButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetTab = this.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });

    // Инициализация: показываем первую вкладку
    switchTab('city');

    // Настраиваем обработчики для каждой формы
    Object.keys(calculatorForms).forEach(key => {
        const config = calculatorForms[key];
        if (config.form) {
            // Автоматический расчёт при изменении значений
            const formInputs = config.form.querySelectorAll('select, input');
            formInputs.forEach(input => {
                input.addEventListener('change', function() {
                    calculatePrice(key, config);
                });
                input.addEventListener('input', function() {
                    calculatePrice(key, config);
                });
            });
            
            // Первоначальный расчёт
            calculatePrice(key, config);
        }
    });

    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Инициализация слайдера отзывов
    initReviewsSlider();
});

// Функция инициализации слайдера отзывов
function initReviewsSlider() {
    const reviewsScroll = document.getElementById('reviews-scroll');
    const reviewsIndicators = document.getElementById('reviews-indicators');
    const arrowLeft = document.querySelector('.review-arrow-left');
    const arrowRight = document.querySelector('.review-arrow-right');
    const reviewItems = document.querySelectorAll('.review-item');
    
    if (!reviewsScroll || !reviewsIndicators || reviewItems.length === 0) return;

    let currentIndex = 0;
    const itemWidth = reviewItems[0].offsetWidth + 30; // ширина элемента + gap

    // Создаём индикаторы
    reviewItems.forEach((_, index) => {
        const indicator = document.createElement('button');
        indicator.className = 'review-indicator';
        if (index === 0) indicator.classList.add('active');
        indicator.setAttribute('aria-label', `Перейти к отзыву ${index + 1}`);
        indicator.addEventListener('click', () => goToSlide(index));
        reviewsIndicators.appendChild(indicator);
    });

    // Функция перехода к слайду
    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, reviewItems.length - 1));
        reviewsScroll.scrollTo({
            left: currentIndex * itemWidth,
            behavior: 'smooth'
        });
        updateIndicators();
    }

    // Обновление индикаторов
    function updateIndicators() {
        const indicators = reviewsIndicators.querySelectorAll('.review-indicator');
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    // Навигация стрелками
    arrowLeft?.addEventListener('click', () => {
        if (currentIndex > 0) {
            goToSlide(currentIndex - 1);
        }
    });

    arrowRight?.addEventListener('click', () => {
        if (currentIndex < reviewItems.length - 1) {
            goToSlide(currentIndex + 1);
        }
    });

    // Обновление текущего индекса при прокрутке
    reviewsScroll.addEventListener('scroll', () => {
        const scrollLeft = reviewsScroll.scrollLeft;
        const newIndex = Math.round(scrollLeft / itemWidth);
        if (newIndex !== currentIndex) {
            currentIndex = newIndex;
            updateIndicators();
        }
    });

    // Обработка изменения размера окна
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const newItemWidth = reviewItems[0].offsetWidth + 30;
            if (newItemWidth !== itemWidth) {
                goToSlide(currentIndex);
            }
        }, 250);
    });
}

// Функция расчёта цены
function calculatePrice(type, config) {
    const tripType = parseFloat(document.getElementById(config.tripType).value) || 0;
    const time = parseFloat(document.getElementById(config.time).value) || 0;
    const weight = parseFloat(document.getElementById(config.weight).value) || 0;
    const floor = parseFloat(document.getElementById(config.floor).value) || 0;
    const distance = config.distance ? (parseFloat(document.getElementById(config.distance).value) || 0) : 0;

    let total = 0;

    // Расчёт для поездок по городу: vov+kg+et+time
    if (type === 'city') {
        total = tripType + weight + floor + time;
    } 
    // Расчёт для поездок по стране: km*2+kg+et+60+time
    else if (type === 'country') {
        total = (distance * 2) + weight + floor + 60 + time;
    } 
    // Расчёт для поездок по СНГ: km*2.2+(km*2.2)/10+kg+et
    else if (type === 'cis') {
        const kmCost = distance * 2.2;
        total = kmCost + (kmCost / 10) + weight + floor;
    }

    // Отображаем результат
    const totalPriceElement = document.getElementById(config.result);
    if (totalPriceElement) {
        totalPriceElement.textContent = Math.round(total);
    }
}

