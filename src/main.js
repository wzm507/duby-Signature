import './style.css'

// 页面加载动画
function initLoadingAnimation() {
  // 创建加载遮罩
  const loadingOverlay = document.createElement('div');
  loadingOverlay.className = 'loading-overlay';
  
  const loadingSpinner = document.createElement('div');
  loadingSpinner.className = 'loading-spinner';
  
  loadingOverlay.appendChild(loadingSpinner);
  document.body.appendChild(loadingOverlay);
  
  // 页面加载完成后移除加载动画
  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingOverlay.style.opacity = '0';
      loadingOverlay.addEventListener('transitionend', () => {
        if (loadingOverlay.parentNode) {
          loadingOverlay.parentNode.removeChild(loadingOverlay);
        }
      });
    }, 300);
  });
}

// 滚动进度指示器
function initScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
    
    progressBar.style.width = scrollPercentage + '%';
  });
}

// 滚动动画功能实现
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  // 检查元素是否在视口中
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    const windowWidth = (window.innerWidth || document.documentElement.clientWidth);
    
    // 计算元素可见性阈值（默认80%可见时触发动画）
    const vHeight = rect.height > windowHeight ? 0 : (windowHeight - rect.top) / (windowHeight + rect.height);
    const vWidth = rect.width > windowWidth ? 0 : (windowWidth - rect.left) / (windowWidth + rect.width);
    const visibility = Math.min(vHeight, vWidth);
    
    return visibility > 0.2;
  }
  
  // 处理滚动事件
  function handleScroll() {
    animatedElements.forEach(el => {
      if (isElementInViewport(el)) {
        el.classList.add('animate-active');
      } else {
        // 如果需要滚动回顶部时重新隐藏动画，可以取消下面的注释
        // el.classList.remove('animate-active');
      }
    });
  }
  
  // 初始化时检查一次
  handleScroll();
  
  // 添加滚动监听
  window.addEventListener('scroll', handleScroll);
  
  // 添加窗口大小变化监听
  window.addEventListener('resize', handleScroll);
}

// 增强的用户交互功能
function initEnhancedInteractions() {
  // 添加页面过渡效果
  document.body.classList.add('page-transition');
  
  // 为所有可点击元素添加微交互
  const interactiveElements = document.querySelectorAll('a, button, .property-card, .hover-effect');
  
  interactiveElements.forEach(el => {
    // 添加点击波纹效果
    el.addEventListener('click', (e) => {
      const ripple = document.createElement('span');
      const rect = el.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.3);
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1000;
      `;
      
      el.style.position = 'relative';
      el.style.overflow = 'hidden';
      el.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

// 添加波纹动画样式
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// 页面加载完成后初始化所有交互功能
document.addEventListener('DOMContentLoaded', () => {
  initLoadingAnimation();
  initScrollProgress();
  initScrollAnimations();
  initEnhancedInteractions();
});

// 全局翻译数据
// 不再支持多语言切换功能
// 已删除全局翻译数据
// 页面将保持默认语言（英语）

// 获取当前语言（已简化为固定值）
let currentLang = 'en';

// 不再支持多语言功能，已删除所有翻译数据
const translations = {
    // 弹窗内容
    lyviaModalContent: `
      <div style="margin-bottom: 25px;">
        <h4 style="color: #333; margin-bottom: 15px; font-size: 1.2rem;">New Mall Confirmed in Dubai South: A Game-Changer for Residents, Investors, and Future Growth</h4>
        <p style="color: #666; font-size: 0.9rem; margin-bottom: 20px;"><i class="far fa-calendar-alt"></i> 27 November, 2025 | 5 minutes read</p>
        <p>Dubai South, the rapidly evolving 145-square-kilometer master community built around Al Maktoum International Airport, has once again made headlines. A brand-new retail destination has officially been confirmed, bringing with it a wave of excitement among residents, investors, and future homeowners. This new mall will not only serve as the central lifestyle hub for the district but will also redefine the standard of community convenience within the area.</p>
        <p>With talk surrounding the South Bay Mall opening date, lagoon-side retail experiences, and a surge of Dubai South off-plan projects, the announcement signals a major leap forward in transforming Dubai South into one of the city’s most desirable and self-sustained destinations.</p>
        <p>In this blog, we explore everything you need to know about the upcoming mall, why demand for the community is rising, and the investment potential behind Dubai’s most ambitious new district.</p>
      </div>
      
      <div style="margin-bottom: 25px;">
        <h4 style="color: #333; margin-bottom: 15px; font-size: 1.2rem;">A Landmark Retail Destination in Dubai South</h4>
        <p>The confirmation of a new mall in Dubai South is a significant milestone for the master development. Positioned near South Bay; the flagship residential cluster featuring crystal lagoons, waterfront townhouses, and luxury villas; the mall is designed to integrate seamlessly with the community’s lifestyle vision.</p>
        <p>Early previews highlight that this will be a Mall with lagoon views Dubai residents will love, offering a rare fusion of shopping, leisure, and waterfront relaxation. From shaded promenades and open-air dining to boutiques and family entertainment zones, the mall is envisioned as both a commercial and recreational anchor for the district.</p>
        <p>This retail hub stands to become the central gathering point for thousands of residents moving into the rapidly growing South Bay and the wider Dubai South area.</p>
      </div>
      
      <div style="margin-bottom: 25px;">
        <h4 style="color: #333; margin-bottom: 15px; font-size: 1.2rem;">South Bay Mall Opening Date: What We Know So Far</h4>
        <p>While a confirmed date has not been officially announced yet, development plans indicate that the mall will align closely with the handover phases of the surrounding South Bay residences. Based on current construction activity and project timelines, the South Bay Mall opening date is anticipated to fall within the next few years, paralleling the completion of the lagoon, parks, and lifestyle community clusters.</p>
        <p>This synchronised delivery is part of Dubai South’s long-term strategy: to ensure residents receive immediate access to Dubai South community amenities rather than waiting years for supporting infrastructure.</p>
        <p>As official updates continue to roll out, one thing is clear that the mall will be a priority development, given its pivotal role in shaping the district’s lifestyle offering.</p>
      </div>
      
      <div style="margin-bottom: 25px;">
        <h4 style="color: #333; margin-bottom: 15px; font-size: 1.2rem;">A Boost for Residents: Lifestyle, Convenience, and Amenity-Rich Living</h4>
        <p>The new mall strengthens what is already becoming one of Dubai’s most self-contained communities. Dubai South is committed to providing a comfortable, family-oriented environment where residents enjoy easy access to facilities without long commutes into central Dubai.</p>
        <p>The mall will complement the area’s existing and upcoming amenities, including:</p>
        <ul style="margin-left: 20px; margin-bottom: 15px;">
          <li>Crystal lagoons with beach access</li>
          <li>Community parks and jogging tracks</li>
          <li>Retail boulevards and cafés</li>
          <li>Schools and nurseries</li>
          <li>Fitness and wellness centers</li>
          <li>Hotels and hospitality attractions</li>
          <li>Proximity to Expo City Dubai and District 2020</li>
        </ul>
        <p>For residents, these features create a seamless daily experience whether enjoying weekend lagoon dining, running errands within minutes, or accessing major highways quickly. The arrival of the mall reinforces Dubai South’s positioning as a holistic living environment designed for modern families.</p>
      </div>
      
      <div style="margin-bottom: 25px;">
        <h4 style="color: #333; margin-bottom: 15px; font-size: 1.2rem;">A Major Catalyst for Investors: Why Dubai South Is Attracting Big Attention</h4>
        <p>The mall announcement adds another compelling reason to Invest in Dubai South. The district has already seen a consistent rise in demand due to:</p>
        <h5 style="margin-top: 15px; margin-bottom: 10px; color: #444;">Affordability Paired with High Value</h5>
        <p>Compared to the rest of Dubai, properties in Dubai South offer more spacious layouts, lagoon-front homes, and strong capital appreciation potential all at competitive entry prices.</p>
        <h5 style="margin-top: 15px; margin-bottom: 10px; color: #444;">Proximity to Al Maktoum International Airport</h5>
        <p>Dubai’s future mega-airport is set to become the world’s largest, positioning Dubai South as the next global aviation hub. This proximity promises long-term growth and strong rental yield potential.</p>
        <h5 style="margin-top: 15px; margin-bottom: 10px; color: #444;">Expo City Dubai Transformation</h5>
        <p>The legacy of Expo 2020 has evolved into a sustainable future city, creating jobs, business opportunities, and increased residential demand.</p>
        <h5 style="margin-top: 15px; margin-bottom: 10px; color: #444;">Strong Government Backing</h5>
        <p>Dubai South is one of the city’s most strategically supported developments, prioritised for long-term infrastructure and economic growth.</p>
        <h5 style="margin-top: 15px; margin-bottom: 10px; color: #444;">Rise of Dubai South Off-Plan Projects</h5>
        <p>Developers are launching more Dubai South off-plan projects than ever townhouses, villas, apartments, and waterfront communities thanks to strong buyer interest.</p>
        <p>The addition of a major mall further boosts investor confidence, ensuring that property values and rental demand will continue climbing steadily.</p>
      </div>
      
      <div style="margin-bottom: 25px;">
        <h4 style="color: #333; margin-bottom: 15px; font-size: 1.2rem;">Lagoon Lifestyle: A Unique Retail and Waterfront Experience</h4>
        <p>One of the most exciting elements surrounding the mall is its connection to Dubai South’s signature lagoon development. This makes the new mall a mall with lagoon views Dubai hasn’t seen before in this district.</p>
        <p>Imagine:</p>
        <ul style="margin-left: 20px; margin-bottom: 15px;">
          <li>Shopping with lagoon-side walking paths</li>
          <li>Cafés overlooking turquoise waters</li>
          <li>Outdoor events by the waterfront</li>
          <li>Sunset dining around the South Bay crystal lagoon</li>
        </ul>
        <p>This blend of retail + waterfront living sets Dubai South apart from most inland communities and pushes it firmly into the category of premium lifestyle destinations.</p>
      </div>
      
      <div style="margin-bottom: 25px;">
        <h4 style="color: #333; margin-bottom: 15px; font-size: 1.2rem;">The Future of Dubai South: Growing into a Fully Integrated Mega City</h4>
        <p>Dubai South is not just another master development; it is positioned as Dubai’s “city of the future,” built with sustainability, mobility, and economic diversification at its core.</p>
        <p>The mall is just one part of a much larger picture that includes:</p>
        <ul style="margin-left: 20px; margin-bottom: 15px;">
          <li>Expanded business districts</li>
          <li>New residential zones</li>
          <li>Integrated public transport</li>
          <li>Green mobility solutions</li>
          <li>Large-scale entertainment attractions</li>
          <li>Urban green spaces</li>
          <li>Health and education clusters</li>
        </ul>
        <p>As each phase progresses, Dubai South moves closer to becoming one of Dubai’s most well-rounded communities for residents and businesses alike.</p>
      </div>
      
      <div style="margin-bottom: 25px;">
        <h4 style="color: #333; margin-bottom: 15px; font-size: 1.2rem;">A Turning Point for the Community</h4>
        <p>The new mall’s confirmation signifies more than just a shopping destination; it represents a new chapter in Dubai South’s rapid evolution. It enhances quality of life, boosts regional value, and positions the district for long-term domestic and international investment appeal.</p>
        <p>With the South Bay Mall opening date approaching in the coming years, rising interest in waterfront retail, and a boom in Dubai South off-plan projects, this area is becoming one of the city’s fastest-growing real estate hotspots.</p>
        <p>Whether you’re a homebuyer, an investor, or someone searching for a future-forward community, Dubai South is no longer the “upcoming area”; it is becoming a lifestyle destination in its own right.</p>
        <p>If you’re planning to Invest in Dubai South, now is the ideal time to explore opportunities before prices rise even further with the completion of major developments like the mall, lagoon, and future airport expansions.</p>
      </div>
    `,
    
    solayaModalContent: `
      <div style="margin-bottom: 25px;">
        <h4 style="color: #333; margin-bottom: 15px; font-size: 1.2rem;">New Mall Confirmed in Dubai South: A Game-Changer for Residents, Investors, and Future Growth</h4>
        <p style="color: #666; font-size: 0.9rem; margin-bottom: 20px;"><i class="far fa-calendar-alt"></i> 27 November, 2025 | 5 minutes read</p>
        <p>Dubai South, the rapidly evolving 145-square-kilometer master community built around Al Maktoum International Airport, has once again made headlines. A brand-new retail destination has officially been confirmed, bringing with it a wave of excitement among residents, investors, and future homeowners. This new mall will not only serve as the central lifestyle hub for the district but will also redefine the standard of community convenience within the area.</p>
        <p>With talk surrounding the South Bay Mall opening date, lagoon-side retail experiences, and a surge of Dubai South off-plan projects, the announcement signals a major leap forward in transforming Dubai South into one of the city’s most desirable and self-sustained destinations.</p>
        <p>In this blog, we explore everything you need to know about the upcoming mall, why demand for the community is rising, and the investment potential behind Dubai’s most ambitious new district.</p>
      </div>
      
      <div style="margin-bottom: 25px;">
        <h4 style="color: #333; margin-bottom: 15px; font-size: 1.2rem;">A Landmark Retail Destination in Dubai South</h4>
        <p>The confirmation of a new mall in Dubai South is a significant milestone for the master development. Positioned near South Bay; the flagship residential cluster featuring crystal lagoons, waterfront townhouses, and luxury villas; the mall is designed to integrate seamlessly with the community’s lifestyle vision.</p>
        <p>Early previews highlight that this will be a Mall with lagoon views Dubai residents will love, offering a rare fusion of shopping, leisure, and waterfront relaxation. From shaded promenades and open-air dining to boutiques and family entertainment zones, the mall is envisioned as both a commercial and recreational anchor for the district.</p>
        <p>This retail hub stands to become the central gathering point for thousands of residents moving into the rapidly growing South Bay and the wider Dubai South area.</p>
      </div>
      
      <div style="margin-bottom: 25px;">
        <h4 style="color: #333; margin-bottom: 15px; font-size: 1.2rem;">South Bay Mall Opening Date: What We Know So Far</h4>
        <p>While a confirmed date has not been officially announced yet, development plans indicate that the mall will align closely with the handover phases of the surrounding South Bay residences. Based on current construction activity and project timelines, the South Bay Mall opening date is anticipated to fall within the next few years, paralleling the completion of the lagoon, parks, and lifestyle community clusters.</p>
        <p>This synchronised delivery is part of Dubai South’s long-term strategy: to ensure residents receive immediate access to Dubai South community amenities rather than waiting years for supporting infrastructure.</p>
        <p>As official updates continue to roll out, one thing is clear that the mall will be a priority development, given its pivotal role in shaping the district’s lifestyle offering.</p>
      </div>
      
      <div style="margin-bottom: 25px;">
        <h4 style="color: #333; margin-bottom: 15px; font-size: 1.2rem;">A Boost for Residents: Lifestyle, Convenience, and Amenity-Rich Living</h4>
        <p>The new mall strengthens what is already becoming one of Dubai’s most self-contained communities. Dubai South is committed to providing a comfortable, family-oriented environment where residents enjoy easy access to facilities without long commutes into central Dubai.</p>
        <p>The mall will complement the area’s existing and upcoming amenities, including:</p>
        <ul style="margin-left: 20px; margin-bottom: 15px;">
          <li>Crystal lagoons with beach access</li>
          <li>Community parks and jogging tracks</li>
          <li>Retail boulevards and cafés</li>
          <li>Schools and nurseries</li>
          <li>Fitness and wellness centers</li>
          <li>Hotels and hospitality attractions</li>
          <li>Proximity to Expo City Dubai and District 2020</li>
        </ul>
        <p>For residents, these features create a seamless daily experience whether enjoying weekend lagoon dining, running errands within minutes, or accessing major highways quickly. The arrival of the mall reinforces Dubai South’s positioning as a holistic living environment designed for modern families.</p>
      </div>
      
      <div style="margin-bottom: 25px;">
        <h4 style="color: #333; margin-bottom: 15px; font-size: 1.2rem;">A Major Catalyst for Investors: Why Dubai South Is Attracting Big Attention</h4>
        <p>The mall announcement adds another compelling reason to Invest in Dubai South. The district has already seen a consistent rise in demand due to:</p>
        <h5 style="margin-top: 15px; margin-bottom: 10px; color: #444;">Affordability Paired with High Value</h5>
        <p>Compared to the rest of Dubai, properties in Dubai South offer more spacious layouts, lagoon-front homes, and strong capital appreciation potential all at competitive entry prices.</p>
        <h5 style="margin-top: 15px; margin-bottom: 10px; color: #444;">Proximity to Al Maktoum International Airport</h5>
        <p>Dubai’s future mega-airport is set to become the world’s largest, positioning Dubai South as the next global aviation hub. This proximity promises long-term growth and strong rental yield potential.</p>
        <h5 style="margin-top: 15px; margin-bottom: 10px; color: #444;">Expo City Dubai Transformation</h5>
        <p>The legacy of Expo 2020 has evolved into a sustainable future city, creating jobs, business opportunities, and increased residential demand.</p>
        <h5 style="margin-top: 15px; margin-bottom: 10px; color: #444;">Strong Government Backing</h5>
        <p>Dubai South is one of the city’s most strategically supported developments, prioritised for long-term infrastructure and economic growth.</p>
        <h5 style="margin-top: 15px; margin-bottom: 10px; color: #444;">Rise of Dubai South Off-Plan Projects</h5>
        <p>Developers are launching more Dubai South off-plan projects than ever townhouses, villas, apartments, and waterfront communities thanks to strong buyer interest.</p>
        <p>The addition of a major mall further boosts investor confidence, ensuring that property values and rental demand will continue climbing steadily.</p>
      </div>
      
      <div style="margin-bottom: 25px;">
        <h4 style="color: #333; margin-bottom: 15px; font-size: 1.2rem;">Lagoon Lifestyle: A Unique Retail and Waterfront Experience</h4>
        <p>One of the most exciting elements surrounding the mall is its connection to Dubai South’s signature lagoon development. This makes the new mall a mall with lagoon views Dubai hasn’t seen before in this district.</p>
        <p>Imagine:</p>
        <ul style="margin-left: 20px; margin-bottom: 15px;">
          <li>Shopping with lagoon-side walking paths</li>
          <li>Cafés overlooking turquoise waters</li>
          <li>Outdoor events by the waterfront</li>
          <li>Sunset dining around the South Bay crystal lagoon</li>
        </ul>
        <p>This blend of retail + waterfront living sets Dubai South apart from most inland communities and pushes it firmly into the category of premium lifestyle destinations.</p>
      </div>
      
      <div style="margin-bottom: 25px;">
        <h4 style="color: #333; margin-bottom: 15px; font-size: 1.2rem;">The Future of Dubai South: Growing into a Fully Integrated Mega City</h4>
        <p>Dubai South is not just another master development; it is positioned as Dubai’s “city of the future,” built with sustainability, mobility, and economic diversification at its core.</p>
        <p>The mall is just one part of a much larger picture that includes:</p>
        <ul style="margin-left: 20px; margin-bottom: 15px;">
          <li>Expanded business districts</li>
          <li>New residential zones</li>
          <li>Integrated public transport</li>
          <li>Green mobility solutions</li>
          <li>Large-scale entertainment attractions</li>
          <li>Urban green spaces</li>
          <li>Health and education clusters</li>
        </ul>
        <p>As each phase progresses, Dubai South moves closer to becoming one of Dubai’s most well-rounded communities for residents and businesses alike.</p>
      </div>
      
      <div style="margin-bottom: 25px;">
        <h4 style="color: #333; margin-bottom: 15px; font-size: 1.2rem;">A Turning Point for the Community</h4>
        <p>The new mall’s confirmation signifies more than just a shopping destination; it represents a new chapter in Dubai South’s rapid evolution. It enhances quality of life, boosts regional value, and positions the district for long-term domestic and international investment appeal.</p>
        <p>With the South Bay Mall opening date approaching in the coming years, rising interest in waterfront retail, and a boom in Dubai South off-plan projects, this area is becoming one of the city’s fastest-growing real estate hotspots.</p>
        <p>Whether you’re a homebuyer, an investor, or someone searching for a future-forward community, Dubai South is no longer the “upcoming area”; it is becoming a lifestyle destination in its own right.</p>
        <p>If you’re planning to Invest in Dubai South, now is the ideal time to explore opportunities before prices rise even further with the completion of major developments like the mall, lagoon, and future airport expansions.</p>
      </div>
    `,
    
    reportModalContent: `
      <div style="margin-bottom: 25px;">
        <h4 style="color: #333; margin-bottom: 15px; font-size: 1.2rem;">Is Tilal Al Ghaf a Good Investment in Dubai Real Estate?</h4>
        <p style="color: #666; font-size: 0.9rem; margin-bottom: 20px;"><i class="far fa-calendar-alt"></i> 22 October, 2025 | 5 minutes read</p>
        <p>In the ever-evolving landscape of Dubai’s real estate market, few communities have captured as much attention as Tilal Al Ghaf. Developed by Majid Al Futtaim, this master-planned community seamlessly blends resort-style living with sustainable urban design creating one of Dubai’s most sought-after residential destinations. As more investors explore investment in Dubai, the question naturally arises: Is Tilal Al Ghaf a good investment in Dubai.</p>
        <p>This comprehensive guide explores everything you need to know from community highlights and location advantages to property appreciation potential and rental yields to help you make an informed decision.</p>
      </div>
      
      <div style="margin-bottom: 25px;">
        <h4 style="color: #333; margin-bottom: 15px; font-size: 1.2rem;">Overview of Tilal Al Ghaf</h4>
        <p>Tilal Al Ghaf is an upscale mixed-use development located near Dubai Sports City and Motor City, offering a harmonious balance of nature and modernity. Spanning over 3 million square meters, the project features residential clusters, retail spaces, international schools, lush parks, and the spectacular Crystal Lagoon a man-made turquoise water body surrounded by sandy beaches.</p>
        <p>The master plan emphasizes sustainable living, with dedicated pedestrian paths, cycling trails, and ample green spaces. Developed by Majid Al Futtaim, known for iconic projects like Mall of the Emirates and City Centre malls, Tilal Al Ghaf has earned its reputation for luxury, innovation, and long-term community planning.</p>
      </div>
      
      <div style="margin-bottom: 25px;">
        <h4 style="color: #333; margin-bottom: 15px; font-size: 1.2rem;">Location Advantage: Central Yet Serene</h4>
        <p>One of Tilal Al Ghaf’s strongest investment appeals lies in its strategic location. Positioned along Hessa Street, it offers direct access to Dubai’s key business and leisure hubs:</p>
        <ul style="margin-left: 20px; margin-bottom: 15px;">
          <li>15 minutes to Mall of the Emirates</li>
          <li>20 minutes to Downtown Dubai</li>
          <li>25 minutes to Dubai International Airport</li>
          <li>10 minutes to Dubai Hills and Al Barsha</li>
        </ul>
        <p>Its proximity to established communities such as Dubai Sports City, Motor City, and Arabian Ranches ensures connectivity while maintaining exclusivity and peace a balance highly valued by both end-users and investors.</p>
      </div>
      
      <div style="margin-bottom: 25px;">
        <h4 style="color: #333; margin-bottom: 15px; font-size: 1.2rem;">Master Developer: Majid Al Futtaim’s Reputation</h4>
        <p>When assessing investment in Dubai, the developer’s credibility plays a major role in long-term appreciation. Majid Al Futtaim (MAF) is one of the most trusted and financially robust developers in the region.</p>
        <p>MAF’s track record of delivering integrated communities with high lifestyle value (like Al Zahia and Tilal Al Ghaf) makes it a safe and reliable choice for investors seeking quality construction, timely delivery, and enduring brand value.</p>
      </div>
      
      <div style="margin-bottom: 25px;">
        <h4 style="color: #333; margin-bottom: 15px; font-size: 1.2rem;">Property Types in Tilal Al Ghaf</h4>
        <p>Tilal Al Ghaf offers a diverse range of residential options catering to different budgets and investment strategies:</p>
        <ul style="margin-left: 20px; margin-bottom: 15px;">
          <li>Villas & Mansions: Luxury villas in Harmony, Alaya, Elysian Mansions, and Serenity Mansions are among Dubai’s most exclusive properties, often purchased by high-net-worth individuals for personal use or luxury rentals.</li>
          <li>Townhouses: Mid-tier developments like Aura and Elan appeal to families and young professionals seeking community living with access to premium amenities.</li>
          <li>Apartments: Future phases are expected to introduce waterfront apartments and branded residences, offering lower entry points for investors.</li>
        </ul>
        <p>This mix of property types ensures broad market demand; a critical factor for long-term capital stability and liquidity.</p>
      </div>
      
      <div style="margin-bottom: 25px;">
        <h4 style="color: #333; margin-bottom: 15px; font-size: 1.2rem;">Price Trends and Appreciation</h4>
        <p>Tilal Al Ghaf has witnessed steady price appreciation since its launch in 2019. Initial townhouses that sold for around AED 1.2 million have now doubled or tripled in value, while luxury villas that were priced at AED 4–6 million now command prices upwards of AED 10–15 million.</p>
        <p>Several factors drive this growth:</p>
        <ul style="margin-left: 20px; margin-bottom: 15px;">
          <li>Limited supply of lagoon-facing and standalone villas</li>
          <li>Strong demand from both end-users and foreign investors</li>
          <li>Majid Al Futtaim’s phased development strategy, which enhances exclusivity</li>
          <li>Infrastructure maturity, with each new handover boosting overall community value</li>
        </ul>
        <p>This consistent upward trajectory makes Tilal Al Ghaf one of the best-performing off-plan communities in Dubai’s west corridor.</p>
      </div>
      
      <div style="margin-bottom: 25px;">
        <h4 style="color: #333; margin-bottom: 15px; font-size: 1.2rem;">Rental Demand and Yield Potential</h4>
        <p>From an investor’s standpoint, rental yield is a vital indicator of performance. Currently, Tilal Al Ghaf’s townhouses and villas offer rental yields between 5% and 7%, depending on unit size, location, and furnishing.</p>
        <p>Factors that contribute to rental demand include:</p>
        <ul style="margin-left: 20px; margin-bottom: 15px;">
          <li>Proximity to key employment zones like Dubai Internet City, Media City, and Al Barsha South</li>
          <li>Family-friendly environment with the prestigious Royal Grammar School Guildford Dubai inside the community</li>
          <li>Premium amenities such as Crystal Lagoon beaches, fitness centers, and retail promenades</li>
        </ul>
        <p>Given these factors, Tilal Al Ghaf appeals strongly to professionals, families, and expatriates looking for long-term leases ensuring steady income for investors.</p>
      </div>
      
      <div style="margin-bottom: 25px;">
        <h4 style="color: #333; margin-bottom: 15px; font-size: 1.2rem;">Lifestyle and Community Appeal</h4>
        <p>Tilal Al Ghaf’s design philosophy revolves around “harmony with nature”, creating an immersive lifestyle experience that elevates property value beyond square footage. The Crystal Lagoon, with its white sandy beaches, water sports, and boardwalk cafés, forms the centerpiece of this vision.</p>
        <p>The community also features:</p>
        <ul style="margin-left: 20px; margin-bottom: 15px;">
          <li>Beach clubs and wellness retreats</li>
          <li>Parks, cycling trails, and jogging tracks</li>
          <li>Retail outlets and dining destinations</li>
          <li>Community centers and event spaces</li>
        </ul>
        <p>Such lifestyle offerings not only attract end-users but also elevate Tilal Al Ghaf’s brand value as a world-class residential address, further strengthening its position in the investment in Dubai landscape.</p>
      </div>
      
      <div style="margin-bottom: 25px;">
        <h4 style="color: #333; margin-bottom: 15px; font-size: 1.2rem;">Expert Verdict: Is Tilal Al Ghaf a Good Investment?</h4>
        <p>Considering all the factors developer reputation, location, property quality, appreciation trends, and lifestyle offerings, Tilal Al Ghaf stands out as one of the best-performing master communities for mid- to long-term investment in Dubai.</p>
        <p>It offers:</p>
        <ul style="margin-left: 20px; margin-bottom: 15px;">
          <li>Strong capital appreciation history</li>
          <li>Sustainable design appeal for modern buyers</li>
          <li>High-quality construction and luxury amenities</li>
          <li>Balanced mix of off-plan and ready units for all budgets</li>
        </ul>
        <p>For investors seeking a stable, high-value asset that combines lifestyle and profitability, Tilal Al Ghaf represents a strategic and future-proof investment opportunity in Dubai’s dynamic real estate market.</p>
      </div>
    `,
    
    defaultModalContent: "敬请期待更多关于此精彩开发项目的最新消息和详细信息。我们的房地产专家团队随时为您提供个性化咨询，解答您关于当前市场趋势和投资机会的任何问题。",
    
    serviceChargesModalContent: `
      <div style="margin-bottom: 25px;">
        <h4 style="color: #333; margin-bottom: 15px; font-size: 1.2rem;">Service Charges Before Handover: A Must-Read for Dubai Property Owners</h4>
        <p style="color: #666; font-size: 0.9rem; margin-bottom: 20px;"><i class="far fa-calendar-alt"></i> 15 October, 2025 | 5 minutes read</p>
        <p>Dubai’s real estate market is celebrated globally for its innovation, transparency, and investor-friendly regulations. As the city matures into one of the most robust property markets in the world, recent legal updates are redefining financial obligations between developers and buyers. One of the most significant developments involves Dubai property service charges, particularly concerning payment responsibilities before property handover.</p>
        <p>A landmark ruling by Dubai’s Rental Disputes Centre (RDC) has clarified that Dubai property service charges are payable from the date a project is completed, regardless of whether the unit has been handed over to the owner. This decision resolves a long-standing area of confusion and provides critical clarity for both property owners and developers.</p>
      </div>
      
      <div style="margin-bottom: 25px;">
        <h4 style="color: #333; margin-bottom: 15px; font-size: 1.2rem;">Understanding the RDC Ruling</h4>
        <p>The RDC ruling addresses a frequently debated question: when should property owners start paying Dubai property service charges? Many buyers previously assumed that payments would only begin after physical handover. The RDC has now established that the trigger is the official project completion date.</p>
        <p>In practice, this means that once a building or community is certified complete, service charges for maintenance and operations begin to accrue. Developers are entitled to collect these fees because shared facilities and essential services start functioning immediately, regardless of handover.</p>
      </div>
      
      <div style="margin-bottom: 25px;">
        <h4 style="color: #333; margin-bottom: 15px; font-size: 1.2rem;">What Are Dubai Property Service Charges?</h4>
        <p>Dubai property service charges are recurring fees paid by property owners to cover the maintenance and management of common areas within their building or community. These charges typically include:</p>
        <ul style="margin-left: 20px; margin-bottom: 15px;">
          <li>Cleaning and maintenance of common areas</li>
          <li>Security and concierge services</li>
          <li>Landscaping, swimming pools, gyms, and recreational facilities</li>
          <li>Pest control, lighting, and fire safety</li>
          <li>Building insurance and administrative costs</li>
        </ul>
        <p>The amount of Dubai property service charges is calculated on a per-square-foot basis and must be approved by the Real Estate Regulatory Agency (RERA) before collection. This ensures transparency and prevents overcharging.</p>
      </div>
      
      <div style="margin-bottom: 25px;">
        <h4 style="color: #333; margin-bottom: 15px; font-size: 1.2rem;">Why This Ruling Is Important</h4>
        <p>Disputes over Dubai property service charges have often arisen when developers issued invoices before owners took possession. Many buyers viewed this as unfair, arguing that they should only pay once they could physically access their unit. The RDC ruling eliminates this ambiguity and establishes a fair, legally supported framework.</p>
        <p>From a developer’s perspective, timely payment of Dubai property service charges ensures the smooth operation of buildings and communities. Without proper funding, essential services may be delayed, impacting property quality and resident satisfaction. For owners, paying these charges from the date of completion ensures that the property is well-maintained, protecting both short-term living conditions and long-term investment value.</p>
      </div>
      
      <div style="margin-bottom: 25px;">
        <h4 style="color: #333; margin-bottom: 15px; font-size: 1.2rem;">Guidance for Property Owners</h4>
        <p>Property owners now have a clear responsibility to pay Dubai property service charges from the completion date, even before handover. To manage this effectively, owners should:</p>
        <ul style="margin-left: 20px; margin-bottom: 15px;">
          <li>Review Sale and Purchase Agreements (SPA) – Check clauses related to service charges and payment obligations.</li>
          <li>Confirm Project Completion Dates – This determines when Dubai property service charges start accruing.</li>
          <li>Request RERA-Approved Budgets – Ensure invoices correspond to approved budgets.</li>
          <li>Understand the Breakdown of Charges – Know how fees are distributed among maintenance, administration, and facilities.</li>
          <li>Use Approved Payment Channels – Always pay via authorized accounts to ensure compliance and safeguard rights.</li>
        </ul>
        <p>These steps protect owners’ interests while ensuring that communities remain properly maintained and operational.</p>
      </div>
      
      <div style="margin-bottom: 25px;">
        <h4 style="color: #333; margin-bottom: 15px; font-size: 1.2rem;">Effect on the Off-Plan Market</h4>
        <p>Off-plan investors will need to consider Dubai property service charges more carefully when evaluating potential projects. Understanding when charges begin and how they are calculated is essential for budgeting and assessing long-term returns.</p>
        <p>Developers, in turn, may increase transparency in project communications, detailing estimated service charges, completion dates, and community management plans. For buyers, this creates a more informed and secure investment environment.</p>
      </div>
      
      <div style="margin-bottom: 25px;">
        <h4 style="color: #333; margin-bottom: 15px; font-size: 1.2rem;">Long-Term Market Benefits</h4>
        <p>Overall, the RDC’s clarification of Dubai property service charges supports market stability, investor confidence, and community wellbeing. By ensuring timely payments, the ruling guarantees well-maintained properties, consistent services, and preserved property values.</p>
        <p>For developers, it provides financial continuity; for owners, it ensures transparency and accountability. For investors and residents alike, this is a major step toward creating sustainable, high-quality living environments across Dubai.</p>
      </div>
    `,
    
    rakHydrogenModalContent: `
      <div style="margin-bottom: 25px;">
        <h4 style="color: #333; margin-bottom: 15px; font-size: 1.2rem;">How RAK Green Hydrogen Investment is Driving an Economic and Real Estate Boom</h4>
        <p style="color: #666; font-size: 0.9rem; margin-bottom: 20px;"><i class="far fa-calendar-alt"></i> 29 September, 2025 | 5 minutes read</p>
        <p>The global energy landscape is undergoing a seismic shift. With climate change concerns escalating and the world moving away from fossil fuels, renewable energy sources are attracting unprecedented attention. Among these, green hydrogen produced using renewable energy to split water into hydrogen and oxygen is gaining traction as a clean, efficient, and versatile energy source. In this context, Ras Al Khaimah (RAK) is emerging as a pioneering hub for green hydrogen production, distribution, and export. Investors are increasingly eyeing RAK green hydrogen investment as a gateway to substantial economic growth and lucrative real estate opportunities.</p>
        <p>RAK’s commitment to green hydrogen is not just a policy initiative; it is a comprehensive economic strategy. The emirate has announced ambitious projects in collaboration with global energy leaders, aiming to position itself as a leading green hydrogen exporter in the Middle East and beyond. Government-backed incentives, free zone regulations, and targeted infrastructure projects all contribute to a favorable environment for RAK green hydrogen investment. For investors, understanding the dynamics of these developments is key to identifying high-potential sectors in both commercial and residential real estate.</p>
      </div>
      
      <div style="margin-bottom: 25px;">
        <h4 style="color: #333; margin-bottom: 15px; font-size: 1.2rem;">The Economic Potential of RAK Green Hydrogen Investment</h4>
        <p>The impact of RAK green hydrogen investment extends far beyond the energy sector. At the core, green hydrogen projects create high-value jobs across technical, operational, and research roles. Engineers, energy specialists, logistics coordinators, and environmental consultants are in high demand, driving a surge in the need for residential housing for professionals relocating to Ras Al Khaimah. This has immediate implications for the real estate market, where quality apartments, villas, and serviced residences near industrial and logistical hubs are poised for increased demand.</p>
        <p>Furthermore, the supporting industries surrounding green hydrogen production manufacturing, transport, industrial services, and logistics are expanding rapidly. Each of these sectors contributes to the broader economic ecosystem, creating secondary demand for commercial properties, offices, warehouses, and retail spaces. For investors, RAK green hydrogen investment is not merely about energy production; it represents a holistic opportunity to participate in a growing economy driven by sustainable initiatives.</p>
      </div>
      
      <div style="margin-bottom: 25px;">
        <h4 style="color: #333; margin-bottom: 15px; font-size: 1.2rem;">Residential Real Estate Opportunities</h4>
        <p>Residential real estate is one of the most tangible areas where RAK green hydrogen investment is making an impact. With an influx of professionals, managers, and technical staff, demand for quality housing is rising. Apartments, particularly 1–2 bedroom units in branded or quality developments near industrial hubs, free zones, and ports, are expected to deliver the strongest rental returns. These units appeal to both long-term residents and temporary staff involved in ongoing hydrogen projects.</p>
        <p>Investors considering RAK green hydrogen investment should also look at off-plan developments. Early entry into these projects often comes at lower costs, with the potential for significant capital appreciation once projects are completed and the hydrogen industry scales. Branded or serviced residences can enhance rental yields by catering to transient workers, international consultants, and visiting executives, who prefer fully furnished and managed accommodations.</p>
      </div>
      
      <div style="margin-bottom: 25px;">
        <h4 style="color: #333; margin-bottom: 15px; font-size: 1.2rem;">Commercial and Industrial Real Estate Prospects</h4>
        <p>RAK green hydrogen investment also drives demand for commercial and industrial real estate. Logistics companies, suppliers, and service providers require warehouses, storage facilities, and office spaces close to production sites and ports. Free zones designed to attract international businesses are seeing increased interest as green hydrogen projects bring global companies into the region. Investors who strategically acquire commercial or industrial properties in proximity to these hubs can benefit from long-term leases and stable income streams.</p>
        <p>Plots designated for industrial, energy, or logistics use also present high-return opportunities for investors with a longer-term horizon. While riskier due to potential policy changes and infrastructure timelines, these plots can deliver substantial capital appreciation as the hydrogen economy matures. For RAK green hydrogen investment, a diversified portfolio approach that combines apartments for immediate rental income with selective plots for long-term growth is advisable.</p>
      </div>
      
      <div style="margin-bottom: 25px;">
        <h4 style="color: #333; margin-bottom: 15px; font-size: 1.2rem;">Strategic Investment Tips</h4>
        <ul style="margin-left: 20px; margin-bottom: 15px;">
          <li>Focus on Proximity to Key Hydrogen Hubs: Properties near ports, free zones, and industrial areas linked to green hydrogen projects tend to appreciate faster and generate higher rental demand.</li>
          <li>Diversify Asset Types: Combining apartments for rental income with selective plots for long-term growth mitigates risk and enhances portfolio performance.</li>
          <li>Consider Off-Plan Opportunities: Early-stage off-plan projects provide lower entry costs and the potential for substantial capital appreciation as hydrogen projects scale.</li>
          <li>Cater to Transient Professionals: Serviced and branded residences are attractive to temporary staff and international consultants, ensuring steady occupancy rates.</li>
          <li>Monitor Infrastructure Developments: Keep track of upcoming port expansions, free zone regulations, and logistics hubs, as proximity significantly influences property value.</li>
          <li>Adopt a Medium- to Long-Term Horizon: RAK green hydrogen investment is best suited for investors with a 5–7 year outlook to maximize returns and capitalize on the emirate’s growing role in the global energy market.</li>
        </ul>
      </div>
    `,
    
    dubaiPopulationModalContent: `
      <div style="margin-bottom: 25px;">
        <h4 style="color: #333; margin-bottom: 15px; font-size: 1.2rem;">Dubai's Population Surpasses 4 Million as Emirate Targets 5 Million by 2030</h4>
        <p style="color: #666; font-size: 0.9rem; margin-bottom: 20px;"><i class="far fa-calendar-alt"></i> 29 August, 2025 | 2 minutes read</p>
        <p>Dubai has officially surpassed the 4 million population milestone, highlighting a significant achievement in its rapid urban expansion. According to a recent market update from DXBinteract, the emirate's population has grown by over 223,000 residents in just one year, reflecting a 5.92% annual increase.</p>
      </div>
      
      <div style="margin-bottom: 25px;">
        <p>This surge has been fueled by Dubai's appeal as a global hub for business, tourism, and investment. Investor-friendly policies, such as tax-free income, full foreign ownership in free zones, and attractive visa options, continue to attract professionals, entrepreneurs, and expatriates from around the world.</p>
      </div>
      
      <div style="margin-bottom: 25px;">
        <p>Looking ahead, Dubai aims to reach a population of 5 million by 2030. This ambitious target is expected to drive demand for approximately 350,000 new homes, which will significantly stimulate the real estate sector. Developers are ramping up projects across both off-plan and ready-to-move-in properties, catering to a range of residential preferences from luxury apartments in Downtown Dubai and Palm Jumeirah to family-friendly villas in Dubai Hills Estate and MBR City.</p>
      </div>
      
      <div style="margin-bottom: 25px;">
        <p>The population growth directly impacts property demand, leading to increased rental yields, higher occupancy rates, and steady capital appreciation. For investors, this growth signals a robust market with long-term potential, particularly in communities aligned with Dubai’s expansion and lifestyle developments.</p>
      </div>
      
      <div style="margin-bottom: 25px;">
        <p>As Dubai continues to attract a younger, professional, and increasingly affluent demographic, the real estate sector is expected to evolve with more mixed-use developments, sustainable projects, and smart city innovations. This will not only address the growing housing needs but also enhance lifestyle amenities, making communities more integrated, convenient, and appealing to both residents and investors.</p>
      </div>
      
      <div style="margin-bottom: 25px;">
        <p>Dubai’s rapid growth underscores its transformation into a dynamic metropolis, offering a high quality of life, robust infrastructure, and a diverse, multicultural environment. As the city continues to expand, its real estate sector remains a cornerstone of economic development, reflecting both domestic demand and global investor confidence.</p>
      </div>
    `
};


// 获取当前语言（全局变量）
// 注意：currentLang已经在第9行声明为全局变量

// 语言切换功能已移除，不再暴露全局翻译相关方法和变量

// 更新房产价格标签的函数
// 根据用户要求，现在此函数为空，不再显示价格标签
function updatePropertyPriceLabels() {
  // 查找并移除所有现有的价格标签
  const priceLabels = document.querySelectorAll('.price-label');
  priceLabels.forEach(label => {
    label.remove();
  });
}

// 更新翻译元素的函数
function updateTranslatedElements() {
  // 确保currentLang是最新的
  currentLang = localStorage.getItem('preferredLanguage') || currentLang || 'en';
  
  // 使用已定义的translations对象，简化处理
  const t = {};
  
  console.log(`Updating translated elements for language: ${currentLang}`);
  
  // 更新所有带有data-translate属性的元素
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    if (t[key]) {
      element.textContent = t[key];
    }
  });
  
  // 更新所有带有data-translate-placeholder属性的元素的占位符文本
  document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
    const key = element.getAttribute('data-translate-placeholder');
    if (t[key]) {
      element.placeholder = t[key];
    }
  });
  
  // 导航栏文本现在通过data-translate属性自动更新，不再需要手动设置
  
  // Hero区域文本现在通过data-translate属性自动更新，不再需要手动设置
  
  // 按钮文本现在通过data-translate属性自动更新，不再需要手动设置
  
  // 特别处理房产价格标签
  updatePropertyPriceLabels();
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
  // 首先从localStorage读取最新的语言设置并更新全局变量
  currentLang = localStorage.getItem('preferredLanguage') || 'en';
  
  // 检测是否为独立页面（如featured-properties.html, communities.html等）
  const isStandalonePage = window.location.pathname.includes('featured-properties.html') || 
                          window.location.pathname.includes('about.html') || 
                          window.location.pathname.includes('all-news.html') ||
                          window.location.pathname.includes('communities.html') ||
                          window.location.pathname.includes('services.html') ||
                          window.location.pathname.includes('property-detail.html');

  
  // 对于独立页面，只执行必要的功能（如弹窗）
  if (isStandalonePage) {
    // 不再支持多语言切换功能，页面将保持默认语言（英语）
    
    // 只初始化弹窗功能，不执行需要主页DOM结构的代码
    // 弹窗功能的代码将在后续执行
  } else {
    // 对于主页，先应用保存的语言设置
    updateTranslatedElements();
    
    // 如果存在window.updateMainJsLanguage函数，也调用它确保语言设置同步
    if (window.updateMainJsLanguage) {
      window.updateMainJsLanguage(currentLang);
    }
  }
  
  // 如果存在window.updateMainJsLanguage函数，也调用它确保语言设置同步
  if (window.updateMainJsLanguage) {
    window.updateMainJsLanguage(currentLang);
  }
  
  // 继续原有逻辑
  const app = document.querySelector('#app');
  console.log('App element found:', app);
  
  // 添加全局错误处理
  window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
    console.error('Error source:', e.filename, 'Line:', e.lineno, 'Column:', e.colno);
  });
  
  console.log('Starting page rendering...');
  
  // 确保app元素存在
  if (!app) {
    console.error('App element not found!');
    // 继续执行，不return，以便弹窗功能仍然可以工作
  }
  
  // 添加页面样式增强质感
  const style = document.createElement('style');
  style.textContent = `
    /* 全局样式 */
    html, body {
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
      min-width: 100% !important;
      max-width: 100% !important;
      box-sizing: border-box !important;
      overflow-x: hidden !important;
    }
    
    body {
      background: #f5f7fa; /* 简化背景，移除渐变 */
      min-height: 100vh;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #333;
      line-height: 1.6;
      will-change: scroll-position; /* 优化滚动性能 */
    }
    
    * {
      box-sizing: inherit;
      margin: 0;
      padding: 0;
    }
    
    /* 增强导航栏质感 - 性能优化版 */
    .navbar {
      width: 100% !important;
      min-width: 100% !important;
      max-width: 100% !important;
      margin: 0 !important;
      padding: 1.5rem 2rem !important;
      box-sizing: border-box !important;
      display: flex !important;
      justify-content: space-between !important;
      align-items: center !important;
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
      background-color: rgba(255, 255, 255, 0.98);
      /* 移除backdrop-filter以提升性能 */
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      transition: box-shadow 0.3s ease; /* 仅过渡阴影，而非全部属性 */
      z-index: 1000 !important;
      will-change: transform, box-shadow; /* 硬件加速 */
      overflow: hidden !important;
    }
    
    .navbar:hover {
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    }
    
    /* 增强按钮质感 - 性能优化版 */
    button {
      transition: transform 0.2s ease, background-color 0.2s ease; /* 仅过渡关键属性 */
      border-radius: 8px;
      transform: translateY(0);
      will-change: transform; /* 硬件加速 */
    }
    
    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
    }
    
    button:active {
      transform: translateY(0);
    }
    
    /* View All Properties 按钮样式 */
    .view-all-btn {
      background-color: #0C1559; /* 深紫色背景 */
      color: white;
      transition: all 0.3s ease;
      border-radius: 50px; /* 胶囊形状 */
      transform: translateY(0);
    }
    
    .view-all-btn:hover {
      background-color: #1d4ed8;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(37, 99, 235, 0.3);
    }
    
    .view-all-btn:active {
      transform: translateY(0);
    }
    
    /* 增强卡片质感 */
    .property-card {
      transition: all 0.4s ease;
      border-radius: 12px;
      overflow: hidden;
      background-color: white;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
    }
    
    .property-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
    }
    
    /* 增强表单元素 */
    input, textarea {
      background-color: white;
      border: 1px solid #e1e5e9;
      border-radius: 8px;
      padding: 12px 16px;
      font-size: 16px;
      transition: all 0.3s ease;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
    }
    
    input:focus, textarea:focus {
      outline: none;
      border-color: #6c757d;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1), 0 0 0 3px rgba(108, 117, 125, 0.1);
    }
    
    /* 增强标题和文本 */
    h1, h2, h3, h4, h5, h6 {
      font-weight: 600;
      letter-spacing: -0.025em;
    }
    
    /* 公司统计数字样式 */
    .stat-number {
      color: #2563eb; /* 使用蓝色作为统计数字颜色，与按钮颜色区分 */
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }
    
    /* 公司统计卡片布局 */
    .company-stats {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
    }
    
    .company-stat {
      flex: 1;
      background-color: white;
      border: none;
      border-radius: 8px;
      padding: 1.5rem;
      text-align: center;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    
    /* 确保文本正常显示 */
    .company-stat .stat-number,
    .company-stat .stat-label {
      position: relative;
    }
    
    /* 响应式调整 */
    @media (max-width: 768px) {
      .company-stats {
        flex-direction: column;
      }
    }
    
    /* 增强页脚 */
    .footer {
      background-color: #ffffff;
      color: #000000;
      padding: 2rem 0;
    }
    
    .footer a {
      color: rgba(0, 0, 0, 0.8);
      transition: color 0.3s ease;
    }
    
    .footer a:hover {
      color: #000000;
    }
    
    /* 增强统计卡片 - 性能优化版 */
    .stat-card {
      transition: transform 0.2s ease, box-shadow 0.2s ease; /* 仅过渡关键属性 */
      background-color: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
      border: 1px solid rgba(0, 0, 0, 0.05);
      will-change: transform; /* 硬件加速 */
    }
    
    /* 修改统计卡片中图标颜色 */
    .stat-icon img {
      /* 移除复杂的filter，使用CSS变量或直接颜色 */
      color: #2563eb;
    }
    
    /* 修改统计卡片中标题文本颜色 */
    .stat-title {
      color: #2563eb;
    }
    
    .stat-card:hover {
      transform: translateY(-2px); /* 减小变换距离 */
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
    }
    
    /* 移除全局动画以提升性能 */
    /* 注意：移除了应用于.property-card, .stat-card, h2, p的全局动画 */
    
    /* 增强英雄区域 */
      .hero-content {
        text-shadow: 0 3px 20px rgba(0, 0, 0, 0.8); /* 增强阴影效果 */
        background-color: rgba(0, 0, 0, 0.4); /* 半透明黑色背景遮罩 */
        border-radius: 12px; /* 添加圆角，增强视觉效果 */
        padding: 2rem; /* 确保有足够的内边距 */
        max-width: 800px; /* 限制最大宽度 */
        margin: 0 auto; /* 居中显示 */
      }
      
      /* 简化网页底部效果以提升性能 */
      .neon-footer {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 40px;
        background: rgba(100, 149, 237, 0.05); /* 简化为单一颜色 */
        z-index: -1;
        /* 移除动画和模糊效果 */
      }
    

    `;
  document.head.appendChild(style);
  
  // 添加霓虹效果元素
  const neonFooter = document.createElement('div');
  neonFooter.className = 'neon-footer';
  document.body.appendChild(neonFooter);

  // 页面过渡动画效果
  // 为body添加默认过渡类
  document.body.classList.add('fade-transition');

  // 处理页面跳转的平滑过渡
  function initSmoothPageTransition() {
    // 统一处理页面跳转的函数
    function handlePageTransition(redirectUrl) {
      // 添加过渡类
      document.body.classList.add('page-transitioning');
      
      // 延迟跳转，等待过渡动画完成
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 500); // 与CSS过渡时间匹配
    }
    
    // 为所有a标签添加点击事件监听器
    const allLinks = document.querySelectorAll('a');
    
    allLinks.forEach(link => {
      // 跳过外部链接
      if (link.hostname !== window.location.hostname) return;
      
      // 跳过空链接和锚点链接
      if (link.href === '#' || link.href === window.location.href) return;
      
      link.addEventListener('click', (e) => {
        e.preventDefault();
        handlePageTransition(link.href);
      });
    });
    
    // 为所有按钮添加点击事件监听器，处理页面跳转
    const allButtons = document.querySelectorAll('button');
    
    allButtons.forEach(button => {
      // 检查按钮是否有数据属性指示跳转链接
      const redirectLink = button.dataset.redirect || button.getAttribute('data-href');
      
      // 检查按钮文本内容，判断是否是跳转按钮
      const buttonText = button.textContent.toLowerCase();
      const isRedirectButton = buttonText.includes('view details') || 
                              buttonText.includes('call us') ||
                              buttonText.includes('explore') ||
                              buttonText.includes('buy now') ||
                              buttonText.includes('learn more');
      
      // 处理有明确跳转链接的按钮
      if (redirectLink) {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          handlePageTransition(redirectLink);
        });
      }
      // 处理文本内容表明是跳转按钮的情况
      else if (isRedirectButton) {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          
          // 默认跳转到featured-properties.html，实际应用中应该根据按钮类型和上下文跳转到对应的页面
          let targetUrl = '/featured-properties.html';
          
          // 根据按钮文本确定目标页面
          if (buttonText.includes('call us')) {
            // 对于Call Us按钮，不需要页面跳转，只需要显示联系信息弹窗
            return;
          }
          
          handlePageTransition(targetUrl);
        });
      }
    });
    
    // 为所有包含data-url或data-link属性的元素添加点击事件监听器
    const allDataLinkElements = document.querySelectorAll('[data-url], [data-link]');
    
    allDataLinkElements.forEach(element => {
      const redirectUrl = element.dataset.url || element.dataset.link;
      
      if (redirectUrl) {
        element.addEventListener('click', (e) => {
          e.preventDefault();
          handlePageTransition(redirectUrl);
        });
      }
    });
  }

  // 页面加载完成后初始化平滑过渡
  window.addEventListener('load', () => {
    initSmoothPageTransition();
    
    // 确保页面完全加载后移除任何可能的过渡类
    document.body.classList.remove('page-transitioning');
  });

  // 确保在DOM加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSmoothPageTransition);
  } else {
    initSmoothPageTransition();
  }
  

  

    

  

  
  // 创建并初始化phone-modal弹窗
  function createPhoneModal() {
    // 检查页面中是否已经存在phone-modal元素
    if (document.getElementById('phone-modal')) {
      return; // 如果已存在，直接返回
    }
    
    // 创建弹窗元素
    const phoneModal = document.createElement('div');
    phoneModal.id = 'phone-modal';
    phoneModal.className = 'phone-modal';
    phoneModal.style.cssText = `
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(108, 99, 255, 0.15);
      backdrop-filter: blur(15px);
      z-index: 9999;
      display: flex;
      justify-content: center;
      align-items: center;
    `;
    
    // 创建弹窗内容
    phoneModal.innerHTML = `
      <div class="phone-modal-content">
        <!-- 装饰元素 -->
        <div style="position: absolute; top: -50px; right: -50px; width: 150px; height: 150px; background: linear-gradient(135deg, rgba(108, 99, 255, 0.1), rgba(108, 99, 255, 0.05)); border-radius: 50%; z-index: 0;"></div>
        <div style="position: absolute; bottom: -80px; left: -80px; width: 200px; height: 200px; background: linear-gradient(135deg, rgba(108, 99, 255, 0.15), rgba(108, 99, 255, 0.08)); border-radius: 50%; z-index: 0;"></div>
        
        <div style="margin-bottom: 2rem; position: relative; z-index: 1;">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 80px; height: 80px; background: linear-gradient(135deg, #6c63ff, #5a52e6); border-radius: 50%; box-shadow: 0 8px 25px rgba(108, 99, 255, 0.3); margin: 0 auto 1.5rem;">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </div>
          <h3 style="font-size: 2rem; font-weight: 800; color: #1a1a2e; margin: 0 0 0.75rem 0; letter-spacing: -0.02em; font-family: 'Segoe UI', system-ui, sans-serif; line-height: 1.2;">Contact Us</h3>
          <p style="font-size: 1rem; color: #666; margin: 0; line-height: 1.6; max-width: 300px; margin: 0 auto;">For inquiries, please call our dedicated team</p>
        </div>
        <div style="position: relative; z-index: 1; margin-bottom: 2.5rem;">
          <p id="phone-number" class="animated-phone" style="font-size: 2.5rem; font-weight: 900; color: #6c63ff; margin: 0; letter-spacing: 0.05em; font-family: 'Segoe UI', system-ui, sans-serif; line-height: 1.2; text-shadow: 0 4px 8px rgba(108, 99, 255, 0.2); background: linear-gradient(135deg, #6c63ff, #5a52e6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">+971 52 145 0498</p>
        </div>
        <div style="display: flex; gap: 1.25rem; justify-content: center; margin-bottom: 0.5rem; flex-wrap: wrap; position: relative; z-index: 1;">
          <button id="copy-phone" class="copy-phone-btn" style="padding: 1rem 2.25rem; background: linear-gradient(135deg, #6c63ff, #5a52e6); color: white; border: none; border-radius: 16px; cursor: pointer; font-size: 1.05rem; font-weight: 700; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 6px 20px rgba(108, 99, 255, 0.35); text-transform: uppercase; letter-spacing: 0.05em; position: relative; overflow: hidden;">
            <span style="position: relative; z-index: 1;">Copy</span>
            <span style="position: absolute; top: 50%; left: 50%; width: 0; height: 0; border-radius: 50%; background: rgba(255, 255, 255, 0.2); transform: translate(-50%, -50%); transition: width 0.6s, height 0.6s;"></span>
          </button>
          <button id="close-modal" class="close-modal" style="padding: 1rem 2.25rem; background: white; color: #333; border: 2px solid #e0e0e0; border-radius: 16px; cursor: pointer; font-size: 1.05rem; font-weight: 700; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); text-transform: uppercase; letter-spacing: 0.05em; position: relative; overflow: hidden;">
            <span style="position: relative; z-index: 1;">Close</span>
            <span style="position: absolute; top: 50%; left: 50%; width: 0; height: 0; border-radius: 50%; background: rgba(0, 0, 0, 0.05); transform: translate(-50%, -50%); transition: width 0.6s, height 0.6s;"></span>
          </button>
        </div>
        <div style="position: relative; z-index: 1;">
          <div id="copy-feedback" class="copy-feedback" style="font-size: 1rem; color: #22c55e; margin: 0.75rem 0 0; opacity: 0; transform: translateY(10px); transition: all 0.4s ease; font-weight: 700; font-style: italic; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#22c55e" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 6L9 17l-5-5"></path>
            </svg>
            Copied to clipboard!
          </div>
        </div>
      </div>
    `;
    
    // 添加弹窗到页面
    document.body.appendChild(phoneModal);
    
    // 添加弹窗样式
    const phoneModalStyle = document.createElement('style');
    phoneModalStyle.textContent = `
      /* 电话号码弹窗样式 */
      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(40px) scale(0.9);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
      
      /* 数字滚动动画 */
      @keyframes numberSlide {
        from {
          transform: translateY(20px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
      
      .animated-phone {
        animation: numberSlide 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      }
      
      .phone-modal-content {
        background: white;
        padding: 2.5rem;
        border-radius: 30px;
        text-align: center;
        box-shadow: 0 25px 70px rgba(108, 99, 255, 0.25);
        border: none;
        min-width: 320px;
        max-width: 420px;
        animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        position: relative;
        overflow: hidden;
      }
      
      .copy-phone-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(108, 99, 255, 0.45);
      }
      
      .copy-phone-btn:active {
        transform: translateY(0);
      }
      
      .copy-phone-btn:hover span:last-child {
        width: 300px;
        height: 300px;
      }
      
      .close-modal:hover {
        border-color: #6c63ff;
        color: #6c63ff;
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(108, 99, 255, 0.2);
      }
      
      .close-modal:active {
        transform: translateY(0);
      }
      
      .close-modal:hover span:last-child {
        width: 300px;
        height: 300px;
      }
      
      /* 响应式设计 */
      @media (max-width: 480px) {
        .phone-modal-content {
          padding: 2rem 1.5rem;
          min-width: 280px;
          margin: 1rem;
        }
        
        #phone-number {
          font-size: 2rem;
        }
        
        .copy-phone-btn, .close-modal {
          padding: 0.875rem 1.75rem;
          font-size: 0.95rem;
        }
      }
    `;
    document.head.appendChild(phoneModalStyle);
    
    // 为复制按钮添加点击事件
    const copyPhoneBtn = document.getElementById('copy-phone');
    const phoneNumber = document.getElementById('phone-number');
    const copyFeedback = document.getElementById('copy-feedback');
    
    if (copyPhoneBtn && phoneNumber && copyFeedback) {
      copyPhoneBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(phoneNumber.textContent).then(() => {
          // 显示复制成功反馈
          copyFeedback.style.opacity = '1';
          copyFeedback.style.transform = 'translateY(0)';
          
          // 3秒后隐藏反馈
          setTimeout(() => {
            copyFeedback.style.opacity = '0';
            copyFeedback.style.transform = 'translateY(10px)';
          }, 3000);
        }).catch(err => {
          console.error('Failed to copy phone number:', err);
        });
      });
    }
    
    // 为关闭按钮添加点击事件
    const closeModalBtn = document.getElementById('close-modal');
    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', () => {
        phoneModal.style.display = 'none';
      });
    }
    
    // 点击弹窗外部关闭弹窗
    phoneModal.addEventListener('click', (e) => {
      if (e.target === phoneModal) {
        phoneModal.style.display = 'none';
      }
    });
  }
  
  // 为所有Call Us按钮添加点击事件
  function initCallUsButtons() {
    // 检查页面中是否已经存在phone-modal元素（来自featured-properties.html）
    const existingModal = document.getElementById('phone-modal');
    
    // 由于:contains选择器不是标准CSS，我们需要使用JavaScript过滤
    const allButtons = document.querySelectorAll('button');
    const filteredCallUsButtons = Array.from(allButtons).filter(button => {
      const text = button.textContent.toLowerCase();
      return text.includes('call us') || text.includes('致电我们') || text.includes('اتصل بنا');
    });
    
    // 为所有匹配的按钮添加点击事件
    filteredCallUsButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // 如果页面中已经存在phone-modal，触发它的显示
        if (existingModal) {
          existingModal.style.display = 'flex';
        } else {
          // 否则创建并显示新的弹窗
          createPhoneModal();
          document.getElementById('phone-modal').style.display = 'flex';
        }
      });
    });
    
    // 特别为房产卡片中的Call Us按钮添加事件
    const propertyCallUsButtons = document.querySelectorAll('.property-card button');
    propertyCallUsButtons.forEach(button => {
      if (button.textContent.includes('Call Us') || button.textContent.includes('致电我们') || button.textContent.includes('اتصل بنا')) {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          
          // 如果页面中已经存在phone-modal，触发它的显示
          if (existingModal) {
            existingModal.style.display = 'flex';
          } else {
            // 否则创建并显示新的弹窗
            createPhoneModal();
            document.getElementById('phone-modal').style.display = 'flex';
          }
        });
      }
    });
  }
  
  // 在页面加载完成后初始化Call Us按钮
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCallUsButtons);
  } else {
    initCallUsButtons();
  }
  
  // 添加AI聊天逻辑
   // 读取并解析房产项目数据
   const propertyData = [
     {
       id: 1,
       name: 'Montiva by Vida',
       type: 'Apartment',
       price: '1,910,000 AED',
       developer: 'Emaar',
       area: 'Dubai Creek Harbour, Dubai',
       handoverDate: '09-2029'
     },
     {
       id: 2,
       name: 'The Palace Villas Ostra',
       type: 'Villa',
       price: '13,130,000 AED',
       developer: 'Emaar',
       area: 'The Oasis by Emaar, Dubai',
       handoverDate: '09-2029'
     },
     {
       id: 3,
       name: 'Rosehill',
       type: 'Apartment',
       price: '1,600,000 AED',
       developer: 'Emaar',
       area: 'Dubai Hills Estate, Dubai',
       handoverDate: '06-2029'
     },
     {
       id: 4,
       name: 'Golf Hillside',
       type: 'Apartment',
       price: '2,730,000 AED',
       developer: 'Emaar',
       area: 'Dubai Hills Estate, Dubai',
       handoverDate: '12-2028'
     },
     {
       id: 5,
       name: 'Selvara',
       type: 'Villa',
       price: '6,200,000 AED',
       developer: 'Emaar',
       area: 'Grand Polo Club and Resort, Dubai',
       handoverDate: '04-2029'
     },
     {
       id: 6,
       name: 'Silva Dubai Creek Harbour',
       type: 'Apartment',
       price: '1,790,000 AED',
       developer: 'Emaar',
       area: 'Dubai Creek Harbour, Dubai',
       handoverDate: '09-2029'
     },
     {
       id: 7,
       name: 'Mamsha Palm',
       type: 'Apartment',
       price: '3,700,000 AED',
       developer: 'Aldar',
       area: 'Saadiyat Island, Abu Dhabi',
       handoverDate: '03-2028'
     },
     {
       id: 8,
       name: 'The Beach House Fahid',
       type: 'Apartment',
       price: '4,132,000 AED',
       developer: 'Aldar',
       area: 'Al Fahid, Abu Dhabi',
       handoverDate: '12-2029'
     },
     {
       id: 9,
       name: 'The Arthouse',
       type: 'Apartment | Villa',
       price: '3,300,000 AED',
       developer: 'Aldar',
       area: 'Saadiyat Island, Abu Dhabi',
       handoverDate: '06-2028'
     },
     {
       id: 10,
       name: 'Cavalli Couture',
       type: 'Apartment',
       price: '21,904,000 AED',
       developer: 'Damac',
       area: 'Al Safa, Dubai',
       handoverDate: '12-2025'
     },
     {
       id: 11,
       name: 'Damac Bay 2',
       type: 'Apartment | Duplex',
       price: '7,342,000 AED',
       developer: 'Damac',
       area: 'Dubai Harbour, Dubai',
       handoverDate: '12-2027'
     },
     {
       id: 12,
       name: 'Chelsea Residences',
       type: 'Apartment',
       price: '2,170,000 AED',
       developer: 'Damac',
       area: 'Dubai Maritime City, Dubai',
       handoverDate: '12-2029'
     },
     {
       id: 13,
       name: 'Falcon Island',
       type: 'Villa | Townhouse',
       price: '7,800,000 AED',
       developer: 'Al Hamra Real Estate',
       area: 'Al Hamra Village, Ras Al Khaimah',
       handoverDate: '01-2025'
     },
     {
       id: 14,
       name: 'Falcon Island',
       type: 'Villa | Townhouse',
       price: '1,190,000 AED',
       developer: 'Al Hamra Real Estate',
       area: 'Al Hamra Village, Ras Al Khaimah',
       handoverDate: '12-2024'
     },
     {
       id: 15,
       name: 'DWTN Residences',
       type: 'Apartment | Duplex',
       price: '1,860,000 AED',
       developer: 'Deyaar',
       area: 'Downtown Dubai, Dubai',
       handoverDate: '12-2029'
     },
     {
       id: 16,
       name: 'Ember Park Five by Deyaar',
       type: 'Apartment',
       price: '704,187 AED',
       developer: 'Deyaar',
       area: 'Dubai Production City (IMPZ), Dubai',
       handoverDate: '12-2027'
     }
   ];
   
   // 定义常见问题和多语言回答
  const faqResponses = {
    'en': {
      'hello': 'Hello! Welcome to Hawson House Properties. How can I assist you today?',
      'hi': 'Hi there! How can I help you with your real estate needs?',
      'properties': 'Browse and find your ideal property from our extensive portfolio of Dubai projects. Discover a wide range of residential and commercial properties across Dubai\'s most sought-after locations, with detailed information and specifications for each project.',
      'listings': `We have several premium property listings available:\n\n1. Montiva by Vida - Apartment - 1,910,000 AED\n2. The Palace Villas Ostra - Villa - 13,130,000 AED\n3. Rosehill - Apartment - 1,600,000 AED\n4. Golf Hillside - Apartment - 2,730,000 AED\n5. Selvara - Villa - 6,200,000 AED\n6. Silva Dubai Creek Harbour - Apartment - 1,790,000 AED\n7. Mamsha Palm - Apartment - 3,700,000 AED\n8. The Beach House Fahid - Apartment - 4,132,000 AED\n9. The Arthouse - Apartment | Villa - 3,300,000 AED\n10. Cavalli Couture - Apartment - 21,904,000 AED\n11. Damac Bay 2 - Apartment | Duplex - 7,342,000 AED\n12. Chelsea Residences - Apartment - 2,170,000 AED\n13. Falcon Island - Villa | Townhouse - 7,800,000 AED\n14. Falcon Island - Villa | Townhouse - 1,190,000 AED\n15. DWTN Residences - Apartment | Duplex - 1,860,000 AED\n16. Ember Park Five by Deyaar - Apartment - 704,187 AED`,
      'contact': 'You can contact us via phone at +971 506956105 or email at wzm2383983461@163.com. Our team is available to assist you.',
        'email': 'Our email address is wzm2383983461@163.com. Feel free to send us any inquiries or questions.',
      'phone': 'You can reach us by phone at +971 506956105 during our business hours.',
      'services': 'Expert Real Estate Assistance: Access our dedicated team of over 400+ expert agents ready to assist you. Professional Marketing Solutions: Achieve optimal value by listing your property with our expert marketing strategies. Market Insights for Informed Decisions: Download the latest Comprehensive Dubai Real Estate Market Report Q1 2025.',
      'buy property': 'We can help you find your perfect property. We have a wide range of residential and commercial properties across Dubai\'s most sought-after locations. Our team of expert agents is ready to assist you with personalized property solutions.',
      'sell property': 'If you\'re looking to sell your property, we can help maximize its value with our professional marketing strategies and extensive network. We offer comprehensive marketing approach, including professional photography, virtual tours, and targeted advertising campaigns.',
      'rent property': 'We have a variety of rental properties available. You can specify your requirements and budget for more tailored options.',
      'project': 'We have 16 exciting projects available across different locations in Dubai and UAE, including projects by Emaar, Aldar, Damac, Al Hamra Real Estate, and Deyaar. Would you like to know more about a specific project?',
      'location': 'Our properties are located in various prime locations including Dubai Creek Harbour, Dubai Hills Estate, Grand Polo Club and Resort, Saadiyat Island, Al Safa, Dubai Harbour, Dubai Maritime City, Al Hamra Village, Downtown Dubai, and Dubai Production City (IMPZ).',
      'price': 'Our property prices range from 704,187 AED for apartments to 21,904,000 AED for luxury properties. We have options to suit different budgets and requirements.',
      'falcon island': 'Falcon Island is a project in Al Hamra Village, Ras Al Khaimah offering Villas and Townhouses. Prices start from 1,190,000 AED with handover in December 2024, and there are also options starting from 7,800,000 AED with handover in January 2025.',
      'emaar': 'Emaar is one of the developers we work with. They have several projects in our portfolio including Montiva by Vida, The Palace Villas Ostra, Rosehill, Golf Hillside, Selvara, and Silva Dubai Creek Harbour.',
      'aldar': 'Aldar is another major developer we work with. Their projects include Mamsha Palm, The Beach House Fahid, and The Arthouse.',
      'damac': 'Damac has projects like Cavalli Couture, Damac Bay 2, and Chelsea Residences in our portfolio.',
      'deyaar': 'Deyaar has projects including DWTN Residences and Ember Park Five by Deyaar.',
      'handover date': 'Our projects have different handover dates ranging from December 2024 to December 2029. The earliest handover is Falcon Island (12-2024), and the latest is several projects with handover in 12-2029.',
      'dubai': 'We have a wide range of properties available in Dubai, including locations like Dubai Creek Harbour, Dubai Hills Estate, Dubai Harbour, Dubai Maritime City, Downtown Dubai, and Dubai Production City (IMPZ).',
      'assistant': 'I am an AI assistant here to help you with your real estate queries. I can provide information about our properties, services, and answer any questions you may have about the Dubai real estate market.',
      'general': [
        `I'm here to help with your real estate needs. Our company offers a wide range of properties across Dubai's most sought-after locations.`,
        `Thank you for your question. Please feel free to ask me about our properties, services, or any other real estate inquiries you may have.`,
        `Hawson House Properties provides comprehensive real estate solutions in Dubai and UAE. How can I assist you today?`,
        `Would you like to know more about our property listings or services? I'm here to help you find the information you need.`
      ]
    },
    'zh': {
      'hello': '您好！欢迎来到Hawson House Properties。今天我能为您提供什么帮助？',
      'hi': '您好！我能如何帮助您满足您的房地产需求？',
      'properties': '从我们丰富的迪拜项目组合中浏览并找到您理想的房产。在迪拜最受欢迎的地区发现各种住宅和商业房产，每个项目都有详细的信息和规格。',
      'listings': `我们有多个优质房产列表可供选择：\n\n1. Montiva by Vida - 公寓 - 1,910,000 迪拉姆\n2. The Palace Villas Ostra - 别墅 - 13,130,000 迪拉姆\n3. Rosehill - 公寓 - 1,600,000 迪拉姆\n4. Golf Hillside - 公寓 - 2,730,000 迪拉姆\n5. Selvara - 别墅 - 6,200,000 迪拉姆\n6. Silva Dubai Creek Harbour - 公寓 - 1,790,000 迪拉姆\n7. Mamsha Palm - 公寓 - 3,700,000 迪拉姆\n8. The Beach House Fahid - 公寓 - 4,132,000 迪拉姆\n9. The Arthouse - 公寓 | 别墅 - 3,300,000 迪拉姆\n10. Cavalli Couture - 公寓 - 21,904,000 迪拉姆\n11. Damac Bay 2 - 公寓 | 复式公寓 - 7,342,000 迪拉姆\n12. Chelsea Residences - 公寓 - 2,170,000 迪拉姆\n13. Falcon Island - 别墅 | 联排别墅 - 7,800,000 迪拉姆\n14. Falcon Island - 别墅 | 联排别墅 - 1,190,000 迪拉姆\n15. DWTN Residences - 公寓 | 复式公寓 - 1,860,000 迪拉姆\n16. Ember Park Five by Deyaar - 公寓 - 704,187 迪拉姆`,
      'contact': '您可以通过电话 +971 506956105 或电子邮件 wzm2383983461@163.com 联系我们。我们的团队随时为您提供帮助。',
        'email': '我们的电子邮箱是 wzm2383983461@163.com。请随时向我们发送任何咨询或问题。',
      'phone': '您可以在我们的工作时间内通过电话 +971 506956105 联系我们。',
      'services': '专家房地产协助：访问我们由400多名专家代理组成的团队，随时为您提供帮助。专业营销解决方案：通过我们的专业营销策略列出您的房产，实现最优价值。市场洞察助您明智决策：下载最新的2025年第一季度综合迪拜房地产市场报告。',
      'buy property': '我们可以帮助您找到完美的房产。我们在迪拜最受欢迎的地区拥有各种住宅和商业房产。我们的专家代理团队随时为您提供个性化的房产解决方案。',
      'sell property': '如果您想出售房产，我们可以通过专业的营销策略和广泛的网络帮助您最大化其价值。我们提供全面的营销方法，包括专业摄影、虚拟游览和有针对性的广告活动。',
      'rent property': '我们有各种租赁房产可供选择。您可以指定您的需求和预算，以获得更定制的选择。',
      'project': '我们在迪拜和阿联酋的不同地区提供16个令人兴奋的项目，包括Emaar、Aldar、Damac、Al Hamra Real Estate和Deyaar的项目。您想了解某个特定项目的更多信息吗？',
      'location': '我们的房产位于各种黄金地段，包括迪拜河港、迪拜山庄、大 polo俱乐部和度假村、萨迪亚特岛、阿尔萨法、迪拜港、迪拜海事城、阿尔哈姆拉村、迪拜市中心和迪拜生产城（IMPZ）。',
      'price': '我们的房产价格从公寓的704,187迪拉姆到豪华房产的21,904,000迪拉姆不等。我们有适合不同预算和需求的选择。',
      'falcon island': 'Falcon Island是位于拉斯海马阿尔哈姆拉村的一个项目，提供别墅和联排别墅。价格从1,190,000迪拉姆起，预计于2024年12月交付，也有从7,800,000迪拉姆起的选择，预计于2025年1月交付。',
      'emaar': 'Emaar是我们合作的开发商之一。他们在我们的投资组合中有多个项目，包括Montiva by Vida、The Palace Villas Ostra、Rosehill、Golf Hillside、Selvara和Silva Dubai Creek Harbour。',
      'aldar': 'Aldar是我们合作的另一家主要开发商。他们的项目包括Mamsha Palm、The Beach House Fahid和The Arthouse。',
      'damac': 'Damac在我们的投资组合中有Cavalli Couture、Damac Bay 2和Chelsea Residences等项目。',
      'deyaar': 'Deyaar的项目包括DWTN Residences和Ember Park Five by Deyaar。',
      'handover date': '我们的项目有不同的交付日期，从2024年12月到2029年12月不等。最早交付的是Falcon Island（12-2024），最晚的是多个项目，交付时间为12-2029。',
      'dubai': '我们在迪拜提供各种房产，包括迪拜河港、迪拜山庄、迪拜港、迪拜海事城、迪拜市中心和迪拜生产城（IMPZ）等地区。',
      'assistant': '我是一名AI助手，随时为您提供房地产咨询帮助。我可以提供关于我们房产、服务的信息，并回答您关于迪拜房地产市场的任何问题。',
      'general': [
        `我随时为您的房地产需求提供帮助。我们公司在迪拜最受欢迎的地区提供各种房产。`,
        `感谢您的提问。请随时向我咨询我们的房产、服务或任何其他房地产相关问题。`,
        `Hawson House Properties在迪拜和阿联酋提供全面的房地产解决方案。今天我能为您提供什么帮助？`,
        `您想了解我们的房产列表或服务吗？我随时为您提供您需要的信息。`
      ]
    },
    'ar': {
      'hello': 'مرحباً! مرحباً بك في Hawson House Properties. كيف يمكنني مساعدتك اليوم؟',
      'hi': 'مرحباً! كيف يمكنني مساعدتك باحتياجاتك العقارية؟',
      'properties': 'تصفح وابحث عن عقارك المثالي من مجموعة واسعة من مشاريع دبي. اكتشف مجموعة واسعة من العقارات السكنية والتجارية عبر أهم المواقع المرجوة في دبي، مع معلومات تفصيلية ومواصفات لكل مشروع.',
      'listings': `لدينا العديد من قوائم العقارات المميزة المتوفرة:\n\n1. Montiva by Vida - شقة - 1,910,000 درهم\n2. The Palace Villas Ostra - فيلا - 13,130,000 درهم\n3. Rosehill - شقة - 1,600,000 درهم\n4. Golf Hillside - شقة - 2,730,000 درهم\n5. Selvara - فيلا - 6,200,000 درهم\n6. Silva Dubai Creek Harbour - شقة - 1,790,000 درهم\n7. Mamsha Palm - شقة - 3,700,000 درهم\n8. The Beach House Fahid - شقة - 4,132,000 درهم\n9. The Arthouse - شقة | فيلا - 3,300,000 درهم\n10. Cavalli Couture - شقة - 21,904,000 درهم\n11. Damac Bay 2 - شقة | دوبلكس - 7,342,000 درهم\n12. Chelsea Residences - شقة - 2,170,000 درهم\n13. Falcon Island - فيلا | منزل نصفي - 7,800,000 درهم\n14. Falcon Island - فيلا | منزل نصفي - 1,190,000 درهم\n15. DWTN Residences - شقة | دوبلكس - 1,860,000 درهم\n16. Ember Park Five by Deyaar - شقة - 704,187 درهم`,
      'contact': 'يمكنك الاتصال بنا عبر الهاتف على +971 506956105 أو عبر البريد الإلكتروني على wzm2383983461@163.com. فريقنا متوفر للمساعدة.',
        'email': 'عنوان البريد الإلكتروني لدينا هو wzm2383983461@163.com. لا تتردد في إرسال أي استفسارات أو أسئلة لنا.',
      'phone': 'يمكنك التواصل معنا عبر الهاتف على +971 506956105 خلال ساعات عملنا.',
      'services': 'مساعدة عقارية متخصصة: استخدم فريقنا المخصص المكون من أكثر من 400 وكيلًا متخصصًا جاهزين للمساعدة. حلول تسويقية احترافية: حقق قيمة مثلى عن طريق تسجيل عقارك باستخدام استراتيجياتنا التسويقية المتخصصة. رؤى سوق للمقررات التفكيرية المبنية على المعرفة: حمل أحدث تقرير粽 comprehensive سوق العقارات في دبي الربع الأول لعام 2025.',
      'buy property': 'يمكننا مساعدتك في العثور على عقارك المثالي. لدينا مجموعة واسعة من العقارات السكنية والتجارية عبر أهم المواقع المرجوة في دبي. فريقنا من الوكلاء المتخصصين جاهز للمساعدة مع حلول عقارية شخصية.',
      'sell property': 'إذا كنت ترغب في بيع عقارك، يمكننا مساعدتك في زيادة قيمته إلى أقصى حد باستخدام استراتيجياتنا التسويقية المتخصصة وشبكتنا الواسعة. نحن نقدم نهجًا تسويقيًا شاملاً، بما في ذلك التصوير المحترف والجولات الافتراضية والحملات الإعلانية المستهدفة.',
      'rent property': 'لدينا مجموعة متنوعة من العقارات للإيجار المتوفرة. يمكنك تحديد متطلباتك والميزانية للحصول على خيارات أكثر تخصيصًا.',
      'project': 'لدينا 16 مشروعًا مثيرًا متاحًا عبر مواقع مختلفة في دبي والإمارات العربية المتحدة، بما في ذلك مشاريع Emaar و Aldar و Damac و Al Hamra Real Estate و Deyaar. هل ترغب في معرفة المزيد عن مشروع معين؟',
      'location': 'تقع عقاراتنا في مواقع بارزة مختلفة بما في ذلك Dubai Creek Harbour و Dubai Hills Estate و Grand Polo Club and Resort و Saadiyat Island و Al Safa و Dubai Harbour و Dubai Maritime City و Al Hamra Village و Downtown Dubai و Dubai Production City (IMPZ).',
      'price': 'تتراوح أسعار عقاراتنا من 704,187 درهم للشقق إلى 21,904,000 درهم للعقارات الفاخرة. لدينا خيارات تناسب الميزانيات والحاجات المختلفة.',
      'falcon island': 'Falcon Island هو مشروع في Al Hamra Village، راس الخيمة يوفر الفيلات والمنازل النصفيّة. تبدأ الأسعار من 1,190,000 درهم مع تسليم في ديسمبر 2024، وهناك أيضًا خيارات تبدأ من 7,800,000 درهم مع تسليم في يناير 2025.',
      'emaar': 'Emaar هو أحد المطورين الذين نعمل معهم. لديهم العديد من المشاريع في محفظتنا بما في ذلك Montiva by Vida و The Palace Villas Ostra و Rosehill و Golf Hillside و Selvara و Silva Dubai Creek Harbour.',
      'aldar': 'Aldar هو مطور رئيسي آخر نعمل معه. تشمل مشاريعهم Mamsha Palm و The Beach House Fahid و The Arthouse.',
      'damac': 'لدي Damac مشاريع مثل Cavalli Couture و Damac Bay 2 و Chelsea Residences في محفظتنا.',
      'deyaar': 'لدي Deyaar مشاريع بما في ذلك DWTN Residences و Ember Park Five by Deyaar.',
      'handover date': 'توجد للتسليم تاريخات مختلفة للمشاريع التي لدينا تراوح من ديسمبر 2024 إلى ديسمبر 2029. أسرع تاريخ تسليم هو Falcon Island (12-2024)، وأحدثها هو العديد من المشاريع مع تسليم في 12-2029.',
      'dubai': 'لدينا مجموعة واسعة من العقارات المتوفرة في دبي، بما في ذلك مواقع مثل Dubai Creek Harbour و Dubai Hills Estate و Dubai Harbour و Dubai Maritime City و Downtown Dubai و Dubai Production City (IMPZ).',
      'assistant': 'أنا مساعد ذكاء اصطناعي هنا للمساعدة في استفساراتك العقارية. يمكنني تقديم معلومات حول عقاراتنا وخدماتنا والإجابة على أي أسئلة قد تكون لديك حول سوق العقارات في دبي.',
      'general': [
        `أنا هنا للمساعدة في احتياجاتك العقارية. تقدم شركتنا مجموعة واسعة من العقارات عبر أهم المواقع المرجوة في دبي.`,
        `شكرًا على سؤالك. يرجى عدم التردد في طرح أي أسئلة حول عقاراتنا أو خدماتنا أو أي استفسارات أخرى متعلقة بالعقارات.`,
        `يوفر Hawson House Properties حلولًا شاملة للعقارات في دبي والإمارات العربية المتحدة. كيف يمكنني مساعدتك اليوم؟`,
        `هل ترغب في معرفة المزيد عن قوائم العقارات أو الخدمات الخاصة بنا؟ أنا هنا للمساعدة في العثور على المعلومات التي تحتاجها.`
      ]
    }
  };
  
  // 生成通用回复函数已被移除，现在直接从多语言FAQ对象中获取通用回复
  
  // 添加消息到聊天界面
  function addMessage(text, isUser) {
    // 确保chatMessages变量存在
    if (typeof chatMessages === 'undefined' || !chatMessages) {
      console.error('chatMessages element not found!');
      return;
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    // 处理HTML内容（允许简单的链接）
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    const p = document.createElement('p');
    p.innerHTML = text; // 允许简单的HTML如链接
    contentDiv.appendChild(p);
    
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    
    // 滚动到底部
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  
  // 处理用户消息
    function handleUserMessage(message) {
      if (!message.trim()) return;
      
      // 添加用户消息到聊天界面
      addMessage(message, true);
      
      // 清空输入框
      chatInput.value = '';
      
      // 模拟思考延迟
      setTimeout(() => {
        // 寻找匹配的回答
        const lowerMessage = message.toLowerCase();
        let response = null;
        
        // 获取当前语言的FAQ回复，默认使用英文
        const lang = currentLanguage || 'en';
        const faqLang = faqResponses[lang] || faqResponses.en;
        
        // 检查是否包含预算相关的问题，并尝试提取预算金额
        let budget = extractBudget(message);
        if (budget > 0) {
          // 根据当前语言生成符合预算的房产推荐
          response = generateBudgetRecommendation(budget, lang);
        }
        
        // 如果没有预算相关回复，检查常见问题关键词
        if (!response) {
          for (const keyword in faqLang) {
            if (keyword !== 'general' && lowerMessage.includes(keyword)) {
              response = faqLang[keyword];
              break;
            }
          }
        }
        
        // 如果没有匹配的回答，生成通用回复
        if (!response) {
          // 使用当前语言的通用回复
          if (faqLang.general && faqLang.general.length > 0) {
            response = faqLang.general[Math.floor(Math.random() * faqLang.general.length)];
          } else {
            // 如果当前语言没有通用回复，则使用英文通用回复
            response = faqResponses.en.general[Math.floor(Math.random() * faqResponses.en.general.length)];
          }
        }
        
        // 添加AI回复到聊天界面
        addMessage(response, false);
      }, 500 + Math.random() * 1000); // 0.5-1.5秒的延迟
    }
    
    // 从消息中提取预算金额，支持多种格式
    function extractBudget(message) {
      // 尝试匹配中文数字表述 (一百万, 一千万等)
      const chineseNumberExpressions = [
        { pattern: /一百万/, value: 1000000 },
        { pattern: /一千万/, value: 10000000 },
        { pattern: /二百万/, value: 2000000 },
        { pattern: /三百万/, value: 3000000 },
        { pattern: /四百万/, value: 4000000 },
        { pattern: /五百万/, value: 5000000 },
        { pattern: /六百万/, value: 6000000 },
        { pattern: /七百万/, value: 7000000 },
        { pattern: /八百万/, value: 8000000 },
        { pattern: /九百万/, value: 9000000 }
      ];
      
      for (const expr of chineseNumberExpressions) {
        if (expr.pattern.test(message)) {
          return expr.value;
        }
      }
      
      // 尝试匹配中文数字单位"万"
      const chineseWanMatch = message.match(/(\d+(?:,\d{3})*)万/);
      if (chineseWanMatch) {
        const num = parseInt(chineseWanMatch[1].replace(/,/g, ''));
        return num * 10000; // 1万 = 10000
      }
      
      // 尝试匹配标准数字格式（带逗号或不带逗号）
      const numberMatch = message.match(/(\d{1,3}(?:,\d{3})*|\d+)/);
      if (numberMatch) {
        return parseInt(numberMatch[1].replace(/,/g, ''));
      }
      
      return 0; // 没有找到有效预算
    }
    
    // 根据预算生成房产推荐
    function generateBudgetRecommendation(budget, lang) {
      // 解析房产价格并筛选符合预算的房产
      const affordableProperties = propertyData.filter(property => {
        // 从价格字符串中提取数字
        const price = parseInt(property.price.replace(/[^\d]/g, ''));
        return price <= budget;
      });
      
      // 根据语言生成回复
      const translations = {
        'en': {
          intro: `Based on your budget of ${budget.toLocaleString()} AED, here are the properties we recommend:\n\n`,
          noProperties: `Unfortunately, we don't have any properties within your budget of ${budget.toLocaleString()} AED at the moment.`,
          format: (property, index) => `${index}. ${property.name} - ${property.type} - ${property.price}\n   Developer: ${property.developer}\n   Location: ${property.area}\n   Handover: ${property.handoverDate}`
        },
        'zh': {
          intro: `根据您 ${budget.toLocaleString()} 迪拉姆的预算，我们推荐以下房产：\n\n`,
          noProperties: `很抱歉，目前我们没有价格在您 ${budget.toLocaleString()} 迪拉姆预算内的房产。`,
          format: (property, index) => `${index}. ${property.name} - ${property.type} - ${property.price}\n   开发商：${property.developer}\n   位置：${property.area}\n   交付日期：${property.handoverDate}`
        },
        'ar': {
          intro: `استنادًا إلى ميزانيتك البالغة ${budget.toLocaleString()} درهم، إليك العقارات التي ننصح بها:\n\n`,
          noProperties: `لسوء الحظ، אין لدينا أي عقارات ضمن ميزانيتك البالغة ${budget.toLocaleString()} درهم في الوقت الحالي.`,
          format: (property, index) => `${index}. ${property.name} - ${property.type} - ${property.price}\n   المطور: ${property.developer}\n   الموقع: ${property.area}\n   التسليم: ${property.handoverDate}`
        }
      };
      
      const t = translations[lang] || translations.en;
      
      if (affordableProperties.length === 0) {
        return t.noProperties;
      }
      
      // 生成房产列表回复
      let response = t.intro;
      affordableProperties.forEach((property, index) => {
        response += t.format(property, index + 1) + '\n\n';
      });
      
      return response.trim();
    }
  
  // 为发送按钮添加点击事件 - 确保变量存在
  if (typeof sendButton !== 'undefined' && sendButton) {
    sendButton.addEventListener('click', () => {
      if (typeof chatInput !== 'undefined' && chatInput) {
        handleUserMessage(chatInput.value);
      }
    });
  }
  
  // 为输入框添加回车事件 - 确保变量存在
  if (typeof chatInput !== 'undefined' && chatInput) {
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        handleUserMessage(chatInput.value);
      }
    });
  }
  
  // 创建导航栏
  const header = document.createElement('header');
  header.className = 'header';
  header.innerHTML = `
    <nav class="navbar" style="display: flex; align-items: center; justify-content: space-between; padding: 1rem 2rem; background-color: white; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
      <div class="logo" style="display: flex; align-items: center;">
        <a href="/" style="display: flex; align-items: center;">
          <img src="/img/logo.png" alt="Logo" class="logo-image" style="width: 100px; height: auto;">
        </a>
      </div>
      <div class="nav-links" style="display: flex; gap: 3rem; align-items: center;">
        <a href="/featured-properties.html" style="color: #333; text-decoration: none; font-weight: 500; transition: color 0.3s ease;">Buy</a>
        <a href="/public/communities.html" style="color: #333; text-decoration: none; font-weight: 500; transition: color 0.3s ease;">communities</a>
        <a href="developers.html" style="color: #333; text-decoration: none; font-weight: 500; transition: color 0.3s ease;">Developers</a>
        <a href="/public/services.html" style="color: #333; text-decoration: none; font-weight: 500; transition: color 0.3s ease;">Services</a>
        <a href="/about.html" style="color: #333; text-decoration: none; font-weight: 500; transition: color 0.3s ease;">About Us</a>
      </div>
    </nav>
  `;
  
  // 删除了语言切换功能相关代码
  
  // 语言切换功能已完全移除
  
  // 处理所有的点击事件
  function handleAllClicks() {
  }
      
      // 语言切换功能相关的事件监听器已删除
      
      // 所有语言切换相关代码已移除
      // 语言选项点击事件处理已移除
      
      // 更新页面语言函数
      // updatePageLanguage函数已删除
      // 不再支持多语言切换功能，页面将保持默认语言（英语）
  
  // 确保在导航栏创建后初始化语言切换功能
  // 删除了语言切换功能初始化调用
  
  // 创建英雄区域
  const heroSection = document.createElement('section');
  heroSection.className = 'hero';
  
  // 使用图片替换视频作为背景
  const bannerImage = '/banner/be4761502e5ac0091dba5fcdf2862dc1.png';
  
  // 创建背景图片HTML结构
  const backgroundImageHTML = `
    <img id="hero-background" class="hero-background" src="${bannerImage}" alt="Luxury Real Estate" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: -1; display: block;">
  `;
  
  heroSection.innerHTML = `
    ${backgroundImageHTML}
    <div id="hero-content" class="hero-content" style="opacity: 0; transition: opacity 1s ease-in-out;">
      <div class="hero-intro">
        <span class="hero-badge">YOUR REAL ESTATE EXPERT</span>
      </div>
      <h1 class="hero-main-title" data-translate="heroTitle">
        Expert is Here.
      </h1>
      <div class="hero-subtitle" data-translate="heroSubtitle">
        <p class="hero-subtitle-text">
          Discover over 200+ property choices with our professional agents
        </p>
        <p class="hero-subtitle-highlight">
          Contact us today to find your dream property
        </p>
      </div>
      <div class="hero-cta">
        <a href="/featured-properties.html" class="cta-button">
          Explore Properties
        </a>
      </div>
    </div>
  `;
  
  // 添加hero区域样式
  const heroStyle = document.createElement('style');
  heroStyle.textContent = `
    .hero {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      position: relative;
      overflow: hidden;
    }
    .hero-content {
      max-width: 900px;
      text-align: center;
      padding: 3rem 2rem;
      z-index: 3;
      background-color: rgba(0, 0, 0, 0.35);
      border-radius: 16px;
      backdrop-filter: blur(5px);
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    }
    .hero-intro {
      margin-bottom: 1.5rem;
    }
    .hero-badge {
      display: inline-block;
      background-color: rgba(255, 255, 255, 0.15);
      color: white;
      font-size: 0.95rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 2px;
      padding: 0.75rem 1.5rem;
      border-radius: 30px;
      border: 1px solid rgba(255, 255, 255, 0.3);
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
    }
    .hero-main-title {
      font-size: 5rem;
      font-weight: 500;
      color: white;
      text-shadow: 0 5px 30px rgba(0, 0, 0, 0.5);
      line-height: 1.05;
      margin-bottom: 2rem;
      letter-spacing: -1.5px;
    }
    .hero-subtitle {
      margin-bottom: 3rem;
      max-width: 750px;
      margin-left: auto;
      margin-right: auto;
    }
    .hero-subtitle-text {
      font-size: 1.4rem;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.95);
      text-shadow: 0 3px 15px rgba(0, 0, 0, 0.3);
      line-height: 1.6;
      margin-bottom: 1rem;
    }
    .hero-subtitle-highlight {
      font-size: 1.6rem;
      font-weight: 600;
      color: white;
      text-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
      line-height: 1.5;
    }
    .hero-cta {
      margin-top: 2rem;
    }
    .cta-button {
      display: inline-block;
      background-color: transparent;
      color: white;
      font-size: 1.1rem;
      font-weight: 600;
      text-decoration: none;
      padding: 1.25rem 3rem;
      border-radius: 50px;
      border: 2px solid white;
      box-shadow: none;
      transition: all 0.3s ease;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .cta-button:hover {
      transform: translateY(-2px);
      background-color: rgba(255, 255, 255, 0.1);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    }
    .cta-button:active {
      transform: translateY(-1px);
      background-color: rgba(255, 255, 255, 0.2);
    }
    /* 响应式设计 */
    @media (max-width: 1200px) {
      .hero-main-title {
        font-size: 4rem;
      }
      .hero-subtitle-text {
        font-size: 1.3rem;
      }
      .hero-subtitle-highlight {
        font-size: 1.4rem;
      }
    }
    @media (max-width: 992px) {
      .hero-content {
        padding: 2.5rem 1.5rem;
      }
      .hero-main-title {
        font-size: 3.5rem;
      }
      .hero-subtitle-text {
        font-size: 1.2rem;
      }
      .hero-subtitle-highlight {
        font-size: 1.3rem;
      }
      .cta-button {
        padding: 1.1rem 2.5rem;
        font-size: 1rem;
      }
    }
    @media (max-width: 768px) {
      .hero {
        min-height: 80vh;
      }
      .hero-content {
        padding: 2rem 1rem;
      }
      .hero-badge {
        font-size: 0.8rem;
        padding: 0.6rem 1.2rem;
      }
      .hero-main-title {
        font-size: 2.8rem;
        margin-bottom: 1.5rem;
      }
      .hero-subtitle {
        margin-bottom: 2rem;
      }
      .hero-subtitle-text {
        font-size: 1.1rem;
      }
      .hero-subtitle-highlight {
        font-size: 1.2rem;
      }
      .cta-button {
        padding: 1rem 2rem;
        font-size: 0.9rem;
      }
    }
    @media (max-width: 576px) {
      .hero-content {
        padding: 1.5rem 0.75rem;
        border-radius: 12px;
      }
      .hero-badge {
        font-size: 0.75rem;
        padding: 0.5rem 1rem;
        letter-spacing: 1px;
      }
      .hero-main-title {
        font-size: 2.2rem;
      }
      .hero-subtitle-text {
        font-size: 1rem;
      }
      .hero-subtitle-highlight {
        font-size: 1.1rem;
      }
    }
  `;
  document.head.appendChild(heroStyle);

  // 添加文字内容显示/隐藏的循环逻辑
  const heroContent = heroSection.querySelector('#hero-content');
  const heroBackground = heroSection.querySelector('#hero-background');
  
  // 显示文字函数 - 简化版本，直接显示文字
  function showHeroContent() {
    // 直接显示文字，不使用定时器
    heroContent.style.opacity = '1';
  }
  
  // 图片加载完成后显示文字内容
  if (heroBackground) {
    // 直接显示文字内容，不使用延迟
    showHeroContent();
  }
  
  // 创建房产展示区域
  const propertiesSection = document.createElement('section');
  propertiesSection.id = 'properties';
  propertiesSection.className = 'properties';
  propertiesSection.innerHTML = `
    <div class="section-header">
      <div class="header-content-wrapper">
        <div class="header-text">
          <h2 data-translate="propertiesTitle">Ready Properties</h2>
        </div>
          <a href="/featured-properties.html" class="view-all-btn" data-translate="viewFeaturedProperties">
  View all Properties
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="linear-button-icon">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
</a>
      </div>
    </div>
    <div class="properties-carousel-container">
      <div class="properties-grid">
            <!-- 第一个房产卡片 -->
            <div class="property-card homepage-property-card" data-beds="2" data-baths="2">
                <div class="property-carousel">
                    <div class="carousel-slides">
                        <div class="carousel-slide">
                            <img src="/images_new/buy-new/1/1.png" alt="Property Image 1" />
                        </div>
                        <div class="carousel-slide">
                            <img src="/images_new/buy-new/1/2.png" alt="Property Image 2" />
                        </div>
                        <div class="carousel-slide">
                            <img src="/images_new/buy-new/1/3.png" alt="Property Image 3" />
                        </div>
                        <div class="carousel-slide">
                            <img src="/images_new/buy-new/1/4.png" alt="Property Image 4" />
                        </div>
                        <div class="carousel-slide">
                            <img src="/images_new/buy-new/1/5.png" alt="Property Image 5" />
                        </div>
                        <div class="carousel-slide">
                            <img src="/images_new/buy-new/1/6.png" alt="Property Image 6" />
                        </div>
                    </div>
                    <div class="carousel-indicators">
                        <button class="carousel-indicator active"></button>
                        <button class="carousel-indicator"></button>
                        <button class="carousel-indicator"></button>
                        <button class="carousel-indicator"></button>
                        <button class="carousel-indicator"></button>
                        <button class="carousel-indicator"></button>
                    </div>
                </div>
                <div class="property-details">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                        <div class="property-price" style="font-size: 1.75rem; font-weight: 300; margin: 0; color: #000;">AED 2,800,000</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                    </div>
                    
                    <div style="margin-bottom: 1rem; font-size: 1rem; font-weight: 300; color: #000; line-height: 1.4;">
                        Harbour Gate, Dubai Creek Harbour
                    </div>
                    
                    <div style="display: flex; align-items: center; gap: 1.5rem; margin-bottom: 1rem;">
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="3" y1="9" x2="21" y2="9"></line>
                                <line x1="9" y1="21" x2="9" y2="9"></line>
                            </svg>
                            <span style="color: #000;">2 Bed</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
                            </svg>
                            <span style="color: #000;">2 Bath</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                            </svg>
                            <span style="color: #000;">1,149 sq-ft</span>
                        </div>
                    </div>
                    
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.5rem; color: #000;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="2" y1="12" x2="22" y2="12"></line>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                        </svg>
                        <span style="color: #000;">Dubai Creek Harbour</span>
                    </div>
                    
                    <hr style="border: none; border-top: 1px dashed #ddd; margin-bottom: 0.5rem;" />
                    <div style="display: flex; gap: 0.3rem; margin: 0 0.5rem;">
                        <button class="call-us-btn" style="flex: 1; padding: 0.4rem 0.5rem; background-color: transparent; color: #000; border: 1px solid #000; border-radius: 12px; cursor: pointer; font-weight: 500; font-size: 0.8rem; transition: all 0.3s ease;">Call Us</button>
                        <button onclick="window.location.href='/property-detail.html?property=property-1'" style="flex: 1; padding: 0.4rem 0.5rem; background-color: transparent; color: #000; border: 1px solid #000; border-radius: 12px; cursor: pointer; font-weight: 500; font-size: 0.8rem; transition: all 0.3s ease;">View Details</button>
                    </div>
                </div>
            </div>

            <!-- 第二个房产卡片 -->
            <div class="property-card homepage-property-card" data-beds="1" data-baths="1">
                <div class="property-carousel">
                    <div class="carousel-slides">
                        <div class="carousel-slide">
                            <img src="/images_new/buy-new/2/1.png" alt="Property Image 1" />
                        </div>
                        <div class="carousel-slide">
                            <img src="/images_new/buy-new/2/image.png" alt="Property Image 2" />
                        </div>
                        <div class="carousel-slide">
                            <img src="/images_new/buy-new/2/image copy.png" alt="Property Image 3" />
                        </div>
                        <div class="carousel-slide">
                            <img src="/images_new/buy-new/2/image copy 2.png" alt="Property Image 4" />
                        </div>
                        <div class="carousel-slide">
                            <img src="/images_new/buy-new/2/image copy 3.png" alt="Property Image 5" />
                        </div>
                        <div class="carousel-slide">
                            <img src="/images_new/buy-new/2/image copy 4.png" alt="Property Image 6" />
                        </div>
                    </div>
                    <div class="carousel-indicators">
                        <button class="carousel-indicator active"></button>
                        <button class="carousel-indicator"></button>
                        <button class="carousel-indicator"></button>
                        <button class="carousel-indicator"></button>
                        <button class="carousel-indicator"></button>
                        <button class="carousel-indicator"></button>
                    </div>
                </div>
                <div class="property-details">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                        <div class="property-price" style="font-size: 1.75rem; font-weight: 300; margin: 0; color: #000;">AED 2,040,000</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                    </div>
                    
                    <div style="margin-bottom: 1rem; font-size: 1rem; font-weight: 300; color: #000; line-height: 1.4;">
                        APARTMENT FOR SALE IN BURJ CROWN
                    </div>
                    
                    <div style="display: flex; align-items: center; gap: 1.5rem; margin-bottom: 1rem;">
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="3" y1="9" x2="21" y2="9"></line>
                                <line x1="9" y1="21" x2="9" y2="9"></line>
                            </svg>
                            <span style="color: #000;">1 Bed</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
                            </svg>
                            <span style="color: #000;">1 Bath</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                            </svg>
                            <span style="color: #000;">578 sq-ft</span>
                        </div>
                    </div>
                    
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.5rem; color: #000;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="2" y1="12" x2="22" y2="12"></line>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                        </svg>
                        <span style="color: #000;">Downtown Dubai</span>
                    </div>
                    
                    <hr style="border: none; border-top: 1px dashed #ddd; margin-bottom: 0.5rem;" />
                    <div style="display: flex; gap: 0.3rem; margin: 0 0.5rem;">
                        <button class="call-us-btn" style="flex: 1; padding: 0.4rem 0.5rem; background-color: transparent; color: #000; border: 1px solid #000; border-radius: 12px; cursor: pointer; font-weight: 500; font-size: 0.8rem; transition: all 0.3s ease;">Call Us</button>
                        <button onclick="window.location.href='/property-detail.html?property=property-2'" style="flex: 1; padding: 0.4rem 0.5rem; background-color: transparent; color: #000; border: 1px solid #000; border-radius: 12px; cursor: pointer; font-weight: 500; font-size: 0.8rem; transition: all 0.3s ease;">View Details</button>
                    </div>
                </div>
            </div>

            <!-- 第三个房产卡片 -->
            <div class="property-card">
                <div class="property-carousel">
                    <div class="carousel-slides">
                        <div class="carousel-slide">
                            <img src="/aboutus/ryuan/11.jpg" alt="Rosehill" />
                        </div>
                        <div class="carousel-slide">
                            <img src="/Communities/1.png" alt="Rosehill" />
                        </div>
                        <div class="carousel-slide">
                            <img src="/Communities/2.png" alt="Rosehill" />
                        </div>
                        <div class="carousel-slide">
                            <img src="/Communities/3.png" alt="Rosehill" />
                        </div>
                        <div class="carousel-slide">
                            <img src="/Communities/4.png" alt="Rosehill" />
                        </div>
                    </div>
                    <div class="carousel-indicators">
                        <button class="carousel-indicator active"></button>
                        <button class="carousel-indicator"></button>
                        <button class="carousel-indicator"></button>
                        <button class="carousel-indicator"></button>
                        <button class="carousel-indicator"></button>
                    </div>
                </div>
                <div class="property-details">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                        <div class="property-price" style="font-size: 1.75rem; font-weight: 300; margin: 0; color: #000;">3,850,000</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                    </div>
                    
                    <div style="margin-bottom: 1rem; font-size: 1rem; font-weight: 300; color: #000; line-height: 1.4;">
                        Modern·Spacious·Luxury·Apartment
                    </div>
                    
                    <div style="display: flex; align-items: center; gap: 1.5rem; margin-bottom: 1rem;">
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="3" y1="9" x2="21" y2="9"></line>
                                <line x1="9" y1="21" x2="9" y2="9"></line>
                            </svg>
                            <span style="color: #000;">3 Bed</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
                            </svg>
                            <span style="color: #000;">3 Bath</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                            </svg>
                            <span style="color: #000;">2100 sq-ft</span>
                        </div>
                    </div>
                    
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.5rem; color: #000;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="2" y1="12" x2="22" y2="12"></line>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                        </svg>
                        <span style="color: #000;">Dubai Hills Estate, Dubai</span>
                    </div>
                    
                    <hr style="border: none; border-top: 1px dashed #ddd; margin-bottom: 0.5rem;" />
                    <div style="display: flex; gap: 0.3rem; margin: 0 0.5rem;">
                        <button style="flex: 1; padding: 0.4rem 0.5rem; background-color: transparent; color: #000; border: 1px solid #000; border-radius: 12px; cursor: pointer; font-weight: 500; font-size: 0.8rem; transition: all 0.3s ease;">Call Us</button>
                        <button style="flex: 1; padding: 0.4rem 0.5rem; background-color: transparent; color: #000; border: 1px solid #000; border-radius: 12px; cursor: pointer; font-weight: 500; font-size: 0.8rem; transition: all 0.3s ease;">View Details</button>
                    </div>
                </div>
            </div>

            <!-- 第四个房产卡片 -->
            <div class="property-card">
                <div class="property-carousel">
                    <div class="carousel-slides">
                        <div class="carousel-slide">
                            <img src="/images_new/image/4/img291.jpg" alt="Golf Hillside" />
                        </div>
                        <div class="carousel-slide">
                            <img src="/images_new/image/4/img371.jpg" alt="Golf Hillside" />
                        </div>
                        <div class="carousel-slide">
                            <img src="/images_new/image/4/img3811.jpg" alt="Golf Hillside" />
                        </div>
                        <div class="carousel-slide">
                            <img src="/images_new/image/4/img611.jpg" alt="Golf Hillside" />
                        </div>
                        <div class="carousel-slide">
                            <img src="/images_new/image/4/img961.jpg" alt="Golf Hillside" />
                        </div>
                    </div>
                    <div class="carousel-indicators">
                        <button class="carousel-indicator active"></button>
                        <button class="carousel-indicator"></button>
                        <button class="carousel-indicator"></button>
                        <button class="carousel-indicator"></button>
                        <button class="carousel-indicator"></button>
                    </div>
                </div>
                <div class="property-details">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                        <div class="property-price" style="font-size: 1.75rem; font-weight: 300; margin: 0; color: #000;">5,200,000</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                    </div>
                    
                    <div style="margin-bottom: 1rem; font-size: 1rem; font-weight: 300; color: #000; line-height: 1.4;">
                        Golf View·Luxury·Penthouse·Exclusive
                    </div>
                    
                    <div style="display: flex; align-items: center; gap: 1.5rem; margin-bottom: 1rem;">
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="3" y1="9" x2="21" y2="9"></line>
                                <line x1="9" y1="21" x2="9" y2="9"></line>
                            </svg>
                            <span style="color: #000;">4 Bed</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
                            </svg>
                            <span style="color: #000;">5 Bath</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                            </svg>
                            <span style="color: #000;">3200 sq-ft</span>
                        </div>
                    </div>
                    
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.5rem; color: #000;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="2" y1="12" x2="22" y2="12"></line>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                        </svg>
                        <span style="color: #000;">Dubai Hills Estate, Dubai</span>
                    </div>
                    
                    <hr style="border: none; border-top: 1px dashed #ddd; margin-bottom: 0.5rem;" />
                    <div style="display: flex; gap: 0.3rem; margin: 0 0.5rem;">
                        <button style="flex: 1; padding: 0.4rem 0.5rem; background-color: transparent; color: #000; border: 1px solid #000; border-radius: 12px; cursor: pointer; font-weight: 500; font-size: 0.8rem; transition: all 0.3s ease;">Call Us</button>
                        <button style="flex: 1; padding: 0.4rem 0.5rem; background-color: transparent; color: #000; border: 1px solid #000; border-radius: 12px; cursor: pointer; font-weight: 500; font-size: 0.8rem; transition: all 0.3s ease;">View Details</button>
                    </div>
                </div>
            </div>

            <!-- 第五个房产卡片 -->
            <div class="property-card">
                <div class="property-carousel">
                    <div class="carousel-slides">
                        <div class="carousel-slide">
                            <img src="/images_new/image/5/img1001.jpg" alt="Montiva by Vida" />
                        </div>
                        <div class="carousel-slide">
                            <img src="/images_new/image/5/img1481.jpg" alt="Montiva by Vida" />
                        </div>
                        <div class="carousel-slide">
                            <img src="/images_new/image/5/img1531.jpg" alt="Montiva by Vida" />
                        </div>
                        <div class="carousel-slide">
                            <img src="/images_new/image/5/img691.jpg" alt="Montiva by Vida" />
                        </div>
                        <div class="carousel-slide">
                            <img src="/images_new/image/5/img741.jpg" alt="Montiva by Vida" />
                        </div>
                    </div>
                    <div class="carousel-indicators">
                        <button class="carousel-indicator active"></button>
                        <button class="carousel-indicator"></button>
                        <button class="carousel-indicator"></button>
                        <button class="carousel-indicator"></button>
                        <button class="carousel-indicator"></button>
                    </div>
                </div>
                <div class="property-details">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                        <div class="property-price" style="font-size: 1.75rem; font-weight: 300; margin: 0; color: #000;">2,950,000</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                    </div>
                    
                    <div style="margin-bottom: 1rem; font-size: 1rem; font-weight: 300; color: #000; line-height: 1.4;">
                        Modern·Waterfront·Apartment·Luxury
                    </div>
                    
                    <div style="display: flex; align-items: center; gap: 1.5rem; margin-bottom: 1rem;">
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="3" y1="9" x2="21" y2="9"></line>
                                <line x1="9" y1="21" x2="9" y2="9"></line>
                            </svg>
                            <span style="color: #000;">2 Bed</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
                            </svg>
                            <span style="color: #000;">3 Bath</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                            </svg>
                            <span style="color: #000;">1950 sq-ft</span>
                        </div>
                    </div>
                    
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.5rem; color: #000;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="2" y1="12" x2="22" y2="12"></line>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                        </svg>
                        <span style="color: #000;">Dubai Creek Harbour, Dubai</span>
                    </div>
                    
                    <hr style="border: none; border-top: 1px dashed #ddd; margin-bottom: 0.5rem;" />
                    <div style="display: flex; gap: 0.3rem; margin: 0 0.5rem;">
                        <button style="flex: 1; padding: 0.4rem 0.5rem; background-color: transparent; color: #000; border: 1px solid #000; border-radius: 12px; cursor: pointer; font-weight: 500; font-size: 0.8rem; transition: all 0.3s ease;">Call Us</button>
                        <button style="flex: 1; padding: 0.4rem 0.5rem; background-color: transparent; color: #000; border: 1px solid #000; border-radius: 12px; cursor: pointer; font-weight: 500; font-size: 0.8rem; transition: all 0.3s ease;">View Details</button>
                    </div>
                </div>
            </div>
      </div>
    </div>
  `;
  
  // 添加自动滚动功能
  const readyPropertiesSection = document.createElement('script');
  readyPropertiesSection.textContent = `
    document.addEventListener('DOMContentLoaded', function() {
      const container = document.querySelector('.properties-carousel-container');
      const grid = document.querySelector('.properties-grid');
      const cards = document.querySelectorAll('.property-card');
      let currentPosition = 0;
      const cardWidth = cards[0].offsetWidth + 24; // 卡片宽度 + 间距
      let visibleCards = window.innerWidth >= 1200 ? 2 : 1;
      const maxPosition = cards.length - visibleCards;
      
      // 添加长条指示器DOM结构
      const indicatorContainer = document.createElement('div');
      indicatorContainer.className = 'scroll-indicator';
      const indicatorTrack = document.createElement('div');
      indicatorTrack.className = 'scroll-indicator-track';
      const indicatorThumb = document.createElement('div');
      indicatorThumb.className = 'scroll-indicator-thumb';
      indicatorTrack.appendChild(indicatorThumb);
      indicatorContainer.appendChild(indicatorTrack);
      container.appendChild(indicatorContainer);
      
      // 初始化指示器
      function initIndicator() {
        const trackWidth = indicatorTrack.offsetWidth;
        const totalScrollWidth = grid.scrollWidth - grid.clientWidth;
        // 计算滑块宽度 - 基于可见卡片数量
        const thumbWidth = (visibleCards / cards.length) * trackWidth;
        indicatorThumb.style.width = Math.max(thumbWidth, 40) + 'px'; // 最小宽度40px
        updateIndicatorPosition();
      }
      
      // 更新指示器位置
      function updateIndicatorPosition() {
        const trackWidth = indicatorTrack.offsetWidth;
        const thumbWidth = indicatorThumb.offsetWidth;
        const totalScrollWidth = grid.scrollWidth - grid.clientWidth;
        const scrollRatio = grid.scrollLeft / totalScrollWidth;
        const newLeft = scrollRatio * (trackWidth - thumbWidth);
        indicatorThumb.style.left = newLeft + 'px';
      }
      
      // 拖动控制功能 - 使用已有的isDragging和startX变量
      let startLeft = 0;
      
      indicatorThumb.addEventListener('mousedown', (e) => {
        e.preventDefault();
        isDragging = true;
        startX = e.clientX;
        startLeft = parseFloat(indicatorThumb.style.left || 0);
        document.addEventListener('mousemove', handleDrag);
        document.addEventListener('mouseup', stopDrag);
        // 暂停自动滚动
        clearInterval(scrollInterval);
      });
      
      indicatorTrack.addEventListener('click', (e) => {
        if (!isDragging) {
          const rect = indicatorTrack.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const trackWidth = rect.width;
          const thumbWidth = indicatorThumb.offsetWidth;
          
          // 计算新的滑块位置（限制在轨道内）
          let newLeft = clickX - thumbWidth / 2;
          newLeft = Math.max(0, Math.min(newLeft, trackWidth - thumbWidth));
          
          // 根据滑块位置计算网格滚动位置
          const scrollRatio = newLeft / (trackWidth - thumbWidth);
          const totalScrollWidth = grid.scrollWidth - grid.clientWidth;
          grid.scrollTo({ left: scrollRatio * totalScrollWidth, behavior: 'smooth' });
          
          // 暂停自动滚动
          clearInterval(scrollInterval);
          startAutoScroll(); // 重新开始自动滚动
        }
      });
      
      function handleDrag(e) {
        if (!isDragging) return;
        
        const rect = indicatorTrack.getBoundingClientRect();
        const trackWidth = rect.width;
        const thumbWidth = indicatorThumb.offsetWidth;
        const deltaX = e.clientX - startX;
        let newLeft = startLeft + deltaX;
        
        // 限制在轨道内
        newLeft = Math.max(0, Math.min(newLeft, trackWidth - thumbWidth));
        indicatorThumb.style.left = newLeft + 'px';
        
        // 根据滑块位置更新网格滚动位置
        const scrollRatio = newLeft / (trackWidth - thumbWidth);
        const totalScrollWidth = grid.scrollWidth - grid.clientWidth;
        grid.scrollLeft = scrollRatio * totalScrollWidth;
      }
      
      function stopDrag() {
        isDragging = false;
        document.removeEventListener('mousemove', handleDrag);
        document.removeEventListener('mouseup', stopDrag);
        // 重新开始自动滚动
        startAutoScroll();
      }
      
      // 监听网格滚动事件更新指示器位置
      grid.addEventListener('scroll', updateIndicatorPosition);
      
      // 监听窗口大小改变事件重新初始化指示器
      window.addEventListener('resize', () => {
        const newVisibleCards = window.innerWidth >= 1200 ? 2 : 1;
        if (newVisibleCards !== visibleCards) {
          visibleCards = newVisibleCards;
          initIndicator();
        }
      });
      
      // 初始化指示器
      initIndicator();
      
      // 实现缓慢自动滚动效果
      function startAutoScroll() {
        // 清除可能存在的旧定时器
        clearInterval(scrollInterval);
        // 设置新的定时器，每8秒滚动一次
        scrollInterval = setInterval(autoScroll, 8000);
      }
      
      // 自动滚动函数 - 实现缓慢滚动
      function autoScroll() {
        // 计算下一个滚动位置
        let nextPosition = currentPosition + 1;
        if (nextPosition > maxPosition) {
          // 如果到达最后一张，回到第一张
          nextPosition = 0;
        }
        
        // 使用自定义的缓慢滚动动画
        slowScroll(nextPosition);
        currentPosition = nextPosition;
      }
      
      // 缓慢滚动函数
      function slowScroll(targetPosition) {
        const targetScroll = targetPosition * cardWidth;
        const startScroll = grid.scrollLeft;
        const distance = targetScroll - startScroll;
        const duration = 2000; // 滚动持续时间2秒
        let startTime = null;
        
        function animation(currentTime) {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const progress = Math.min(timeElapsed / duration, 1);
          
          // 使用缓动函数使滚动更自然
          const easeProgress = easeInOutQuad(progress);
          grid.scrollLeft = startScroll + (distance * easeProgress);
          
          if (timeElapsed < duration) {
            requestAnimationFrame(animation);
          }
        }
        
        // 缓动函数
        function easeInOutQuad(t) {
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }
        
        requestAnimationFrame(animation);
      }
      
      // 每8秒自动滚动
      let scrollInterval = setInterval(autoScroll, 8000);
      
      // 触摸滑动功能
      let touchStartX = 0;
      let touchEndX = 0;
      
      container.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(scrollInterval); // 暂停自动滚动
      });
      
      container.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoScroll(); // 恢复自动滚动
      });
      
      function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold && currentPosition < maxPosition) {
          // 向左滑动
          currentPosition++;
          grid.scrollTo({ left: currentPosition * cardWidth, behavior: 'smooth' });
        } else if (touchEndX > touchStartX + swipeThreshold && currentPosition > 0) {
          // 向右滑动
          currentPosition--;
          grid.scrollTo({ left: currentPosition * cardWidth, behavior: 'smooth' });
        }
      }
      
      // 鼠标拖拽功能
      let isDragging = false;
      let startX;
      let scrollLeft;
      
      container.addEventListener('mousedown', function(e) {
        isDragging = true;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = grid.scrollLeft;
        clearInterval(scrollInterval); // 暂停自动滚动
      });
      
      document.addEventListener('mouseup', function() {
        isDragging = false;
        startAutoScroll(); // 恢复自动滚动
      });
      
      container.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        let newScrollLeft = scrollLeft - walk;
        
        // 限制在有效范围内
        newScrollLeft = Math.max(0, Math.min(newScrollLeft, maxPosition * cardWidth));
        
        grid.scrollLeft = newScrollLeft;
        
        // 更新当前位置
        currentPosition = Math.round(newScrollLeft / cardWidth);
      });
    });
  `;
  document.body.appendChild(readyPropertiesSection);
  
  // 创建公司使命区域（已清空内容）
  const aboutSection = document.createElement('section');
  aboutSection.id = 'about';
  aboutSection.className = 'about';
  aboutSection.innerHTML = '';
  
  // 翻译功能已在文件顶部初始化
  // 更新main.js语言的函数，供index.html调用
  window.updateMainJsLanguage = function(lang) {
    currentLang = lang;
    updateTranslatedElements();
  };

  // 创建统计数据区域
  const statsSection = document.createElement('section');
  statsSection.id = 'stats';
  statsSection.className = 'stats';
  statsSection.innerHTML = `
    <!-- 主题文本 -->
    <div class="stats-header">
      <div class="stats-text">
        <h2 data-translate="missionTitle">Featured Communities</h2>
        <!-- 移除了占位文本 -->
      </div>
      <div class="arrow-buttons">
        <button class="arrow-button arrow-left">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14"/>
            <path d="m12 5-7 7 7 7"/>
          </svg>
        </button>
        <button class="arrow-button arrow-right">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14"/>
            <path d="m12 5 7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
    
    <!-- 轮播容器 -->
    <div class="carousel-container" style="position: relative; overflow: hidden; height: auto;">
      <div class="carousel-track" style="display: flex; transition: transform 0.5s ease; will-change: transform; height: 100%;">
        <!-- Featured Communities 卡片 -->
        <div class="company-stat" style="background-image: url('../img/Lydia by Palace/1.png'); background-size: cover; background-position: center; position: relative; padding: 20px; display: flex; flex-direction: column; justify-content: flex-end; aspect-ratio: 9/16; flex-shrink: 0;">
          <h3 style="color: white; font-size: 20px; font-weight: bold; margin-bottom: 20px; margin-left: 0; margin-right: 0; z-index: 999; position: relative; text-align: left;">Terra Gardens</h3>
        </div>
        <div class="company-stat" style="background-image: url('../img/Stay up to date on the latest off-plan launches/2.jpg'); background-size: cover; background-position: center; position: relative; padding: 20px; display: flex; flex-direction: column; justify-content: flex-end; aspect-ratio: 9/16; flex-shrink: 0;">
          <h3 style="color: white; font-size: 20px; font-weight: bold; margin-bottom: 20px; margin-left: 0; margin-right: 0; z-index: 999; position: relative; text-align: left;">Greenridge</h3>
        </div>
        <div class="company-stat" style="background-image: url('../img/Stay up to date on the latest off-plan launches/3.jpg'); background-size: cover; background-position: center; position: relative; padding: 20px; display: flex; flex-direction: column; justify-content: flex-end; aspect-ratio: 9/16; flex-shrink: 0;">
          <h3 style="color: white; font-size: 20px; font-weight: bold; margin-bottom: 20px; margin-left: 0; margin-right: 0; z-index: 999; position: relative; text-align: left;">DAMAC Islands</h3>
        </div>
        <div class="company-stat" style="background-image: url('../img/Stay up to date on the latest off-plan launches/L2.png'); background-size: cover; background-position: center; position: relative; padding: 20px; display: flex; flex-direction: column; justify-content: flex-end; aspect-ratio: 9/16; flex-shrink: 0;">
          <h3 style="color: white; font-size: 20px; font-weight: bold; margin-bottom: 20px; margin-left: 0; margin-right: 0; z-index: 999; position: relative; text-align: left;">Lyvia by Palace</h3>
        </div>
      </div>
    </div>
    
    <!-- 查看更多按钮 -->
    <div style="text-align: center; margin-top: 1rem;">
      <button onclick="window.location.href='http://localhost:5173/public/communities.html'" style="padding: 1rem 2rem; background-color: #0a1f44; color: white; border: none; border-radius: 50px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
        View All Communities
      </button>
    </div>
  `;
  
  // 实现轮播功能
  const carouselScript = document.createElement('script');
  carouselScript.textContent = `
    (function() {
      // 获取轮播相关元素
      const track = document.querySelector('.carousel-track');
      const slides = track.querySelectorAll('.company-stat');
      const leftButton = document.querySelector('.arrow-left');
      const rightButton = document.querySelector('.arrow-right');
      const container = document.querySelector('.carousel-container');
      
      // 配置参数
      const slidesPerView = 4; // 每次显示4个卡片
      const slideGap = 15; // 卡片之间的间隙
      const totalSlides = slides.length;
      const slideWidth = (container.offsetWidth - (slideGap * (slidesPerView - 1))) / slidesPerView;
      const totalCardWidth = slideWidth + slideGap; // 每张卡片的总宽度（包括间隙）
      
      // 状态管理
      let currentIndex = 0;
      let isTransitioning = false;
      let slideInterval;
      
      // 初始化轮播
      function initCarousel() {
        // 为原始卡片设置样式
        slides.forEach((slide, index) => {
          slide.style.width = slideWidth + "px";
          slide.style.minWidth = slideWidth + "px";
          slide.style.maxWidth = slideWidth + "px";
          slide.style.marginRight = index === slides.length - 1 ? "0" : slideGap + "px";
          // 确保卡片使用9:16的尺寸
          slide.style.aspectRatio = "9/16";
        });
        
        // 复制卡片以实现无缝轮播
        duplicateSlides();
        
        // 初始位置
        updatePosition(false);
        
        // 开始自动轮播
        startAutoSlide();
        
        // 添加事件监听
        leftButton.addEventListener("click", prevSlide);
        rightButton.addEventListener("click", nextSlide);
        container.addEventListener("mouseenter", pauseAutoSlide);
        container.addEventListener("mouseleave", startAutoSlide);
        window.addEventListener("resize", handleResize);
        
        // 添加拖拽功能
        setupDrag();
      }
      
      // 设置所有卡片的样式（包括克隆卡片）
      function setAllSlidesStyle() {
        const allSlides = track.querySelectorAll('.company-stat');
        allSlides.forEach((slide, index) => {
          slide.style.width = slideWidth + "px";
          slide.style.minWidth = slideWidth + "px";
          slide.style.maxWidth = slideWidth + "px";
          // 为所有卡片设置间隙，除了最后一张
          slide.style.marginRight = index === allSlides.length - 1 ? "0" : slideGap + "px";
          // 确保卡片使用9:16的尺寸
          slide.style.aspectRatio = "9/16";
        });
      }
      
      // 复制卡片以实现无缝轮播
      function duplicateSlides() {
        // 复制所有卡片并添加到轨道末尾
        slides.forEach(slide => {
          const clone = slide.cloneNode(true);
          clone.classList.add('clone');
          track.appendChild(clone);
        });
        
        // 为所有卡片（包括克隆卡片）设置样式
        setAllSlidesStyle();
      }
      
      // 更新轮播位置
      function updatePosition(withTransition = true) {
        if (withTransition) {
          track.style.transition = "transform 0.5s ease";
          isTransitioning = true;
        } else {
          track.style.transition = "none";
        }
        
        // 计算偏移量
        const offset = -currentIndex * totalCardWidth;
        track.style.transform = "translateX(" + offset + "px)";
        
        // 监听过渡结束事件
        if (withTransition) {
          track.addEventListener("transitionend", handleTransitionEnd);
        }
      }
      
      // 处理过渡结束事件
      function handleTransitionEnd() {
        isTransitioning = false;
        track.removeEventListener("transitionend", handleTransitionEnd);
        
        // 无缝循环逻辑
        if (currentIndex >= totalSlides) {
          // 当滚动到复制的卡片时，重置到对应的原始卡片位置
          currentIndex = currentIndex % totalSlides;
          updatePosition(false);
        } else if (currentIndex < 0) {
          // 向左滚动到开头时，重置到对应的末尾位置
          currentIndex = totalSlides - 1;
          updatePosition(false);
        }
      }
      
      // 下一张
      function nextSlide() {
        if (isTransitioning) return;
        
        currentIndex++;
        updatePosition();
        resetAutoSlide();
      }
      
      // 上一张
      function prevSlide() {
        if (isTransitioning) return;
        
        currentIndex--;
        updatePosition();
        resetAutoSlide();
      }
      
      // 自动轮播
      function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 10000);
      }
      
      // 暂停自动轮播
      function pauseAutoSlide() {
        clearInterval(slideInterval);
      }
      
      // 重置自动轮播
      function resetAutoSlide() {
        pauseAutoSlide();
        startAutoSlide();
      }
      
      // 响应式处理
      function handleResize() {
        // 重新计算卡片宽度
        const newSlideWidth = (container.offsetWidth - (slideGap * (slidesPerView - 1))) / slidesPerView;
        const newTotalCardWidth = newSlideWidth + slideGap;
        
        // 更新所有卡片的宽度和样式
        const allSlides = track.querySelectorAll('.company-stat');
        allSlides.forEach((slide, index) => {
          slide.style.width = newSlideWidth + "px";
          slide.style.minWidth = newSlideWidth + "px";
          slide.style.maxWidth = newSlideWidth + "px";
          slide.style.marginRight = index === allSlides.length - 1 ? "0" : slideGap + "px";
          // 确保卡片使用9:16的尺寸
          slide.style.aspectRatio = "9/16";
        });
        
        // 更新位置
        updatePosition(false);
      }
      
      // 拖拽功能
      function setupDrag() {
        let startX = 0;
        let isDragging = false;
        let startIndex = 0;
        
        track.addEventListener("mousedown", startDrag);
        track.addEventListener("touchstart", startDrag, { passive: true });
        
        document.addEventListener("mousemove", drag);
        document.addEventListener("touchmove", drag, { passive: false });
        
        document.addEventListener("mouseup", endDrag);
        document.addEventListener("touchend", endDrag);
        document.addEventListener("mouseleave", endDrag);
        
        function startDrag(e) {
          if (isTransitioning) return;
          
          isDragging = true;
          startIndex = currentIndex;
          startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
          
          // 移除过渡效果，使拖拽更流畅
          track.style.transition = "none";
          
          // 暂停自动轮播
          pauseAutoSlide();
        }
        
        function drag(e) {
          if (!isDragging) return;
          
          // 阻止默认行为以避免页面滚动
          e.preventDefault();
          
          const currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
          const diff = currentX - startX;
          
          // 计算当前偏移量
          const baseOffset = -startIndex * totalCardWidth;
          const dragOffset = diff;
          track.style.transform = "translateX(" + (baseOffset + dragOffset) + "px)";
        }
        
        function endDrag() {
          if (!isDragging) return;
          isDragging = false;
          
          // 恢复过渡效果
          track.style.transition = "transform 0.5s ease";
          
          // 计算拖拽距离
          const currentX = e.type.includes('mouse') ? e.clientX : (e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientX : startX);
          const diff = currentX - startX;
          const threshold = slideWidth * 0.3; // 30% 的阈值
          
          // 根据拖拽方向更新索引
          if (diff < -threshold) {
            // 向左拖拽，显示下一张
            currentIndex = startIndex + 1;
          } else if (diff > threshold) {
            // 向右拖拽，显示上一张
            currentIndex = startIndex - 1;
          } else {
            // 拖拽距离不足，恢复原位置
            currentIndex = startIndex;
          }
          
          // 更新位置
          updatePosition();
          
          // 重启自动轮播
          startAutoSlide();
        }
      }
      
      // 初始化轮播
      initCarousel();
    })();
  `;
  statsSection.appendChild(carouselScript);
  
  // 创建Awards部分
  const awardsSection = document.createElement('section');
  awardsSection.className = 'awards';
  awardsSection.innerHTML = `
    <div class="section-header">
      <div class="news-header-text" style="text-align: center;">
        <h2>Awards</h2>
      </div>
    </div>
    
    <div class="awards-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; padding: 20px;">
      <div class="awards-card" style="position: relative; width: 100%; padding-bottom: 56.25%; overflow: hidden; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);">
        <img src="/images_new/Awards/awards (1).png" alt="Award 1" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;">
      </div>
      <div class="awards-card" style="position: relative; width: 100%; padding-bottom: 56.25%; overflow: hidden; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);">
        <img src="/images_new/Awards/awards (4).png" alt="Award 2" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;">
      </div>
      <div class="awards-card" style="position: relative; width: 100%; padding-bottom: 56.25%; overflow: hidden; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);">
        <img src="/images_new/Awards/awards (13).png" alt="Award 3" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;">
      </div>
      <div class="awards-card" style="position: relative; width: 100%; padding-bottom: 56.25%; overflow: hidden; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);">
        <img src="/images_new/Awards/awards (14).png" alt="Award 4" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;">
      </div>
      <div class="awards-card" style="position: relative; width: 100%; padding-bottom: 56.25%; overflow: hidden; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);">
        <img src="/images_new/Awards/awards (15).png" alt="Award 5" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;">
      </div>
      <div class="awards-card" style="position: relative; width: 100%; padding-bottom: 56.25%; overflow: hidden; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);">
        <img src="/images_new/Awards/awards (16).png" alt="Award 6" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;">
      </div>
      <div class="awards-card" style="position: relative; width: 100%; padding-bottom: 56.25%; overflow: hidden; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);">
        <img src="/images_new/Awards/awards (17).png" alt="Award 7" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;">
      </div>
      <div class="awards-card" style="position: relative; width: 100%; padding-bottom: 56.25%; overflow: hidden; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);">
        <img src="/images_new/Awards/awards (18).png" alt="Award 8" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;">
      </div>
    </div>
  `;
  
  // 创建News部分
  const newsInsightsSection = document.createElement('section');
  newsInsightsSection.id = 'news-insights';
  newsInsightsSection.className = 'news';
  
  // News区域内容（复制Your Home的结构）
  newsInsightsSection.innerHTML = `
    <div class="section-header">
      <div class="news-header-container" style="display: flex; justify-content: center; align-items: center; width: 100%;">
        <div class="news-header-text">
          <h2>News & Insights</h2>
        </div>
      </div>
    </div>
    
    <div class="news-grid" style="display: flex; overflow-x: auto; overflow-y: hidden; scroll-behavior: smooth; white-space: nowrap; padding: 10px 0; width: calc(100% + 20px); margin-left: -10px;">
      <div class="news-card" style="aspect-ratio: 1/1; overflow: hidden; max-width: 200px; max-height: 200px; margin: 0 10px; display: inline-block; flex-shrink: 0;">
        <div class="news-image-container" style="width: 100%; height: 100%; position: relative;">
          <img src="/img/news/news1.png" alt="Lyvia By Palace Project" style="width: 100%; height: 100%; object-fit: cover;" />
          <div style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); background-color: white; border-radius: 30px; padding: 8px 20px; font-size: 14px; color: #2c2c54; text-align: center; white-space: nowrap;">Ready-to-Move-1</div>
        </div>
      </div>
      
      <div class="news-card" style="aspect-ratio: 1/1; overflow: hidden; max-width: 200px; max-height: 200px; margin: 0 10px; display: inline-block; flex-shrink: 0;">
        <div class="news-image-container" style="width: 100%; height: 100%; position: relative;">
          <img src="/img/news/news2.png" alt="SOLAYA: New Luxury Residence at Dubai's La Mer Beach" style="width: 100%; height: 100%; object-fit: cover;" />
          <div style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); background-color: white; border-radius: 30px; padding: 8px 20px; font-size: 14px; color: #2c2c54; text-align: center; white-space: nowrap;">Ready-to-Move-2</div>
        </div>
      </div>
      
      <div class="news-card" style="aspect-ratio: 1/1; overflow: hidden; max-width: 200px; max-height: 200px; margin: 0 10px; display: inline-block; flex-shrink: 0;">
        <div class="news-image-container" style="width: 100%; height: 100%; position: relative;">
          <img src="/img/news/news3.png" alt="UAE Real Estate Market Report" style="width: 100%; height: 100%; object-fit: cover;" />
          <div style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); background-color: white; border-radius: 30px; padding: 8px 20px; font-size: 14px; color: #2c2c54; text-align: center; white-space: nowrap;">Ready-to-Move-3</div>
        </div>
      </div>
      
      <!-- 添加三个新卡片 -->
      <div class="news-card" style="aspect-ratio: 1/1; overflow: hidden; max-width: 200px; max-height: 200px; margin: 0 10px; display: inline-block; flex-shrink: 0;">
        <div class="news-image-container" style="width: 100%; height: 100%; position: relative;">
          <img src="/img/news/news4.png" alt="Service Charges Before Handover" style="width: 100%; height: 100%; object-fit: cover;" />
          <div style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); background-color: white; border-radius: 30px; padding: 8px 20px; font-size: 14px; color: #2c2c54; text-align: center; white-space: nowrap;">Ready-to-Move-4</div>
        </div>
      </div>
      
      <div class="news-card" style="aspect-ratio: 1/1; overflow: hidden; max-width: 200px; max-height: 200px; margin: 0 10px; display: inline-block; flex-shrink: 0; background-color: white;">
        <div class="news-image-container" style="width: 100%; height: 100%; position: relative;">
          <img src="/img/news/news5.png" alt="RAK Green Hydrogen Investment" style="width: 100%; height: 100%; object-fit: cover;" />
          <div style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); background-color: white; border-radius: 30px; padding: 8px 20px; font-size: 14px; color: #2c2c54; text-align: center; white-space: nowrap;">Ready-to-Move-5</div>
        </div>
      </div>
      
      <div class="news-card" style="aspect-ratio: 1/1; overflow: hidden; max-width: 200px; max-height: 200px; margin: 0 10px; display: inline-block; flex-shrink: 0; background-color: white;">
        <div class="news-image-container" style="width: 100%; height: 100%; position: relative;">
          <img src="/img/news/news6.png" alt="Dubai's Population Growth" style="width: 100%; height: 100%; object-fit: cover;" />
          <div style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); background-color: white; border-radius: 30px; padding: 8px 20px; font-size: 14px; color: #2c2c54; text-align: center; white-space: nowrap;">Ready-to-Move-6</div>
        </div>
      </div>
    </div>
  `;
  
  // 创建联系区域
  const contactSection = document.createElement('section');
  contactSection.id = 'contact';
  contactSection.className = 'contact';
  contactSection.style.cssText = 'width: 100%; height: 230px; overflow: visible; box-sizing: border-box; background: linear-gradient(to right, #f0f2f5, #1e2a78); position: relative;';
  contactSection.innerHTML = `
    <div class="contact-content" style="display: flex; align-items: center; justify-content: space-between; padding: 2rem; max-width: 1200px; margin: 0 auto; height: 100%; box-sizing: border-box;">
      <div style="z-index: 1;">
        <h2 style="font-size: 2rem; font-weight: 700; color: #ffffff; margin-bottom: 0.5rem;">Our Expert Will Help You</h2>
        <p style="font-size: 1rem; font-weight: 300; color: #ffffff; margin-bottom: 1.5rem;">Feel free to contact us at any time, we are online 24/7</p>
        <button style="background-color: #ffffff; color: #1e2a78; font-size: 1rem; font-weight: 600; padding: 0.75rem 2rem; border: none; border-radius: 50px; cursor: pointer; transition: all 0.3s ease;">Get In Touch</button>
      </div>
      <img src="/png/627e0f1b-5ef6-40c3-90d8-7a1d97e46093.png" alt="Contact us" style="height: 305px; width: auto; object-fit: contain; position: absolute; right: 0; bottom: -60px;" />
    </div>
  `;
  
  // 然后将联系区域添加到body
  document.body.appendChild(contactSection);
  
  // 创建页脚
  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.innerHTML = `
    <div class="footer-container">
      <!-- 链接和联系信息区域 -->
      <div class="footer-links-container">
        <!-- Newsletter部分 -->
        <div class="footer-newsletter-section">
          <!-- 输入框和按钮容器 -->
          <div class="form-input-group">
            <!-- 标题和副标题 -->
            <div class="form-header">
              <h3 class="form-title">Newsletter</h3>
              <p class="form-subtitle">Subscribe for our weekly newsletter and marketing updates</p>
            </div>
            
            <!-- 输入框行 -->
            <div class="form-row">
              <input type="email" placeholder="Your Email" data-translate-placeholder="formEmailPlaceholder" required />
            </div>
            
            <!-- 提交按钮 -->
            <div class="form-submit">
              <button type="button" onclick="this.closest('form').dispatchEvent(new Event('submit'))" data-translate="formSubmitButton">Send Message</button>
            </div>
          </div>
        </div>
        
        <!-- Quick Links部分 -->
        <div class="footer-links-section">
          <h3 class="quick-links-title">Quick Links</h3>
          <div class="quick-links-list">
            <a href="#">Buy</a>
            <a href="#communities">Communities</a>
            <a href="#developers">Developers</a>
            <a href="#services">Services</a>
            <a href="#about">About Us</a>
          </div>
        </div>
        
        <!-- Contact Us部分 -->
        <div class="footer-contact-section">
          <h3 class="contact-us-title">Contact Us</h3>
          <div class="contact-info">
            <p class="contact-address">Floor 13, Blue Bay Tower,<br>Business Bay, Dubai, UAE</p>
            <p class="contact-phone">+97180032632</p>
            <p class="contact-email">inquiry@dandbdubai.com</p>
          </div>
        </div>
        
        <!-- Social Media部分 -->
        <div class="footer-social-section">
          <h3 class="social-label">Social Media</h3>
          <!-- 社交媒体图标 -->
          <div class="social-links">
            <a href="https://www.linkedin.com/company/signature-home-real-estate/" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
            <a href="https://www.instagram.com/signaturehomes.uae/" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="https://www.youtube.com/@SignatureHomeUae" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
            <a href="https://www.facebook.com/signaturehomesproperties" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 底部条款区域 -->
    <div class="footer-bottom">
      <div class="footer-terms">
        <a href="#" data-translate="footerPrivacyPolicy">Privacy Policy</a>
        <a href="#" data-translate="footerTermsOfService">Terms of Service</a>
        <a href="#" data-translate="footerCookiePolicy">Cookie Policy</a>
      </div>
    </div>
    
    <style>
      .footer {
        background: linear-gradient(to right, #1147AB, #0C1559);
        color: #ffffff;
        padding: 3rem 2rem;
        position: relative;
        margin-top: 0;
      }
      
      .footer-container {
        max-width: 1400px;
        margin: 0 auto;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 3rem;
        flex-wrap: wrap;
      }
      
      /* 链接容器样式 */
      .footer-links-container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        gap: 3rem;
        flex-wrap: wrap;
        align-items: start;
      }
      
      /* 各部分通用样式 */
      .footer-newsletter-section,
      .footer-links-section,
      .footer-contact-section,
      .footer-social-section {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        align-items: flex-start;
        justify-content: flex-start;
      }
      
      /* Quick Links样式 */
      .quick-links-title {
        color: #ffffff;
        font-size: 1.5rem;
        font-weight: normal;
        margin: 0;
        padding: 0;
        font-family: 'Roboto', sans-serif;
      }
      
      .quick-links-list {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        margin-top: 0;
      }
      
      .quick-links-list a {
        color: rgba(255, 255, 255, 0.9);
        text-decoration: none;
        font-size: 1rem;
        transition: color 0.3s ease;
        font-family: 'Roboto', sans-serif;
      }
      
      .quick-links-list a:hover {
        color: #ffffff;
      }
      
      /* Contact Us样式 */
      .contact-us-title {
        color: #ffffff;
        font-size: 1.5rem;
        font-weight: normal;
        margin: 0;
        padding: 0;
        font-family: 'Roboto', sans-serif;
      }
      
      .contact-info {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        margin-top: 0;
      }
      
      .contact-address,
      .contact-phone,
      .contact-email {
        color: rgba(255, 255, 255, 0.9);
        font-size: 1rem;
        margin: 0;
        font-family: 'Roboto', sans-serif;
        line-height: 1.5;
      }
      
      .contact-email {
        text-decoration: none;
        transition: color 0.3s ease;
        display: inline-block;
      }
      
      .contact-email:hover {
        color: #ffffff;
      }
      
      /* 社交媒体区域样式 */
      .social-label {
        color: #ffffff;
        font-size: 1.5rem;
        font-weight: normal;
        margin: 0;
        font-family: 'Roboto', sans-serif;
      }
      
      .footer-brand {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      
      .footer-tagline {
        color: rgba(255, 255, 255, 0.8);
        font-size: 1rem;
        max-width: 300px;
      }
      
      /* 移除重复的网格布局定义 */
      
      .footer-column h4 {
        font-size: 1.1rem;
        margin-bottom: 1rem;
        color: #ffffff;
      }
      
      .footer-links {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
      }
      
      .footer-links li a {
        color: rgba(255, 255, 255, 0.8);
        text-decoration: none;
        transition: color 0.3s ease;
      }
      
      .footer-links li a:hover {
        color: #ffffff;
      }
      
      .footer-links li {
        color: rgba(255, 255, 255, 0.8);
      }
      
      .footer-social-subscribe {
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }
      
      .social-links {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
      }
      
      .social-link {
        color: #888888;
        text-decoration: none;
        transition: color 0.3s ease;
        background: none;
        border: none;
        border-radius: 0;
        padding: 0;
        display: inline-block;
        width: auto;
        height: auto;
      }
      
      .social-link:hover {
        color: #ffffff;
      }
      
      /* 确保Font Awesome图标没有背景 */
      .social-link i {
        background: none;
        border: none;
        border-radius: 0;
        padding: 0;
        display: inline-block;
        font-size: 1.5rem; /* 放大图标 */
      }
      
      /* Newsletter样式 */
      .footer-newsletter-section {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        align-items: flex-start;
        justify-content: flex-start;
      }
      
      /* Newsletter表单样式 */
      .form-input-group {
        background-color: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        min-width: 280px;
      }
      
      .form-title {
        color: #1147AB;
        font-size: 1.5rem;
        font-weight: bold;
        margin: 0 0 0.5rem;
        font-family: 'Roboto', sans-serif;
      }
      
      .form-subtitle {
        color: #666666;
        font-size: 0.9rem;
        margin: 0 0 1.5rem;
        font-family: 'Roboto', sans-serif;
        line-height: 1.4;
      }
      
      .form-row {
        margin-bottom: 1.5rem;
      }
      
      .form-row input {
        width: 100%;
        padding: 0.75rem 1rem;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        font-size: 1rem;
        font-family: 'Roboto', sans-serif;
      }
      
      .form-row input:focus {
        outline: none;
        border-color: #1147AB;
        box-shadow: 0 0 0 2px rgba(17, 71, 171, 0.1);
      }
      
      .form-submit button {
        background-color: #1147AB;
        color: white;
        border: none;
        border-radius: 4px;
        width: 100%;
        padding: 0.75rem 1rem;
        font-size: 1rem;
        font-family: 'Roboto', sans-serif;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }
      
      .form-submit button:hover {
        background-color: #0C388A;
      }
      
      .footer-subscribe p {
        color: rgba(255, 255, 255, 0.8);
        margin-bottom: 1rem;
        font-size: 0.9rem;
      }
      
      .footer-bottom {
        max-width: 1400px;
        margin: 2rem auto 0;
        padding-top: 2rem;
        display: flex;
        justify-content: center; /* 内容居中对齐 */
        align-items: center;
      }
      
      .footer-terms {
        display: flex;
        gap: 1.5rem;
      }
      
      .footer-terms a {
        color: rgba(255, 255, 255, 0.8);
        text-decoration: none;
        font-size: 0.9rem;
        transition: color 0.3s ease;
      }
      
      .footer-terms a:hover {
        color: #ffffff;
      }
      
      @media (max-width: 992px) {
        .footer-container {
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        
        .footer-links-container {
          grid-template-columns: repeat(2, 1fr);
        }
        
        .footer-newsletter-section {
          grid-column: 1 / -1;
        }
        
        .footer-bottom {
          flex-direction: column;
          gap: 1rem;
          text-align: center;
        }
      }
      
      @media (max-width: 576px) {
        .footer-links-container {
          grid-template-columns: 1fr;
        }
        
        .footer-newsletter-section {
          grid-column: 1;
        }
        
        .social-links {
          flex-wrap: wrap;
        }
        
        .subscribe-form {
          flex-direction: column;
          gap: 0.8rem;
        }
        
        .subscribe-form input {
          width: 100%;
        }
      }
    </style>
  `;
  
  // 创建公司介绍部分
  const companyIntroSection = document.createElement('section');
  companyIntroSection.id = 'company-intro';
  companyIntroSection.className = 'company-intro';
  companyIntroSection.innerHTML = `
    <div class="company-intro-content">
      <!-- 文本内容 -->
      <div class="company-intro-text">
        <h2 data-translate="companyIntroTitle">Stay up to date on the latest off-plan launches.</h2>
        <!-- 描述文本已移除 -->
        <div class="company-stats" style="display: flex; flex-wrap: nowrap; gap: 16px; padding: 16px 0; margin: 0 20px;">
          <div class="company-stat" style="background-image: url('../img/Stay up to date on the latest off-plan launches/1.jpg'); background-size: cover; background-position: center; position: relative; padding: 20px; display: flex; flex-direction: column; justify-content: flex-end; min-height: 300px; flex: 1; border-radius: 8px; overflow: hidden;">
            <button onclick="window.location.href='property-detail.html?property=lydia-by-palace'" style="position: absolute; top: 16px; right: 16px; width: 40px; height: 40px; border-radius: 50%; background-color: transparent; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 999; box-shadow: 0 2px 8px rgba(0,0,0,0.2);">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0a2463" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
            <div style="color: white; font-size: 20px; font-weight: bold; margin-bottom: 8px; margin-left: 16px; margin-right: 16px; z-index: 999; position: relative; text-align: left;">Terra Gardens</div>

          </div>
          <div class="company-stat" style="background-image: url('../img/Stay up to date on the latest off-plan launches/2.jpg'); background-size: cover; background-position: center; position: relative; padding: 20px; display: flex; flex-direction: column; justify-content: flex-end; min-height: 300px; flex: 1; border-radius: 8px; overflow: hidden;">
            <button onclick="window.location.href='property-detail.html?property=azure-residences'" style="position: absolute; top: 16px; right: 16px; width: 40px; height: 40px; border-radius: 50%; background-color: transparent; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 999; box-shadow: 0 2px 8px rgba(0,0,0,0.2);">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0a2463" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
            <div style="color: white; font-size: 20px; font-weight: bold; margin-bottom: 8px; margin-left: 16px; margin-right: 16px; z-index: 999; position: relative; text-align: left;">Greenridge</div>
          </div>
          <div class="company-stat" style="background-image: url('../img/Stay up to date on the latest off-plan launches/3.jpg'); background-size: cover; background-position: center; position: relative; padding: 20px; display: flex; flex-direction: column; justify-content: flex-end; min-height: 300px; flex: 1; border-radius: 8px; overflow: hidden;">
            <button onclick="window.location.href='property-detail.html?property=marina-vista'" style="position: absolute; top: 16px; right: 16px; width: 40px; height: 40px; border-radius: 50%; background-color: transparent; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 999; box-shadow: 0 2px 8px rgba(0,0,0,0.2);">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0a2463" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
            <div style="color: white; font-size: 20px; font-weight: bold; margin-bottom: 8px; margin-left: 16px; margin-right: 16px; z-index: 999; position: relative; text-align: left;">DAMAC Islands</div>
          </div>
          <div class="company-stat" style="background-image: url('../img/Stay up to date on the latest off-plan launches/L2.png'); background-size: cover; background-position: center; position: relative; padding: 20px; display: flex; flex-direction: column; justify-content: flex-end; min-height: 300px; flex: 1; border-radius: 8px; overflow: hidden;">
            <button onclick="window.location.href='property-detail.html?property=sky-heights'" style="position: absolute; top: 16px; right: 16px; width: 40px; height: 40px; border-radius: 50%; background-color: transparent; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 999; box-shadow: 0 2px 8px rgba(0,0,0,0.2);">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0a2463" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
            <div style="color: white; font-size: 20px; font-weight: bold; margin-bottom: 8px; margin-left: 16px; margin-right: 16px; z-index: 999; position: relative; text-align: left;">Lyvia by Palace</div>
          </div>
        </div>
      </div>
    </div>
  `;

  // 检查是否为独立页面（如featured-properties.html）
  // 如果是主页（包含完整的app结构）且app元素存在，则添加所有组件
  // 否则，只确保翻译功能正常工作
  if (!isStandalonePage && app) {
    // 将所有部分添加到应用中
    app.appendChild(header);
    app.appendChild(heroSection);
    app.appendChild(companyIntroSection);
    app.appendChild(propertiesSection);
    
    // 房产卡片添加完成后，重新初始化Call Us按钮
    initCallUsButtons();
    
    app.appendChild(aboutSection);
    app.appendChild(statsSection);
    // 将News部分添加到app，放置在前面
    app.appendChild(newsInsightsSection);
    
    // 将Awards部分添加到app
    app.appendChild(awardsSection);
    
    // 创建客户评价模块
    const testimonialsSection = document.createElement('section');
    testimonialsSection.className = 'testimonials-section';
    testimonialsSection.style.padding = '60px 20px';
    testimonialsSection.style.backgroundColor = '#f8f9fa';
    testimonialsSection.innerHTML = `
      <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
        <div class="section-header" style="text-align: center; margin-bottom: 50px;">
          <h2 style="font-size: 32px; font-weight: bold; color: #0a2463; margin-bottom: 16px; line-height: 1.3;">What Our Happy Clients Are Saying: Real Stories, Real Results!</h2>
          <p style="font-size: 16px; color: #555; max-width: 800px; margin: 0 auto; line-height: 1.6;">Discover how D&B Properties has helped clients achieve their real estate goals. From finding the perfect home to making smart investments, our client's stories reflect our commitment to excellence and personalised service.</p>
        </div>
        
        <div class="testimonials-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; justify-items: center;">
          <!-- 客户评价卡片 1 -->
          <div class="testimonial-card" style="background-color: white; border-radius: 12px; border: 1px solid #e0e0e0; padding: 30px; width: 100%; max-width: 280px; height: 280px; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box;">
            <p style="font-style: italic; color: #333; line-height: 1.6; margin-bottom: 20px;">"Genuinely the best Real Estate company in Dubai! I was impressed from the level of professionalism and the amount of diversity of products."</p>
            <div style="text-align: center;">
              <p style="font-weight: bold; color: #0a2463;">Mohamed Ouerghi</p>
            </div>
          </div>
          
          <!-- 客户评价卡片 2 -->
          <div class="testimonial-card" style="background-color: white; border-radius: 12px; border: 1px solid #e0e0e0; padding: 30px; width: 100%; max-width: 280px; height: 280px; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box;">
            <p style="font-style: italic; color: #333; line-height: 1.6; margin-bottom: 20px;">"If you are looking for one complete full house of activities towards your investments that you can trust then D&B is the place to go."</p>
            <div style="text-align: center;">
              <p style="font-weight: bold; color: #0a2463;">Miss Lizzy Njoga</p>
            </div>
          </div>
          
          <!-- 客户评价卡片 3 -->
          <div class="testimonial-card" style="background-color: white; border-radius: 12px; border: 1px solid #e0e0e0; padding: 30px; width: 100%; max-width: 280px; height: 280px; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box;">
            <p style="font-style: italic; color: #333; line-height: 1.6; margin-bottom: 20px;">"I've been a D & B client for a long time, and I can state that this organization is fantastic at dealing with customers. I recommend your firm to my friends."</p>
            <div style="text-align: center;">
              <p style="font-weight: bold; color: #0a2463;">Adriane Ewican</p>
            </div>
          </div>
          
          <!-- 客户评价卡片 4 -->
          <div class="testimonial-card" style="background-color: white; border-radius: 12px; border: 1px solid #e0e0e0; padding: 30px; width: 100%; max-width: 280px; height: 280px; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box;">
            <p style="font-style: italic; color: #333; line-height: 1.6; margin-bottom: 20px;">"D&B Properties was certainly helpful while I was looking for a new place. I can confirm that they deliver excellent service to their consumers."</p>
            <div style="text-align: center;">
              <p style="font-weight: bold; color: #0a2463;">Wynona Mae Yao</p>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // 将客户评价模块添加到app，放置在News模块之后，Get in Touch模块之前
    app.appendChild(testimonialsSection);
    
    app.appendChild(contactSection);
    app.appendChild(footer);
  }
  
  // 所有元素已添加到DOM或已确认是独立页面，现在更新翻译
  // 对于独立页面，直接执行翻译更新
  updateTranslatedElements();
  
  // 为首页新闻卡片的Read more按钮添加弹窗功能
  // 首先检查是否在首页
  if ((window.location.pathname === '/' || window.location.pathname === '/index.html') && !isStandalonePage) {
    // 创建优化后的新闻弹窗元素
        // 创建弹窗元素并作为全局变量
        window.newsModal = document.createElement('div');
        window.newsModal.className = 'news-modal';
        window.newsModal.id = 'news-modal';
        newsModal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <img id="modal-image" src="" alt="News image" />
          <div class="modal-overlay"></div>
          <div class="modal-title-overlay">
            <h3 id="modal-title-overlay" data-translate="modalTitle"></h3>
            <div class="modal-date-overlay">
              <i class="far fa-calendar-alt"></i>
              <span id="modal-date-overlay"></span>
            </div>
          </div>
          <div class="modal-close" id="modal-close" data-translate="modalClose">
            <i class="fas fa-times"></i>
          </div>
        </div>
        <div class="modal-body">
          <div class="modal-date" id="modal-date"></div>
          <h3 id="modal-title" data-translate="modalTitle"></h3>
          <p id="modal-content" data-translate="modalContent"></p>
          <p id="modal-content-more" data-translate="modalContentMore"></p>
        </div>
      </div>
    `;
    document.body.appendChild(newsModal);
    
    // 添加优化后的弹窗样式
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
      .news-modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        z-index: 1000;
        justify-content: center;
        align-items: center;
        padding: 20px;
        /* 移除backdrop-filter以提升性能 */
      animation: fadeIn 0.4s ease-out;
      }
      
      .news-modal.active {
        display: flex;
      }
      
      .modal-content {
        background-color: white;
        border-radius: 16px;
        overflow: hidden;
        max-width: 900px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 30px 80px rgba(0, 0, 0, 0.4);
        transform: scale(0.95);
        opacity: 0;
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s ease;
      }
      
      .news-modal.active .modal-content {
        transform: scale(1);
        opacity: 1;
      }
      
      .modal-header {
        position: relative;
        height: 320px;
        overflow: hidden;
      }
      
      .modal-header img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.6s ease;
      }
      
      .news-modal.active .modal-header img {
        transform: scale(1.05);
      }
      
      .modal-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 60%;
        background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
      }
      
      .modal-title-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 30px;
        color: white;
      }
      
      .modal-title-overlay h3 {
        font-size: 1.8rem;
        margin: 0 0 5px 0;
        font-weight: 600;
        text-shadow: 0 2px 4px rgba(0,0,0,0.3);
      }
      
      .modal-date-overlay {
        font-size: 0.9rem;
        opacity: 0.9;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .modal-date-overlay i {
        margin-right: 4px;
      }
      
      .modal-close {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 44px;
        height: 44px;
        background-color: rgba(255, 255, 255, 0.15);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        z-index: 10;
        /* 移除backdrop-filter以提升性能 */
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
      
      .modal-close:hover {
        background-color: rgba(255, 255, 255, 0.3);
        transform: scale(1.1) rotate(90deg);
      }
      
      .modal-body {
        padding: 40px;
      }
      
      .modal-date {
        display: none;
      }
      
      .modal-body h3 {
        display: none;
      }
      
      .modal-body p {
        line-height: 1.7;
        color: #333;
        margin-bottom: 20px;
        font-size: 1.05rem;
      }
      
      .modal-body p:last-child {
        margin-bottom: 0;
      }
      
      .modal-content::-webkit-scrollbar {
        width: 6px;
      }
      
      .modal-content::-webkit-scrollbar-track {
        background: #f1f1f1;
      }
      
      .modal-content::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 3px;
      }
      
      .modal-content::-webkit-scrollbar-thumb:hover {
        background: #555;
      }
      
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      
      @media (max-width: 768px) {
        .modal-header {
          height: 220px;
        }
        
        .modal-body {
          padding: 25px;
        }
        
        .modal-title-overlay {
          padding: 20px;
        }
        
        .modal-title-overlay h3 {
          font-size: 1.5rem;
        }
        
        .modal-body p {
          font-size: 1rem;
        }
        
        .modal-close {
          width: 38px;
          height: 38px;
          top: 15px;
          right: 15px;
        }
      }
      
      @media (max-width: 480px) {
        .news-modal {
          padding: 10px;
        }
        
        .modal-header {
          height: 180px;
        }
        
        .modal-title-overlay h3 {
          font-size: 1.3rem;
        }
      }
    `;
    document.head.appendChild(modalStyle);
    
    // 获取弹窗元素
     const modalClose = document.getElementById('modal-close');
     const modalImage = document.getElementById('modal-image');
     const modalDate = document.getElementById('modal-date');
     const modalDateOverlay = document.getElementById('modal-date-overlay');
     const modalTitle = document.getElementById('modal-title');
     const modalTitleOverlay = document.getElementById('modal-title-overlay');
     const modalContent = document.getElementById('modal-content');
     const modalContentMore = document.getElementById('modal-content-more');
    
    // 为所有新闻卡片添加点击事件，包括News & Insights区域
    const newsCards = document.querySelectorAll('#news-insights .news-card');
    
    newsCards.forEach((card, index) => {
      card.addEventListener('click', function(e) {
        e.preventDefault();
        
        // 获取当前新闻卡片
        const newsCard = this;
        
        // 提取新闻数据
        const imageSrc = newsCard.querySelector('.news-image-container img').src;
        
        // 获取当前语言
        currentLang = localStorage.getItem('preferredLanguage') || currentLang || 'en';
        
        // 根据卡片索引确定新闻ID
        let newsId = '';
        let title = '';
        let date = '2025-10-11'; // 默认日期
        
        // 根据卡片索引设置不同的新闻内容
        switch(index) {
          case 0:
            newsId = 'lyvia';
            title = 'Lyvia By Palace Project';
            break;
          case 1:
            newsId = 'solaya';
            title = 'SOLAYA: New Luxury Residence at Dubai\'s La Mer Beach';
            break;
          case 2:
            newsId = 'report';
            title = 'UAE Real Estate Market Report';
            break;
          case 3:
            newsId = 'serviceCharges';
            title = 'Service Charges Before Handover: A Must-Read for Dubai Property Owners';
            break;
          case 4:
            newsId = 'rakHydrogen';
            title = 'How RAK Green Hydrogen Investment is Driving an Economic and Real Estate Boom';
            break;
          case 5:
            newsId = 'dubaiPopulation';
            title = 'Dubai\'s Population Surpasses 4 Million as Emirate Targets 5 Million by 2030';
            break;
          default:
            newsId = 'default';
            title = 'Latest Real Estate News';
        }
        
        // 填充弹窗内容
        modalImage.src = imageSrc;
        modalImage.alt = title;
        modalDate.textContent = date;
        modalDateOverlay.textContent = date;
        
        // 显示弹窗标题
        modalTitle.textContent = title;
        modalTitleOverlay.textContent = title;
        
        // 根据新闻ID显示对应的内容
        if (newsId === 'lyvia') {
          modalContent.innerHTML = translations.lyviaModalContent || 'Stay tuned for more updates and detailed information.';
        } else if (newsId === 'solaya') {
          modalContent.innerHTML = translations.solayaModalContent || 'Stay tuned for more updates and detailed information.';
        } else if (newsId === 'report') {
          modalContent.innerHTML = translations.reportModalContent || 'Stay tuned for more updates and detailed information.';
        } else if (newsId === 'serviceCharges') {
          modalContent.innerHTML = translations.serviceChargesModalContent || 'Stay tuned for more updates and detailed information.';
        } else if (newsId === 'rakHydrogen') {
          modalContent.innerHTML = translations.rakHydrogenModalContent || 'Stay tuned for more updates and detailed information.';
        } else if (newsId === 'dubaiPopulation') {
          modalContent.innerHTML = translations.dubaiPopulationModalContent || 'Stay tuned for more updates and detailed information.';
        } else {
          modalContent.innerHTML = translations.defaultModalContent || 'Stay tuned for more updates and detailed information.';
        }
        
        // 清空额外内容区域
        modalContentMore.innerHTML = '';
        
        // 显示弹窗
        window.newsModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // 防止背景滚动
      });
    });
    
    // 继续支持原有的Read more按钮
    const newsLinks = document.querySelectorAll('.news-link');
    
    newsLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // 获取当前新闻卡片
        const newsCard = this.closest('.news-card');
        
        // 提取新闻数据
        const imageSrc = newsCard.querySelector('.news-image-container img').src;
        const date = newsCard.querySelector('.news-date')?.textContent || '2025-10-11';
        const title = newsCard.querySelector('.news-content h3')?.textContent || 'Latest Real Estate News';
        const content = newsCard.querySelector('.news-content p')?.textContent || '';
        
        // 获取当前语言
        currentLang = localStorage.getItem('preferredLanguage') || currentLang || 'en';
        
        // 根据标题确定是哪个新闻
        let newsId = '';
        
        if (title.includes('Lyvia By Palace')) {
          newsId = 'lyvia';
        } else if (title.includes('SOLAYA')) {
          newsId = 'solaya';
        } else if (title.includes('Report Analysis') || title.includes('报告分析')) {
          newsId = 'report';
        } else {
          newsId = 'default';
        }
        
        // 填充弹窗内容
        modalImage.src = imageSrc;
        modalImage.alt = title;
        modalDate.textContent = date;
        modalDateOverlay.textContent = date;
        
        // 显示弹窗标题
        modalTitle.textContent = title;
        modalTitleOverlay.textContent = title;
        
        // 根据新闻ID显示对应的内容
        if (newsId === 'lyvia') {
          modalContent.innerHTML = translations.lyviaModalContent || 'Stay tuned for more updates and detailed information.';
        } else if (newsId === 'solaya') {
          modalContent.innerHTML = translations.solayaModalContent || 'Stay tuned for more updates and detailed information.';
        } else if (newsId === 'report') {
          modalContent.innerHTML = translations.reportModalContent || 'Stay tuned for more updates and detailed information.';
        } else {
          modalContent.innerHTML = translations.defaultModalContent || 'Stay tuned for more updates and detailed information.';
        }
        
        // 清空额外内容区域
        modalContentMore.innerHTML = '';
        
        // 显示弹窗
        window.newsModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // 防止背景滚动
      });
    });
    
    // 关闭弹窗按钮事件
    modalClose.addEventListener('click', function() {
      window.newsModal.classList.remove('active');
      document.body.style.overflow = ''; // 恢复背景滚动
    });
    
    // 点击弹窗外部关闭
    window.newsModal.addEventListener('click', function(e) {
      if (e.target === window.newsModal) {
        window.newsModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
    
    // ESC键关闭弹窗
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && window.newsModal.classList.contains('active')) {
        window.newsModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
  
  // 为Learn More按钮添加点击事件，跳转到公司介绍页面
  const learnMoreButton = document.getElementById('learn-more-button');
  if (learnMoreButton) {
    learnMoreButton.addEventListener('click', () => {
      window.location.href = '/about.html';
    });
  }

  // 轮播功能已移除
  
  // 初始化房产卡片轮播
  function initPropertyCarousels() {
    // 简化版本，确保语法正确
    const propertyCarousels = document.querySelectorAll('.property-carousel');
    
    propertyCarousels.forEach(carousel => {
        const slidesContainer = carousel.querySelector('.carousel-slides');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const indicators = carousel.querySelectorAll('.carousel-indicator');
        let currentIndex = 0;
        let intervalId;
        
        // 添加左右箭头控制器
        const controlsContainer = document.createElement('div');
        controlsContainer.className = 'carousel-controls';
        
        const prevButton = document.createElement('button');
        prevButton.className = 'carousel-control carousel-prev';
        prevButton.innerHTML = '‹'; // 左箭头
        prevButton.setAttribute('aria-label', 'Previous slide');
        
        const nextButton = document.createElement('button');
        nextButton.className = 'carousel-control carousel-next';
        nextButton.innerHTML = '›'; // 右箭头
        nextButton.setAttribute('aria-label', 'Next slide');
        
        controlsContainer.appendChild(prevButton);
        controlsContainer.appendChild(nextButton);
        
        // 将控制器添加到轮播图容器中
        carousel.appendChild(controlsContainer);
      
      // 设置第一张幻灯片为可见
      if (slides.length > 0) {
        slides.forEach(slide => {
          slide.style.opacity = '0';
          slide.style.zIndex = '1';
        });
        slides[currentIndex].style.opacity = '1';
        slides[currentIndex].style.zIndex = '2';
        
        // 设置第一张指示器为激活状态
        if (indicators.length > 0) {
          indicators[currentIndex].classList.add('active');
        }
      }
      
      // 显示指定索引的幻灯片
      function showSlide(index) {
        // 确保索引有效
        index = ((index % slides.length) + slides.length) % slides.length;
        
        // 隐藏所有幻灯片
        slides.forEach(slide => {
          slide.style.opacity = '0';
          slide.style.zIndex = '1';
        });
        
        // 移除所有指示器的激活状态
        indicators.forEach(indicator => {
          indicator.classList.remove('active');
        });
        
        // 显示指定幻灯片
        slides[index].style.opacity = '1';
        slides[index].style.zIndex = '2';
        
        // 激活指定指示器
        indicators[index].classList.add('active');
        
        currentIndex = index;
      }
      
      // 保留停止轮播函数用于清理（如果有需要）
      function stopCarousel() {
        if (intervalId) {
          clearInterval(intervalId);
        }
      }
      
      // 为指示器添加点击事件，不再自动轮播
        indicators.forEach((indicator, index) => {
          indicator.addEventListener('click', () => {
            showSlide(index);
          });
        });
        
        // 为左右箭头按钮添加事件监听器
        prevButton.addEventListener('click', () => {
          // 切换到上一张幻灯片，循环显示
          const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
          showSlide(prevIndex);
        });
        
        nextButton.addEventListener('click', () => {
          // 切换到下一张幻灯片，循环显示
          const nextIndex = (currentIndex + 1) % slides.length;
          showSlide(nextIndex);
        });
        
        // 添加触摸滑动事件处理
        let touchStartX = 0;
        let touchEndX = 0;
        const minSwipeDistance = 50; // 最小滑动距离阈值
        
        // 触摸开始事件
        carousel.addEventListener('touchstart', (e) => {
          touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        // 触摸结束事件
        carousel.addEventListener('touchend', (e) => {
          touchEndX = e.changedTouches[0].screenX;
          handleSwipe();
        }, { passive: true });
        
        // 处理滑动逻辑
        function handleSwipe() {
          const swipeDistance = touchEndX - touchStartX;
          
          // 向左滑动（显示下一张）
          if (swipeDistance < -minSwipeDistance) {
            const nextIndex = (currentIndex + 1) % slides.length;
            showSlide(nextIndex);
          }
          // 向右滑动（显示上一张）
          else if (swipeDistance > minSwipeDistance) {
            const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(prevIndex);
          }
        }
        
        // 添加鼠标拖拽支持（桌面端滑动）
        let mouseDown = false;
        let mouseStartX = 0;
        
        carousel.addEventListener('mousedown', (e) => {
          mouseDown = true;
          mouseStartX = e.screenX;
          e.preventDefault(); // 防止选中文本
        });
        
        document.addEventListener('mousemove', (e) => {
          if (!mouseDown) return;
        });
        
        document.addEventListener('mouseup', (e) => {
          if (mouseDown) {
            mouseDown = false;
            const mouseEndX = e.screenX;
            const mouseSwipeDistance = mouseEndX - mouseStartX;
            
            if (mouseSwipeDistance < -minSwipeDistance) {
              // 向左拖拽
              const nextIndex = (currentIndex + 1) % slides.length;
              showSlide(nextIndex);
            } else if (mouseSwipeDistance > minSwipeDistance) {
              // 向右拖拽
              const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
              showSlide(prevIndex);
            }
          }
        });
    });
  }
  
  // 轮播功能已移除，不再需要初始化
  
  // 调用房产卡片轮播初始化函数
  initPropertyCarousels();
  
  // 实现爱心按钮点击变红和散色效果以及表单提交处理
  document.addEventListener('DOMContentLoaded', () => {
    // 处理联系表单提交 - 使用mailto链接直接发送邮件
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // 获取表单数据（当前表单只有邮箱字段）
        const email = contactForm.querySelector('input[type="email"]').value;
        
        // 获取当前语言的翻译
        const translations = {
          en: {
            validEmail: 'Please enter a valid email address',
            successMessage: 'Your email client will open to send your message. Thank you!',
            errorMessage: 'There was an error preparing your message. Please try again later.'
          },
          zh: {
            validEmail: '请输入有效的电子邮件地址',
            successMessage: '您的邮件客户端将打开以发送您的消息。谢谢！',
            errorMessage: '准备您的消息时出错。请稍后再试。'
          },
          ar: {
            validEmail: 'يرجى إدخال عنوان بريد إلكتروني صالح',
            successMessage: 'سيفتح عميل البريد الإلكتروني الخاص بك لإرسال رسالتك. شكرًا لك!',
            errorMessage: 'حدث خطأ أثناء إعداد رسالتك. يرجى المحاولة مرة أخرى لاحقًا.'
          }
        };
        
        const t = translations[currentLang];
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        
        // 验证邮箱格式
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          alert(t.validEmail);
          return;
        }
        
        try {
          // 显示发送中状态
          submitButton.disabled = true;
          submitButton.textContent = t.sendingMessage || 'Sending...';
          
          console.log('准备发送邮件到FormSubmit.co');
          console.log('目标邮箱:', 'wzm2383983461@163.com');
          console.log('访问者邮箱:', email);
          
          // 创建表单数据
          const formData = new FormData();
          formData.append('subject', 'Contact from Website Visitor');
          formData.append('message', `Visitor Email: ${email}`);
          formData.append('from_name', 'Website Visitor');
          formData.append('replyto', email);
          formData.append('_captcha', 'false');
          
          console.log('表单数据:', Object.fromEntries(formData));
          
          // 使用Fetch API调用我们自己的后端邮件发送API
          // 使用相对路径，确保在生产环境中也能正确访问
          const response = await fetch('/send-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              from_email: email
            })
          });
          
          console.log('FormSubmit.co响应状态:', response.status);
          console.log('FormSubmit.co响应头:', response.headers);
          
          const data = await response.json();
          console.log('FormSubmit.co响应数据:', data);
          
          if (response.ok) {
            // 创建并显示成功通知
            showNotification('已成功发送', 'success');
            
            // 重置表单
            contactForm.reset();
            
            // 记录信息到控制台
            console.log('Email sent successfully:', {
              visitorEmail: email,
              recipient: 'wzm2383983461@163.com',
              response: data
            });
          } else {
            // 创建并显示错误通知
            showNotification('发送失败', 'error');
            console.error('Email sending error:', {
              status: response.status,
              data: data
            });
            
            // 显示通知，让用户手动选择是否发送邮件
            console.log('显示通知，让用户手动选择是否发送邮件');
            showNotification('我们遇到了一些问题。请直接发送邮件到 wzm2383983461@163.com 与我们联系。', 'error');
          }
          
        } catch (error) {
          console.error('Error preparing message:', error);
          showNotification('无法打开邮件客户端。请直接发送邮件到 wzm2383983461@163.com', 'error');
        } finally {
          // 恢复按钮原始状态
          submitButton.disabled = false;
          submitButton.textContent = originalButtonText;
        }
      });
    }
    
    // 通知显示函数
    function showNotification(message, type = 'info') {
      // 检查是否已存在通知容器
      let notificationContainer = document.getElementById('notification-container');
      if (!notificationContainer) {
        // 创建通知容器
        notificationContainer = document.createElement('div');
        notificationContainer.id = 'notification-container';
        notificationContainer.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 9999;
          max-width: 300px;
        `;
        document.body.appendChild(notificationContainer);
      }
      
      // 创建通知元素
      const notification = document.createElement('div');
      notification.style.cssText = `
        padding: 15px;
        margin-bottom: 10px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        animation: slideIn 0.3s ease;
        ${type === 'success' ? 'background-color: #28a745;' : ''}
        ${type === 'error' ? 'background-color: #dc3545;' : ''}
        ${type === 'info' ? 'background-color: #17a2b8;' : ''}
      `;
      
      // 添加动画样式
      const style = document.createElement('style');
      style.textContent = `
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
      
      // 设置通知内容
      notification.textContent = message;
      
      // 添加到容器
      notificationContainer.appendChild(notification);
      
      // 5秒后自动移除通知
       setTimeout(() => {
         notification.style.animation = 'slideOut 0.3s ease';
         setTimeout(() => {
           notification.remove();
         }, 300);
       }, 5000);
     }

    // 实现爱心按钮点击变红和散色效果
    // 获取所有爱心按钮
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    
    // 为每个按钮添加点击事件
    favoriteButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        
        // 切换active类
        const isActive = button.classList.toggle('active');
        
        // 如果是点击后激活，创建散色效果
        if (isActive) {
          createHeartBurstEffect(button);
        }
      });
    });
    
    // 创建散色效果函数
    function createHeartBurstEffect(button) {
      const buttonRect = button.getBoundingClientRect();
      const buttonX = buttonRect.left + buttonRect.width / 2;
      const buttonY = buttonRect.top + buttonRect.height / 2;
      
      // 创建10个粒子
      for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.classList.add('heart-particle');
        
        // 随机位置 - 围绕按钮中心
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 40 + 20;
        const x = buttonX + Math.cos(angle) * radius - window.scrollX;
        const y = buttonY + Math.sin(angle) * radius - window.scrollY;
        
        // 设置粒子位置
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.opacity = '1';
        
        // 添加到body
        document.body.appendChild(particle);
        
        // 动画结束后移除粒子
        setTimeout(() => {
          particle.remove();
        }, 1000);
      }
    }
    
    // 实现房产卡片滑动控制
    function initPropertySlider() {
      // 获取滑块元素
      const sliderPrev = document.querySelector('.slider-btn.slider-prev');
      const sliderNext = document.querySelector('.slider-btn.slider-next');
      const propertiesGrid = document.querySelector('.properties-grid');
      
      if (!sliderPrev || !sliderNext || !propertiesGrid) return;
      
      // 计算滑动距离（单个卡片宽度 + 间距）
      const slideDistance = function() {
        // 获取卡片宽度（包括间距）
        const card = propertiesGrid.querySelector('.property-card');
        if (!card) return 300; // 默认值
        
        const cardWidth = card.offsetWidth;
        const computedStyle = window.getComputedStyle(propertiesGrid);
        const gap = parseInt(computedStyle.getPropertyValue('gap')) || 0;
        
        return cardWidth + gap;
      };
      
      // 滑动函数
      const slide = function(direction) {
        const distance = slideDistance();
        const currentScroll = propertiesGrid.scrollLeft;
        
        // 根据方向计算新的滚动位置
        let newScroll;
        if (direction === 'next') {
          newScroll = currentScroll + distance;
        } else {
          newScroll = currentScroll - distance;
        }
        
        // 平滑滚动到新位置
        propertiesGrid.scrollTo({
          left: newScroll,
          behavior: 'smooth'
        });
      };
      
      // 添加点击事件监听器
      sliderPrev.addEventListener('click', () => slide('prev'));
      sliderNext.addEventListener('click', () => slide('next'));
      
      // 响应式地控制按钮显示/隐藏
      function updateSliderButtonsVisibility() {
        if (propertiesGrid.scrollWidth <= propertiesGrid.clientWidth) {
          sliderPrev.style.display = 'none';
          sliderNext.style.display = 'none';
        } else {
          sliderPrev.style.display = 'flex';
          sliderNext.style.display = 'flex';
        }
      }
      
      // 初始化按钮可见性
      updateSliderButtonsVisibility();
      
      // 滚动时检查按钮可见性
      propertiesGrid.addEventListener('scroll', updateSliderButtonsVisibility);
      
      // 监听窗口大小变化，确保滑动距离准确 - 防抖处理
      let resizeTimeout;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          // 更新按钮可见性
          updateSliderButtonsVisibility();
        }, 200);
      });
    }
    
    // 初始化房产卡片滑动
    initPropertySlider();
    
    console.log('Page rendering completed successfully!');
  });

});
