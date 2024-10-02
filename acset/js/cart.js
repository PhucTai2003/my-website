// Lấy tất cả các phần tử có class 'quantily-input'
const quantityInputs = document.querySelectorAll('.quantily-input');

// Thêm bộ lắng nghe sự kiện cho mỗi input về số lượng
quantityInputs.forEach(input => {
    input.addEventListener('change', updateTotal);
});

// Hàm cập nhật tổng tiền khi số lượng thay đổi
function updateTotal(event) {
    const input = event.target;
    const row = input.closest('tr'); // Tìm phần tử <tr> gần nhất
    const priceElement = row.querySelector('p a'); // Lấy phần tử giá trong hàng
    const price = parseFloat(priceElement.textContent); // Chuyển giá sang kiểu float

    const quantity = parseInt(input.value); // Lấy số lượng mới
    const totalPrice = price * quantity; // Tính tổng tiền

    // Cập nhật tổng tiền hiển thị trong hàng
    priceElement.textContent = totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

// Lấy tất cả các phần tử có class 'fa-plus' (tăng số lượng)
const plusButtons = document.querySelectorAll('.fa-plus');

// Thêm bộ lắng nghe sự kiện cho mỗi nút tăng số lượng
plusButtons.forEach(button => {
    button.addEventListener('click', increaseQuantity);
});

// Hàm tăng số lượng khi nút tăng được nhấn
function increaseQuantity(event) {
    const button = event.target;
    const input = button.previousElementSibling; // Lấy phần tử input
    const currentValue = parseInt(input.value); // Lấy giá trị hiện tại
    input.value = currentValue + 1; // Tăng giá trị
    updateTotal({ target: input }); // Cập nhật tổng tiền
}

// Lấy tất cả các phần tử có class 'fa-minus' (giảm số lượng)
const minusButtons = document.querySelectorAll('.fa-minus');

// Thêm bộ lắng nghe sự kiện cho mỗi nút giảm số lượng
minusButtons.forEach(button => {
    button.addEventListener('click', decreaseQuantity);
});

// Hàm giảm số lượng khi nút giảm được nhấn
function decreaseQuantity(event) {
    const button = event.target;
    const input = button.nextElementSibling; // Lấy phần tử input
    const currentValue = parseInt(input.value); // Lấy giá trị hiện tại
    if (currentValue > 1) { // Đảm bảo số lượng không nhỏ hơn 1
        input.value = currentValue - 1; // Giảm giá trị
        updateTotal({ target: input }); // Cập nhật tổng tiền
    }
}

// Lấy tất cả các phần tử có class 'fa-trash' (xóa mục)
const deleteButtons = document.querySelectorAll('.fa-trash');

// Thêm bộ lắng nghe sự kiện cho mỗi nút xóa
deleteButtons.forEach(button => {
    button.addEventListener('click', deleteItem);
});

// Hàm xóa mục khi nút xóa được nhấn
function deleteItem(event) {
    const button = event.target;
    const row = button.closest('tr'); // Tìm phần tử <tr> gần nhất
    row.remove(); // Xóa hàng khỏi bảng
}
// ---------------------------adress
document.getElementById('getLocationBtn').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            // Gửi yêu cầu đến API Geocoding
            fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Lỗi khi gửi yêu cầu đến API Geocoding');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.results && data.results.length > 0 && data.results[0].address_components) {
                        var addressComponents = data.results[0].address_components;
                        var province = '';
                        var district = '';
                        var ward = '';

                        // Lặp qua các thành phần của địa chỉ để lấy Tỉnh/TP, Quận/Huyện, Phường/Xã
                        addressComponents.forEach(component => {
                            if (component.types.includes('administrative_area_level_1')) {
                                province = component.long_name;
                            } else if (component.types.includes('administrative_area_level_2')) {
                                district = component.long_name;
                            } else if (component.types.includes('sublocality_level_1')) {
                                ward = component.long_name;
                            }
                        });

                        // Điền thông tin địa chỉ vào các ô select
                        document.getElementById('provinceSelect').value = province;
                        document.getElementById('districtSelect').value = district;
                        document.getElementById('wardSelect').value = ward;
                    } else {
                        console.log('Không có kết quả hoặc kết quả không chứa thông tin địa chỉ.');
                    }
                })
                .catch(error => console.log('Lỗi:', error.message));
        }, function(error) {
            console.log('Lỗi khi lấy vị trí:', error.message);
        });
    } else {
        alert('Trình duyệt của bạn không hỗ trợ Geolocation.');
    }
});
