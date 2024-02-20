
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