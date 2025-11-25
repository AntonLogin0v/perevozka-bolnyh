# Инструкция по публикации сайта

## Вариант 1: GitHub Pages (Бесплатно, без домена)

### Шаги:

1. **Создайте аккаунт на GitHub** (если нет): https://github.com

2. **Создайте новый репозиторий:**
   - Нажмите "New repository"
   - Назовите репозиторий (например: `perevozka-site`)
   - Выберите "Public"
   - НЕ ставьте галочки на README, .gitignore, license
   - Нажмите "Create repository"

3. **Загрузите файлы через терминал:**
   ```bash
   cd /Users/anton/Desktop/projects/web_s
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/ВАШ_ЛОГИН/perevozka-site.git
   git push -u origin main
   ```

4. **Включите GitHub Pages:**
   - Перейдите в Settings → Pages
   - В разделе "Source" выберите "Deploy from a branch"
   - Выберите ветку "main" и папку "/ (root)"
   - Нажмите "Save"

5. **Ваш сайт будет доступен по адресу:**
   `https://ВАШ_ЛОГИН.github.io/perevozka-site/`

---

## Вариант 2: Netlify (Бесплатно, можно подключить домен)

### Шаги:

1. **Создайте аккаунт на Netlify:** https://www.netlify.com

2. **Перетащите папку проекта:**
   - Зайдите на https://app.netlify.com/drop
   - Перетащите папку `web_s` в браузер
   - Сайт автоматически загрузится

3. **Или используйте GitHub:**
   - Подключите GitHub репозиторий
   - Netlify автоматически будет обновлять сайт при каждом коммите

4. **Ваш сайт будет доступен по адресу:**
   `https://случайное-имя.netlify.app`

5. **Чтобы изменить адрес:**
   - Site settings → Change site name
   - Введите желаемое имя (например: `perevozka24`)

---

## Вариант 3: Vercel (Бесплатно)

### Шаги:

1. **Создайте аккаунт на Vercel:** https://vercel.com

2. **Импортируйте проект:**
   - Нажмите "Add New Project"
   - Подключите GitHub репозиторий или загрузите файлы
   - Нажмите "Deploy"

3. **Ваш сайт будет доступен по адресу:**
   `https://ваш-проект.vercel.app`

---

## Покупка и подключение домена

### Где купить домен:

1. **Российские регистраторы:**
   - reg.ru
   - timeweb.com
   - nic.ru

2. **Международные:**
   - namecheap.com
   - godaddy.com
   - cloudflare.com (самый дешевый)

### Подключение домена к Netlify:

1. В Netlify: Site settings → Domain management
2. Нажмите "Add custom domain"
3. Введите ваш домен (например: `perevozka24.by`)
4. Следуйте инструкциям по настройке DNS:
   - Добавьте A-запись: `185.199.108.153`
   - Или CNAME: `ваш-сайт.netlify.app`

### Подключение домена к GitHub Pages:

1. В репозитории: Settings → Pages
2. В разделе "Custom domain" введите ваш домен
3. Настройте DNS записи:
   - A-запись: `185.199.108.153`
   - Или CNAME: `ВАШ_ЛОГИН.github.io`

---

## Рекомендации

### Для начала (бесплатно):
- Используйте **Netlify** или **GitHub Pages**
- Это полностью бесплатно
- Можно подключить свой домен позже

### Если нужен домен:
- Купите домен на **reg.ru** или **timeweb.com** (от 200-500 руб/год)
- Подключите к Netlify или GitHub Pages

### Если нужен хостинг с поддержкой PHP/баз данных:
- Timeweb.com (от 150 руб/мес)
- Beget.com (от 200 руб/мес)
- REG.RU (от 200 руб/мес)

---

## Быстрый старт (Netlify - самый простой способ)

1. Зайдите на https://app.netlify.com/drop
2. Перетащите папку `web_s` в браузер
3. Готово! Сайт опубликован за 30 секунд

Ваш сайт будет доступен по адресу типа: `https://amazing-site-12345.netlify.app`

