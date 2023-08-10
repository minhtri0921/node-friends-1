function getParameterByName(name, url = location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var cId = getParameterByName('cid');

async function display() {
    var listFrsByCat = await axios.get(`http://localhost:3000/friend/friends-by-cat?cid=${cId}`);
    listFrsByCat = listFrsByCat.data;

    var catById = await axios.get(`http://localhost:3000/cat/catbyid?id=${cId}`);
    catById = catById.data;

    var listElement = $('#list-friends');

    var h1Element = $('<h1 class="title"></h1>');
    h1Element.html(`<span>Những người bạn >> </span>${catById.name}`);

    listElement.append(h1Element);

    listFrsByCat.forEach(function (fr) {
        var divElement = $('<div class="content-grid-sec"></div>');
        divElement.html(
            `<div class="content-sec-info">
            <h3><a href="chi-tiet.html?did=${fr.id}">${fr.name}</a></h3>
            <h4>Đăng ngày: ${fr.date_create} - Lượt xem: ${fr.counter}</h4>
            <p>${fr.description}</p>
            <img src="images/${fr.image}" alt="" />
            <a class="bttn" href="chi-tiet.html?did=${fr.id}">Chi tiết bạn tôi</a>
        </div>`
        );

        listElement.append(divElement);

    })
}
display();
