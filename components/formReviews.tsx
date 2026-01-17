// // components/formReviews.tsx
// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { X, Star, User, MessageSquare, Send } from "lucide-react";

// interface FormReviewsProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (data: ReviewFormData) => void;
// }

// export interface ReviewFormData {
//   name: string;
//   review: string;
//   rating: number;
// }

// export default function FormReviews({ isOpen, onClose, onSubmit }: FormReviewsProps) {
//   const [formData, setFormData] = useState<ReviewFormData>({
//     name: "",
//     review: "",
//     rating: 0,
//   });

//   const [hoverRating, setHoverRating] = useState(0);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (formData.rating === 0) {
//       alert("Please select a rating");
//       return;
//     }
    
//     setIsSubmitting(true);
    
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 1000));
    
//     onSubmit(formData);
//     setIsSubmitting(false);
    
//     // Reset form and close modal
//     setFormData({ name: "", review: "", rating: 0 });
//     onClose();
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleRatingClick = (rating: number) => {
//     setFormData(prev => ({ ...prev, rating }));
//   };

//   // If modal is closed, don't render anything
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       {/* Backdrop */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         onClick={onClose}
//         className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//       />

//       {/* Modal */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9, y: 20 }}
//         animate={{ opacity: 1, scale: 1, y: 0 }}
//         exit={{ opacity: 0, scale: 0.9, y: 20 }}
//         className="relative w-full max-w-md rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-white/10 shadow-2xl shadow-purple-500/10 overflow-hidden"
//       >
//         {/* Header */}
//         <div className="relative p-6 border-b border-white/10">
//           {/* Background glow */}
//           <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-transparent to-fuchsia-600/5" />
          
//           <div className="relative flex items-center justify-between">
//             <div>
//               <h3 className="text-2xl font-bold text-white">Share Your Experience</h3>
//               <p className="text-white/60 text-sm mt-1">
//                 Help others discover the H12 difference
//               </p>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
//             >
//               <X className="w-5 h-5 text-white/70" />
//             </button>
//           </div>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="p-6">
//           {/* Name Input */}
//           <div className="mb-6">
//             <label className="flex items-center gap-2 text-white/80 mb-2 text-sm font-medium">
//               <User className="w-4 h-4" />
//               Your Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//               placeholder="Enter your name"
//               required
//               className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/30 transition-all"
//             />
//           </div>

//           {/* Review Textarea */}
//           <div className="mb-8">
//             <label className="flex items-center gap-2 text-white/80 mb-2 text-sm font-medium">
//               <MessageSquare className="w-4 h-4" />
//               Your Review
//             </label>
//             <textarea
//               name="review"
//               value={formData.review}
//               onChange={handleInputChange}
//               placeholder="Share your experience with H12..."
//               required
//               rows={4}
//               className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/30 transition-all resize-none"
//             />
//           </div>

//           {/* Rating Input */}
//           <div className="mb-6">
//             <label className="flex items-center gap-2 text-white/80 mb-3 text-sm font-medium">
//               <Star className="w-4 h-4" />
//               Your Rating
//             </label>
//             <div className="flex items-center gap-2">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <button
//                   key={star}
//                   type="button"
//                   onClick={() => handleRatingClick(star)}
//                   onMouseEnter={() => setHoverRating(star)}
//                   onMouseLeave={() => setHoverRating(0)}
//                   className="p-2 transition-transform hover:scale-110 active:scale-95"
//                 >
//                   <Star
//                     className={`w-8 h-8 ${
//                       star <= (hoverRating || formData.rating)
//                         ? "text-purple-400 fill-current"
//                         : "text-white/30"
//                     }`}
//                   />
//                 </button>
//               ))}
//               <span className="ml-2 text-white/50 text-sm">
//                 {formData.rating > 0 ? `${formData.rating}.0 stars` : "Select rating"}
//               </span>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <motion.button
//             type="submit"
//             disabled={isSubmitting}
//             whileTap={{ scale: 0.98 }}
//             className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-lg hover:shadow-purple-500/30"
//           >
//             {isSubmitting ? (
//               <>
//                 <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                 Submitting...
//               </>
//             ) : (
//               <>
//                 Submit Review
//                 <Send className="w-4 h-4" />
//               </>
//             )}
//           </motion.button>

//           {/* Privacy Notice */}
//           <p className="text-center text-white/40 text-xs mt-4">
//             By submitting, you agree to our{" "}
//             <button type="button" className="text-purple-400 hover:text-purple-300 transition-colors">
//               privacy policy
//             </button>
//           </p>
//         </form>

//         {/* Decorative Elements */}
//         <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-600/10 to-transparent rounded-full -translate-x-1/2 -translate-y-1/2" />
//         <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-fuchsia-600/10 to-transparent rounded-full translate-x-1/2 translate-y-1/2" />
//       </motion.div>
//     </div>
//   );
// }


// components/formReviews.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, Star, User, MessageSquare, Send } from "lucide-react";

interface FormReviewsProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ReviewFormData) => void;
  onShowDevisModal: () => void; // Required prop
}

export interface ReviewFormData {
  name: string;
  review: string;
  rating: number;
}

export default function FormReviews({ 
  isOpen, 
  onClose, 
  onSubmit,
  onShowDevisModal 
}: FormReviewsProps) {
  const [formData, setFormData] = useState<ReviewFormData>({
    name: "",
    review: "",
    rating: 0,
  });

  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.rating === 0) {
      alert("Please select a rating");
      return;
    }
    
    setIsSubmitting(true);
    
    // Submit the review data
    onSubmit(formData);
    
    // Close review modal
    onClose();
    
    // Reset form
    setFormData({ name: "", review: "", rating: 0 });
    
    // Show the devis modal immediately
    onShowDevisModal();
    
    setIsSubmitting(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  // If modal is closed, don't render anything
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-md rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-white/10 shadow-2xl shadow-purple-500/10 overflow-hidden"
      >
        {/* Header */}
        <div className="relative p-6 border-b border-white/10">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-transparent to-fuchsia-600/5" />
          
          <div className="relative flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white">Share Your Experience</h3>
              <p className="text-white/60 text-sm mt-1">
                Help others discover the H12 difference
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-white/70" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Name Input */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-white/80 mb-2 text-sm font-medium">
              <User className="w-4 h-4" />
              Your Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              required
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/30 transition-all"
            />
          </div>

          {/* Review Textarea */}
          <div className="mb-8">
            <label className="flex items-center gap-2 text-white/80 mb-2 text-sm font-medium">
              <MessageSquare className="w-4 h-4" />
              Your Review
            </label>
            <textarea
              name="review"
              value={formData.review}
              onChange={handleInputChange}
              placeholder="Share your experience with H12..."
              required
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/30 transition-all resize-none"
            />
          </div>

          {/* Rating Input */}
          <div className="mb-8">
            <label className="flex items-center gap-2 text-white/80 mb-3 text-sm font-medium">
              <Star className="w-4 h-4" />
              Your Rating
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingClick(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-2 transition-transform hover:scale-110 active:scale-95"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hoverRating || formData.rating)
                        ? "text-purple-400 fill-current"
                        : "text-white/30"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-white/50 text-sm">
                {formData.rating > 0 ? `${formData.rating}.0 stars` : "Select rating"}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-lg hover:shadow-purple-500/30"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Submit Review
                <Send className="w-4 h-4" />
              </>
            )}
          </motion.button>

          {/* Privacy Notice */}
          <p className="text-center text-white/40 text-xs mt-4">
            By submitting, you agree to our{" "}
            <button type="button" className="text-purple-400 hover:text-purple-300 transition-colors">
              privacy policy
            </button>
          </p>
        </form>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-600/10 to-transparent rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-fuchsia-600/10 to-transparent rounded-full translate-x-1/2 translate-y-1/2" />
      </motion.div>
    </div>
  );
}