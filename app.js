window.addEventListener('load', function() {

  // Get DOM elements

  const form      = document.querySelector('form')
  const input     = document.querySelector('[name="new_todo"]')
  const todoList  = document.getElementById('todos')

  const todoData  = []
  const samples   = [
    { text: "Apple",      isDone: false },
    { text: "Orange",     isDone: false },
    { text: "Grapes",     isDone: false },
    { text: "Pineapple",  isDone: false },
    { text: "Melon",      isDone: false },
    { text: "Watermelon", isDone: false },
    { text: "Tangerine",  isDone: false },
    { text: "Lemon",      isDone: true },
    { text: "Banana",     isDone: true },
    { text: "Mango",      isDone: true }
  ]

  const btns      = document.querySelector('.btns')
  const clearLast = document.getElementById('clearLast')
  const clearAll  = document.getElementById('clearAll')
  const sampleBtn = document.getElementById('sample')



  // Side Effects / Lifecycle

  let index = 0

  const existingTodos = JSON.parse(localStorage.getItem('todos')) || []

  if (existingTodos > [] ) {
    console.log('Existing Todos:')

    existingTodos.forEach(item => {
      addExisting(item)

      console.log('✔︎ ' + item.text)
    });
  }



  // Functions

  function addSampleData() {
    samples.forEach(sample => {
      const todoText = sample.text
      const isDone = sample.isDone

      const li  = document.createElement('li')
      todoList.appendChild(li)
      li.innerHTML = todoText
      li.classList.add('item')
      addBtns(li)
      if (isDone == true) {
        li.classList.add('done')
      }

      todoData.push(sample)
      localStorage.setItem('todos', JSON.stringify(todoData))
    });
  }

  function addExisting(i) {
    const todoText = i.text
    const isDone = i.isDone

    const li  = document.createElement('li')
    todoList.appendChild(li)
    li.innerHTML = todoText
    li.classList.add('item')
    addBtns(li)
    if (isDone == true) {
      li.classList.add('done')
    }

    todoData.push(i)
    localStorage.setItem('todos', JSON.stringify(todoData))
  }

  function addTodo(todoText) {
    var item = { "text": todoText, "isDone": false}
    const li  = document.createElement('li')
    todoList.appendChild(li)
    li.innerHTML = todoText
    li.classList.add('item')
    li.classList.add('new')
    addBtns(li)

    todoData.push(item)
    localStorage.setItem('todos', JSON.stringify(todoData))

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
    item = this.parentElement
    var index = Array.from(item.parentNode.children).indexOf(item)
    var id = index + 1

    if (!item.classList.contains('done')) {
      item.classList.add('done')
      console.log( '✔︎ Completed item: #' + id )

      todoData[index].isDone = true

      localStorage.setItem('todos', JSON.stringify(todoData))
    } else {
      item.classList.remove('done')
      console.log( '⨯ Unchecked item: #' + id )

      todoData[index].isDone = false

      localStorage.setItem('todos', JSON.stringify(todoData))
    }
  }

  function editTodo() {
    const el = this.parentElement
    const currentValue = el.innerText

    var index = Array.from(el.parentNode.children).indexOf(el)
    var id = index + 1
    var idName = 'edit_todo-' + id

    if (el.classList.contains('done')) {
      el.classList.remove('done')
    }

    el.classList.add('active')
    el.innerHTML = '<input id="' + idName + '" type="text" name="edit_todo">'

    const saveBtn = document.createElement('button')
    saveBtn.classList.add('saveBtn')
    el.appendChild(saveBtn)
    saveBtn.addEventListener('click', saveTodo)

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('deleteBtn')
    el.appendChild(deleteBtn)
    deleteBtn.addEventListener('click', deleteTodo)

    const editInput = document.getElementById(idName)
    editInput.value = currentValue
    editInput.focus()

    editInput.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) { // Enter key
        saveBtn.click();
      }
    });
  }

  function saveTodo() {
    const li = this.parentElement
    var index = Array.from(li.parentNode.children).indexOf(li)
    var id = index + 1
    var idName = 'edit_todo-' + id

    const editInput = document.getElementById(idName)
    const newValue = editInput.value

    li.innerHTML = newValue
    li.classList.add('item')
    li.classList.remove('active')
    addBtns(li)

    var index = Array.from(li.parentNode.children).indexOf(li)
    todoData[index].text = newValue
    localStorage.setItem('todos', JSON.stringify(todoData))
  }

  function deleteLast() {
    const lastTodo = todoList.lastChild

    lastTodo.classList.add('remove')
    setTimeout(() => {
      lastTodo.remove()
    }, 600)

    todoData.pop()
    localStorage.setItem('todos', JSON.stringify(todoData))
  }

  function deleteTodo() {
    var item = this.parentElement
    var index = Array.from(item.parentNode.children).indexOf(item)
    var id = index + 1

    console.log( '\n⨯ Deleted item: #' + id )
    console.log('Previous number of items: ' + todoList.childElementCount);

    item.classList.add('remove')
    setTimeout(() => {
      item.remove()

      console.log('Current number of items: ' + todoList.childElementCount + '\n\n')
    }, 300)

    todoData.splice(index, 1)
    localStorage.setItem('todos', JSON.stringify(todoData))
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

  sampleBtn.addEventListener('click', addSampleData)

  clearLast.addEventListener('click', deleteLast)
  clearAll.addEventListener('click', deleteAll)

  document.querySelector('#toggle').addEventListener('click', () => document.body.classList.toggle('mode__dark'));

});
