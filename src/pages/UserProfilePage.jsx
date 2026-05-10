
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { User, ShoppingBag, MapPin, Gift, LogOut, Info, Camera } from 'lucide-react';
import { toast } from 'sonner';

import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useCart } from '../contexts/CartContext.jsx';
import { Button } from '../components/ui/button.jsx';
import { Input } from '../components/ui/input.jsx';
import { formatPrice } from '../lib/utils.js';

function UserProfilePage() {
  const { user, logout, updateProfile } = useAuth();
  const { orders } = useCart();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('account');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    dateOfBirth: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        dateOfBirth: user.dateOfBirth || ''
      });
    }
  }, [user]);

  const navItems = [
    { id: 'account', label: 'Quản Lý Tài Khoản', icon: User },
    { id: 'orders', label: 'Đơn Hàng', icon: ShoppingBag },
    { id: 'info', label: 'Thông Tin', icon: Info },
    { id: 'promotions', label: 'Ưu Đãi', icon: Gift },
    { id: 'address', label: 'Địa Chỉ Giao Hàng', icon: MapPin, action: () => navigate('/delivery-address') },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleUpdateAccount = (e) => {
    e.preventDefault();
    updateProfile(formData);
    toast.success('Thông tin đã được cập nhật!');
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfile({ avatar: reader.result });
        toast.success('Cập nhật ảnh đại diện thành công!');
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) return null;

  return (
    <>
      <Helmet>
        <title>Quản lý tài khoản - Jobillee Vietnam</title>
      </Helmet>

      <Header />

      <main className="min-h-screen bg-muted/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row gap-8">
            
            {/* Left Sidebar */}
            <div className="w-full md:w-72 flex-shrink-0">
              <div className="bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden sticky top-[120px]">
                
                {/* User Info Header */}
                <div className="p-8 border-b border-border/50 flex flex-col items-center text-center bg-primary text-primary-foreground">
                  <div className="relative mb-4">
                    <div className="w-24 h-24 rounded-full bg-card text-primary flex items-center justify-center font-bold text-3xl shadow-inner overflow-hidden border-4 border-primary-foreground/20">
                      {user?.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        user?.name ? user.name.charAt(0).toUpperCase() : 'U'
                      )}
                    </div>
                    <label className="absolute bottom-0 right-0 bg-secondary text-secondary-foreground p-2 rounded-full cursor-pointer shadow-md hover:scale-105 transition-transform">
                      <Camera className="w-4 h-4" />
                      <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                    </label>
                  </div>
                  <h3 className="font-bold text-xl">{user?.name || 'Khách hàng'}</h3>
                </div>

                {/* Nav Links */}
                <nav className="flex flex-col py-4">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => item.action ? item.action() : setActiveTab(item.id)}
                        className={`flex items-center gap-4 px-6 py-3 font-medium transition-colors ${
                          activeTab === item.id && !item.action
                            ? 'bg-primary/10 text-primary border-r-4 border-primary' 
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                      >
                        <Icon className="w-5 h-5 shrink-0" />
                        <span>{item.label}</span>
                      </button>
                    )
                  })}
                  <hr className="my-4 border-border/50 mx-6" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-4 px-6 py-3 font-medium text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <LogOut className="w-5 h-5 shrink-0" />
                    <span>Đăng xuất</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {activeTab === 'account' && (
                <section className="bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden">
                  <div className="px-8 py-6 border-b border-border/50">
                    <h2 className="text-2xl font-bold text-primary">Quản Lý Tài Khoản</h2>
                  </div>
                  <div className="p-8">
                    <form onSubmit={handleUpdateAccount} className="max-w-xl space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-foreground">Họ và tên *</label>
                          <Input 
                            value={formData.name} 
                            onChange={(e) => setFormData({...formData, name: e.target.value})} 
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-foreground">Điện thoại</label>
                          <Input 
                            value={formData.phone} 
                            onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                            type="tel" 
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-foreground">Email *</label>
                        <Input value={user?.email} type="email" disabled className="bg-muted text-muted-foreground" />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-foreground">Ngày sinh</label>
                        <Input 
                          type="date" 
                          value={formData.dateOfBirth} 
                          onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})} 
                        />
                      </div>
                      <div className="pt-4">
                        <Button type="submit" className="font-bold px-8">
                          Cập nhật thông tin
                        </Button>
                      </div>
                    </form>
                  </div>
                </section>
              )}

              {activeTab === 'orders' && (
                <section className="bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden">
                  <div className="px-8 py-6 border-b border-border/50 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-primary">Lịch Sử Đơn Hàng</h2>
                  </div>
                  <div className="p-8">
                    {(!orders || orders.length === 0) ? (
                      <div className="text-center py-12">
                        <ShoppingBag className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">Chưa có đơn hàng nào</h3>
                        <p className="text-muted-foreground mb-6">Bạn chưa thực hiện đơn hàng nào trên hệ thống.</p>
                        <Button onClick={() => navigate('/menu')} className="font-bold">
                          Bắt đầu mua hàng
                        </Button>
                      </div>
                    ) : (
                      <div className="grid gap-6">
                        {orders.map((order, idx) => (
                          <div key={order.id || idx} className="border border-border/50 rounded-xl p-6 bg-muted/10 hover:bg-muted/20 transition-colors">
                            <div className="flex flex-wrap justify-between items-start gap-4 border-b border-border/50 pb-4 mb-4">
                              <div>
                                <h3 className="font-bold text-lg text-primary">{order.id}</h3>
                                <p className="text-sm text-muted-foreground">Ngày đặt: {order.date}</p>
                              </div>
                              <div className="text-right">
                                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-2">
                                  {order.status}
                                </span>
                                <p className="font-bold text-lg mt-1">{formatPrice(order.totalAmount)}đ</p>
                              </div>
                            </div>
                            <div className="space-y-3">
                              {order.items && order.items.map((item, itemIdx) => (
                                <div key={itemIdx} className="flex justify-between text-sm items-center">
                                  <span className="text-muted-foreground font-medium flex items-center gap-2">
                                    <span className="bg-muted px-2 py-0.5 rounded text-xs">{item.quantity}x</span>
                                    <span className="text-foreground">{item.name}</span>
                                  </span>
                                  <span className="font-medium text-foreground">
                                    {formatPrice(item.parsedPrice * item.quantity)}đ
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </section>
              )}

              {activeTab === 'promotions' && (
                <section className="bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden">
                  <div className="px-8 py-6 border-b border-border/50">
                    <h2 className="text-2xl font-bold text-primary">Ưu Đãi Của Tôi</h2>
                  </div>
                  <div className="p-8">
                    {(!user.claimedPromotions || user.claimedPromotions.length === 0) ? (
                      <div className="text-center py-12">
                        <Gift className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">Chưa có ưu đãi</h3>
                        <p className="text-muted-foreground mb-6">Bạn chưa lưu ưu đãi nào. Hãy khám phá các chương trình khuyến mãi của chúng tôi.</p>
                        <Button onClick={() => navigate('/promotions')} variant="outline" className="font-bold">
                          Xem khuyến mãi
                        </Button>
                      </div>
                    ) : (
                      <div className="grid gap-6">
                        {user.claimedPromotions.map((promo, idx) => (
                          <div key={idx} className="flex items-center justify-between p-6 border border-border/50 rounded-xl bg-muted/10">
                            <div>
                              <h4 className="font-bold text-lg text-primary mb-1">{promo.title}</h4>
                              <p className="text-muted-foreground text-sm mb-2">{promo.description}</p>
                              <div className="flex gap-4 text-sm">
                                <span className="font-medium">Mã: <span className="text-primary">{promo.code}</span></span>
                                <span className="text-muted-foreground">HSD: {promo.validUntil}</span>
                              </div>
                            </div>
                            <Button variant="outline" onClick={() => navigate('/menu')}>Sử dụng</Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </section>
              )}

              {activeTab === 'info' && (
                <div className="bg-card rounded-2xl shadow-sm border border-border/50 p-12 text-center min-h-[400px] flex flex-col items-center justify-center">
                  <Info className="w-16 h-16 text-muted-foreground/50 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Thông tin bổ sung</h3>
                  <p className="text-muted-foreground">Nội dung đang được cập nhật...</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default UserProfilePage;
