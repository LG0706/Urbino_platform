
'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Link from 'next/link';

export default function BusinessPage() {
  const [searchAddress, setSearchAddress] = useState('');
  const [showZoneInfo, setShowZoneInfo] = useState(false);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [formData, setFormData] = useState({
    ownerName: '',
    taxNumber: '',
    shopName: '',
    businessType: 'bnb',
    description: '',
    photos: [] as File[]
  });

  const handleAddressSearch = (address: string) => {
    setSearchAddress(address);
    const protectedZones = ['Via del Barozzo', 'Piazza della Repubblica', 'Via Raffaello', 'Corso Garibaldi', 'Via Mazzini'];
    const isInProtectedZone = protectedZones.some(zone => 
      address.toLowerCase().includes(zone.toLowerCase()) || 
      address.toLowerCase().includes('centro storico') ||
      address.toLowerCase().includes('urbino')
    );
    setShowZoneInfo(isInProtectedZone);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSubmissionModal(true);
  };

  const closeModal = () => {
    setShowSubmissionModal(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-24 px-6 bg-gradient-to-br from-pink-50 to-purple-50">
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-6">
              <Link
                href="/urbino/residents"
                className="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium text-sm cursor-pointer mb-4"
              >
                <i className="ri-arrow-left-line mr-2"></i>
                Back to Residents
              </Link>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Business Services</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tools and resources for local business owners and entrepreneurs in Urbino. 
              Check regulations, register your business, and access support services.
            </p>
          </div>
        </section>

        {/* Business Tools Section */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Business Tools</h2>
              <p className="text-gray-600">Resources for local business owners and entrepreneurs</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Address Zone Checker</h3>
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                  <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden mb-4">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11634.853167147659!2d12.636108!3d43.726149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132d168b5f7e8e21%3A0x7a6b5d5d8b5f7e8e!2sUrbino%2C%20PU%2C%20Italy!5e0!3m2!1sen!2sus!4v1640000000000!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      className="border-0"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Address Selection Map"
                    />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Search your address or click on the map
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={searchAddress}
                          onChange={(e) => handleAddressSearch(e.target.value)}
                          placeholder="Enter your address (e.g., Via del Barozzo 15, Urbino)"
                          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        />
                        <i className="ri-search-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      </div>

                      {searchAddress && (
                        <div className="mt-2 bg-gray-50 rounded-md border border-gray-200">
                          <div className="p-3 text-sm text-gray-600">
                            <i className="ri-map-pin-line mr-2 text-pink-600"></i>
                            Searching: {searchAddress}
                          </div>
                        </div>
                      )}
                    </div>

                    {showZoneInfo && (
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <i className="ri-alert-line text-amber-600 text-lg mt-0.5"></i>
                          <div>
                            <h4 className="font-semibold text-amber-800 mb-2">Protected Heritage Zone</h4>
                            <p className="text-amber-700 text-sm mb-3">
                              This address is located within a UNESCO protected heritage zone. Special regulations apply.
                            </p>
                            <button className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 transition-colors text-sm cursor-pointer whitespace-nowrap">
                              View Regulations PDF
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Register Your Business</h3>
                <form onSubmit={handleFormSubmit} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 space-y-4" id="business-registration">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Owner Name *</label>
                    <input
                      type="text"
                      name="ownerName"
                      required
                      value={formData.ownerName}
                      onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Your full legal name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Owner VAT Number *</label>
                    <input
                      type="text"
                      name="taxNumber"
                      required
                      value={formData.taxNumber}
                      onChange={(e) => setFormData({...formData, taxNumber: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="IT12345678901"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Shop Name *</label>
                    <input
                      type="text"
                      name="shopName"
                      required
                      value={formData.shopName}
                      onChange={(e) => setFormData({...formData, shopName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Your business name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
                    <select
                      name="businessType"
                      value={formData.businessType}
                      onChange={(e) => setFormData({...formData, businessType: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent pr-8"
                    >
                      <option value="bnb">Bed & Breakfast</option>
                      <option value="restaurant">Restaurant</option>
                      <option value="shop">Local Shop</option>
                      <option value="service">Service Provider</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={(e) => {
                        if (e.target.value.length <= 500) {
                          setFormData({...formData, description: e.target.value});
                        }
                      }}
                      maxLength={500}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                      placeholder="Describe your business or service..."
                    />
                    <p className="text-xs text-gray-500 mt-1">{formData.description.length}/500 characters</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Photos</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-pink-500 transition-colors cursor-pointer">
                      <i className="ri-camera-line text-3xl text-gray-400 mb-2"></i>
                      <p className="text-gray-600">Click to upload photos</p>
                      <p className="text-xs text-gray-500 mt-1">Uncollectable</p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Submit Registration
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Business Resources Section */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Business Resources</h2>
            <p className="text-gray-600 text-center mb-12">Additional support and information for business owners</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-file-text-line text-green-600 text-xl"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Permits & Licenses</h3>
                <p className="text-gray-600 text-sm mb-4">Information on required permits and licensing procedures for different business types</p>
                <button className="text-green-600 hover:text-green-700 font-medium text-sm cursor-pointer whitespace-nowrap">
                  Learn More →
                </button>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-money-dollar-circle-line text-blue-600 text-xl"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Tax Information</h3>
                <p className="text-gray-600 text-sm mb-4">Local tax requirements, deadlines, and business tax support services</p>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm cursor-pointer whitespace-nowrap">
                  View Guide →
                </button>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-team-line text-purple-600 text-xl"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Business Network</h3>
                <p className="text-gray-600 text-sm mb-4">Connect with other local business owners and join the entrepreneur community</p>
                <button className="text-purple-600 hover:text-purple-700 font-medium text-sm cursor-pointer whitespace-nowrap">
                  Join Network →
                </button>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-ancient-gate-line text-orange-600 text-xl"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Heritage Guidelines</h3>
                <p className="text-gray-600 text-sm mb-4">Special guidelines for businesses operating in historic buildings and protected areas</p>
                <button className="text-orange-600 hover:text-orange-700 font-medium text-sm cursor-pointer whitespace-nowrap">
                  Read Guidelines →
                </button>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-phone-line text-teal-600 text-xl"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Business Support</h3>
                <p className="text-gray-600 text-sm mb-4">Contact information for business development office and consultation services</p>
                <button className="text-teal-600 hover:text-teal-700 font-medium text-sm cursor-pointer whitespace-nowrap">
                  Get Support →
                </button>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-calendar-check-line text-red-600 text-xl"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Events & Markets</h3>
                <p className="text-gray-600 text-sm mb-4">Participate in local markets, festivals, and business promotion events</p>
                <button className="text-red-600 hover:text-red-700 font-medium text-sm cursor-pointer whitespace-nowrap">
                  View Events →
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Submission Modal */}
      {showSubmissionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <i className="ri-close-line text-xl"></i>
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-alert-line text-amber-600 text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Important Notice!</h3>
            </div>

            <div className="text-center mb-6">
              <p className="text-gray-700 mb-4">
                Your business is located within Urbino's UNESCO World Heritage core zone. Please ensure compliance with relevant regulations during operation and renovation.
              </p>

              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <i className="ri-file-pdf-line text-red-600 text-lg"></i>
                  <span className="text-sm font-medium text-gray-700">Related Regulations Document</span>
                </div>
                <button className="text-red-600 hover:text-red-700 text-sm font-medium cursor-pointer whitespace-nowrap">
                  Download UNESCO World Heritage Protection Guidelines.pdf
                </button>
              </div>

              <p className="text-xs text-gray-500">
                We have received your application and will complete the review within 5 business days and notify you of the result.
              </p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={closeModal}
                className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap"
              >
                I Understand
              </button>
              <button
                onClick={closeModal}
                className="flex-1 bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                Confirm Submission
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
