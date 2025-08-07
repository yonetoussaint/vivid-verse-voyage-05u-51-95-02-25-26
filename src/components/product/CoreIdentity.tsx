import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '@/hooks/useProduct';

const ExpandableCard = () => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const { id: paramId } = useParams<{ id: string }>();
  const { data: product } = useProduct(paramId || '');
  const navigate = useNavigate();

  if (!product) return null;

  const formatNumber = (num) => {
    return parseFloat(num).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const convertToHTG = (usdPrice) => {
    const exchangeRate = 132;
    const price = parseFloat(usdPrice) || 0;
    return formatNumber(price * exchangeRate);
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

  const handleShowMore = () => {
    navigate(`/product/${paramId}/description`);
  };

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
      </div>

      {/* Product Description */}
      {description && (
        <div className="text-xs text-gray-700 leading-tight">
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
                      className="text-red-500 hover:text-red-600 font-semibold text-xs inline-flex items-center gap-1 transition-colors duration-200"
                    >
                      {isDescriptionExpanded ? 'Show less' : 'Show more'} 
                      {isDescriptionExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                  )}
                  {isVeryLongDescription && (
                    <button
                      onClick={handleShowMore}
                      className="text-red-500 hover:text-red-600 font-semibold text-xs inline-flex items-center gap-1 transition-colors duration-200"
                    >
                      See more <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </>
              ) : (
                <div className="flex items-center space-x-2">
                  <span className="text-orange-500 text-lg font-black">
                    HTG {convertToHTG(product?.discount_price || product?.price || 104.99)}
                  </span>
                  <span className="text-gray-400 text-sm line-through">
                    HTG {convertToHTG(product?.price || 149.99)}
                  </span>
                </div>
              )}
            </div>

            {needsShowMore && (
              <div className="flex items-center space-x-2 ml-2">
                <span className="text-orange-500 text-lg font-black">
                  HTG {convertToHTG(product?.discount_price || product?.price || 104.99)}
                </span>
                <span className="text-gray-400 text-sm line-through">
                  HTG {convertToHTG(product?.price || 149.99)}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Price Display when no description */}
      {!description && (
        <div className="flex items-center space-x-2 mt-2">
          <span className="text-orange-500 text-lg font-black">
            HTG {convertToHTG(product?.discount_price || product?.price || 104.99)}
          </span>
          <span className="text-gray-400 text-sm line-through">
            HTG {convertToHTG(product?.price || 149.99)}
          </span>
        </div>
      )}
    </div>
  );
};

export default ExpandableCard;