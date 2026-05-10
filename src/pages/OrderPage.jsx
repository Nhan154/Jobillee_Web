
import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { Button } from '@/components/ui/button.jsx';
import { formatPrice } from '@/lib/utils.js';
import { useCart } from '@/contexts/CartContext.jsx';

export default function OrderPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart, addOrder } = useCart();
  const hasProcessed = useRef(false);
  
  const { cart, totalPrice } = location.state || { cart: [], totalPrice: 0 };
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    if (!cart || cart.length === 0) {
      navigate('/cart');
    } else if (!hasProcessed.current) {
      const shippingFee = 15000;
      const tax = totalPrice * 0.08;
      const grandTotal = totalPrice + shippingFee + tax;
      const newOrderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      const newOrderDate = new Date().toLocaleDateString('vi-VN');

      const newOrder = {
        id: newOrderNumber,
        date: newOrderDate,
        items: cart,
        totalAmount: grandTotal,
        status: 'Đang xử lý'
      };

      setOrderData(newOrder);
      addOrder(newOrder);
      clearCart();
      hasProcessed.current = true;
    }
  }, [cart, navigate, clearCart, addOrder, totalPrice]);

  if (!orderData) return null;

  const shippingFee = 15000;
  const tax = totalPrice * 0.08;

  return (
    <>
      <Helmet>
        <title>Xác nhận đơn hàng - Jobillee Vietnam</title>
      </Helmet>

      <Header />

      <main className="min-h-screen bg-muted/20 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-2xl shadow-sm p-8 md:p-12 text-center mb-8 border border-border/50">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-primary mb-2">Đặt hàng thành công!</h1>
            <p className="text-muted-foreground mb-6">Cảm ơn bạn đã đặt hàng tại Jobillee. Đơn hàng của bạn đang được xử lý.</p>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground bg-muted/30 p-4 rounded-xl">
              <div>
                <span className="block font-medium text-foreground">Mã đơn hàng</span>
                {orderData.id}
              </div>
              <div>
                <span className="block font-medium text-foreground">Ngày đặt</span>
                {orderData.date}
              </div>
              <div>
                <span className="block font-medium text-foreground">Dự kiến giao</span>
                30 - 45 phút
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl shadow-sm p-8 border border-border/50 mb-8">
            <h2 className="text-xl font-bold mb-6 border-b pb-4">Chi tiết đơn hàng</h2>
            
            <div className="space-y-4 mb-8">
              {orderData.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden shrink-0">
                      {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">SL: {item.quantity} x {formatPrice(item.parsedPrice)}đ</p>
                    </div>
                  </div>
                  <div className="font-bold">
                    {formatPrice(item.parsedPrice * item.quantity)}đ
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-6 space-y-3 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Tạm tính</span>
                <span>{formatPrice(totalPrice)}đ</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Phí giao hàng</span>
                <span>{formatPrice(shippingFee)}đ</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Thuế (8%)</span>
                <span>{formatPrice(tax)}đ</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t mt-4">
                <span className="font-bold text-lg">Tổng cộng</span>
                <span className="text-2xl font-bold text-primary">{formatPrice(orderData.totalAmount)}đ</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button 
              onClick={() => navigate('/menu')}
              variant="outline"
              className="gap-2 font-bold rounded-full px-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Tiếp tục mua sắm
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
