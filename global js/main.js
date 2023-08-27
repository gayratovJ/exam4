const mode = document.querySelector( ".mode .light-mode" );
const dark = document.querySelector( ".mode .dark-mode" );
const loop = document.querySelector( ".mode .dark-mode .loop" );
const closeBtn = document.querySelector( ".close" )
const addBtn = document.querySelector( ".add" )
const openMd = document.querySelector( ".open-md" )
const Modal = document.querySelector( ".main-md" )
const editCard = document.querySelector( ".edit" )

mode.addEventListener( "click", ( e ) => {
  document.body.classList.toggle( "light" )
  loop.classList.toggle( "left" )
  e.preventDefault()
} )

dark.addEventListener( "click", ( e ) => {
  document.body.classList.toggle( "light" )
  loop.classList.toggle( "left" )
  e.preventDefault()
} )

openMd.addEventListener( "click", () => {
  Modal.classList.toggle( "top" )
} )

closeBtn.addEventListener( "click", () => {
  Modal.classList.toggle( "top" )
} )

addBtn.addEventListener( "click", () => {
  Modal.classList.toggle( "top" )
} )

function modalOp() {
  Modal.classList.toggle( "top" );
}