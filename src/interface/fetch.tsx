// Example POST method implementation:
export  async function postData (url = '', data = {},method: 'POST'){
    // Default options are marked with *
    const preurl='http://119.3.2.168:2022/api/v1';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjUsImVtYWlsIjoibGFsYWxhQHFxLmNvbSIsInJvbGUiOjQsImV4cGlyZXNfYXQiOjE2NjM4MzcxMjZ9.1tC1FL8D4rGoM_tk4YfaN25pxwNcESx0J8CEYlg-hqk'
    const response = await fetch(preurl+url, {
      method, 
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization':token
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
     /*  redirect: 'follow', */ // manual, *follow, error
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });

    return response.json(); // parses JSON response into native JavaScript objects
  }
  
  export  async function getJson (url = ''){
    // Default options are marked with *
    const preurl='http://119.3.2.168:2022/api/v1';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjUsImVtYWlsIjoibGFsYWxhQHFxLmNvbSIsInJvbGUiOjQsImV4cGlyZXNfYXQiOjE2NjM4MzcxMjZ9.1tC1FL8D4rGoM_tk4YfaN25pxwNcESx0J8CEYlg-hqk'
    const response = await fetch(preurl+url, {
      method:'GET', 
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization':token
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
    });

    return response.json(); // parses JSON response into native JavaScript objects
  }
  
  

  /* postData('https://example.com/answer', { answer: 42 })
    .then(data => {
      console.log(data); // JSON data parsed by `data.json()` call
    }); */
  