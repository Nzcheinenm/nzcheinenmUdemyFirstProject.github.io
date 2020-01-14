// Форма
// Список задач
const tasks = [{
        _id: '5d2ca9e2e03d40b326596aa7',
        completed: true,
        body: 'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
        title: 'Eu ea incididunt sunt consectetur fugiat non.',
    },
    {
        _id: '5d2ca9e29c8a94095c1288e0',
        completed: false,
        body: 'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
        title: 'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
    },
    {
        _id: '5d2ca9e2e03d40b3232496aa7',
        completed: true,
        body: 'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
        title: 'Eu ea incididunt sunt consectetur fugiat non.',
    },
    {
        _id: '5d2ca9e29c8a94095564788e0',
        completed: false,
        body: 'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
        title: 'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
    },
];

(function(arrOfTasks) {
    const objOfTasks = arrOfTasks.reduce((acc, task) => {
        acc[task._id] = task;
        return acc;
    }, {});

    // Elemnts UI
    const listContainer = document.querySelector(
        '.tasks-list-section .list-group',
    );
    const form = document.forms['addTask'];
    const inputTitle = form.elements['title'];
    const inputBody = form.elements['body'];

    // Else null to elements to array
    let isNullText = document.createElement('p');
    isNullText.textContent = "Заданий нет";
    isNullText.setAttribute('style', 'display: none');
    document.querySelector('.list-group').appendChild(isNullText);

    // Events
    renderAllTasks(objOfTasks);
    form.addEventListener('submit', onFormSubmitHandler);
    listContainer.addEventListener('click', onDeletehandler);
    listContainer.addEventListener('click', onUpdatehandler);

    sortingToWork();

    function renderAllTasks(tasksList) {
        if (!tasksList) {
            console.error('Передайте список задач!');
            return;
        }

        const fragment = document.createDocumentFragment();
        Object.values(tasksList).forEach(task => {
            const li = listItemTemplate(task);
            if (task.completed === true) {
                li.setAttribute('style', 'background: #ffff00');
            }
            fragment.appendChild(li);
        });
        listContainer.appendChild(fragment);
    }

    function listItemTemplate({ _id, title, body } = {}) {
        const li = document.createElement('li');
        li.classList.add(
            'list-group-item',
            'd-flex',
            'align-items-center',
            'flex-wrap',
            'mt-2',
        );
        li.setAttribute('data-task-id', _id);

        const span = document.createElement('span');
        span.textContent = title;
        span.style.fontWeight = 'bold';

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete task';
        deleteBtn.classList.add('btn', 'btn-danger', 'w-auto', 'p-1', 'm-2', 'delete-btn');

        const updateBtn = document.createElement('button');
        updateBtn.textContent = 'Update task';
        updateBtn.classList.add('btn', 'btn-danger', 'w-auto', 'p-1', 'm-2', 'update-btn');

        const article = document.createElement('p');
        article.textContent = body;
        article.classList.add('mt-2', 'w-100');

        li.appendChild(span);
        li.appendChild(deleteBtn);
        li.appendChild(updateBtn);
        li.appendChild(article);

        return li;
    }

    function onFormSubmitHandler(e) {
        e.preventDefault();
        const titleValue = inputTitle.value;
        const bodyValue = inputBody.value;

        if (!titleValue || !bodyValue) {
            alert('Пожалуйста введите title и body');
            return;
        }

        const task = createNewTask(titleValue, bodyValue);
        const listItem = listItemTemplate(task);
        listContainer.insertAdjacentElement('afterbegin', listItem);
        form.reset();
    }

    function createNewTask(title, body) {
        const newTask = {
            title,
            body,
            completed: false,
            _id: `task-${Math.random()}`,
        };

        objOfTasks[newTask._id] = newTask;
        isNullText.setAttribute('style', 'display: none');

        return {...newTask };
    }

    function deleteTask(id) {
        const { title } = objOfTasks[id];
        const isConfirm = confirm(`Точно вы хотите удалить задачу: ${title}`);
        if (!isConfirm) return isConfirm;
        delete objOfTasks[id];
        if (isEmptyObj(objOfTasks)) {
            isNullText.setAttribute('style', 'display: block');
        }
        return isConfirm;
    }

    function deleteTaskFromHtml(confirmed, el) {
        if (!confirmed) return;
        el.remove();
    }

    function onDeletehandler({ target }) {
        if (target.classList.contains('delete-btn')) {
            const parent = target.closest('[data-task-id]');
            const id = parent.dataset.taskId;
            const confirmed = deleteTask(id);
            deleteTaskFromHtml(confirmed, parent);
        }
    }

    function updateTask(id) {
        const { title, completed } = objOfTasks[id];
        const isConfirm = confirm(`Сделать задачу выполненной: ${title}`);
        if (!isConfirm) return isConfirm;
        objOfTasks[id].completed = true;
        return isConfirm;
    }

    function onUpdatehandler({ target }) {
        if (target.classList.contains('update-btn')) {
            const parent = target.closest('[data-task-id]');
            const id = parent.dataset.taskId;
            const confirmed = updateTask(id);
            updateTaskFromHtml(confirmed, parent);
        }
    }

    function updateTaskFromHtml(confirmed, el) {
        if (!confirmed) return;
        el.setAttribute('style', 'background: #ffff00');
    }


    function isEmptyObj(obj) {
        for (var i in obj) {
            return false;
        }
        return true;
    }


    function sortingToWork() {
        let containerList = document.querySelector('.list-group');

        const elemBtnToWork = document.createElement('button');
        elemBtnToWork.textContent = 'Working orders';
        elemBtnToWork.classList.add('btn', 'btn-primary', 'w-auto', 'p-1', 'm-2', 'work-btn');

        const elemBtnToOff = document.createElement('button');
        elemBtnToOff.textContent = 'Off orders';
        elemBtnToOff.classList.add('btn', 'btn-primary', 'w-auto', 'p-1', 'm-2', 'off-btn');

        elemBtnToOff.addEventListener('click', sortToWorkHandler);
        elemBtnToWork.addEventListener('click', sortToOffHandler);

        containerList.insertAdjacentElement('beforebegin', elemBtnToWork);
        containerList.insertAdjacentElement('beforebegin', elemBtnToOff);
    }


    function sortToWorkHandler(e) {
        let containerList = document.querySelector('.tasks-list-section');

    }

    function sortToOffHandler(e) {

    }

})(tasks);