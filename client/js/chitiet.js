function getParameterByName(name, url = location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var dId = getParameterByName('did');

async function getData() {
    var catNameElement = $('#cat-name');
    try {
        var friendById = await axios.get(`http://localhost:3000/friend/friend-by-id?id=${dId}`);
        friendById = friendById.data;
        var catById = await axios.get(`http://localhost:3000/cat/cat-by-id?id=${friendById.cat_id}`);
        catById = catById.data;

        var dateElement = $('#date');
        dateElement.text(`Đăng ngày: ${friendById.date_create} - Lượt xem: ${friendById.counter}`);

        catNameElement.text(catById.name);

        var nameElement = $('#name');
        nameElement.text(friendById.name);

        var infoElement = $('#info');
        infoElement.html(`
            <span>${friendById.description}</span>
            <img class="single-pic" src="images/${friendById.image}" alt="">
            <p>${friendById.detail}</p>
        `);


    } catch (err) {
        console.log('Lỗi ' + err);
        catNameElement.html(`<p style='color: red; font-style: italic;'>Xảy ra lỗi khi lấy dữ liệu!<p/>`);
    }
}
getData();