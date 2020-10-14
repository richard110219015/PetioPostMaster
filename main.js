var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW'+
            '4iLCJzdWIiOiI1ZWVlZmJhNzQwYjBiYTAwMTExMTg3MDAiLCJpZCI6I'+
            'jVlZWVmYmE3NDBiMGJhMDAxMTExODcwMCIsImF1ZCI6InBldGlvIiwi'+
            'cm9sZXMiOlsic3VwZXJBZG1pbiJdLCJpYXQiOjE2MDI1NjAyODQsIml'+
            'zcyI6InBldGlvIn0.JNcuL4QtgVipvmxWWAYYh9OwnV5IgBgsH9rjq6-3m9g'

axios.create({
   baseURL: 'https://dev.petio.io/petio/hospital',
   timeout: 1000,
   headers: {'Authorization': 'Bearer '+token}
});

// --- LOAD JSON FILE ---
function readTextFile(file, callback) {
  var jsonFile = new XMLHttpRequest();
  jsonFile.overrideMimeType("application/json");
  jsonFile.open("GET", file, true);
  jsonFile.onreadystatechange = function() {
      if (jsonFile.readyState === 4 && jsonFile.status == "200") {
          callback(jsonFile.responseText);
      }
  }
  jsonFile.send(null);
}

readTextFile("./hospital/台北市的動物醫院.json", function(text){
  var jsonFileData = JSON.parse(text);
  console.log(jsonFileData);
});

var testData = [
  { 
    "title": "周哥開的醫院",
    "content": "有錢就是任性",
    "createdAt": "2020/10/13",
    "phone": "09-1234567",
    "formattedAddress": "台北市信義區都我的"
  },
  {
    "title": "",
    "content": "",
    "createdAt": "",
    "phone": "",
    "formattedAddress": ""
  }
];

// --- GET REQUEST ---
function getRequest() {
  axios
    .get('https://dev.petio.io/petio/hospital', {
      timeout: 5000
    })
    .then(res => console.log(res))
    .catch(err => console.error(err));
}

// --- POST REQUEST ---
function postRequest() {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer '+token
    }
  };

  const postData = {
    title:testData[0].title,
    content:testData[0].content,
    createdAt:testData[0].createdAt,
    phone:testData[0].phone,
    formattedAddress:testData[0].formattedAddress,
  }

  axios
    .post(
      'https://dev.petio.io/petio/hospital', 
      postData,
      config
    )
    .then((res) => {console.log(res);})
    .catch(err => console.error(err));
}


// --- PUT/PATCH REQUEST ---
function updateRequest() {
  axios
    .patch('https://dev.petio.io/petio/hospital/1', {
      title: 'Updated',
      completed: true
    })
    .then(res => console.log(res))
    .catch(err => console.error(err));
}

// --- DELETE REQUEST ---
function removeRequest() {
  axios
    .delete('https://dev.petio.io/petio/hospital/1')
    .then(res => console.log(res))
    .catch(err => console.error(err));
}

// --- CANCEL TOKEN ---
function cancelToken() {
  const source = axios.CancelToken.source();

  axios
    .get('https://dev.petio.io/petio/hospital', {
      cancelToken: source.token
    })
    .then((res) => console.log(res))
    .catch(thrown => {
      if (axios.isCancel(thrown)) {
        console.log('Request canceled', thrown.message);
      }
    });

  if (true) {
    source.cancel('Request canceled!');
  }
}

axios.interceptors.request.use(
  config => {
    console.log(
      "%c[*] " + config.method.toUpperCase() + " request sent to " + 
      config.url + " at " + 
      new Date().getTime(), "color: #FF5809;font-size:12px"
      );

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

document.getElementById('get').addEventListener('click', getRequest);
document.getElementById('post').addEventListener('click', postRequest);
document.getElementById('update').addEventListener('click', updateRequest);
document.getElementById('delete').addEventListener('click', removeRequest);
document.getElementById('cancel').addEventListener('click', cancelToken);
