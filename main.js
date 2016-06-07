//В этом уроке мы разберем как работать с динамическими параметрами в ngRoute 
//и реализуем минимальный функционал блога с помощью двух контроллеров и фабрики.

//$routeParams что это такое?
//Когда мы хотим обратиться к какому-то конкретному посту 
// то у нас будет использована динамическая id
// сделаем запись
        // .when('/posts/:postId',{
        // template : '<h1>This is my cool post!!!</h1>'
    // });
// Теперь если мы посмотрим в браузер и введем в в конец url любое число или букву...http://127.0.0.1:8020/angularjs-23/index.html#/posts/33
// в браузере у нас выведется This is my cool post!!!
// это очень удобно поскольку именно парамет указанный через двоеточие позволяет выводить посты по id (/:postId)

// теперь добавим инструкцию, которая будет срабатывать когда ни одно из условий указанных выше не срабатывают
    // .otherwise({
        // template : '<h1>404 no such page</h1>'
    // });
//теперь если мы введем в url что угодно  после index.html#/ то выведется текст 404 no such page

// далее давайте заменим все template на templateUrl и создадим соответствующие html Файлы чтобы с ними будо удобнее работать
// проверяем - все работает!!!

// теперь давайте напишем контроллер например в postId controller: 'postCtrl' 
// и опишем его при этом зиджектим в него еще один параметр $routeParams и выведем его в консоль чтобы посмотреть что это такое
// app.controller('postCtrl', function($scope, $routeParams){
    // console.log($routeParams);
//    
    // };
// });

//проверим допишем после index.html#/posts/ любые знаки  enter и посмотрим в консоль
// $routeParams  - это объект в котором  у нас есть postId с введенным значением
// это происходит потому что ngRoute позволяет нам в любом контроллере шаблона получить доступ к динамическим переменным таким как /:postId Указанным через двоеточие
// и postId Как динамическая переменная нам доступна через $routeParams.postId

// и теперь мы можем выводить в контроллере все что относится к этому посту

//теперь давайте сделаем то же самое с posts добавим контроллер и опише его ниже
// проверим теперь если мы заходим на posts У нас в консоли появляется строка postsCtrl

//теперь давайте создадим фабрику в которой у нас будут храниться наши посты 
//назовем ее 'postsFactory' и она будет возвращать массив объектов из трех постов
// app.factory('postsFactory', function(){
    // return [
    // {
        // id:1,
        // name: "Why AngularJS is good?"
     // },
     // {
         // id:2,
         // name: "I love AngularJS!!!"
     // },
     // {
         // id:3,
         // name: "Is AngularJS easy to learn?"
     // }
//      
    // ];
// });

// и заиджектим postsFactory в postsCtrl Выведем в консоль
// посмотрим в консоль браузера и увидим что у нас доступен массив из 3-х объектов

// теперь мы можем их присвоить в переменную через $scope.posts = postsFactory;
// и вывести их в шаблоне файла posts.html через директиву <div ng-repeat = "post in posts">{{post.name}}</div>
// теперь мы можем увидеть перечень постов

//сделаем этот переечень постов теперь ссылками
// <div ng-repeat = "post in posts">
   // <a href="#/posts/{{post.id}}">{{post.name}}</a> 
// </div>

// и теперь при клике по любой ссылке мы переходим на страницу post.html c одинаковым для всех ссылок содержимым

// теперь сделаем содержимое разным
// для этого в контроллер postCtrl заиджектим postsFactory
// и так как мы знаем id мы хотим его найти в нашем массиве
//присваиваем в переменную postId через функцию Number(которая приводит строку к числу) достав ее через $routeParams.postId
// var postId = Number($routeParams.postId);

// у нас есть теперь цифра id поста
// теперь подключим в html еще библиотеку loDash.js чтобы не писать много кода  <script src="loDash.js"></script>

// и воспользуемся функцией _.findWhere(postsFactory, {id: postId}) результат которой присвоим в переменную $scope.post 
// т.е. мы присваиваем обьект в переменную $scope.post  при помощи
//функции _.findWhere библиотеки loDash, которая ищет в массиве postsFactory по полю id с заданным ключем postId (который содержит цифру поста) нужное нам содержимое.

//и теперь внутри файла-шаблона  post.html мы можем вывести переменную {{post.name}}
// теперь мы имеем много страничный микроблог с разным содержимым сделанный с помощью $routeParams и ngRoute












var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider){
    
    $routeProvider
    .when('/',{
        templateUrl: 'home.html',
        controller: 'homeCtrl' 
    })
    .when('/posts',{
        templateUrl : 'posts.html',
        controller: 'postsCtrl' 
    })
        .when('/posts/:postId',{
        templateUrl : 'post.html',
        controller: 'postCtrl' 
    })
    .otherwise({
        templateUrl : '404.html'
    });
});

app.controller('homeCtrl', function($scope){
    console.log('homeCtrl');
    $scope.model = {
        message: "This is my beautyful HomePage",
    };
});

app.controller('postCtrl', function($scope, $routeParams, postsFactory){
    console.log($routeParams.postId);
    var postId = Number($routeParams.postId);
    $scope.post = _.findWhere(postsFactory, {id: postId});
    
});

app.controller('postsCtrl', function($scope, postsFactory){
    console.log('postsCtrl', postsFactory);
    $scope.posts = postsFactory;
    
});

app.factory('postsFactory', function(){
    return [
    {
        id:1,
        name: "Why AngularJS is good?"
     },
     {
         id:2,
         name: "I love AngularJS!!!"
     },
     {
         id:3,
         name: "Is AngularJS easy to learn?"
     }
     
    ];
});



