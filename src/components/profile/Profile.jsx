import React, { useState, useRef } from 'react'

const Profile = () => {
  const [profilePhoto, setProfilePhoto] = useState("https://preline.co/assets/img/160x160/img1.jpg")
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)

  const handlePhotoUpload = () => {
    fileInputRef.current?.click()
  }

  const handleRemovePhoto = () => {
    setProfilePhoto("https://preline.co/assets/img/160x160/img1.jpg")
  }

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file')
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB')
        return
      }

      setIsUploading(true)

      // Create local preview URL
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfilePhoto(e.target?.result || profilePhoto)
        setIsUploading(false)
      }
      reader.onerror = () => {
        setIsUploading(false)
        alert('Error reading file')
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 w-full px-4 py-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          
          {/* Logo */}
          <div className="flex justify-center lg:justify-start lg:pl-4">
            <a href="/" className="mb-2" title="Go to Home">
              <svg className="size-12" width="30" height="33" viewBox="0 0 30 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="m8 4.55 6.75 3.884 6.75-3.885M8 27.83v-7.755L1.25 16.19m27 0-6.75 3.885v7.754M1.655 8.658l13.095 7.546 13.095-7.546M14.75 31.25V16.189m13.5 5.976V10.212a2.98 2.98 0 0 0-1.5-2.585L16.25 1.65a3.01 3.01 0 0 0-3 0L2.75 7.627a3 3 0 0 0-1.5 2.585v11.953a2.98 2.98 0 0 0 1.5 2.585l10.5 5.977a3.01 3.01 0 0 0 3 0l10.5-5.977a3 3 0 0 0 1.5-2.585"
                  stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* Header */}
          <div className="text-center lg:text-left lg:pl-4">
            <h2 className="text-3xl font-bold text-gray-900">Profile Settings</h2>
            <p className="mt-3 text-base text-gray-500/90">
              Manage your account settings and preferences.
            </p>
          </div>

          <form className="space-y-8">
            {/* Profile Photo Section */}
            <div className="flex flex-col lg:flex-row items-center gap-6 p-6 bg-gray-50 rounded-xl lg:ml-4">
              <div className="relative">
                <img 
                  className="inline-block size-24 rounded-full ring-4 ring-white shadow-lg object-cover" 
                  src={profilePhoto} 
                  alt="Profile Photo"
                />
                {isUploading && (
                  <div className="absolute inset-0 size-24 rounded-full bg-gray-900/50 flex items-center justify-center">
                    <div className="animate-spin rounded-full size-8 border-2 border-white border-t-transparent"></div>
                  </div>
                )}
              </div>
              
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  type="button"
                  onClick={handlePhotoUpload}
                  disabled={isUploading}
                  className="py-2.5 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg bg-violet-600 text-white shadow-sm hover:bg-violet-700 hover:shadow-lg hover:shadow-violet-600/30 transition-all duration-200 focus:outline-none focus:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" x2="12" y1="3" y2="15"/>
                  </svg>
                  {isUploading ? 'Uploading...' : 'Upload photo'}
                </button>
                <button 
                  type="button"
                  onClick={handleRemovePhoto}
                  disabled={profilePhoto === "https://preline.co/assets/img/160x160/img1.jpg" || isUploading}
                  className="py-2.5 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg bg-white border border-gray-200 text-gray-700 shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Remove
                </button>
              </div>
            </div>

            {/* Personal Information */}
            <div className="space-y-6 lg:ml-4">
              <div className="border-b border-gray-100 pb-4">
                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                <p className="text-sm text-gray-500 mt-1">Update your personal details here.</p>
              </div>

              {/* Full Name - Row 1 */}
              <div className="grid lg:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="Maria"
                    className="w-full px-4 py-3 rounded-lg ring-1 ring-gray-200 focus:ring-2 focus:ring-violet-600 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white shadow-sm"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Boone"
                    className="w-full px-4 py-3 rounded-lg ring-1 ring-gray-200 focus:ring-2 focus:ring-violet-600 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white shadow-sm"
                  />
                </div>
              </div>

              {/* Email & Phone - Row 2 */}
              <div className="grid lg:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="maria@site.com"
                    className="w-full px-4 py-3 rounded-lg ring-1 ring-gray-200 focus:ring-2 focus:ring-violet-600 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white shadow-sm"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number <span className="text-gray-400 font-normal">(Optional)</span></label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+1 (xxx) xxx-xx-xx"
                    className="w-full px-4 py-3 rounded-lg ring-1 ring-gray-200 focus:ring-2 focus:ring-violet-600 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white shadow-sm"
                  />
                </div>
              </div>

              {/* Gender & Bio - Row 3 */}
              <div className="grid lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Gender</label>
                  <div className="flex flex-wrap gap-3">
                    <label className="flex items-center gap-3 px-4 py-3 rounded-lg ring-1 ring-gray-200 cursor-pointer hover:bg-gray-50 transition-colors has-[:checked]:ring-violet-600 has-[:checked]:bg-violet-50/50">
                      <input 
                        type="radio" 
                        name="gender" 
                        className="shrink-0 size-4 bg-transparent border-gray-300 rounded-full shadow-sm text-violet-600 focus:ring-0 focus:ring-offset-0 checked:bg-violet-600 checked:border-violet-600"
                        defaultChecked
                      />
                      <span className="text-sm text-gray-700">Male</span>
                    </label>
                    <label className="flex items-center gap-3 px-4 py-3 rounded-lg ring-1 ring-gray-200 cursor-pointer hover:bg-gray-50 transition-colors has-[:checked]:ring-violet-600 has-[:checked]:bg-violet-50/50">
                      <input 
                        type="radio" 
                        name="gender" 
                        className="shrink-0 size-4 bg-transparent border-gray-300 rounded-full shadow-sm text-violet-600 focus:ring-0 focus:ring-offset-0 checked:bg-violet-600 checked:border-violet-600"
                      />
                      <span className="text-sm text-gray-700">Female</span>
                    </label>
                    <label className="flex items-center gap-3 px-4 py-3 rounded-lg ring-1 ring-gray-200 cursor-pointer hover:bg-gray-50 transition-colors has-[:checked]:ring-violet-600 has-[:checked]:bg-violet-50/50">
                      <input 
                        type="radio" 
                        name="gender" 
                        className="shrink-0 size-4 bg-transparent border-gray-300 rounded-full shadow-sm text-violet-600 focus:ring-0 focus:ring-offset-0 checked:bg-violet-600 checked:border-violet-600"
                      />
                      <span className="text-sm text-gray-700">Other</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">About Yourself</label>
                  <textarea
                    id="bio"
                    rows="4"
                    placeholder="Tell us a little about yourself..."
                    className="w-full px-4 py-3 rounded-lg ring-1 ring-gray-200 focus:ring-2 focus:ring-violet-600 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white shadow-sm resize-none"
                  ></textarea>
                  <p className="text-xs text-gray-400 mt-2">Brief description for your profile.</p>
                </div>
              </div>
            </div>

            {/* Password Section - Row 4 */}
            <div className="space-y-6 lg:ml-4">
              <div className="border-b border-gray-100 pb-4">
                <h3 className="text-lg font-semibold text-gray-900">Security</h3>
                <p className="text-sm text-gray-500 mt-1">Manage your password and security settings.</p>
              </div>

              <div className="grid lg:grid-cols-3 gap-4">
                <div className="lg:col-span-1">
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                  <input
                    id="currentPassword"
                    type="password"
                    placeholder="Enter current password"
                    className="w-full px-4 py-3 rounded-lg ring-1 ring-gray-200 focus:ring-2 focus:ring-violet-600 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white shadow-sm"
                  />
                </div>

                <div className="lg:col-span-1">
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <input
                    id="newPassword"
                    type="password"
                    placeholder="Enter new password"
                    className="w-full px-4 py-3 rounded-lg ring-1 ring-gray-200 focus:ring-2 focus:ring-violet-600 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white shadow-sm"
                  />
                </div>

                <div className="lg:col-span-1">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full px-4 py-3 rounded-lg ring-1 ring-gray-200 focus:ring-2 focus:ring-violet-600 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-100 lg:ml-4">
              <button
                type="button"
                className="py-3 px-6 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg bg-white border border-gray-200 text-gray-700 shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 focus:outline-none focus:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-3 px-6 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg bg-violet-600 text-white shadow-sm hover:bg-violet-700 hover:shadow-lg hover:shadow-violet-600/30 transition-all duration-200 focus:outline-none focus:bg-violet-700"
              >
                <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                  <polyline points="17 21 17 13 7 13 7 21"/>
                  <polyline points="7 3 7 8 15 8"/>
                </svg>
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

export default Profile

