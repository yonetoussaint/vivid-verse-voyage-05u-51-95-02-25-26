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
  
  // Get product data from location state or fetch it
  const [productData, setProductData] = useState(location.state?.product);
  const { data: fetchedProduct } = useProduct(id || '');

  useEffect(() => {
    if (!productData && fetchedProduct) {
      setProductData({
        name: fetchedProduct.name,
        description: fetchedProduct.description,
        product_images: fetchedProduct.product_images,
        product_videos: fetchedProduct.product_videos
      });
    }
  }, [fetchedProduct, productData]);

  // Format the description content for display
  const formatDescriptionContent = () => {
    if (!productData?.description) return [];
    
    // Simple formatting - you can enhance this based on your needs
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

  // ... rest of the component functions remain the same ...

  return (
    <div className={`min-h-screen transition-colors duration-300 ${getThemeClasses()}`}>
      {/* Header remains the same */}
      
      {/* Mixed content description - use real data */}
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