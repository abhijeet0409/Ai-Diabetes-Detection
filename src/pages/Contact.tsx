import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Prevent default form behavior, in a real app this would send data
    alert('Message sent successfully!');
  };

  return (
    <div className="min-h-screen bg-[var(--bg-color)] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl font-extrabold text-[var(--text-main)] tracking-tight">Contact Us</h1>
          <p className="mt-4 text-xl text-[var(--text-muted)] max-w-2xl mx-auto">
            Have questions about our AI model or want to provide feedback? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8 animate-in fade-in slide-in-from-left-8 duration-700 delay-150">
            <div className="glass p-8 rounded-2xl border border-[var(--border-color)]">
              <h3 className="text-2xl font-bold text-[var(--text-main)] mb-6">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Mail className="h-6 w-6 text-[#0b5c92] dark:text-[#1ebd95]" />
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-medium text-[var(--text-main)]">Email</p>
                    <p className="text-[var(--text-muted)]">abhijeetshr0409@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Phone className="h-6 w-6 text-[#0b5c92] dark:text-[#1ebd95]" />
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-medium text-[var(--text-main)]">Phone</p>
                    <p className="text-[var(--text-muted)]">9729808869</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <MapPin className="h-6 w-6 text-[#0b5c92] dark:text-[#1ebd95]" />
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-medium text-[var(--text-main)]">Office</p>
                    <p className="text-[var(--text-muted)]">
                      Reffer to near by professional
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 animate-in fade-in slide-in-from-right-8 duration-700 delay-300">
            <div className="glass p-8 rounded-2xl border border-[var(--border-color)] shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[var(--text-main)] mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--surface-color)] text-[var(--text-main)] focus:ring-2 focus:ring-[#0b5c92] dark:focus:ring-[#1ebd95] focus:border-transparent transition-all outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[var(--text-main)] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--surface-color)] text-[var(--text-main)] focus:ring-2 focus:ring-[#0b5c92] dark:focus:ring-[#1ebd95] focus:border-transparent transition-all outline-none"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-[var(--text-main)] mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--surface-color)] text-[var(--text-main)] focus:ring-2 focus:ring-[#0b5c92] dark:focus:ring-[#1ebd95] focus:border-transparent transition-all outline-none"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[var(--text-main)] mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--surface-color)] text-[var(--text-main)] focus:ring-2 focus:ring-[#0b5c92] dark:focus:ring-[#1ebd95] focus:border-transparent transition-all outline-none resize-none"
                    placeholder="Your message here..."
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center space-x-2 bg-[#0b5c92] hover:bg-[#1282c2] text-white px-6 py-3 rounded-xl font-medium transition-colors dark:bg-[#1ebd95] dark:hover:bg-[#1282c2] dark:text-gray-900 shadow-md"
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
