const rowStudent = document.querySelector( ".studetn-row" )
const workgruop = document.querySelector( "#work" )
const Count = document.querySelector( ".card-count" );
const modalForm = document.querySelector( ".modal-form" );


function StudentCard( {
  name,
  avatar,
  phoneNumber,
  bithday,
  email,
  lastName,
  isWork,
  id,
  field,
  teacherId } ) {
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
              <h4 style="display: flex;">Work - <p>${isWork ? "Yes" : "No"}</p>
              </h4>
               <h4 style="display: flex;">Birthday - <p>${bithday}</p>
              </h4>
              <h4 style="display: flex;">Field - <p>${field}</p>
              <div class="card-btn">
                <button type="submit"><a style="color: black;" href="students.html" id="${teacherId}" >Students</a> </button>
                <button class="edit-btn" onclick="modalOp()" type="submit" id="${id}" >Edit</button>
                <button class="delete-btn" type="submit" id="${id}">Delete</button>
              </div>
            </div>
          </div>
  `
}

const query = new URLSearchParams( location.search );
const teacherId = query.get( "teacher" );

workgruop.innerHTML = `<option value="all">All</option>`;

workGr.map( ( wr ) => {
  workgruop.innerHTML += `<option value="${wr}">${wr}</option>`;
} );


async function getStudentCard() {
  try {
    rowStudent.innerHTML = `<div id="load">
    <div class="card1"></div>
    <h1>Loading...</h1>
  </div>`
    let params = { name: search, page: activePage, }
    const { data: students, total } = await request.get( `teacher/${teacherId}/student`, { params } );
    students.map( ( studentCard ) => {
      rowStudent.innerHTML += StudentCard( studentCard )
    } );
  } catch ( err ) {
    console.log( err );
  }
}

StudentCard()

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
// async function getAllStudents() {
//   try {
//     const teacherResponse = await axiosInstance.get( "teacher/" );
//     const teachers = teacherResponse.data;

//     for ( const teacher of teachers ) {
//       const teacherId = teacher.id;
//       const studentResponse = await axiosInstance.get(
//         `/teacher/${teacherId}/student`
//       );
//       const students = studentResponse.data;
//       students.map( ( el ) => {
//         rowStudent.innerHTML += StudentCard( el );
//       } );
//       console.log( `Students for teacher ID ${teacherId}:`, students );
//     }
//   } catch ( error ) {
//     console.error( error );
//   }
// }

// StudentCard()
// window.addEventListener( "click", async ( e ) => {
//   let checkStudent = e.target.classList.contains( "edit-btn" );
//   let id = e.target.getAttribute( "id" );
//   console.log( id );
//   if ( checkStudent ) {
//     selected = id
//     let params = { name: search, page: activePage, }
//     let { data } = await request.get( `teacher/${id}/student`, { params } );

//   }
// } )