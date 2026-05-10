import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import MenuItemCard from '../components/MenuItemCard.jsx';

function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('combo-ban-chay');
  const scrollRef = useRef(null);

  const categories = [
    { id: 'combo-ban-chay', name: 'COMBO BÁN CHẠY', highlight: true },
    { id: 'ga-gion', name: 'Gà Giòn Vui Vẻ' },
    { id: 'my-y', name: 'Mỳ Ý Sốt Bò Bằm' },
    { id: 'ga-cay', name: 'Gà Sốt Cay' },
    { id: 'burger', name: 'Burger' },
    { id: 'an-phu', name: 'Phần Ăn Phụ' },
    { id: 'trang-mieng', name: 'Tráng Miệng' },
    { id: 'thuc-uong', name: 'Thức Uống' }
  ];

  // Verified image to description mappings based on task specs
  const menuItems = {
    'combo-ban-chay': [
      { 
        name: 'Combo Một Mình Ăn Ngon', 
        price: '78,000đ', 
        description: '1 miếng gà giòn + 1 mì ý sốt bò bằm',
        image: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/c/a/cap_doi_an_y_78k_1g1m-compressed.jpg',
        isNew: true
      },
      { 
        name: 'Combo Cặp Đôi Ăn Ý 1', 
        price: '145,000đ', 
        description: '2 miếng gà giòn + 2 mì ý sốt bò bằm',
        image: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/c/a/cap_doi_an_y__2g2m-compressed.jpg'
      },
      { 
        name: 'Combo Cặp Đôi Ăn Ý 2', 
        price: '145,000đ', 
        description: '3 miếng gà giòn + 1 mì ý sốt bò bằm',
        image: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/c/a/cap_doi_an_y_145k_3g1m-compressed.jpg'
      },
      { 
        name: 'Combo Cả Nhà No Nê', 
        price: '185,000đ', 
        description: '4 miếng gà giòn + 2 mì ý sốt bò bằm',
        image: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/c/a/cap_doi_an_y_185k_3g2m-compressed.jpg'
      }
    ],
    'ga-gion': [
      { name: '1 miếng gà giòn', price: '30,000đ', image: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/g/_/g_gi_n_vui_v_-_8_1_1.png' },
      { name: '2 miếng gà giòn', price: '60,000đ', image: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/g/_/g_gi_n_vui_v_-_6_7_2.png' },
      { name: '4 miếng gà giòn', price: '116,000đ', image: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/g/_/g_gi_n_vui_v_-_6_7_2_1.png' },
      { name: '6 miếng gà giòn', price: '174,000đ', image: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/g/_/g_gi_n_vui_v_-_1_1.png' },
      { name: '2 gà + khoai + nước', price: '80,000đ', description: '2 miếng gà giòn + khoai tây vừa + nước ngọt thường', image: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/g/_/g_gi_n_vui_v_-_2.png' },
      { name: 'Cơm gà + súp + nước', price: '50,000đ', description: 'Cơm gà giòn + súp bí đỏ + nước ngọt', image: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/g/_/g_gi_n_vui_v_-_3.png' },
      { name: '1 gà + khoai + nước', price: '50,000đ', description: '1 miếng gà giòn + khoai tây vừa + nước ngọt thường', image: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/g/_/g_gi_n_vui_v_-_4.png' }
    ],
    'my-y': [
      { name: 'Mỳ Ý sốt bò bằm (Vừa)', price: '30,000đ', image: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/m/_/m_jolly_-_1-compressed.jpg' },
      { name: 'Mỳ Ý sốt bò bằm (Lớn)', price: '40,000đ', image: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/m/_/m_jolly_-_2-compressed.jpg' },
      { name: 'Gà + Mỳ Ý + Nước', price: '65,000đ', description: '1 miếng gà giòn vui vẻ + 1 mỳ ý sốt bò bằm + 1 nước ngọt', image: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/m/_/m_jolly_-_3.png' },
      { name: 'Mỳ lớn + 2 Gà XL + Khoai + Nước', price: '75,000đ', description: 'Mỳ ý sốt bò bằm lớn + 2 miếng gà giòn không xương + khoai tây vừa + nước ngọt', image: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/m/_/m_jolly_-_4-compressed_1.jpg' },
      { name: 'Mỳ lớn + 2 Gà XL + Nước', price: '65,000đ', description: 'Mỳ ý sốt bò bằm lớn + 2 miếng gà không xương + nước ngọt', image: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/m/_/m_jolly_-_5-compressed_1.jpg' }
    ],
    'ga-cay': [
      { name: 'Cơm gà sốt cay', price: '45,000đ', description: '1 miếng gà sốt cay + cơm', image: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/g/_/g_s_t_cay_-_6-compressed_1.jpg' },
      { name: '2 miếng gà sốt cay', price: '65,000đ', image: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/g/_/g_s_t_cay_-_1-compressed.jpg' },
      { name: '2 Gà cay + Khoai + Nước', price: '90,000đ', description: '2 miếng gà sốt cay + khoai tây + pepsi thường', image: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/g/_/g_s_t_cay_-_2-compressed.jpg' },
      { name: 'Cơm gà cay + Nước', price: '50,000đ', description: '1 miếng gà sốt cay + cơm + nước', image: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/g/_/g_s_t_cay_-_3-compressed.jpg' },
      { name: 'Cơm gà cay + Súp + Nước', price: '55,000đ', description: '1 cơm gà sốt cay + pepsi thường + súp bí đỏ', image: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/g/_/g_s_t_cay_-_4-compressed.jpg' },
      { name: '1 Gà cay + Khoai + Nước', price: '55,000đ', description: '1 miếng gà sốt cay + khoai tây + pepsi thường', image: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/g/_/g_s_t_cay_-_5-compressed.jpg' },
      { name: '1 miếng gà sốt cay', price: '35,000đ', image: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/g/_/g_s_t_cay_-_7-compressed.jpg' }
    ],
    'burger': [
      { name: 'Burger gà giòn + nước', price: '35,000đ', image: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/b/u/burger_-_1.png' },
      { name: 'Burger BBQ + Khoai + Nước', price: '50,000đ', image: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/b/u/burger_-_2.png' },
      { name: 'Burger BBQ + Nước', price: '35,000đ', image: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/b/u/burger_-_3.png' },
      { name: 'Burger BBQ', price: '30,000đ', image: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/b/u/burger_-_4.png' },
      { name: 'Burger gà giòn', price: '30,000đ', image: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/b/u/burger_-_5.png' },
      { name: 'Burger gà giòn + Khoai + Nước', price: '50,000đ', image: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/b/u/burger_-_6.png' }
    ],
    'an-phu': [
      { name: 'Khoai tây chiên (Lớn)', price: '25,000đ', image: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/p/h/ph_n_n_ph_-_1_2-compressed_1_1.jpg' },
      { name: 'Khoai viên rong biển', price: '25,000đ', image: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/p/h/ph_n_n_ph_-_3_4-compressed_1.jpg' },
      { name: 'Cánh gà sốt tiêu', price: '35,000đ', image: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/p/h/ph_n_n_ph_-_5.png' },
      { name: 'Khoai tây chiên (Vừa)', price: '20,000đ', image: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/p/h/ph_n_n_ph_-_6.png' }
    ],
    'trang-mieng': [
      { name: 'Bánh xoài đào', price: '15,000đ', image: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/m/_/m_n_tr_ng_mi_ng_-_1.png' },
      { name: 'Tropical Sundae', price: '20,000đ', image: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/m/_/m_n_tr_ng_mi_ng_-_2.png' },
      { name: 'Bánh Pie nhân khoai môn', price: '15,000đ', image: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/m/_/m_n_tr_ng_mi_ng_-_3.png' },
      { name: 'Kem sữa tươi', price: '5,000đ', image: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/m/_/m_n_tr_ng_mi_ng_-_4.png' },
      { name: 'Kem socola', price: '7,000đ', image: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/m/_/m_n_tr_ng_mi_ng_-_5.png' },
      { name: 'Kem Sundae Dâu', price: '15,000đ', image: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/m/_/m_n_tr_ng_mi_ng_-_6.png' }
    ],
    'thuc-uong': [
      { name: 'Pepsi Vừa', price: '10,000đ', image: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/t/h/th_c_u_ng_-_1.png' },
      { name: '7Up Vừa', price: '10,000đ', image: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/t/h/th_c_u_ng_-_5_6_1.png' },
      { name: 'Mirinda Vừa', price: '10,000đ', image: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/t/h/th_c_u_ng_-_7_8_1.png' },
      { name: 'Pepsi Lớn', price: '15,000đ', image: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/t/h/th_c_u_ng_-_9_10_1.png' },
      { name: '7Up Lớn', price: '15,000đ', image: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/t/h/th_c_u_ng_-_11_12_1.png' }
    ]
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth / 2;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Thực đơn - Jobillee Vietnam</title>
        <meta name="description" content="Khám phá thực đơn đa dạng của Jobillee với gà rán giòn tan, mỳ Ý, burger và nhiều món ngon khác. Đặt hàng ngay!" />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-muted/30 pb-24">
        {/* Menu Navigation */}
        <section className="sticky top-[88px] md:top-[104px] z-40 bg-background/95 backdrop-blur-md border-b shadow-sm py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 relative">
              <button 
                onClick={() => scroll('left')} 
                className="hidden md:flex p-2 rounded-full hover:bg-muted text-primary shrink-0 transition-colors shadow-sm bg-card border"
                aria-label="Previous categories"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div 
                ref={scrollRef}
                className="flex overflow-x-auto gap-3 pb-2 -mb-2 snap-x flex-1 scroll-smooth items-center"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <style dangerouslySetInnerHTML={{__html: `
                  div::-webkit-scrollbar { display: none; }
                `}} />
                
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`snap-start shrink-0 flex items-center gap-2 ${
                      category.highlight 
                        ? 'px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 whitespace-nowrap border-2 border-[rgb(var(--jobillee-yellow))] bg-[rgb(var(--jobillee-yellow))] text-[rgb(var(--jobillee-dark))] hover:opacity-90 shadow-md ' + (activeCategory === category.id ? 'ring-2 ring-offset-2 ring-[rgb(var(--jobillee-yellow))]' : '')
                        : `menu-tab ${activeCategory === category.id ? 'menu-tab-active' : 'menu-tab-inactive'}`
                    }`}
                  >
                    {category.highlight && <Star className="w-4 h-4 fill-current" />}
                    {category.name}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => scroll('right')} 
                className="hidden md:flex p-2 rounded-full hover:bg-muted text-primary shrink-0 transition-colors shadow-sm bg-card border"
                aria-label="Next categories"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* Menu Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
            >
              {menuItems[activeCategory]?.map((item, index) => (
                <MenuItemCard key={index} item={item} />
              ))}
            </motion.div>
          </AnimatePresence>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default MenuPage;