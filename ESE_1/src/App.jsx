import { useState, useEffect } from 'react';
import BreedCreate from './components/Breedcreate';
import BreedEdit from './components/BreedEdit';
import BreedList from './components/BreedList';
import BreedShow from './components/BreedShow';
import './App.css';

function App() {
  // Load breeds from localStorage or use default data
  const loadBreedsFromStorage = () => {
    try {
      const savedBreeds = localStorage.getItem('dogBreeds');
      if (savedBreeds) {
        return JSON.parse(savedBreeds);
      }
    } catch (error) {
      console.error('Error loading breeds from localStorage:', error);
    }
    
    return [
      {
        id: 1,
        name: "Golden Retriever",
        origin: "Scotland",
        size: "Large",
        temperament: ["Friendly", "Intelligent", "Devoted", "Gentle"],
        lifeSpan: "10-12 years",
        description: "Golden Retrievers are friendly, intelligent, and devoted dogs. They are great family pets and are known for their patience with children. Originally bred for retrieving waterfowl, they have a natural love for water and outdoor activities.",
        image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&h=600&fit=crop",
        createdAt: "09-09-2025"
      },
      {
        id: 2,
        name: "German Shepherd",
        origin: "Germany",
        size: "Large",
        temperament: ["Confident", "Courageous", "Smart", "Loyal"],
        lifeSpan: "9-13 years",
        description: "German Shepherds are extremely versatile, serving as family companions, guard dogs, and in many service roles. They are known for their loyalty, courage, and versatility as working dogs.",
        image: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=800&h=600&fit=crop",
        createdAt: "09-09-2025"
      },
      {
        id: 3,
        name: "Labrador Retriever",
        origin: "Canada",
        size: "Large",
        temperament: ["Outgoing", "Active", "Friendly", "Playful"],
        lifeSpan: "10-14 years",
        description: "Labrador Retrievers are among America's most popular dog breeds. Labs are friendly, outgoing, and active companions who have more than enough affection to go around for a family looking for a medium to large dog.",
        image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800&h=600&fit=crop",
        createdAt: "09-09-2025"
      },
      {
        id: 4,
        name: "Bulldog",
        origin: "England",
        size: "Medium",
        temperament: ["Calm", "Courageous", "Friendly", "Dignified"],
        lifeSpan: "8-10 years",
        description: "Bulldogs are known for their loose-jointed, shuffling gait and massive, short-faced head. Despite their somewhat intimidating appearance, they are among the gentlest of dogs.",
        image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&h=600&fit=crop",
        createdAt: "09-09-2025"
      },
      {
        id: 5,
        name: "Chihuahua",
        origin: "Mexico",
        size: "Small",
        temperament: ["Alert", "Quick", "Devoted", "Lively"],
        lifeSpan: "12-18 years",
        description: "Chihuahuas are tiny dogs with huge personalities. They're excellent watchdogs and are very devoted to their owners.",
        image: "https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?w=800&h=600&fit=crop",
        createdAt: "09-09-2025"
      }
    ];
  };

  const [breeds, setBreeds] = useState(loadBreedsFromStorage);
  const [currentView, setCurrentView] = useState('list');
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Enhanced filter states
  const [filters, setFilters] = useState({
    size: '',
    origin: '',
    temperament: '',
    lifeSpan: ''
  });

  // Save breeds to localStorage whenever breeds state changes
  useEffect(() => {
    try {
      localStorage.setItem('dogBreeds', JSON.stringify(breeds));
    } catch (error) {
      console.error('Error saving breeds to localStorage:', error);
    }
  }, [breeds]);

  const handleAddBreed = (newBreed) => {
    const updatedBreeds = [...breeds, newBreed];
    setBreeds(updatedBreeds);
    setCurrentView('list');
  };

  const handleUpdateBreed = (updatedBreed) => {
    const updatedBreeds = breeds.map(breed => 
      breed.id === updatedBreed.id ? updatedBreed : breed
    );
    setBreeds(updatedBreeds);
    setCurrentView('list');
    setSelectedBreed(null);
  };

  const handleDeleteBreed = (breedId) => {
    if (window.confirm('Are you sure you want to delete this breed?')) {
      const updatedBreeds = breeds.filter(breed => breed.id !== breedId);
      setBreeds(updatedBreeds);
      setCurrentView('list');
      setSelectedBreed(null);
    }
  };

  const handleSelectBreed = (breed) => {
    setSelectedBreed(breed);
    setCurrentView('show');
  };

  const handleEditBreed = (breed) => {
    setSelectedBreed(breed);
    setCurrentView('edit');
  };

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchTerm('');
    setFilters({
      size: '',
      origin: '',
      temperament: '',
      lifeSpan: ''
    });
  };

  // Get unique values for filter options
  const getUniqueOrigins = () => {
    const origins = breeds.map(breed => breed.origin).filter(origin => origin);
    return [...new Set(origins)].sort();
  };

  const getUniqueTemperaments = () => {
    const allTemperaments = breeds.flatMap(breed => 
      Array.isArray(breed.temperament) ? breed.temperament : 
      breed.temperament ? breed.temperament.split(',').map(t => t.trim()) : []
    );
    return [...new Set(allTemperaments)].sort();
  };

  const getUniqueLifeSpans = () => {
    const lifeSpans = breeds.map(breed => breed.lifeSpan).filter(span => span);
    return [...new Set(lifeSpans)].sort();
  };

  // Enhanced filter logic
  const filteredBreeds = breeds.filter(breed => {
    // Search term filter
    const matchesSearch = breed.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (breed.origin && breed.origin.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (breed.description && breed.description.toLowerCase().includes(searchTerm.toLowerCase()));

    // Size filter
    const matchesSize = filters.size === '' || breed.size === filters.size;

    // Origin filter
    const matchesOrigin = filters.origin === '' || breed.origin === filters.origin;

    // Temperament filter
    const matchesTemperament = filters.temperament === '' || 
      (Array.isArray(breed.temperament) 
        ? breed.temperament.some(t => t.toLowerCase().includes(filters.temperament.toLowerCase()))
        : breed.temperament && breed.temperament.toLowerCase().includes(filters.temperament.toLowerCase())
      );

    // Life span filter
    const matchesLifeSpan = filters.lifeSpan === '' || breed.lifeSpan === filters.lifeSpan;

    return matchesSearch && matchesSize && matchesOrigin && matchesTemperament && matchesLifeSpan;
  });

  // Check if any filters are active
  const hasActiveFilters = searchTerm || Object.values(filters).some(filter => filter !== '');
  const activeFilterCount = [searchTerm, ...Object.values(filters)].filter(filter => filter !== '').length;

  const renderCurrentView = () => {
    switch (currentView) {
      case 'create':
        return (
          <BreedCreate
            onAddBreed={handleAddBreed}
            onCancel={() => setCurrentView('list')}
          />
        );
      case 'edit':
        return (
          <BreedEdit
            breed={selectedBreed}
            onUpdateBreed={handleUpdateBreed}
            onCancel={() => setCurrentView('list')}
          />
        );
      case 'show':
        return (
          <BreedShow
            breed={selectedBreed}
            onBack={() => setCurrentView('list')}
            onEdit={handleEditBreed}
            onDelete={handleDeleteBreed}
          />
        );
      default:
        return (
          <div>
            {/* Enhanced Search and Filter Bar */}
            <div className="mb-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search breeds by name, origin, or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-white transition-all duration-200"
                  />
                </div>
              </div>

              {/* Filter Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                    </svg>
                    Filters
                    {activeFilterCount > 0 && (
                      <span className="bg-orange-100 text-orange-700 text-xs font-medium px-2 py-1 rounded-full">
                        {activeFilterCount}
                      </span>
                    )}
                  </h3>
                  {hasActiveFilters && (
                    <button
                      onClick={clearAllFilters}
                      className="text-sm text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Clear all
                    </button>
                  )}
                </div>

                {/* Filter Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Size Filter */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Size</label>
                    <select
                      value={filters.size}
                      onChange={(e) => handleFilterChange('size', e.target.value)}
                      className="block w-full py-2.5 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-gray-50 focus:bg-white transition-all duration-200"
                    >
                      <option value="">All Sizes</option>
                      <option value="Small">Small</option>
                      <option value="Medium">Medium</option>
                      <option value="Large">Large</option>
                      <option value="Extra Large">Extra Large</option>
                    </select>
                  </div>

                  {/* Origin Filter */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Origin</label>
                    <select
                      value={filters.origin}
                      onChange={(e) => handleFilterChange('origin', e.target.value)}
                      className="block w-full py-2.5 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-gray-50 focus:bg-white transition-all duration-200"
                    >
                      <option value="">All Origins</option>
                      {getUniqueOrigins().map(origin => (
                        <option key={origin} value={origin}>{origin}</option>
                      ))}
                    </select>
                  </div>

                  {/* Temperament Filter */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Temperament</label>
                    <select
                      value={filters.temperament}
                      onChange={(e) => handleFilterChange('temperament', e.target.value)}
                      className="block w-full py-2.5 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-gray-50 focus:bg-white transition-all duration-200"
                    >
                      <option value="">All Temperaments</option>
                      {getUniqueTemperaments().map(temperament => (
                        <option key={temperament} value={temperament}>{temperament}</option>
                      ))}
                    </select>
                  </div>

                  {/* Life Span Filter */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Life Span</label>
                    <select
                      value={filters.lifeSpan}
                      onChange={(e) => handleFilterChange('lifeSpan', e.target.value)}
                      className="block w-full py-2.5 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-gray-50 focus:bg-white transition-all duration-200"
                    >
                      <option value="">All Life Spans</option>
                      {getUniqueLifeSpans().map(lifeSpan => (
                        <option key={lifeSpan} value={lifeSpan}>{lifeSpan}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Results Summary */}
              {hasActiveFilters && (
                <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-orange-800">
                      <span className="font-semibold">{filteredBreeds.length}</span> breed{filteredBreeds.length !== 1 ? 's' : ''} found
                      {activeFilterCount > 0 && ` with ${activeFilterCount} filter${activeFilterCount !== 1 ? 's' : ''} applied`}
                    </span>
                    {filteredBreeds.length === 0 && (
                      <span className="text-xs text-orange-600">Try adjusting your filters</span>
                    )}
                  </div>
                </div>
              )}
            </div>

            <BreedList
              breeds={filteredBreeds}
              onSelectBreed={handleSelectBreed}
              onEditBreed={handleEditBreed}
              onDeleteBreed={handleDeleteBreed}
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center">
                <span className="text-2xl">🐕</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 font-sans">
                  Pet Breed Manager
                </h1>
                <p className="text-sm text-gray-600">Manage your favorite dog breeds</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              {currentView === 'list' && (
                <button
                  onClick={() => setCurrentView('create')}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-lg shadow-orange-500/25"
                >
                  + Add New Breed
                </button>
              )}
              {currentView !== 'list' && (
                <button
                  onClick={() => setCurrentView('list')}
                  className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 font-medium"
                >
                  ← Back to List
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderCurrentView()}
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600 font-medium">
              Pet Dog Breed Management System
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Total Breeds: {breeds.length} | Showing: {filteredBreeds.length} | Built with React + Vite + Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;