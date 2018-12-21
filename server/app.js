window.onload = function(){
    const divGet = document.querySelector('#get');
    const divPost = document.querySelector('#post');
    const divPut = document.querySelector('#put');
    const divDelete = document.querySelector('#delete');

    axios.get('https://w13ojnci51.execute-api.us-west-2.amazonaws.com/dev/getStudents')
    .then(function (response) {
        console.log('response', response.data.message.rows);
        const studentInfo = Object.values(response.data);
        return divGet.innerHTML = studentInfo;
    });

    axios.post('https://w13ojnci51.execute-api.us-west-2.amazonaws.com/dev/postNewStudent')
    .then(function (response) {
        const newStudent = Object.values(response.data);
        return divPost.innerHTML = newStudent;
    });

    axios.put('https://w13ojnci51.execute-api.us-west-2.amazonaws.com/dev/putStudent')
    .then(function (response) {
        const updateStudent = Object.values(response.data);
        return divPut.innerHTML = updateStudent;
    });

    axios.delete('https://w13ojnci51.execute-api.us-west-2.amazonaws.com/dev/deleteStudent')
    .then(function (response) {
        const deleteStudent = Object.values(response.data);
        return divDelete.innerHTML = deleteStudent;
    });
}