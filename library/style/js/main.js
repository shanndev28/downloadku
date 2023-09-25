// Scroll Active
const sectionS = document.querySelectorAll('section[id]')

function cActive() {
    const scrollY = window.pageYOffset

    sectionS.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-item a[href*=' + sectionId + ']').classList.add('active')
        } else {
            document.querySelector('.nav-item a[href*=' + sectionId + ']').classList.remove('active')

        }
    })
}
window.addEventListener('scroll', cActive);

// Download
$(document).ready(function () {
    $("#start").click(function () {
        var url = $("#link").val();
        var imgLoading = "https://i.ibb.co/Zd6hS7F/loading-GIF-unscreen.gif";

        if (url == "") {
            var url = $("#link").val()
        } else {
            $.ajax({
                url: 'https://leyscoders-api.herokuapp.com/api/ytdl',
                type: 'get',
                data: {
                    'url': url,
                    'apikey': 'dappakntlll'
                },
                dataType: 'json',
                beforeSend: function () {
                    $("#loadingHtml").html(`<center><img src="` + imgLoading + `" width="250" class="mt-4 mb-2"></center>`);
                },
                success: function (a, b) {
                    $("#link").val('')
                    $("#loadingHtml").html('')
                    $.each(a.result, function (c, d) {
                        $("#result").html(`
                            <div class="col-md-6"><img src="` + d.thumb + `" width="100%"></div>
                            <div class="col-md-6">
                                <h5 class="fw-bold">` + d.title + `</h5>
                                <ul>
                                    <li>Like: ` + d.like + `</li>
                                    <li>Views: ` + d.view + `</li>
                                    <li>Duration: ` + d.duration + `s</li>
                                    <li>Published: ` + d.published + `</li>
                                </ul>
                            </div>
                            <hr class="my-3">
                            <div class="d-flex justify-content-end">
                                <a class="btn mx-2" download="" href="` + d.url_audio + `"><i class="ri-download-line"></i> Audio</a>
                                <a class="btn mx-1" download="" href="` + d.url_video + `"><i class="ri-download-line"></i> Video</a>
                            </div>
                        `)
                    })
                    openModals()
                },
                error: function () {
                    $("#loadingHtml").html(``);
                }
            })
        }
    });
});

// Modal
var modalS = document.getElementById('modals');
$("#close-modals").click(function () {
    modalS.style.display = 'none';
})
function openModals() {
    modalS.style.display = 'block';
}