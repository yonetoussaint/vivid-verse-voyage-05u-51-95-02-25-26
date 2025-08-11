import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store, ShoppingBag, Users, Bell, BellOff, CreditCard, Building2, Banknote, ChevronDown, ChevronUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import VerificationBadge from "@/components/shared/VerificationBadge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Free open-source placeholder image URLs
const FALLBACK_SELLER_LOGO = "https://picsum.photos/100/100?random=1";
const FALLBACK_BUYER_AVATAR = "https://i.pravatar.cc/100?img=3";

interface SellerInfoProps {
  seller?: {
    id: string;
    name: string;
    image_url?: string;
    verified: boolean;
    rating?: number;
    total_sales: number;
    followers_count: number;
  };
  stock?: number;
  reservedStock?: number;
  lastBuyerAvatar?: string | null;
  lastPurchase?: string;
  productId?: string;
}

const SellerInfo: React.FC<SellerInfoProps> = ({ 
  seller, 
  stock = 0, 
  reservedStock = 0, 
  lastBuyerAvatar, 
  lastPurchase = "recently",
  productId
}) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentExpanded, setIsPaymentExpanded] = useState(false);
  const navigate = useNavigate();

  if (!seller) {
    return null;
  }

  const paymentOptions = [
    {
      id: 'moncash',
      name: 'MonCash',
      icon: <div className="w-4 h-4 bg-red-600 rounded text-white flex items-center justify-center text-xs font-bold">M</div>
    },
    {
      id: 'natcash',
      name: 'Natcash',
      icon: <div className="w-4 h-4 bg-blue-600 rounded text-white flex items-center justify-center text-xs font-bold">N</div>
    },
    {
      id: 'tcash',
      name: 'T-Cash',
      icon: <div className="w-4 h-4 bg-green-600 rounded text-white flex items-center justify-center text-xs font-bold">T</div>
    },
    {
      id: 'card',
      name: 'Bank Card',
      icon: <CreditCard className="w-4 h-4" />
    },
    {
      id: 'check',
      name: 'Check',
      icon: <div className="w-4 h-4 bg-gray-600 rounded text-white flex items-center justify-center text-xs font-bold">✓</div>
    },
    {
      id: 'spih',
      name: 'SPIH',
      icon: <Building2 className="w-4 h-4" />
    },
    {
      id: 'cash',
      name: 'Cash',
      icon: <Banknote className="w-4 h-4" />
    }
  ];

  const visiblePaymentOptions = isPaymentExpanded ? paymentOptions : paymentOptions.slice(0, 3);
  const hasMorePaymentOptions = paymentOptions.length > 3;

  const handleStockNotification = async () => {
    setIsLoading(true);
    try {
      // Simulate API call to subscribe to stock notifications
      await new Promise(resolve => setTimeout(resolve, 800));

      setIsSubscribed(!isSubscribed);
      toast.success(
        isSubscribed 
          ? "You'll no longer receive stock notifications" 
          : "You'll be notified when stock is available!"
      );
    } catch (error) {
      toast.error("Failed to update notification preference");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSellerClick = () => {
    navigate(`/seller/${seller.id}`);
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatSales = (num: number): string => formatNumber(num);

  const getSellerLogoUrl = (imagePath?: string): string | null => {
    if (!imagePath) return null;
    const { data } = supabase.storage.from('seller-logos').getPublicUrl(imagePath);
    return data.publicUrl;
  };

  const StockIndicator = ({ stock }: { stock: number }) => {
    if (stock > 10) return <span className="text-green-600">In stock</span>;
    if (stock > 0) return <span className="text-yellow-600">Low stock</span>;
    return <span className="text-red-600">Out of stock</span>;
  };

  const logoUrl = getSellerLogoUrl(seller.image_url);
  const rating = seller.rating?.toFixed(1) || "0.0";
  const totalSales = seller.total_sales;
  const availableStock = Math.max(0, stock - reservedStock);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    if (target.alt.includes("seller")) {
      target.src = FALLBACK_SELLER_LOGO;
    } else {
      target.src = FALLBACK_BUYER_AVATAR;
    }
    target.onerror = null;
  };

  return (
    <>
      {/* Seller Info Row */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Sold by</span>

          {/* Clickable Seller Avatar */}
          <button
            onClick={handleSellerClick}
            className="w-6 h-6 rounded-full bg-gray-100 overflow-hidden flex-shrink-0 hover:ring-2 hover:ring-blue-500 hover:ring-offset-1 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
            title={`Visit ${seller.name}'s profile`}
          >
            <img 
              src={logoUrl || FALLBACK_SELLER_LOGO}
              alt={`${seller.name} seller`}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          </button>

          <div className="flex items-center gap-1">
            <button
              onClick={handleSellerClick}
              className="text-xs font-medium text-gray-900 truncate max-w-[100px] hover:text-blue-600 hover:underline transition-colors"
              title={`Visit ${seller.name}'s profile`}
            >
              {seller.name}
            </button>
            {seller.verified && <VerificationBadge size="xs" />}
          </div>
        </div>

        {/* Rating and Sales Count */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="text-yellow-500 text-xs">★</span>
            <span className="text-xs text-gray-700">{rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <ShoppingBag className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-500">({formatSales(totalSales)})</span>
          </div>
        </div>
      </div>

      {/* Payment Options Row */}
      <div className="mb-2">
        <div className="flex items-start gap-2">
          <span className="text-xs font-medium text-gray-700 mr-2 mt-1 flex-shrink-0">Payment:</span>
          
          <div className={`flex gap-2 flex-1 ${isPaymentExpanded ? 'flex-wrap' : 'items-center'}`}>
            <div className={`flex gap-2 ${isPaymentExpanded ? 'flex-wrap' : 'items-center overflow-hidden'}`}>
              {visiblePaymentOptions.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center gap-1 px-2 py-1 rounded text-xs bg-gray-100 text-gray-700 flex-shrink-0"
                  title={option.name}
                >
                  {option.icon}
                  <span className="whitespace-nowrap">{option.name}</span>
                </div>
              ))}
            </div>
            
            {hasMorePaymentOptions && (
              <button
                onClick={() => setIsPaymentExpanded(!isPaymentExpanded)}
                className="flex items-center justify-center w-6 h-6 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors flex-shrink-0"
                title={isPaymentExpanded ? 'Show less' : 'Show more options'}
              >
                {isPaymentExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stock Info Row */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1">
          <StockIndicator stock={stock} />
          <span className="text-gray-300 mx-1">|</span>
          <span className="text-gray-600">{availableStock} available</span>

          {/* Stock Notification Bell */}
          {stock <= 0 && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="w-4 h-4 ml-1 text-gray-400 hover:text-primary"
              onClick={handleStockNotification}
              disabled={isLoading}
            >
              {isSubscribed ? (
                <BellOff className="w-3 h-3" />
              ) : (
                <Bell className="w-3 h-3" />
              )}
            </Button>
          )}
        </div>

        <div className="flex items-center gap-1">
          {/* Buyer Avatar */}
          <div className="w-4 h-4 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
            <img 
              src={lastBuyerAvatar || FALLBACK_BUYER_AVATAR}
              alt="Last buyer"
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          </div>
          <span className="text-gray-500">Last bought {lastPurchase}</span>
        </div>
      </div>
    </>
  );
};

export default SellerInfo;