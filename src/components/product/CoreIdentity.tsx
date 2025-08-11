import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '@/hooks/useProduct';
import 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.3.2/css/flag-icons.min.css';

const ExpandableCard = () => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [currentCurrency, setCurrentCurrency] = useState('USD');
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 23,
    minutes: 45,
    seconds: 30
  });
  const [showDiscount, setShowDiscount] = useState(false);

  const { id: paramId } = useParams<{ id: string }>();
  const { data: product } = useProduct(paramId || '');
  const navigate = useNavigate();

  const currencies = {
    USD: 'USD',
    HTG: 'HTG',
    EUR: 'EUR'
  };

  const currencyFlags = {
    USD: '🇺🇸',
    HTG: '🇭🇹',
    EUR: '🇪🇺'
  };


const CurrencyIcon = ({ currency }) => {
    const iconProps = "w-full h-full";
    
    switch(currency) {
      case 'USD':
        return (
         <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 512"><g fill-rule="nonzero"><path fill="#999" d="M256 0c70.68 0 134.69 28.66 181.01 74.99C483.34 121.31 512 185.32 512 256c0 70.68-28.66 134.69-74.99 181.01C390.69 483.34 326.68 512 256 512c-70.68 0-134.69-28.66-181.01-74.99C28.66 390.69 0 326.68 0 256c0-70.68 28.66-134.69 74.99-181.01C121.31 28.66 185.32 0 256 0z"/><path fill="#fff" d="M256 19.48c65.29 0 124.46 26.48 167.25 69.27l1.09 1.18c42.14 42.72 68.17 101.37 68.17 166.06 0 65.31-26.49 124.46-69.28 167.25l-1.19 1.09c-42.72 42.16-101.4 68.19-166.04 68.19-65.23 0-124.38-26.51-167.18-69.33-42.84-42.74-69.34-101.89-69.34-167.2 0-65.31 26.48-124.45 69.27-167.24C131.54 45.96 190.69 19.48 256 19.48z"/><path fill="#B22234" d="M256 39.59c39.48 0 76.49 10.58 108.37 29.04H147.63C179.51 50.17 216.52 39.59 256 39.59zm155.84 66.28c9.16 9.48 17.42 19.82 24.72 30.85H75.43c7.29-11.09 15.59-21.46 24.72-30.85h311.69zm44.41 67.97c4.1 9.97 7.46 20.28 10.04 30.92H45.71c2.61-10.62 6.03-20.9 10.04-30.92h400.5zm15.68 68.08c.3 4.68.47 9.37.47 14.07 0 5.67-.22 11.3-.65 16.85H40.25c-.42-5.59-.65-11.26-.65-16.85 0-4.73.17-9.42.47-14.07h431.86zm-6.32 68.06a212.979 212.979 0 0 1-10.52 30.94H56.91c-4.25-10.02-7.83-20.39-10.52-30.94h419.22zm-30.9 68.06c-7.63 11.14-16.25 21.56-25.78 31.07H103.07c-9.5-9.51-18.15-19.93-25.78-31.07h357.42zm-75.27 68.08c-30.86 16.77-66.16 26.29-103.44 26.29-37.47 0-72.72-9.53-103.44-26.29h206.88z"/><path fill="#3C3B6E" d="M268.16 39.94v234.41H40.39c-.53-6.07-.79-12.16-.79-18.36 0-119.51 96.88-216.4 216.4-216.4 4.08 0 8.14.13 12.16.35z"/><path fill="#fff" d="m50.81 187.06.98 3.06-1.6-1.18.62-1.88zm189.29 49.91 8.01 24.66-20.96-15.25h25.89l-20.97 15.25 8.03-24.66zm0-47.66 8.01 24.62-20.96-15.22h25.89l-20.97 15.22 8.03-24.62zm0-47.69 8.01 24.65-20.96-15.26h25.89l-20.97 15.26 8.03-24.65zm0-47.66 8.01 24.62-20.96-15.23h25.89l-20.97 15.23 8.03-24.62zm0-47.67 8.01 24.63-20.96-15.24h25.89l-20.97 15.24 8.03-24.63zm-28.08 166.85 8.03 24.64-20.98-15.25h25.89l-20.86 15.25 7.92-24.64zm0-47.67 8.03 24.65-20.98-15.26h25.89l-20.86 15.26 7.92-24.65zm0-47.66 8.03 24.62-20.98-15.23h25.89l-20.86 15.23 7.92-24.62zm0-47.7 8.03 24.65-20.98-15.25h25.89L204.1 94.76l7.92-24.65zm-27.97 166.86 8.03 24.66-20.98-15.25h25.91l-20.97 15.25 8.01-24.66zm0-47.66 8.03 24.62-20.98-15.22h25.91l-20.97 15.22 8.01-24.62zm0-47.69 8.03 24.65-20.98-15.26h25.91l-20.97 15.26 8.01-24.65zm0-47.66 8.03 24.62-20.98-15.23h25.91l-20.97 15.23 8.01-24.62zm1.64-42.68 6.39 19.64-19.93-14.48 1.86-.76h23l-20.97 15.24 5.97-18.34 3.68-1.3zm-29.71 161.86 8.01 24.64-20.97-15.25h25.91l-20.98 15.25 8.03-24.64zm0-47.67 8.01 24.65-20.97-15.26h25.91l-20.98 15.26 8.03-24.65zm0-47.66 8.01 24.62-20.97-15.23h25.91l-20.98 15.23 8.03-24.62zm0-47.7 8.01 24.65-20.97-15.25h25.91l-20.98 15.25 8.03-24.65zm-27.97 166.86 7.92 24.66-20.86-15.25h25.89l-20.98 15.25 8.03-24.66zm0-47.66 7.92 24.62-20.86-15.22h25.89l-20.98 15.22 8.03-24.62zm0-47.69 7.92 24.65-20.86-15.26h25.89l-20.98 15.26 8.03-24.65zm0-47.66 7.92 24.62-20.86-15.23h25.89l-20.98 15.23 8.03-24.62zM99.93 213.14l8.03 24.64-20.97-15.25h25.9l-20.97 15.25 8.01-24.64zm0-47.67 8.03 24.65-20.97-15.26h25.9l-20.97 15.26 8.01-24.65zm0-47.66 8.03 24.62-20.97-15.23h25.9l-20.97 15.23 8.01-24.62zM71.87 236.97l8.01 24.66-20.98-15.25h26.02l-21.08 15.25 8.03-24.66zm0-47.66 8.01 24.62-20.98-15.22h26.02l-21.08 15.22 8.03-24.62zm.14-47.26 7.87 24.22-15.36-11.17 2.2-4.09h18.2l-21.08 15.26 7.6-23.32.57-.9zM43.9 213.14l7.89 24.64-10.63-7.77-.47 4.27 16.15-11.75H42.16c.48-3.02 1.02-6.02 1.62-8.99l.12-.4zm11.44-38.28h1.5l-2.14 1.57.64-1.57z"/></g></svg>
        );
      case 'EUR':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={iconProps}>
            <circle cx="256" cy="256" r="256" fill="#003399"/>
            <g fill="#ffcc00">
              <path d="m256 100.174 7.713 23.736h24.928l-20.165 14.649 7.713 23.736L256 147.646l-20.189 14.649 7.713-23.736-20.165-14.649h24.928z"/>
              <path d="m256 166.956 7.713 23.736h24.928l-20.165 14.649 7.713 23.736L256 214.428l-20.189 14.649 7.713-23.736-20.165-14.649h24.928z"/>
            </g>
          </svg>
        );
      case 'GBP':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={iconProps}>
            <circle cx="256" cy="256" r="256" fill="#012169"/>
            <path fill="#fff" d="M0 0v512h512V0z"/>
            <path fill="#c8102e" d="M512 0L0 512h512V0z"/>
            <path fill="#fff" d="M0 0v32l480 480v-32L32 0z"/>
            <path fill="#c8102e" d="M0 0h32l480 480h-32L0 480z"/>
          </svg>
        );
      case 'CAD':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={iconProps}>
            <circle cx="256" cy="256" r="256" fill="#ff0000"/>
            <rect x="0" y="0" width="128" height="512" fill="#ff0000"/>
            <rect x="384" y="0" width="128" height="512" fill="#ff0000"/>
            <rect x="128" y="0" width="256" height="512" fill="#fff"/>
            <path fill="#ff0000" d="M256 200l-20 40h-20l15 25-15 25h20l20 40 20-40h20l-15-25 15-25h-20z"/>
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={iconProps}>
            <circle cx="256" cy="256" r="256" fill="#bd3d44"/>
            <path stroke="#fff" strokeWidth="40" d="M0 58h512M0 137h512M0 216h512M0 295h512M0 374h512M0 453h512"/>
            <path fill="#192f5d" d="M0 0h390v275H0z"/>
          </svg>
        );
    }
  };


  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Toggle discount display effect
  useEffect(() => {
    const discountTimer = setInterval(() => {
      setShowDiscount(prev => !prev);
    }, 3000);

    return () => clearInterval(discountTimer);
  }, []);

  if (!product) return null;

  const formatNumber = (num) => {
    return parseFloat(num).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const convertToHTG = (usdPrice) => {
    const exchangeRate = 132;
    const price = parseFloat(usdPrice) || 0;
    return formatNumber(price * exchangeRate);
  };

  const convertToEUR = (usdPrice) => {
    const exchangeRate = 0.85;
    const price = parseFloat(usdPrice) || 0;
    return formatNumber(price * exchangeRate);
  };

  const convertPrice = (price) => {
    const numPrice = parseFloat(price) || 0;
    switch (currentCurrency) {
      case 'HTG':
        return convertToHTG(numPrice);
      case 'EUR':
        return convertToEUR(numPrice);
      default:
        return formatNumber(numPrice);
    }
  };

  const toggleCurrency = () => {
    const currencyOrder = ['USD', 'HTG', 'EUR'];
    const currentIndex = currencyOrder.indexOf(currentCurrency);
    const nextIndex = (currentIndex + 1) % currencyOrder.length;
    setCurrentCurrency(currencyOrder[nextIndex]);
  };

  const handleShowMore = () => {
  if (!product) return; // Add safety check
  
  navigate(`/product/${product.id}/description`, {
    state: { 
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        discount_price: product.discount_price,
        product_images: product.product_images || [],
        product_videos: product.product_videos || []
      }
    }
  });
};

  const title = product.name;
  const description = product.description;

  // Check description length
  const descriptionLines = description ? description.split('\n').length : 0;
  const estimatedLines = description ? Math.ceil(description.length / 60) : 0;
  const totalLines = Math.max(descriptionLines, estimatedLines);
  const isExpandableDescription = description && totalLines >= 3 && totalLines <= 5;
  const isVeryLongDescription = description && totalLines > 5;
  const needsShowMore = isExpandableDescription || isVeryLongDescription;

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  return (
    <div className="bg-white w-full">
      {/* Product Header */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-gray-800 font-bold leading-tight text-lg truncate flex-1">
          {title}
        </h3>
        {/* Deal Countdown Timer */}
        <div className="flex-shrink-0">
          <div className="relative h-5 overflow-hidden">
            <div className={`transition-transform duration-500 ease-in-out ${showDiscount ? '-translate-y-5' : 'translate-y-0'}`}>
              <div className="h-5 flex items-center space-x-1">
                <div className="text-red-700 text-sm font-bold">{timeLeft.days.toString().padStart(2, '0')}</div>
                <div className="text-gray-400 text-sm">:</div>
                <div className="text-red-700 text-sm font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
                <div className="text-gray-400 text-sm">:</div>
                <div className="text-red-700 text-sm font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                <div className="text-gray-400 text-sm">:</div>
                <div className="text-red-700 text-sm font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</div>
              </div>
              <div className="h-5 flex items-center">
                <span className="text-red-600 text-sm font-semibold whitespace-nowrap">
                  Deal Ends Soon
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Description */}
      {description && (
        <div className="text-xs text-gray-700 leading-tight mt-3">
          <p className={`m-0 ${(!isDescriptionExpanded && needsShowMore) ? 'line-clamp-2' : ''}`}>
            {description}
          </p>

          <div className="flex items-center justify-between mt-2">
            <div className="flex-1">
              {needsShowMore ? (
                <>
                  {isExpandableDescription && (
                    <button
                      onClick={toggleDescription}
                      className="text-gray-600 hover:text-gray-800 font-semibold text-xs inline-flex items-center gap-1 transition-colors duration-200"
                    >
                      {isDescriptionExpanded ? 'Show less' : 'Show more'} 
                      {isDescriptionExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                  )}
                  {isVeryLongDescription && (
                    <button
                      onClick={handleShowMore}
                      className="text-gray-600 hover:text-gray-800 font-semibold text-xs inline-flex items-center gap-1 transition-colors duration-200"
                    >
                      See more <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </>
              ) : (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <button
                      onClick={toggleCurrency}
                      className="flex items-center hover:opacity-80 transition-opacity"
                    >
                      <span className="text-gray-600 text-sm font-bold flex items-center">
                        <span className="mr-1 rounded-full overflow-hidden w-4 h-4 flex items-center justify-center">
                          <CurrencyIcon currency={currentCurrency} />
                        </span>
                        {currencies[currentCurrency]}
                      </span>
                      <span className="ml-1 text-gray-600 hover:text-gray-800 transition-colors duration-200">
                        <ChevronDown className="w-4 h-4 font-black stroke-2" />
                      </span>
                      <span className="text-orange-500 text-sm font-black ml-2 h-6 flex items-center">
                        {convertPrice(product?.discount_price || product?.price || 104.99)}
                      </span>
                    </button>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-400 text-sm line-through">
                      {convertPrice(product?.price || 149.99)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {needsShowMore && (
              <div className="flex items-center space-x-2 ml-2">
                <div className="flex items-center">
                  <button
                    onClick={toggleCurrency}
                    className="flex items-center hover:opacity-80 transition-opacity"
                  >
                    <span className="text-gray-600 text-sm font-bold flex items-center">
                      <span className="mr-1 rounded-full overflow-hidden w-4 h-4 flex items-center justify-center">
                        <CurrencyIcon currency={currentCurrency} />
                      </span>
                      {currencies[currentCurrency]}
                    </span>
                    <span className="ml-1 text-gray-600 hover:text-gray-800 transition-colors duration-200">
                      <ChevronDown className="w-4 h-4 font-black stroke-2" />
                    </span>
                    <span className="text-orange-500 text-sm font-black ml-2 h-6 flex items-center">
                      {convertPrice(product?.discount_price || product?.price || 104.99)}
                    </span>
                  </button>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-400 text-sm line-through">
                    {convertPrice(product?.price || 149.99)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {!description && (
        <div className="flex items-center gap-2 mt-2">
          {/* Currency and Main Price */}
          <button 
            onClick={toggleCurrency}
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <span className="flex items-center text-gray-600 text-lg font-bold">
              <span className="mr-1 rounded-full overflow-hidden w-5 h-5 flex items-center justify-center">
                <CurrencyIcon currency={currentCurrency} />
              </span>
              {currencies[currentCurrency]}
            </span>
            <span className="ml-1 w-6 h-6 flex items-center justify-center rounded-full bg-gray-100">
              <ChevronDown className="w-3.5 h-3.5 font-black stroke-2 text-gray-600" />
            </span>
            <span className="text-orange-500 text-xl font-black ml-2">
              {convertPrice(product?.discount_price || product?.price || 104.99)}
            </span>
          </button>

          {/* Original Price */}
          <div className="flex items-center">
            <span className="text-gray-400 text-sm line-through">
              {currencies[currentCurrency]}{convertPrice(product?.price || 149.99)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpandableCard;