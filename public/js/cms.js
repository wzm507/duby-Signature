// 从Netlify CMS获取房产数据
async function fetchProperties() {
  try {
    const response = await fetch('/properties.json');
    if (!response.ok) {
      throw new Error('Failed to fetch properties');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
}

// 格式化价格显示
function formatPrice(price) {
  return new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: 'AED',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}

// 生成房产卡片HTML
function generatePropertyCard(property) {
  const galleryImages = property.gallery && property.gallery.length > 0 ? 
    property.gallery.map(image => `
      <div class="carousel-slide">
        <img src="${image.image}" alt="${property.title}" />
      </div>
    `).join('') : `
    <div class="carousel-slide">
      <img src="${property.mainImage}" alt="${property.title}" />
    </div>
  `;

  return `
    <div class="property-card animate-on-scroll" 
         data-details-url="/property-detail.html?property=${property.slug}" 
         data-beds="${property.bedrooms}" 
         data-baths="${property.bathrooms}">
      <div class="property-carousel">
        <div class="carousel-slides">
          ${galleryImages}
        </div>
      </div>
      <div class="property-details">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <div class="property-price" style="font-size: 1.75rem; font-weight: 300; margin: 0; color: #000;">${formatPrice(property.price)}</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </div>
        
        <div style="margin-bottom: 1rem; font-size: 1rem; font-weight: 300; color: #000; line-height: 1.4;">
          ${property.title}
        </div>
        
        <div style="display: flex; align-items: center; gap: 1.5rem; margin-bottom: 1rem;">
          ${property.bedrooms ? `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
              </svg>
              <span style="color: #000;">${property.bedrooms} Bed</span>
            </div>
          ` : ''}
          ${property.bathrooms ? `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
              </svg>
              <span style="color: #000;">${property.bathrooms} Bath</span>
            </div>
          ` : ''}
          ${property.area ? `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <span style="color: #000;">${property.area} sq-ft</span>
            </div>
          ` : ''}
        </div>
        
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.5rem; color: #000;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
          <span style="color: #000;">${property.community}</span>
        </div>
        
        <hr style="border: none; border-top: 1px dashed #ddd; margin-bottom: 0.5rem;" />
        <div style="display: flex; gap: 0.5rem; margin: 0 0.5rem;">
          <button class="call-us-btn" style="flex: 1; padding: 0.4rem 0.5rem; background-color: transparent; color: #6c63ff; border: 1px solid #6c63ff; border-radius: 12px; cursor: pointer; font-weight: 500; font-size: 0.8rem; transition: all 0.3s ease;">Call Us</button>
          <button onclick="window.location.href='/property-detail.html?property=${property.slug}'" style="flex: 1; padding: 0.4rem 0.5rem; background-color: transparent; color: #6c63ff; border: 1px solid #6c63ff; border-radius: 12px; cursor: pointer; font-weight: 500; font-size: 0.8rem; transition: all 0.3s ease;">View Details</button>
          <button onclick="showWhatsAppPopup()" style="flex: 1; padding: 0.4rem 0.5rem; background-color: transparent; color: #25D366; border: 1px solid #25D366; border-radius: 12px; cursor: pointer; font-weight: 500; font-size: 0.8rem; transition: all 0.3s ease;">WhatsApp</button>
        </div>
      </div>
    </div>
  `;
}

// 渲染房产列表
async function renderProperties() {
  const properties = await fetchProperties();
  const propertiesGrid = document.querySelector('.properties-grid');
  
  if (propertiesGrid) {
    // 清空现有内容
    propertiesGrid.innerHTML = '';
    
    // 添加新的房产卡片
    properties.forEach(property => {
      const cardHTML = generatePropertyCard(property);
      propertiesGrid.innerHTML += cardHTML;
    });
    
    // 重新初始化轮播功能
    initPropertyCarousels();
  }
}

// 初始化房产轮播
function initPropertyCarousels() {
  const carousels = document.querySelectorAll('.property-carousel');
  
  carousels.forEach(carousel => {
    const slides = carousel.querySelectorAll('.carousel-slide');
    let currentSlide = 0;
    
    if (slides.length <= 1) return;
    
    setInterval(() => {
      // 隐藏当前幻灯片
      slides[currentSlide].style.opacity = '0';
      slides[currentSlide].style.zIndex = '1';
      
      // 更新当前幻灯片索引
      currentSlide = (currentSlide + 1) % slides.length;
      
      // 显示下一张幻灯片
      slides[currentSlide].style.opacity = '1';
      slides[currentSlide].style.zIndex = '2';
    }, 5000);
  });
}

// 页面加载完成后渲染房产数据
document.addEventListener('DOMContentLoaded', () => {
  // 检查是否是房产列表页面
  if (document.querySelector('.properties-grid')) {
    renderProperties();
  }
});
