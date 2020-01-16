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

    const themes = {
        default: {
            '--base-text-color': '#212529',
            '--header-bg': '#007bff',
            '--header-text-color': '#fff',
            '--default-btn-bg': '#007bff',
            '--default-btn-text-color': '#fff',
            '--default-btn-hover-bg': '#0069d9',
            '--default-btn-border-color': '#0069d9',
            '--danger-btn-bg': '#dc3545',
            '--danger-btn-text-color': '#fff',
            '--danger-btn-hover-bg': '#bd2130',
            '--danger-btn-border-color': '#dc3545',
            '--input-border-color': '#ced4da',
            '--input-bg-color': '#fff',
            '--input-text-color': '#495057',
            '--input-focus-bg-color': '#fff',
            '--input-focus-text-color': '#495057',
            '--input-focus-border-color': '#80bdff',
            '--input-focus-box-shadow': '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
        },
        dark: {
            '--base-text-color': '#212529',
            '--header-bg': '#343a40',
            '--header-text-color': '#fff',
            '--default-btn-bg': '#58616b',
            '--default-btn-text-color': '#fff',
            '--default-btn-hover-bg': '#292d31',
            '--default-btn-border-color': '#343a40',
            '--default-btn-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
            '--danger-btn-bg': '#b52d3a',
            '--danger-btn-text-color': '#fff',
            '--danger-btn-hover-bg': '#88222c',
            '--danger-btn-border-color': '#88222c',
            '--input-border-color': '#ced4da',
            '--input-bg-color': '#fff',
            '--input-text-color': '#495057',
            '--input-focus-bg-color': '#fff',
            '--input-focus-text-color': '#495057',
            '--input-focus-border-color': '#78818a',
            '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
        },
        light: {
            '--base-text-color': '#212529',
            '--header-bg': '#fff',
            '--header-text-color': '#212529',
            '--default-btn-bg': '#fff',
            '--default-btn-text-color': '#212529',
            '--default-btn-hover-bg': '#e8e7e7',
            '--default-btn-border-color': '#343a40',
            '--default-btn-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
            '--danger-btn-bg': '#f1b5bb',
            '--danger-btn-text-color': '#212529',
            '--danger-btn-hover-bg': '#ef808a',
            '--danger-btn-border-color': '#e2818a',
            '--input-border-color': '#ced4da',
            '--input-bg-color': '#fff',
            '--input-text-color': '#495057',
            '--input-focus-bg-color': '#fff',
            '--input-focus-text-color': '#495057',
            '--input-focus-border-color': '#78818a',
            '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
        },
    };
    let lastSelectedTheme = localStorage.getItem('app_theme') || 'default';

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
    const themeSelect = document.getElementById('themeSelect');


    // Events
    selectedTheme(lastSelectedTheme);
    sortingToWork();
    renderAllTasks(objOfTasks);
    form.addEventListener('submit', onFormSubmitHandler);
    listContainer.addEventListener('click', onDeletehandler);
    listContainer.addEventListener('click', onUpdatehandler);
    themeSelect.addEventListener('change', onThemeSelectHandler);





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
        deleteBtn.classList.add('btn', 'btn-danger', 'w-auto', 'p-1', 'm-2', 'd-flex', 'justify-content-end', 'delete-btn');

        const updateBtn = document.createElement('button');
        updateBtn.textContent = 'Update task';
        updateBtn.classList.add('btn', 'btn-danger', 'w-auto', 'p-1', 'm-2', 'd-flex', 'justify-content-around', 'update-btn');

        const article = document.createElement('p');
        article.textContent = body;
        article.classList.add('mt-2', 'w-100');

        li.appendChild(span);
        li.appendChild(article);
        li.appendChild(deleteBtn);
        li.appendChild(updateBtn);

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
        elemBtnToWork.textContent = 'Completed orders';
        elemBtnToWork.classList.add('btn', 'btn-primary', 'w-auto', 'p-1', 'm-2', 'work-btn');

        const elemBtnToOff = document.createElement('button');
        elemBtnToOff.textContent = 'All orders';
        elemBtnToOff.classList.add('btn', 'btn-primary', 'w-auto', 'p-1', 'm-2', 'off-btn');

        elemBtnToOff.addEventListener('click', sortToOffHandler);
        elemBtnToWork.addEventListener('click', sortToWorkHandler);

        containerList.insertAdjacentElement('beforebegin', elemBtnToWork);
        containerList.insertAdjacentElement('beforebegin', elemBtnToOff);
    }


    function sortToWorkHandler(e) {

        const objOfTasksOffing = {};

        for (let i in objOfTasks) {
            if (objOfTasks[i].completed === true) {
                objOfTasksOffing[objOfTasks[i]._id] = objOfTasks[i];
            }
        }

        var doc = document.querySelectorAll('.flex-wrap');
        for (let i of doc) {
            i.remove();
        }
        renderAllTasks(objOfTasksOffing);
    }


    function sortToOffHandler(e) {
        var doc = document.querySelectorAll('.flex-wrap');
        for (let i of doc) {
            i.remove();
        }
        renderAllTasks(objOfTasks);
    }



    function onThemeSelectHandler(e) {
        const selectedTheme = themeSelect.value;
        const isConfirmed = confirm(
            `Вы действительно хотите изменить тему: ${selectedTheme}`,
        );
        if (!isConfirmed) {
            themeSelect.value = lastSelectedTheme;
            return;
        }
        setTheme(selectedTheme);
        lastSelectedTheme = selectedTheme;
        localStorage.setItem('app_theme', selectedTheme);
    }

    function setTheme(name) {
        const selectedThemObj = themes[name];
        Object.entries(selectedThemObj).forEach(([key, value]) => {
            document.documentElement.style.setProperty(key, value);
        });
    }

})(tasks);