const toogleButton = document.querySelector('.toggle-input');
let html = document.getElementsByTagName('html')[0];

let toogleIconLight = document.querySelector('.icon-toggle.light');
let toogleIconDark = document.querySelector('.icon-toggle.dark');

toogleButton.addEventListener('click', event => {
  
  let htmlDark = document.querySelector('html.dark');
  if(!!htmlDark){
    html.classList.remove('dark');
    toogleIconLight.classList.add('active');
    toogleIconDark.classList.remove('active');
  }
  else{
    html.className += ' dark';
    toogleIconDark.classList.add('active');
    toogleIconLight.classList.remove('active');
  }

  
});