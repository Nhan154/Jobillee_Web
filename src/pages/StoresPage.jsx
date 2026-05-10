import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';

// Dummy stores data to show all locations by default
const STORES_DATA = [
  {
    id: 1,
    name: "Jobillee Nguyễn Thị Minh Khai",
    address: "123 Nguyễn Thị Minh Khai, Phường Bến Thành, Quận 1, TP.HCM",
    phone: "028 3930 1234",
    hours: "09:00 - 22:00",
    features: ["Có chỗ đậu ô tô", "Phòng tổ chức tiệc"],
    city: "hcm"
  },
  {
    id: 2,
    name: "Jobillee Vincom Landmark 81",
    address: "Tầng B1, Vincom Center Landmark 81, 722 Điện Biên Phủ, Phường 22, Quận Bình Thạnh, TP.HCM",
    phone: "028 3512 5678",
    hours: "10:00 - 22:00",
    features: ["Khu vui chơi trẻ em"],
    city: "hcm"
  },
  {
    id: 3,
    name: "Jobillee Aeon Mall Tân Phú",
    address: "Tầng 3, Aeon Mall Tân Phú Celadon, 30 Bờ Bao Tân Thắng, Quận Tân Phú, TP.HCM",
    phone: "028 6269 8899",
    hours: "09:00 - 22:00",
    features: ["Khu vui chơi trẻ em", "Phòng tổ chức tiệc"],
    city: "hcm"
  },
  {
    id: 4,
    name: "Jobillee Vincom Bà Triệu",
    address: "Tầng 5, Vincom Center Bà Triệu, 191 Bà Triệu, Quận Hai Bà Trưng, Hà Nội",
    phone: "024 3974 1122",
    hours: "09:30 - 22:00",
    features: ["Khu vui chơi trẻ em"],
    city: "hn"
  },
  {
    id: 5,
    name: "Jobillee Aeon Mall Long Biên",
    address: "Tầng 3, Aeon Mall Long Biên, 27 Cổ Linh, Quận Long Biên, Hà Nội",
    phone: "024 6253 9988",
    hours: "09:00 - 22:00",
    features: ["Có chỗ đậu ô tô", "Phòng tổ chức tiệc"],
    city: "hn"
  },
  {
    id: 6,
    name: "Jobillee Vincom Đà Nẵng",
    address: "Tầng 4, Vincom Center Đà Nẵng, 910A Ngô Quyền, Quận Sơn Trà, Đà Nẵng",
    phone: "0236 388 9999",
    hours: "09:30 - 22:00",
    features: ["Phòng tổ chức tiệc"],
    city: "dn"
  }
];

function StoresPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStores = useMemo(() => {
    if (!searchQuery.trim()) return STORES_DATA;
    const query = searchQuery.toLowerCase();
    return STORES_DATA.filter(store => 
      store.name.toLowerCase().includes(query) || 
      store.address.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <>
      <Helmet>
        <title>Hệ thống Cửa hàng - Jobillee Vietnam</title>
        <meta name="description" content="Danh sách tất cả cửa hàng Jobillee trên toàn quốc. Tìm địa chỉ, số điện thoại và giờ mở cửa của cửa hàng gần bạn nhất." />
      </Helmet>

      <Header />

      <main className="bg-muted/20 min-h-screen pb-24">
        {/* Simple Header */}
        <section className="bg-primary text-primary-foreground py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              HỆ THỐNG CỬA HÀNG
            </h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Hơn 150 nhà hàng trên toàn quốc, luôn sẵn sàng phục vụ bạn những bữa ăn ngon miệng và ấm áp nhất.
            </p>
          </div>
        </section>

        {/* Filter Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          <div className="bg-card rounded-2xl p-6 shadow-lg border border-border/50 max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input 
                placeholder="Tìm kiếm theo tên hoặc địa chỉ đường, quận..." 
                className="flex-grow text-base py-6"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button size="lg" className="py-6 px-8 font-bold sm:w-auto w-full">
                Tìm Kiếm
              </Button>
            </div>
          </div>
        </section>

        {/* Stores Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">
              Tất cả cửa hàng ({filteredStores.length})
            </h2>
          </div>

          {filteredStores.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStores.map(store => (
                <div key={store.id} className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                  <h3 className="text-xl font-bold text-primary mb-4">{store.name}</h3>
                  
                  <div className="space-y-3 mb-6 flex-grow">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground leading-relaxed">{store.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-muted-foreground shrink-0" />
                      <span className="text-sm font-medium">{store.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-muted-foreground shrink-0" />
                      <span className="text-sm">{store.hours}</span>
                    </div>
                  </div>

                  {store.features && store.features.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {store.features.map((feature, idx) => (
                        <span key={idx} className="bg-secondary/20 text-secondary-foreground text-xs px-2 py-1 rounded-md font-medium">
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}

                  <Button variant="outline" className="w-full gap-2 mt-auto">
                    <Navigation className="w-4 h-4" />
                    Chỉ đường
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-card rounded-2xl p-12 text-center border border-border/50 shadow-sm">
              <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-bold mb-2">Không tìm thấy cửa hàng</h3>
              <p className="text-muted-foreground">Vui lòng thử lại với từ khóa khác.</p>
              <Button 
                variant="outline" 
                className="mt-6"
                onClick={() => setSearchQuery('')}
              >
                Xem tất cả cửa hàng
              </Button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}

export default StoresPage;