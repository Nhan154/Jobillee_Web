
import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Gift, Percent, Star, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { toast } from 'sonner';

function PromotionsPage() {
  const { claimPromotion, user } = useAuth();
  const navigate = useNavigate();

  const promotions = [
    {
      icon: Percent,
      title: 'Giảm 30% Combo Gia Đình',
      description: 'Áp dụng cho tất cả combo gia đình từ 4 người trở lên',
      validUntil: '30/04/2026',
      code: 'FAMILY30'
    },
    {
      icon: Gift,
      title: 'Mua 1 Tặng 1 Gà Rán',
      description: 'Mua 2 miếng gà rán tặng thêm 1 miếng cùng loại',
      validUntil: '25/04/2026',
      code: 'CHICKEN2FOR1'
    },
    {
      icon: Star,
      title: 'Combo Sinh Viên 39K',
      description: '1 miếng gà + 1 khoai tây + 1 nước ngọt chỉ 39.000đ',
      validUntil: '31/05/2026',
      code: 'STUDENT39'
    },
    {
      icon: Calendar,
      title: 'Thứ 2 Vui Vẻ',
      description: 'Giảm 20% tất cả đơn hàng vào thứ 2 hàng tuần',
      validUntil: 'Cả năm 2026',
      code: 'MONDAY20'
    }
  ];

  const handleClaim = (promo) => {
    if (!user) {
      toast.error('Vui lòng đăng nhập để nhận ưu đãi');
      navigate('/login');
      return;
    }
    const result = claimPromotion(promo);
    if (result.success) {
      toast.success('Đã lưu ưu đãi vào tài khoản của bạn!');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Khuyến mãi - Jobillee Vietnam</title>
        <meta name="description" content="Khám phá các chương trình khuyến mãi hấp dẫn tại Jobillee. Giảm giá lên đến 30%, combo ưu đãi và nhiều quà tặng." />
      </Helmet>

      <Header />

      <main>
        <section className="relative h-[300px] bg-gradient-to-r from-[rgb(var(--jobillee-yellow))] to-[rgb(var(--jobillee-orange))]">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="text-[rgb(var(--jobillee-dark))]">
              <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                KHUYẾN MÃI
              </h1>
              <p className="text-xl md:text-2xl">
                Ưu đãi hấp dẫn mỗi ngày
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {promotions.map((promo, index) => (
                <div key={index} className="bg-gradient-to-br from-[rgb(var(--jobillee-cream))] to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-[rgb(var(--jobillee-red))] rounded-full flex items-center justify-center">
                      <promo.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-2xl font-bold text-[rgb(var(--jobillee-dark))] mb-2">
                        {promo.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {promo.description}
                      </p>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Mã khuyến mãi:</span>
                      <span className="text-lg font-bold text-[rgb(var(--jobillee-red))]">
                        {promo.code}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Có hiệu lực đến:</span>
                      <span className="text-sm font-semibold text-[rgb(var(--jobillee-dark))]">
                        {promo.validUntil}
                      </span>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleClaim(promo)}
                    className="w-full bg-[rgb(var(--jobillee-red))] hover:bg-[rgb(var(--jobillee-red))]/90 text-white font-bold transition-all duration-200 active:scale-98"
                  >
                    Nhận Khuyến Mãi
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-[rgb(var(--jobillee-cream))]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-[rgb(var(--jobillee-red))] mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Điều khoản & Điều kiện
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-[rgb(var(--jobillee-red))] mt-1">•</span>
                <span>Mỗi mã khuyến mãi chỉ được sử dụng một lần cho mỗi đơn hàng</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[rgb(var(--jobillee-red))] mt-1">•</span>
                <span>Không áp dụng đồng thời nhiều chương trình khuyến mãi</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[rgb(var(--jobillee-red))] mt-1">•</span>
                <span>Khuyến mãi có thể thay đổi mà không cần báo trước</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[rgb(var(--jobillee-red))] mt-1">•</span>
                <span>Áp dụng tại tất cả cửa hàng Jobillee trên toàn quốc</span>
              </li>
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default PromotionsPage;
