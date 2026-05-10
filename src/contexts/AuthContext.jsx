import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('jobillee_current_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user", error);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('jobillee_users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('jobillee_current_user', JSON.stringify(userWithoutPassword));
      return { success: true };
    }
    return { success: false, message: 'Email hoặc mật khẩu không chính xác' };
  };

  const signup = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('jobillee_users') || '[]');
    
    if (users.find(u => u.email === email)) {
      return { success: false, message: 'Email này đã được đăng ký' };
    }
    
    const newUser = { 
      id: Date.now(), 
      name, 
      email, 
      password, 
      phone: '', 
      dateOfBirth: '', 
      avatar: '',
      claimedPromotions: [],
      addresses: []
    };
    
    users.push(newUser);
    localStorage.setItem('jobillee_users', JSON.stringify(users));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('jobillee_current_user');
  };

  const updateProfile = (data) => {
    if (!user) return { success: false, message: 'Chưa đăng nhập' };
    
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem('jobillee_current_user', JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem('jobillee_users') || '[]');
    const updatedUsers = users.map(u => u.email === updatedUser.email ? { ...u, ...data } : u);
    localStorage.setItem('jobillee_users', JSON.stringify(updatedUsers));
    
    return { success: true };
  };

  const claimPromotion = (promo) => {
    if (!user) return { success: false, message: 'Vui lòng đăng nhập để nhận ưu đãi' };
    
    const currentPromos = user.claimedPromotions || [];
    if (currentPromos.find(p => p.code === promo.code)) {
      return { success: false, message: 'Bạn đã nhận ưu đãi này rồi' };
    }

    const updatedPromos = [...currentPromos, promo];
    updateProfile({ claimedPromotions: updatedPromos });
    return { success: true };
  };

  const addAddress = (address) => {
    if (!user) return { success: false, message: 'Vui lòng đăng nhập' };
    
    const currentAddresses = user.addresses || [];
    const newAddress = { ...address, id: Date.now() };
    const updatedAddresses = [...currentAddresses, newAddress];
    
    updateProfile({ addresses: updatedAddresses });
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup, 
      logout, 
      updateProfile, 
      claimPromotion,
      addAddress,
      isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);