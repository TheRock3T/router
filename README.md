
ROUTER ONLY JS RELEASE V 2.0
---
___
С первого релиза прошло много коммитов, роутер прошел многочисленные проверки и был сильно доработан, во многих моментах он стал гораздо лучше работать с динамичекими значениями, в дальнейшем он будет улучшаться пропорцианольно с моими знаниями в JavaScript
___
Если раньше это было чудовище, то теперь это хороший зверек с интересными плюшками
___
Я не спорю что местами мой код может быть плохим,
т.к. это первая вещь которую я писал на чистом JS
и с полного нуля, так что прошу строго не судить я вложил все свои знания в этот роутер.
___
+ Динамическая сортировка по параметрам работает только в методе "sorting" (users)
+ Обычная сортировка по номерам постов работает в методе "sorting" (posts)
+ Редактировать файл "connectClasses" и "ConnectMethod" крайне нежелательно т.к. это может привести к ошибкам !!!
+ Роутер работает на основе подключенной HTML страницы и прилегающих к ней скриптов
+ Имя нового файла должно совпадать с именем js, json, html файлом
+ Сервер запускается только с локального сервера либо LIVE сервера из IDE
+ При возникновении ошибки при загрузке роутера с GITHUB, желательно удалить папку с проектом и скачать заново.
---
Создание нового класса должно содержать:
=
Переменные:
+ С регулярными выражениями (classRegulars)
+ С названием контроллера класса (classController)
+ С названиями методов (classMethods)
+ С названием параметров (classParams) (Если есть метод поиска в контроллере)

Дополнительно:
+ JSON файл добавлять обязательно, для автозаполнения localStorage
+ HTML файл добавить обязательно, для использования данного роутера
+ JS файл добавить обязательно, для универсальных методов(ваша фантазия)
+ Для работы регулярки нужно, чтобы совпадали поля "name", "id" и также переменные регулярок с переменными в JSON файле

При клонировании контроллера следует:
+ Пример брать с контроллера users.js
+ Изменить название класса(Должен быть с большой буквы)
+ Строка 89 "const parseUsers = JSON.parse(localStorage.getItem("заменить на название контроллера"))"
+ Строка 98 "localStorage.setItem("заменить на название контроллера", JSON.stringify(parseUsers))"
+ Все файлы с контроллерами (js, json, html) должны быть написаны только латинскими буквами и маленькими
___
Разработал TheRock3T
---
