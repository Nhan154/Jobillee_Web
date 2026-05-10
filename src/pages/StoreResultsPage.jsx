
import React from 'react';
import { Helmet } from 'react-helmet';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, ArrowLeft } from 'lucide-react';

function StoreResultsPage() {
  const [searchParams] = useSearchParams();
  const cityQuery = searchParams.get('city');
  const districtQuery = searchParams.get('district');

  const allStores = [
    {
      name: 'Jobillee Nguyễn Huệ',
      address: '123 Nguyễn Huệ, Quận 1, TP.HCM',
      phone: '028-3822-1234',
      hours: '8:00 - 22:00',
      city: 'hcm',
      district: 'q1'
    },
    {
      name: 'Jobillee Lê Lợi',
      address: '65 Lê Lợi, Quận 1, TP.HCM',
      phone: '028-3822-5678',
      hours: '8:00 - 22:00',
      city: 'hcm',
      district: 'q1'
    },
    {
      name: 'Jobillee Võ Văn Tần',
      address: '234 Võ Văn Tần, Quận 3, TP.HCM',
      phone: '028-3933-4567',
      hours: '8:00 - 22:00',
      city: 'hcm',
      district: 'q3'
    },
    {
      name: 'Jobillee Hoàng Kiếm',
      address: '45 Tràng Tiền, Hoàn Kiếm, Hà Nội',
      phone: '024-3826-1234',
      hours: '8:00 - 22:00',
      city: 'hn',
      district: 'hk'
    },
    {
      name: 'Jobillee Cầu Giấy',
      address: '78 Xuân Thủy, Cầu Giấy, Hà Nội',
      phone: '024-3754-5678',
      hours: '8:00 - 22:00',
      city: 'hn',
      district: 'cg'
    }
  ];

  const results = allStores.filter(store => {
    if (cityQuery && store.city !== cityQuery) return false;
    if (districtQuery && store.district !== districtQuery) return false;
    return true;
  });

  const getCityName = (code) => {
    const map = { 'hcm': 'TP. Hồ Chí Minh', 'hn': 'Hà Nội', 'dn': 'Đà Nẵng', 'ct': 'Cần Thơ' };
    return map[code] || 'Tất cả khu vực';
  };

  return (
    <>
      <Helmet>
        <title>Kết quả tìm kiếm cửa hàng - Jobillee Vietnam</title>
      </Helmet>

      <Header />

      <main className="min-h-screen bg-[rgb(var(--jobillee-cream))] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8">
            <Link to="/stores" className="inline-flex items-center text-[rgb(var(--jobillee-red))] font-semibold hover:underline mb-4">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Quay lại tìm kiếm
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-[rgb(var(--jobillee-dark))]" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Kết quả tìm kiếm
            </h1>
            <p className="text-gray-600 mt-2 text-lg">
              Khu vực: {cityQuery ? getCityName(cityQuery) : 'Tất cả'} | {results.length} cửa hàng được tìm thấy
            </p>
          </div>

          {results.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
              <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Không tìm thấy cửa hàng nào</h2>
              <p className="text-gray-500 mb-8">Vui lòng thử lại với khu vực khác.</p>
              <Button onClick={() => window.history.back()} variant="outline">
                Tìm kiếm lại
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((store, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                  <h3 className="text-xl font-bold text-[rgb(var(--jobillee-red))] mb-4">
                    {store.name}
                  </h3>
                  <div className="space-y-3 text-gray-600 flex-grow">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-900 leading-snug">{store.address}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      <a href={`tel:${store.phone}`} className="text-gray-900 hover:text-[rgb(var(--jobillee-red))] font-medium">
                        {store.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      <p className="text-gray-900">{store.hours}</p>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-6 bg-[rgb(var(--jobillee-yellow))] hover:bg-[rgb(var(--jobillee-yellow))]/90 text-[rgb(var(--jobillee-dark))] font-bold shadow-sm"
                  >
                    Xem đường đi
                  </Button>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}

export default StoreResultsPage;
