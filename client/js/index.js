var listElement = $('#list-friends');

var h1Element = $('<h1 class="title"></h1>');
h1Element.text('Những người bạn');

listElement.append(h1Element);

async function display() {
    var listFrs = await axios.get('http://localhost:3000/friend');
    listFrs = listFrs.data;

    listFrs.forEach(function (fr) {
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
