async function display() {
    try {
        var response = await axios.get('http://localhost:3000/friends');
        var listFriends = response.data;

        function render(el) {
            return `<div class="content-grid-sec">
            <div class="content-sec-info">
                <h3><a href="chi-tiet.html">${el.name}</a></h3>
                <h4>Đăng ngày: ${el.date} - Lượt xem: ${el.view}</h4>
                <p>${el.detail} </p>
                <img src="${el.img}" alt="" />
                <a class="bttn" href="chi-tiet.html?id=${el.id}">Chi tiết bạn tôi</a>
            </div>
        </div>`;
        }

        let str = '';

        for (const el of listFriends) {
            str += render(el);
        }

        // console.log(str);

        $('div.col-md-8.content-main').html(str);
    } catch (error) {
        console.error("Lỗi:", error);
    }
}

display();
