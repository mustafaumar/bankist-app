// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1')
const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')
const nav = document.querySelector('.nav')


const openModal = function (e) {
    e.preventDefault()
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))


btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Smooth Scrolling
btnScrollTo.addEventListener('click', function(e){
  //const s1coords = section1.getBoundingClientRect()
  //console.log(s1coords)
  //console.log(e.target.getBoundingClientRect());
 // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset)
// window.scrollTo({left: s1coords.left + window.pageXOffset, top: s1coords.top + window.pageYOffset,behavior: 'smooth'
 //})

 section1.scrollIntoView({behavior: 'smooth'})

})

/////////////////////////////////////
//Page Navigation

document.querySelector('.nav__links').addEventListener('click', function(e){

  if(e.target.classList.contains('nav__link')){
    e.preventDefault()
    const id = e.target.getAttribute('href')
    document.querySelector(id).scrollIntoView({behavior : 'smooth'})
  }
})

//Tabbed Components 

tabsContainer.addEventListener('click', function(e){
  const clicked = e.target.closest('.operations__tab');


  if(!clicked) return;

  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'))


  clicked.classList.add('operations__tab--active');

  //Active content 
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})

//Menu fade animation
const handleHover = function(e){
  if(e.target.classList.contains('nav__link')){
    const link = e.target
    const siblings = link.closest('.nav').querySelectorAll('.nav__link')
    const logo = link.closest('.nav').querySelector('img')

    siblings.forEach((el) =>{
      if(el !== link) el.style.opacity = this
    })
    logo.style.opacity = this
  }
}
nav.addEventListener('mouseover', handleHover.bind(0.5))

nav.addEventListener('mouseout', handleHover.bind(1))

//Sticky Navigation

const header = document.querySelector('.header')
const navHeight = nav.getBoundingClientRect().height
const stickyNav = function(entries){
  const [entry] = entries
  if(!entry.isIntersecting) nav.classList.add('sticky')
  else{
    nav.classList.remove('sticky')
  }

}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
})
headerObserver.observe(header)

//Reveal section
const allSections = document.querySelectorAll('.section')
const revealSection = function(entries, observer){
  const [entry] = entries
  console.log(entry);
  if(!entry.isIntersecting)return;

  entry.target.classList.remove('section--hidden')

  observer.unobserve(entry.target)
}
const sectionObserver = new IntersectionObserver(revealSection, {
  root:null,
  threshold: 0.15
})
allSections.forEach(function(section){
  sectionObserver.observe(section)
  section.classList.add('section--hidden')
})

//Lazy loading Images
const imgTargets = document.querySelectorAll('img[data-src]')

const loading = function(entries, observer){
  const [entry]= entries
  console.log(entry)
  if(!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src


  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img')
  })

  observer.unobserve(entry.target)
}

const imgObserver = new IntersectionObserver(loading, {
  root: null,
  threshold: 0,
  rootMargin:'200px'
})

imgTargets.forEach(img => imgObserver.observe(img))

//Slider Components
const slider = function(){


  const slides = document.querySelectorAll('.slide')
  let curSlide = 0
  const maxSlides = slides.length
  const btnLeft = document.querySelector('.slider__btn--left')
  const btnRight = document.querySelector('.slider__btn--right')
  const dotsContainer = document.querySelector('.dots')

  const createDots = function(){
    slides.forEach(function(_, i){
      dotsContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
    })
  }

  const activateDots = function(slide){
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'))

    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active')
  }

  const goToSlide = function(slide){
    slides.forEach((s, i )=> (s.style.transform = `translateX(${100 * (i - slide)}%)`))
  }


//Next slide
  const nextSlide = function(e){
    if(curSlide === maxSlides - 1){
      curSlide = 0
    }else{
      curSlide++
    }
    goToSlide(curSlide)
    activateDots(curSlide)
  }
  const prevSlide = function(){
    if(curSlide === 0){
      curSlide = maxSlides - 1
    }else{
      curSlide--
    }
    goToSlide(curSlide)
    activateDots(curSlide)
  }
  const init = function(){
    goToSlide(0)
    createDots()
    activateDots(0)
  }
  init()

  btnRight.addEventListener('click', nextSlide)
  btnLeft.addEventListener('click', prevSlide)
  document.addEventListener('keydown', function(e){
    if(e.key === 'ArrowRight') nextSlide()
    e.key === 'ArrowLeft' && prevSlide()
  })
  dotsContainer.addEventListener('click', function(e){
    if(e.target.classList.contains('dots__dot')){
      const {slide} = e.target.dataset
      goToSlide(slide)
      e.target.classList.add('dot--active')
      activateDots(slide)
    }
  })
}
slider()
/*


//How DOM really works behind the scene & how its organized internally
//The DOM is the interface between the javascript code and the browser (more specifically HTML documents that are rendered in or by the browser)
//What we know about the DOM
//-- Allows us to make javascript interact with the browser
//-- We can write javasccript to create, delete,modify HTML documents,set styles, classes and attributes amd listen and respond to elements
//--DOm tree is generated from any html documents and a dom tree is a tree like structure made out from nodes
//DOM is a very complex API that contains a lot of methods and properties to interact with the DOM tree. The API is the interface we can use to programmatically interact with the DOM. These methods  include "querySelector", "addEventListener" or "createElements" or properties like "innerHtml", "textContent", or childrenproperties
//In the DOM, we have different type of nodes
//some nodes are HTML elementsbut others are just texts.

//Every single thing in HTML is represented by a NODE
//Each node is represent in javascript by an object. This object gets access to special node methods and properties such as textContent, child nodes, parent node,clone nodes etc
//This node has different type; "element", "text", "document" and "comment" type
//Text type <paragraph/>
//Comment type <!--comment-->
//Element types are things in the Html document that gives room to tons of properties and methods such as classList, chlidren, parentElement, remove(), append(), insertAdjaentHTML(), querySelector(), closest(), matches(), scrollIntoView(), setAttribute()
//The element type has internally HTML element child type.
//THis child type has seperate types for links, images, button etc
//The DOM needs a way of storing these different attributes

//INHERITANCE
//ALL CHILD TYPES will also get access to the method and properties of all their parent node types
//The document type has methods like getElementById, querySelector(), .createElement()
//.querSelector is available on both the document and element type

//Another special node type called "eventTarget". It is a parent of both the node type and the window node type

//SELECTING, CREATING AND DELETING ELEMENTS
//.documetElement (to select the whole document)
//Selecting
console.log(document.documentElement);
console.log(document.body);
//Inserting and creating
//insertAdjacentHtml
const header = document.querySelector('.header')
const message = document.createElement("div")
message.classList.add("cookie-message")
//message.textContent = 'We use cookie for improved functionality and analytics'
message.innerHTML = 'We use cookie for improved functionality and analytics <button class = "btn btn--close-cookies">Click Me </button>'
//header.prepend(message)
//When you use prepend(), you are assigning it as the first child
//when you use append(),you are assigning it as the last child
header.append(message)
//header.append(message.cloneNode(true))

//before and after
//header.before(message)
//header.after(message)


//Deleting
const button = document.querySelector('.btn--close-cookies')
button.addEventListener('click', () =>{
  message.remove()
})

//Styles, attributes and classes
message.style.backgroundColor = '#37383d'
message.style.width = '120%'
//The getComputedStyle function can be used to get style properties from the css

console.log(getComputedStyle(message).height);
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';


//Working with css custom properties (css variables)
//We can change the value of css properties with Javascript
document.documentElement.style.setProperty('--color-primary', 'orangered')

//Attributes
//We can reset attributes such as Id, class, alt, src using javascript
//You can get information of attributes using getAttribute method
//You can set attributes using the setAttribute method
//Data attributes are attributes that starts with the word "data"
const logo = document.querySelector('.nav__logo')
logo.alt = 'Minimalist Bank logo'
console.log(logo.alt);

const h1 = document.querySelector('h1')
h1.addEventListener('mouseenter', function(e){
  alert('addEventListner: Coming from the heading')
})
//List of eventListeners
 
//Event propagation
//When event propagate from one place to another
//Capturing and bubbling phase
//Capturing phase is when the so called event travels down from the document route to the target element and as the event pass through every singleparent element of the target elements
//The target phase started when it gets to the target elements . It returns a callback function
//After the event gets to the target element, it goes back up to the documenr route . This is called the bubbling phase.
//Not all types of events do have a capturing and bubbling phase

//rgb(255,255,255)

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

  document.querySelector('.nav__link').addEventListener('click', function(e){
    this.style.backgroundColor = randomColor()
   // e.stopPropagation()
  })

  document.querySelector('.nav__links').addEventListener('click', function(e){
    this.style.backgroundColor = randomColor()
  })

  document.querySelector('.nav').addEventListener('click', function(e){
    this.style.backgroundColor = randomColor()
  })

  //Event Delegation
  //DOM Traversing
  //Selecting element based on another element
  const h1 = document.querySelector('h1')
  console.log(h1.querySelectorAll('.highlight'));
  console.log(h1.childNodes);

  h1.closest('.header').style.backgroundColor = 'black'
  //Guard clause 
  //

  //How to pass arguments into event handlers
  //Intersection Oserver API
  //Allows our code to basically observe changes to the way that a certain target element intersect another element, or the way it intersect the viewport
//It needs a callack function,and a object of options
//The option object first needs a root property. This root is the element that the target is intersecting
//Threshold is basically the percentage of intersection at which the observer callback will be called

//THe callback function would be called each time that the observed element is interesting the root and threshold object.Called with two arguments ("entries", "observer")
//THe entries are arrays of the threshold entries
//RootMargin are box of pixels applied outside of our target element

//Life cycle Dom events (going to write about this)
The first event is the DOM content Loaded
This event is fired by the document as soona sthe html is completely parsed(the html has been downloaded and been converted to the DOM tree)
All scripts must be downloaded and executed before the DOM content loaded can happen 
Thisevent does not wait for images and other external resources to load. Just html and javascript needs to be loaded

The load event
Fired by the window

Before Unlload event

window.addEventListener('beforeunload', function(e){
  e.preventDefault()
  console.log(e);
  e.returnValue = ''
})

Different ways of loading Javascript script in html
Adding the async attribute to the script tag
or the defer attribute
These attributes affects how the javascript is downloaded and executed
ASync -- the script is loaded at the same time the html is parsed.
*/