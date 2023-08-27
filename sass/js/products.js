const CardRow = document.querySelector( ".row" );
const searchInt = document.querySelector( ".search" );
const CardCount = document.querySelector( ".card-count" );
const pagination = document.querySelector( ".pg-head" );
const modalForm = document.querySelector( ".modal-form" );
const mainMd = document.querySelector( ".main-md" );
const editBtn = document.querySelector( ".edit-btn" );
const deleteBtn = document.querySelector( ".delete-btn" );
const marrySelect = document.querySelector( "#marry" )

function TeacherCard( { name, avatar, phoneNumber, email, lastName, isMarried, id, } ) {
  return `
     <div class="col-4">
            <div class="head">
              <div class="img">
       <img src="${avatar ? `${avatar}` : ""}" alt="">

              </div>
              <div class="name">
                <h1>${name ? `${name}` : "Not a name"}
                  <h1>${lastName ? `${lastName}` : "Not a last name"}</h1>
                </>

              </div>
            </div>
            <div class="bdy">
              <h4 style="display: flex;">Email - <p>${email ? `${email}` : "Not email"}</p>
              </h4>
              <h4 style="display: flex;">Phone Number - <p>${phoneNumber ? `${phoneNumber}` : "Not a number"}</p>
              </h4>
              <h4 style="display: flex;">Married - <p>${isMarried ? "Yes" : "No"}</p>
              </h4>
              <div class="card-btn">
                 <button class="student-card"><a style="color: black;" href="students.html" id="${id}" >Students</a> </button>
                <button class="edit-btn" onclick="modalOp()" type="submit" id="${id}" >Edit</button>
                <button class="delete-btn" type="submit" id="${id}">Delete</button>
              </div>
            </div>
          </div>
  `
}

marrySelect.innerHTML = `<option value="all">All</option>`;

marryGr.map( ( mr ) => {
  marrySelect.innerHTML += `<option value="${mr}">${mr}</option>`;
} );

let search = "";
let activePage = 1;
let selected = null;
let groupMr = "all";


async function getCardTeacher() {
  try {
    CardRow.innerHTML = `<div id="load">
    <div class="card1"></div>
    <h1>Loading...</h1>
  </div>`
    let params = { name: search, page: activePage, }
    let { data } = await request.get( "teacher", { params } );

    // pagination
    // let pages = Math.ceil( data / LIMIT )
    let pages = Math.ceil( data.length / LIMIT );

    pagination.innerHTML = `<li class="page-item ${activePage === 1 ? "disabled" : ""
      }">
          <i class = "fa fa-arrow-left"></i>
        </li>`;

    for ( let i = 1; i <= pages; i++ ) {
      pagination.innerHTML += `
            <li class="page-item ${i === activePage ? "active" : ""
        }"><p style="
          padding-top:2px;
          padding-left:10px;
          cursor:pointer;
        " page="${i}" class="page-link">${i}</p></li>
          `;
    }

    pagination.innerHTML += `<li class="page-item ${activePage === pages ? "disabled" : ""
      }">
    <i class = "fa fa-arrow-right"></i></button>
        </li>`;


    // CARD LENGTH
    CardCount.textContent = data.length
    CardRow.innerHTML = "";
    data.map( teacher => {
      CardRow.innerHTML += TeacherCard( teacher )
    } )
  } catch ( err ) {
    console.log( err );
  }
}

getCardTeacher()

searchInt.addEventListener( "keyup", function () {
  search = this.value;
  getCardTeacher()
} )

pagination.addEventListener( "click", ( e ) => {
  let page = e.target.getAttribute( "page" );
  if ( page !== null ) {
    if ( page === "+" ) {
      activePage++;
    } else if ( page === "-" ) {
      activePage--;
    } else {
      activePage = +page;
    }
    getCardTeacher();
  }
} );


modalForm.addEventListener( "submit", async function ( e ) {
  e.preventDefault();
  let categoryData = {
    name: this.name.value,
    avatar: this.url.value,
    phoneNumber: this.number.value,
    email: this.email.value,
    lastName: this.last.value,
    isMarried: this.ismarry.value,

  };
  if ( selected === null ) {
    await request.post( "teacher", categoryData );
    console.log( categoryData );
  } else {
    await request.put( `teacher/${selected}`, categoryData );
  }
  await getCardTeacher();
} )

window.addEventListener( "click", async ( e ) => {
  let checkEdit = e.target.classList.contains( "edit-btn" );
  let id = e.target.getAttribute( "id" );
  if ( checkEdit ) {
    selected = id
    let { data } = await request.get( `teacher/${id}` );
    modalForm.name.value = data.name;
    modalForm.last.value = data.lastName;
    modalForm.url.value = data.avatar;
    modalForm.number.value = data.phoneNumber;
    modalForm.ismarry.value = data.isMarried;
    modalForm.email.value = data.email;
    addBtn.textContent = "Save user"
  }

  // delete
  let checkDelete = e.target.classList.contains( "delete-btn" );
  console.log( checkDelete );
  if ( checkDelete ) {
    let confirmDelete = confirm( "Do you want to delete this user" );
    if ( confirmDelete ) {
      await request.delete( `teacher/${id}` )
      getCardTeacher()
    }
  }
} )

openMd.addEventListener( "click", () => {
  selected = null
  modalForm.name.value = "";
  modalForm.last.value = "";
  modalForm.url.value = "";
  modalForm.number.value = "";
  modalForm.ismarry.value = "";
  modalForm.email.value = "";
  addBtn.textContent = "Add"
} )