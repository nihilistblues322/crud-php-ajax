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