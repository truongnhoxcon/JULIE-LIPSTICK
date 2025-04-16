// Add event listener when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize slider
    initSlider();
    
    // Initialize navigation hover effects
    initNavigation();
    
    // Initialize search functionality
    initSearch();

    // Dữ liệu sản phẩm mẫu
    const products = [
        {
            id: 1,
            name: 'Son Romand Juicy Lasting Tint 5.5g',
            description: 'Son Tint lì cho môi căng mọng Hàn Quốc',
            price: 163000,
            image: 'images/sanpham1.webp'
        },
        {
            id: 2,
            name: 'Son Black Rouge Air Fit Velvet Tint Ver 1',
            description: 'Son kem lì mềm mịn môi',
            price: 173000,
            image: 'images/sanpham1.webp'
        },
        // Thêm các sản phẩm khác
    ];

    // Tạo grid sản phẩm
    function createProductGrid() {
        const productGrid = document.querySelector('.products-grid');
        if (!productGrid) return;

        // Xóa nội dung cũ
        productGrid.innerHTML = '';

        // Tạo sản phẩm mới
        products.forEach(product => {
            const productElement = createProductElement(product);
            productGrid.appendChild(productElement);
        });
    }

    // Tạo element cho một sản phẩm
    function createProductElement(product) {
        const productDiv = document.createElement('div');
        productDiv.className = 'product-item';

        // Format giá
        const formattedPrice = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(product.price);

        productDiv.innerHTML = `
            <div class="product-image">
                <a href="/product-detail.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                </a>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="price">${formattedPrice}</div>
                <button class="btn-quick-buy" data-product="${product.name}">
                    <i class="fas fa-shopping-cart"></i>
                    Mua ngay
                </button>
            </div>
        `;

        // Thêm event listener cho nút mua ngay
        const buyButton = productDiv.querySelector('.btn-quick-buy');
        buyButton.addEventListener('click', () => handleQuickBuy(product.name));

        return productDiv;
    }

    // Xử lý sự kiện mua nhanh
    function handleQuickBuy(productName) {
        // Điền tên sản phẩm vào form
        const productInput = document.getElementById('product');
        if (productInput) {
            productInput.value = productName;
        }
        
        // Scroll mượt đến form đăng ký
        const registerForm = document.getElementById('register-form');
        if (registerForm) {
            registerForm.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }

    // Tạo và hiển thị thông báo
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <p>${message}</p>
            </div>
        `;
        document.body.appendChild(notification);

        // Thêm style cho notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 3px 10px rgba(0,0,0,0.2);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 10px;
            animation: slideIn 0.5s ease;
        `;

        // Xóa notification sau 3 giây
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.5s ease';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    // Tạo tính năng tìm kiếm
    function setupSearch() {
        const searchInput = document.querySelector('.search-product input');
        if (!searchInput) return;

        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredProducts = products.filter(product => 
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm)
            );

            // Cập nhật grid sản phẩm với kết quả tìm kiếm
            updateProductGrid(filteredProducts);
        });
    }

    // Cập nhật grid sản phẩm
    function updateProductGrid(productsToShow) {
        const productGrid = document.querySelector('.products-grid');
        if (!productGrid) return;

        productGrid.innerHTML = '';
        productsToShow.forEach(product => {
            const productElement = createProductElement(product);
            productGrid.appendChild(productElement);
        });
    }

    // Thêm CSS cho notification
    function addNotificationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: #4CAF50;
                color: white;
                padding: 15px 25px;
                border-radius: 5px;
                display: flex;
                align-items: center;
                gap: 10px;
                transform: translateY(100px);
                opacity: 0;
                transition: all 0.3s ease;
                z-index: 1000;
                box-shadow: 0 3px 10px rgba(0,0,0,0.2);
            }

            .notification.show {
                transform: translateY(0);
                opacity: 1;
            }

            .notification i {
                font-size: 20px;
            }
        `;
        document.head.appendChild(style);
    }

    // Khởi tạo tất cả các tính năng
    function init() {
        createProductGrid();
        setupSearch();
        addNotificationStyles();
    }

    // Chạy khởi tạo
    init();

    // Xử lý các nút mua ngay
    const buyButtons = document.querySelectorAll('.btn-quick-buy');
    buyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Lấy tên sản phẩm từ data attribute
            const productName = this.getAttribute('data-product');
            
            // Điền tên sản phẩm vào form
            const productInput = document.getElementById('product');
            if (productInput) {
                productInput.value = productName;
            }
            
            // Scroll mượt đến form đăng ký
            const registerForm = document.getElementById('register-form');
            if (registerForm) {
                registerForm.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Xử lý form đăng ký
    const purchaseForm = document.getElementById('purchaseForm');
    purchaseForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        const fullName = document.getElementById('fullName').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;

        if (!fullName || !phone || !email || !address) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        // Hiển thị thông báo thành công
        showNotification('Đăng ký mua hàng thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.');
        
        // Reset form
        purchaseForm.reset();
    });

    // Xử lý nút khám phá ngay
    const exploreButton = document.querySelector('.btn-explore');
    
    exploreButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        const featuredProducts = document.getElementById('featured-products');
        if (featuredProducts) {
            // Scroll mượt đến phần sản phẩm nổi bật
            featuredProducts.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Thêm hiệu ứng highlight
            featuredProducts.classList.add('highlight-section');
            setTimeout(() => {
                featuredProducts.classList.remove('highlight-section');
            }, 1000);
        }
    });
});

function initSlider() {
    const sliderImages = [
        'slider1.jpg',
        'slider2.jpg',
        'slider3.jpg'
    ];
    
    const sliderWrapper = document.querySelector('.slider-wrapper');
    let currentSlide = 0;
    
    // Create slider HTML
    sliderWrapper.innerHTML = `
        <div class="slider" style="position: relative; height: 100%;">
            <img src="images/${sliderImages[0]}" alt="Slider Image" style="width: 100%; height: 100%; object-fit: cover;">
            <button class="slider-prev" style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%);">❮</button>
            <button class="slider-next" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%);">❯</button>
        </div>
    `;
    
    // Add click handlers for slider buttons
    document.querySelector('.slider-prev').addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + sliderImages.length) % sliderImages.length;
        updateSlider();
    });
    
    document.querySelector('.slider-next').addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % sliderImages.length;
        updateSlider();
    });
    
    function updateSlider() {
        const img = document.querySelector('.slider img');
        img.src = `images/${sliderImages[currentSlide]}`;
    }
    
    // Auto-advance slider
    setInterval(() => {
        currentSlide = (currentSlide + 1) % sliderImages.length;
        updateSlider();
    }, 5000);
}

function initNavigation() {
    const navItems = document.querySelectorAll('.nav-list li');
    
    navItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // Add hover effect
            item.style.transform = 'translateY(-2px)';
        });
        
        item.addEventListener('mouseleave', () => {
            // Remove hover effect
            item.style.transform = 'translateY(0)';
        });
    });
}

function initSearch() {
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    
    searchButton.addEventListener('click', () => {
        performSearch(searchInput.value);
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch(searchInput.value);
        }
    });
}

function performSearch(query) {
    // Here you would typically make an API call to your backend
    console.log('Searching for:', query);
    // For demo purposes, we'll just log the search query
    alert('Tìm kiếm: ' + query);
}

// Thêm CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style); 