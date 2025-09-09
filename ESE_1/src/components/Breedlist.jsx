const BreedList = ({ breeds, onSelectBreed, onEditBreed, onDeleteBreed }) => {
  const renderTemperamentTags = (temperament) => {
    if (!temperament) return null;
    
    const tags = Array.isArray(temperament) ? temperament : temperament.split(',').map(t => t.trim());
    
    return (
      <div className="flex flex-wrap gap-1.5 mb-3">
        {tags.slice(0, 3).map((tag, index) => (
          <span
            key={index}
            className="px-2.5 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full"
          >
            {tag}
          </span>
        ))}
        {tags.length > 3 && (
          <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
            +{tags.length - 3} more
          </span>
        )}
      </div>
    );
  };

  return (
    <div>
      {breeds.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {breeds.map((breed) => (
            <div key={breed.id} className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-orange-200 transition-all duration-300 transform hover:-translate-y-1">
              {/* Image Container */}
              <div className="relative h-48 bg-gray-100 overflow-hidden">
                {breed.image ? (
                  <img
                    src={breed.image}
                    alt={breed.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                  <span className="text-4xl">🐕</span>
                </div>
                
                {/* Quick Actions Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectBreed(breed);
                    }}
                    className="bg-white/90 text-gray-700 p-2 rounded-lg hover:bg-white transition-colors duration-200"
                    title="View Details"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditBreed(breed);
                    }}
                    className="bg-white/90 text-gray-700 p-2 rounded-lg hover:bg-white transition-colors duration-200"
                    title="Edit"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-orange-600 transition-colors duration-200">
                    {breed.name}
                  </h3>
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {breed.size || 'Unknown'}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {breed.origin || 'Unknown'}
                </p>

                {/* Temperament Tags */}
                {renderTemperamentTags(breed.temperament)}

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => onSelectBreed(breed)}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2.5 px-3 rounded-xl text-sm font-medium hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1 transition-all duration-200"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => onEditBreed(breed)}
                    className="px-3 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1 transition-all duration-200"
                    title="Edit"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onDeleteBreed(breed.id)}
                    className="px-3 py-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 transition-all duration-200"
                    title="Delete"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🔍</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No breeds found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default BreedList;