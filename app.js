window.addEventListener('load', function() {

  // Get DOM elements
  const form      = document.querySelector('form')
  const input     = document.querySelector('[name="new_todo"]')
  const todoList  = document.getElementById('todos')

  const todoData  = []
  const doneData  = []
  const samples   = ["Apple", "Orange", "Grapes", "Melon", "Watermelon", "Tangerine", "Lemon", "Banana", "Pineapple", "Mango"]

  const btns      = document.querySelector('.btns')
  const clearLast = document.getElementById('clearLast')
  const clearAll  = document.getElementById('clearAll')
  const sampleBtn = document.getElementById('sample')



  // Side Effects / Lifecycle
  let index = 0

  const existingTodos = JSON.parse(localStorage.getItem('todos')) || []
  const existingDones = JSON.parse(localStorage.getItem('dones')) || []

  if (existingTodos > [] ) {
    console.log('Existing Todos:')
    existingTodos.forEach(todo => {
      addExisting(todo)
      console.log('✔︎ ' + todo)
    });
  }

  if (existingDones > [] ) {
    existingDones.forEach(done => {
      addDone(done)
    });
  }



  // Functions

  function sampleData() {
    samples.forEach(sample => {
      const li  = document.createElement('li')
      todoList.appendChild(li)
      li.innerHTML = sample
      li.classList.add('item')
      addBtns(li)

      todoData.push(sample)
      localStorage.setItem('todos', JSON.stringify(todoData))

      doneData.push('unchecked')
      localStorage.setItem('dones', JSON.stringify(doneData))
    });
  }

  function addExisting(todoText) {
    const li  = document.createElement('li')
    todoList.appendChild(li)
    li.innerHTML = todoText
    li.classList.add('item')
    addBtns(li)

    todoData.push(todoText)
    localStorage.setItem('todos', JSON.stringify(todoData))
  }

  function addDone(i) {
    if ( !isNaN(i) ) {
      const li = document.querySelector('#todos li:nth-child(' + i + ')');
      li.classList.add('done')

      doneData.push(i)
      localStorage.setItem('dones', JSON.stringify(doneData))
    } else {
      doneData.push('unchecked')
      localStorage.setItem('dones', JSON.stringify(doneData))
    }
  }

  function addTodo(todoText) {
    const li  = document.createElement('li')
    todoList.appendChild(li)
    li.innerHTML = todoText
    li.classList.add('item')
    li.classList.add('new')
    addBtns(li)

    todoData.push(todoText)
    localStorage.setItem('todos', JSON.stringify(todoData))

    doneData.push('unchecked')
    localStorage.setItem('dones', JSON.stringify(doneData))

    addBtn = document.querySelector('[type="submit"]')
    addBtn.classList.add('added')
    setTimeout(() => {
      addBtn.classList.remove('added')
    }, 600)

    input.value = ''
    input.focus()

    console.log('✔︎ ' + todoText)
  }

  function doneTodo() {
    parent = this.parentElement
    var index = Array.from(parent.parentNode.children).indexOf(parent)
    var id = index + 1

    if (!parent.classList.contains('done')) {
      parent.classList.add('done')
      console.log( '✔︎ Completed item: #' + id )

      doneData.splice(index, 1, id)
      localStorage.setItem('dones', JSON.stringify(doneData))
    } else {
      parent.classList.remove('done')
      console.log( '⨯ Unchecked item: #' + id )

      doneData.splice(index, 1, 'unchecked')
      localStorage.setItem('dones', JSON.stringify(doneData))
    }
  }

  function editTodo() {
    const el = this.parentElement
    const currentValue = el.innerText

    el.classList.add('active')
    el.innerHTML = '<input id="edit_todo" type="text" name="edit_todo">'

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('deleteBtn')
    el.appendChild(deleteBtn)
    deleteBtn.addEventListener('click', deleteTodo)

    const editInput = document.getElementById('edit_todo')
    editInput.value = currentValue
    editInput.focus()

    // TBC
    // var index = Array.from(parent.parentNode.children).indexOf(parent)
    // var id = index + 1
  }

  function deleteLast() {
    const lastTodo = todoList.lastChild

    lastTodo.classList.add('remove')
    setTimeout(() => {
      lastTodo.remove()
    }, 600)

    input.focus()

    todoData.pop()
    localStorage.setItem('todos', JSON.stringify(todoData))

    doneData.pop()
    localStorage.setItem('dones', JSON.stringify(doneData))
  }

  function deleteTodo() {
    var parent = this.parentElement

    parent.classList.add('remove')
    setTimeout(() => {
      parent.remove()
    }, 300)

    console.log('\nPrevious number of items: ' + todoList.childElementCount);

    var index = Array.from(parent.parentNode.children).indexOf(parent)
    var id = index + 1
    console.log( '⨯ Deleted item: #' + id )

    todoData.splice(index, 1)
    localStorage.setItem('todos', JSON.stringify(todoData))

    for (let i = 0; i < todoList.childElementCount; i++) {
      numberOfItems = i
    }
    console.log('Current number of items: ' + numberOfItems + '\n\n')

    // console.log(todoList.children[i]);
  }

  function deleteAll() {
    // Other method
    // while (todoList.firstChild) {
    //   todoList.removeChild(todoList.firstChild);
    // }
    todoList.innerHTML = ''
    localStorage.clear();
    window.location.reload(true); // bug fix
  }



  // UI

  // function createEl(text) {
  //   const li  = document.createElement('li')
  //   todoList.appendChild(li)
  //   li.innerHTML = text
  //   li.classList.add('item')
  // }

  function addBtns(i) {
    const doneBtn = document.createElement('button')
    doneBtn.classList.add('doneBtn')
    i.appendChild(doneBtn)
    doneBtn.addEventListener('click', doneTodo)

    const editBtn = document.createElement('button')
    editBtn.classList.add('editBtn')
    i.appendChild(editBtn)
    editBtn.addEventListener('click', editTodo)

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('deleteBtn')
    i.appendChild(deleteBtn)
    deleteBtn.addEventListener('click', deleteTodo)

    btns.classList.add('visible')
  }



  // Events
  form.onsubmit = (event) => {
    event.preventDefault()
    addTodo(input.value)
  }

  sampleBtn.addEventListener('click', sampleData)

  clearLast.addEventListener('click', deleteLast)
  clearAll.addEventListener('click', deleteAll)

});
