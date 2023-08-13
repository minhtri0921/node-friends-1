function getParameterByName(name, url = location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var id = getParameterByName('id')

async function getFriendById(friendId){
     var friendById = await axios(`http://localhost:3000/friends/${friendId}`)
    
    friendById = friendById.data
    function render(el){
        return `<div class="content-grid-head">
        <h3>BẠN QUEN THỜI PHỔ THÔNG</h3>
        <h4>Đăng ngày: ${el.date} - Lượt xem: ${el.view}</h4>
        <div class="clearfix"></div>
    </div>
    <div class="content-grid-single">
        <h3>${el.name}</h3>
        <div class="detail_text">
            <span>${el.detail}</span>
            <img class="single-pic" src="${el.img}" alt="">
            <p>${el.detail}</p>
        </div>`
    }

    let str = render(friendById)
    console.log(str);
    $('div.content-grid').html(str)
}
getFriendById(id)

