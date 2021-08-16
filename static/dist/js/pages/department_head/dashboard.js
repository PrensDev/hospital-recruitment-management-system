
initDataTable('#blogsDT', {
    responsive: true,
    ajax: {
        url: `${ BASE_URL_API }blogs`
    },
    columns: [
        { data: 'title' },
        { data: 'content' },
        { data: 'user_id' },
    ]
})