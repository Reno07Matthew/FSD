const BreedShow = ({ breed, onBack, onEdit, onDelete }) => {
  const renderTemperamentTags = (temperament) => {
    if (!temperament) return null;
    
    const tags = Array.isArray(temperament) ? temperament : temperament.split(',').map(t => t.trim());
    
    return (
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1.5 bg-orange-100 text-orange-700 text-sm font-medium rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="lg:flex">
          {/* Image Section */}
          <div className="lg:w-1/2 h-64 lg:h-auto relative bg-gray-100">
            {breed.image ? (
              <img
                src={breed.image}
                alt={breed.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div 
              className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center"
              style={{ display: breed.image ? 'none' : 'flex' }}
            >
              <span className="text-6xl">🐕</span>
            </div>
          </div>
          
          {/* Content Section */}
          <div className="lg:w-1/2 p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{breed.name}</h1>
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-medium">{breed.origin || 'Unknown origin'}</span>
              </div>
            </div>
            
            <div className="space-y-6 mb-8">
              {/* Size */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">Size</h3>
                <span className="inline-block px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                  {breed.size || 'Not specified'}
                </span>
              </div>
              
              {/* Life Span */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">Life Span</h3>
                <p className="text-gray-700 font-medium">{breed.lifeSpan || 'Not specified'}</p>
              </div>
              
              {/* Temperament */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">Temperament</h3>
                {renderTemperamentTags(breed.temperament)}
              </div>
              
              {/* Description */}
              {breed.description && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{breed.description}</p>
                </div>
              )}
              
              {/* Added Date */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">Added On</h3>
                <p className="text-gray-600">{breed.createdAt}</p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={onBack}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 font-medium"
              >
                ← Back to List
              </button>
              <button
                onClick={() => onEdit(breed)}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200 font-medium"
              >
                Edit Breed
              </button>
              <button
                onClick={() => onDelete(breed.id)}
                className="px-6 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 font-medium border border-red-200"
              >
                Delete Breed
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreedShow;