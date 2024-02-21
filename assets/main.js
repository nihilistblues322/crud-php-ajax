const divTable = document.querySelector('.table-responsive');

divTable.addEventListener('click', (e) => {
    if (e.target.className === 'page-link') {
        e.preventDefault();
        let page = +e.target.dataset.page
        if (page) {
            fetch('actions.php', {
                method: 'POST',
                body: JSON.stringify({ page: page })
            }).then((response) => response.text())
                .then((data) => {
                    document.querySelector('.table-responsive').innerHTML = data;
                })
        }
    }
    //get city for edit
    if (e.target.classList.contains('btn-edit')) {
        let id = +e.target.dataset.id
        if (id) {
            fetch('actions.php', {
                method: 'POST',
                body: JSON.stringify({ id: id, action: 'get_city' })
            }).then((response) => response.json())
                .then((data) => {
                    if (data.answer === 'success') {
                        document.getElementById('editName').value = data.city.name;
                        document.getElementById('editPopulation').value = data.city.population;
                        document.getElementById('id').value = data.city.id;


                    }
                })

        }
    }



})

//add city

addCityForm = document.getElementById('addCityForm');
btnAddSubmit = document.getElementById('btn-add-submit');

addCityForm.addEventListener('submit', (e) => {
    e.preventDefault();
    btnAddSubmit.textContent = 'Adding';
    btnAddSubmit.disabled = true;
    fetch('actions.php', {
        method: 'POST',
        body: new FormData(addCityForm)
    }).then((response) => response.json())
        .then((data) => {
            setTimeout(() => {
                Swal.fire({
                    icon: data.answer,
                    title: data.answer,
                    html: data?.errors

                });
                if (data.answer === 'success') {
                    addCityForm.reset();
                }
                btnAddSubmit.textContent = 'Save';
                btnAddSubmit.disabled = false;

            }, 1000)

        })

})

//edit city

editCityForm = document.getElementById('editCityForm');
btnEditSubmit = document.getElementById('btn-edit-submit');

editCityForm.addEventListener('submit', (e) => {
    e.preventDefault();
    btnEditSubmit.textContent = 'Adding';
    btnEditSubmit.disabled = true;
    fetch('actions.php', {
        method: 'POST',
        body: new FormData(editCityForm)
    }).then((response) => response.json())
        .then((data) => {
            setTimeout(() => {
                Swal.fire({
                    icon: data.answer,
                    title: data.answer,
                    html: data?.errors

                });
                if (data.answer === 'success') {
                    let idValue = document.getElementById('id').value;
                    let nameValue = document.getElementById('editName').value;
                    let populationValue = document.getElementById('editPopulation').value;
                    let tr = document.getElementById(`city-${idValue}`);
                    tr.querySelector('.name').innerHTML = nameValue;
                    tr.querySelector('.population').innerHTML = populationValue;

                }
                btnEditSubmit.textContent = 'Save';
                btnEditSubmit.disabled = false;

            }, 1000)

        })

})