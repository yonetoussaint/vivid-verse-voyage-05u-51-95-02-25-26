import React, { useState, useEffect } from 'react';
import { ChevronLeft, HelpCircle, Type, Palette, Sun, Moon } from 'lucide-react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { useProduct } from '@/hooks/useProduct';

const ProductDescriptionPage = () => {
  const [fontSize, setFontSize] = useState(16);
  const [theme, setTheme] = useState('light');
  const [showControls, setShowControls] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  // Use the product data from the hook first, fallback to location state
  const { data: product, isLoading } = useProduct(id || '');
  const productData = product || location.state?.product;

  // Format the description content for display
  const formatDescriptionContent = () => {
    if (!productData?.description) return [];

    return [
      {
        type: "text",
        content: productData.description
      },
      ...(productData.product_images?.map(img => ({
        type: "image",
        src: img.src,
        alt: img.alt || "Product image",
        caption: img.alt || ""
      })) || [])
    ];
  };

  const descriptionContent = formatDescriptionContent();

  const handleBack = () => {
    navigate(-1);
  };

  const handleHelp = () => {
    setShowControls(!showControls);
  };

  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 2, 24));
  };

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 2, 12));
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const getThemeClasses = () => {
    return theme === 'dark' 
      ? 'bg-gray-900 text-gray-100' 
      : 'bg-white text-gray-900';
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!productData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-500">The product description is not available.</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${getThemeClasses()}`}>
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-opacity-20 border-gray-500">
        <button 
          onClick={handleBack}
          className="p-2 rounded-full hover:bg-opacity-10 hover:bg-gray-500 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold">Product Description</h1>
        <button 
          onClick={handleHelp}
          className="p-2 rounded-full hover:bg-opacity-10 hover:bg-gray-500 transition-colors"
        >
          <HelpCircle className="w-6 h-6" />
        </button>
      </div>

      {/* Controls Panel */}
      {showControls && (
        <div className={`absolute top-16 right-4 z-20 p-3 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center space-x-4">
            <button 
              onClick={decreaseFontSize}
              className="p-2 rounded-full hover:bg-opacity-10 hover:bg-gray-500 transition-colors"
              title="Decrease font size"
            >
              <Type className="w-5 h-5" />
              <span className="sr-only">Decrease font size</span>
            </button>
            <button 
              onClick={increaseFontSize}
              className="p-2 rounded-full hover:bg-opacity-10 hover:bg-gray-500 transition-colors"
              title="Increase font size"
            >
              <Type className="w-6 h-6" />
              <span className="sr-only">Increase font size</span>
            </button>
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-opacity-10 hover:bg-gray-500 transition-colors"
              title="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              <span className="sr-only">Toggle theme</span>
            </button>
          </div>
        </div>
      )}

      {/* Mixed content description */}
      <PageContainer padding="md" maxWidth="4xl" className="py-8 space-y-8">
        {descriptionContent.map((item, index) => {
          if (item.type === 'text') {
            return (
              <div 
                key={index}
                className="leading-relaxed whitespace-pre-line transition-all duration-300"
                style={{ fontSize: `${fontSize}px`, lineHeight: '1.7' }}
              >
                {item.content}
              </div>
            );
          } else if (item.type === 'image') {
            return (
              <div key={index} className="space-y-4">
                <div className={`rounded-xl overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-auto object-cover"
                  />
                </div>
                {item.caption && (
                  <p className={`text-center text-sm italic ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {item.caption}
                  </p>
                )}
              </div>
            );
          }
          return null;
        })}

        {/* Reading info */}
        {descriptionContent.length > 0 && (
          <div className={`mt-12 pt-6 border-t border-opacity-20 border-gray-500 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            <div className="text-center">
              Reading time: ~{Math.ceil(
                descriptionContent
                  .filter(item => item.type === 'text')
                  .map(item => item.content)
                  .join(' ')
                  .split(/\s+/).length / 200
              )} minutes
            </div>
          </div>
        )}
      </PageContainer>
    </div>
  );
};

export default ProductDescriptionPage;