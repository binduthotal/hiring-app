var params = {
    data: null,
    funcs: {
        downloadResume: null,
    },
}

var ref = firebase.database().ref('jobs/');
ref.on("value", function (snapshot) {
    snapshotToArray(snapshot);
});


function snapshotToArray(snapshot) {
    var list_items = [];
    var list_items_reverse = [];

    snapshot.forEach(function (childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        list_items.push(item);
    });

    list_items_reverse = reverseArr(list_items);

    function reverseArr(list_items) {
        var ret = new Array;
        for (var i = list_items.length - 1; i >= 0; i--) {
            ret.push(list_items[i]);
        }
        return ret;
    }

    const list_element = document.getElementById('tbody');
    const pagination_element = document.getElementById('pagination');

    let current_page = 1;
    let rows = 15;

    function DisplayList(items, wrapper, rows_per_page, page) {
        wrapper.innerHTML = "";
        page--;
        var users_list = [];

        let start = rows_per_page * page;
        let end = start + rows_per_page;

        for (let i = 0; i < items.length; i++) {
            if (items[i].users) {
                var userKeys = Object.entries(items[i].users);
                for (let j = 0; j < userKeys.length; j++) {
                    users_list.push(userKeys[j])
                }
            }
        }

        let paginatedItems = users_list.slice(start, end);
        console.log("paginatedItems:", paginatedItems)

        for (let j = 0; j < paginatedItems.length; j++) {

            let item = paginatedItems[j];

            userContent();

            function userContent() {
                params.funcs.downloadResume = downloadResume;

                var row = wrapper.insertRow(0);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                var cell5 = row.insertCell(4);
                var cell6 = row.insertCell(5);

                for(let k = 0;k<items.length;k++){
                    if(items[k].id === item[1].companyId){
                        cell1.innerHTML = items[k].company;
                        cell2.innerHTML = items[k].position
                    }
                }
                cell3.innerHTML = item[1].name;
                cell4.innerHTML = item[1].email;
                cell5.innerHTML = item[1].phone;
                cell6.innerHTML = " <button class=\"download\" type=\"button\" onclick=params.funcs.downloadResume('" + item[1].resume + "','" + encodeURIComponent(item[1].fileName) + "')>Download</buttton>";

            }
        }
    }

    function SetupPagination(items, wrapper, rows_per_page) {
        wrapper.innerHTML = "";
        var users_list = [];

        for (let i = 0; i < items.length; i++) {
            if (items[i].users) {
                var userKeys = Object.entries(items[i].users);
                for (let j = 0; j < userKeys.length; j++) {
                    users_list.push(userKeys[j])
                }
            }
        }
        let page_count = Math.ceil(users_list.length / rows_per_page);
        for (let i = 1; i < page_count + 1; i++) {
            let btn = PaginationButton(i, items);
            wrapper.appendChild(btn);
        }
    }

    function PaginationButton(page, items) {
        let button = document.createElement('button');
        button.innerText = page;

        if (current_page == page) button.classList.add('active');

        button.addEventListener('click', function () {
            current_page = page;
            DisplayList(items, list_element, rows, current_page);

            let current_btn = document.querySelector('.pagenumbers button.active');
            current_btn.classList.remove('active');

            button.classList.add('active');
        });

        return button;
    }

    DisplayList(list_items_reverse, list_element, rows, current_page);
    SetupPagination(list_items_reverse, pagination_element, rows);
};
function downloadResume(path, fName) {
    //                     debugger
    // window.open(path);
    // var win = window.open();
    // win.document.write('<iframe src="' + path + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
    fName = decodeURIComponent(fName);
    var link = document.createElement('a');
    link.setAttribute('download', fName);
    link.href = path;
    // link.download=""+uName+".resume";
    // link.download=`${uName}`;
    link.click();
}