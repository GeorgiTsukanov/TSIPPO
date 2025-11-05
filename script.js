document.addEventListener('DOMContentLoaded', function() {
    // Курсы валют к рублю
    const exchangeRates = {
        'USD': 79.8174,
        'EUR': 92.9395,
        'CNY': 11.1921,
        'RUB': 1
    };
    
    const calculateBtn = document.getElementById('calculate-btn');
    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('from-currency');
    const toCurrencySelect = document.getElementById('to-currency');
    const resultDiv = document.getElementById('conversion-result');
    const rows = document.querySelectorAll('.clickable-row');

    rows.forEach(row => {
        // Добавляем курсор pointer
        row.style.cursor = 'pointer';
        
        // Обработчик клика
        row.addEventListener('click', function() {
            const currency = this.dataset.currency;
            // Переход на страницу валюты
            window.location.href = `pages/${currency.toLowerCase()}.html`;
        });
        
        // Эффекты при наведении
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f8f9fa';
            this.style.transform = 'translateX(5px)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
            this.style.transform = '';
        });
    });

    // Функция для конвертации валют
    function convertCurrency() {
        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;
        
        if (isNaN(amount) || amount <= 0) {
            resultDiv.textContent = 'Введите корректную сумму';
            return;
        }
        
        // Конвертация через рубль
        const amountInRub = amount * exchangeRates[fromCurrency];
        const convertedAmount = amountInRub / exchangeRates[toCurrency];
        
        resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
    }

    // Обработчик события для кнопки расчета
    if (calculateBtn) {
        calculateBtn.addEventListener('click', convertCurrency);
    }
    
    // Автоматический расчет при изменении значений
    amountInput.addEventListener('input', convertCurrency);
    fromCurrencySelect.addEventListener('change', convertCurrency);
    toCurrencySelect.addEventListener('change', convertCurrency);
    
    // Первоначальный расчет
    convertCurrency();

});