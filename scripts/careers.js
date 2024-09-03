var params = {
  data: null,
  funcs: {
    learnMore: null,
    displaySubject: null,
    deletePost: null
  },
}

function onWindowLoad() {
  myVar = setTimeout(showPage, 3000);

  function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("body-container").style.display = "block";
  }
  var ref = firebase.database().ref('jobs/');
  ref.on("value", function (snapshot) {
    console.log(snapshot.val())
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
    console.log(list_items)

    list_items_reverse = reverseArr(list_items);

    function reverseArr(list_items) {
      var ret = new Array;
      for (var i = list_items.length - 1; i >= 0; i--) {
        ret.push(list_items[i]);
      }
      return ret;
    }
    console.log(list_items_reverse)

    const list_element = document.getElementById('block');
    const pagination_element = document.getElementById('pagination');

    let current_page = 1;
    let rows = 10;

    function DisplayList(items, wrapper, rows_per_page, page) {
      wrapper.innerHTML = "";
      page--;

      let start = rows_per_page * page;
      let end = start + rows_per_page;
      let paginatedItems = items.slice(start, end);

      for (let i = 0; i < paginatedItems.length; i++) {
        let item = paginatedItems[i];

        let item_element = document.createElement('div');
        item_element.classList.add('item');

        var jobDetailsBLock = jobContent();
        item_element.innerHTML = jobDetailsBLock;

        function jobContent() {
          com = item.company;
          pos = item.position;
          exp = item.experience;
          loc = item.location;
          sub = item.subject;
          var strVar = "";

          strVar += "         <div class=\"box\">"
          strVar += "             <div class=\"row-details job-panel\">";
          strVar += "                 <div class=\"col col-1\">";
          strVar += "                     <p style=\"font-weight:bold;\"><span>" + item.company + "</span></p>";
          strVar += "                 </div>";
          strVar += "                 <div class=\"col col-2\">";
          strVar += "                     <p><span>" + item.location + "</span></p>";
          strVar += "                 </div>";
          strVar += "                 <div class=\"col col-3\">";
          strVar += "                     <p style=\"font-weight:bold;\"><span>" + item.position + "</span></p>";
          strVar += "                 </div>";
          strVar += "                 <div class=\"col col-4\">";
          strVar += '                   <p><button class=\"button\" type=\"button\" onclick="learnMore(\'' + item.id + '\')">View More+</buttton></p>'
          strVar += "                 </div>";
          strVar += "             </div><br>";
          strVar += "       </div>";
          strVar += "";
          return strVar;

        }
        // item_element.innerText = item;

        wrapper.appendChild(item_element);
      }
    }

    function SetupPagination(items, wrapper, rows_per_page) {
      wrapper.innerHTML = "";

      let page_count = Math.ceil(items.length / rows_per_page);
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
}
