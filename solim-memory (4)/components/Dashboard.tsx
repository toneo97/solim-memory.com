import React, { useState } from 'react';
import { LayoutGrid, FileText, User, LogOut, MessageSquare, Send, X, CreditCard, Shield, Key, Bell, Image as ImageIcon, Play, Clock, ChevronRight, MapPin, Check, AlertCircle, Eye, EyeOff, Plus, Trash2 } from 'lucide-react';

interface DashboardProps {
  onLogout: () => void;
  onNewMemory: () => void;
  onHome: () => void;
}

const logoSrc = "https://www.dropbox.com/scl/fi/yruygvw5vv4p8c1ppk2os/Solim-brain-logo-1.png?rlkey=wfs4c7hjrhisjetsf0nq8gnig&st=uppd1ooo&raw=1";

// --- Mock Data ---
const mockMemories = [
  { id: 1, title: "Grandma's Kitchen 1995", date: "Oct 24, 2024", image: "https://picsum.photos/seed/kitchen/400/300", type: "video" },
  { id: 2, title: "Summer at Lake Tahoe", date: "Sep 12, 2024", image: "https://picsum.photos/seed/lake/400/300", type: "image" },
  { id: 3, title: "First Bike Ride", date: "Aug 05, 2024", image: "https://picsum.photos/seed/bike/400/300", type: "image" },
];

const mockDrafts = [
  { id: 101, title: "Paris Trip Proposal", lastQuestion: "What was the weather like?", progress: 45, date: "2 days ago" },
  { id: 102, title: "Childhood Home", lastQuestion: "Describe the front porch details.", progress: 70, date: "1 week ago" },
];

const mockPaymentMethods = [
  { id: 1, type: 'Visa', last4: '4242', expiry: '12/25', isDefault: true },
  { id: 2, type: 'Mastercard', last4: '8899', expiry: '08/26', isDefault: false },
];

const Dashboard: React.FC<DashboardProps> = ({ onLogout, onNewMemory, onHome }) => {
  const [activeTab, setActiveTab] = useState<'memories' | 'drafts' | 'account'>('memories');
  const [accountSubTab, setAccountSubTab] = useState<'profile' | 'billing' | 'plan' | 'security'>('profile');
  const [billingSection, setBillingSection] = useState<'invoices' | 'methods'>('invoices');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'agent', text: 'Hello! How can I help you rebuild a memory today?' }
  ]);
  
  // Profile State
  const [sameAsBilling, setSameAsBilling] = useState(true);

  // Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    
    setChatHistory([...chatHistory, { sender: 'user', text: chatMessage }]);
    setChatMessage('');
    
    // Mock response
    setTimeout(() => {
      setChatHistory(prev => [...prev, { sender: 'agent', text: "Thanks for reaching out. A memory specialist will be with you shortly." }]);
    }, 1000);
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword === confirmNewPassword && newPassword.length >= 8) {
        setPasswordSaved(true);
        setTimeout(() => setPasswordSaved(false), 3000);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
    }
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'memories':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-serif text-slate-900">Your Memories</h2>
                <p className="text-slate-500 mt-1">Revisited moments captured in time.</p>
              </div>
              <button 
                onClick={onNewMemory}
                className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10"
              >
                + New Memory
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockMemories.map(memory => (
                <div key={memory.id} className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img src={memory.image} alt={memory.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                    {memory.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50">
                          <Play className="w-5 h-5 text-white fill-white ml-1" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-slate-900 text-lg">{memory.title}</h3>
                      <span className="text-xs text-slate-400 font-medium bg-slate-50 px-2 py-1 rounded-lg">{memory.date}</span>
                    </div>
                    <button className="w-full mt-4 py-2 border border-slate-200 rounded-lg text-slate-600 text-sm font-medium hover:bg-slate-50 hover:text-slate-900 transition-colors">
                      View Memory
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'drafts':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
               <h2 className="text-3xl font-serif text-slate-900">Drafts</h2>
               <p className="text-slate-500 mt-1">Continue where you left off.</p>
            </div>
            
            <div className="space-y-4">
              {mockDrafts.map(draft => (
                <div key={draft.id} className="bg-white border border-slate-100 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-blue-200 transition-colors shadow-sm">
                  <div className="flex-grow">
                     <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-slate-900 text-lg">{draft.title}</h3>
                        <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full font-bold">In Progress</span>
                     </div>
                     <p className="text-slate-500 text-sm mb-3">Stopped at: <span className="italic text-slate-700">"{draft.lastQuestion}"</span></p>
                     
                     <div className="w-full max-w-xs bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full rounded-full" style={{ width: `${draft.progress}%` }}></div>
                     </div>
                     <p className="text-xs text-slate-400 mt-1.5">Last edited {draft.date}</p>
                  </div>
                  <button 
                    onClick={onNewMemory}
                    className="px-6 py-3 bg-blue-50 text-blue-600 font-medium rounded-xl hover:bg-blue-100 transition-colors flex items-center gap-2 whitespace-nowrap"
                  >
                    Continue Memory <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'account':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div>
               <h2 className="text-3xl font-serif text-slate-900">Account Settings</h2>
               <p className="text-slate-500 mt-1">Manage your profile and subscription.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
               {/* Sub-sidebar for Account */}
               <div className="w-full md:w-64 flex-shrink-0 space-y-2">
                 {[
                   { id: 'profile', label: 'Profile', icon: User },
                   { id: 'billing', label: 'Billing & Payments', icon: FileText },
                   { id: 'plan', label: 'Subscription Plan', icon: CreditCard },
                   { id: 'security', label: 'Security', icon: Shield },
                 ].map(tab => (
                   <button
                    key={tab.id}
                    onClick={() => setAccountSubTab(tab.id as any)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      accountSubTab === tab.id 
                      ? 'bg-slate-900 text-white shadow-md' 
                      : 'text-slate-600 hover:bg-white hover:shadow-sm'
                    }`}
                   >
                     <tab.icon className="w-4 h-4" />
                     {tab.label}
                   </button>
                 ))}
               </div>

               {/* Account Content */}
               <div className="flex-grow bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
                  {accountSubTab === 'profile' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
                      {/* Avatar Section */}
                      <div className="flex items-center gap-6 border-b border-slate-100 pb-8">
                        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 text-3xl font-serif border border-slate-200">
                          JD
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900 text-lg">John Doe</h3>
                          <p className="text-slate-500 text-sm mb-3">Personal Account</p>
                          <div className="flex gap-3">
                            <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">Change Avatar</button>
                            <button className="px-4 py-2 text-slate-400 text-sm hover:text-red-500 transition-colors">Remove</button>
                          </div>
                        </div>
                      </div>

                      {/* Personal Info */}
                      <div>
                          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                            <User className="w-4 h-4 text-slate-400" /> Personal Information
                          </h4>
                          <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">First Name</label>
                            <input type="text" defaultValue="John" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-slate-200" />
                            </div>
                            <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">Last Name</label>
                            <input type="text" defaultValue="Doe" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-slate-200" />
                            </div>
                            <div className="col-span-2 space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">Email Address</label>
                            <input type="email" defaultValue="john.doe@example.com" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-slate-200" />
                            </div>
                          </div>
                      </div>

                      {/* Address */}
                      <div className="pt-4 border-t border-slate-100">
                          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-slate-400" /> Shipping Address
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase">Address Line 1</label>
                                <input type="text" defaultValue="123 Memory Lane" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-slate-200" />
                            </div>
                             <div className="md:col-span-2 space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase">Address Line 2 (Optional)</label>
                                <input type="text" defaultValue="Apt 4B" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-slate-200" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase">City</label>
                                <input type="text" defaultValue="San Francisco" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-slate-200" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase">State / Province</label>
                                <input type="text" defaultValue="CA" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-slate-200" />
                            </div>
                             <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase">Country</label>
                                <input type="text" defaultValue="United States" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-slate-200" />
                            </div>
                             <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase">Zip / Postal Code</label>
                                <input type="text" defaultValue="94107" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-slate-200" />
                            </div>
                          </div>
                      </div>

                      {/* Billing Address Toggle */}
                      <div className="pt-4 border-t border-slate-100">
                         <div className="flex items-center gap-3">
                            <input 
                                type="checkbox" 
                                id="billingSame" 
                                checked={sameAsBilling} 
                                onChange={(e) => setSameAsBilling(e.target.checked)}
                                className="w-4 h-4 text-slate-900 rounded border-slate-300 focus:ring-slate-900"
                            />
                            <label htmlFor="billingSame" className="text-sm font-medium text-slate-700">Billing address same as shipping</label>
                         </div>
                         
                         {!sameAsBilling && (
                             <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                                <p className="text-sm text-slate-500 italic">Billing address form would appear here...</p>
                             </div>
                         )}
                      </div>

                      <div className="pt-4">
                        <button className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-slate-800 shadow-lg shadow-slate-900/10">Save Profile Changes</button>
                      </div>
                    </div>
                  )}

                  {accountSubTab === 'billing' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
                       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                           <div>
                               <h3 className="font-semibold text-slate-900 text-lg">Billing & Payments</h3>
                               <p className="text-slate-500 text-sm mt-1">Manage your payment methods and view invoice history.</p>
                           </div>
                           <div className="bg-slate-100 p-1 rounded-lg flex inline-flex self-start sm:self-center">
                               <button
                                   onClick={() => setBillingSection('invoices')}
                                   className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${billingSection === 'invoices' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                               >
                                   Invoices
                               </button>
                               <button
                                   onClick={() => setBillingSection('methods')}
                                   className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${billingSection === 'methods' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                               >
                                   Payment Methods
                               </button>
                           </div>
                       </div>

                       {billingSection === 'invoices' && (
                           <div className="border border-slate-100 rounded-xl overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-2">
                             <table className="w-full text-sm text-left">
                               <thead className="bg-slate-50 text-slate-500 font-medium">
                                 <tr>
                                   <th className="p-4">Date</th>
                                   <th className="p-4">Description</th>
                                   <th className="p-4">Amount</th>
                                   <th className="p-4">Status</th>
                                   <th className="p-4"></th>
                                 </tr>
                               </thead>
                               <tbody className="divide-y divide-slate-100">
                                 <tr>
                                   <td className="p-4 text-slate-900">Oct 24, 2024</td>
                                   <td className="p-4 text-slate-600">Memory Pack (One-time)</td>
                                   <td className="p-4 text-slate-900">$29.99</td>
                                   <td className="p-4"><span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-bold">Paid</span></td>
                                   <td className="p-4 text-blue-600 cursor-pointer hover:underline font-medium">Invoice</td>
                                 </tr>
                                  <tr>
                                   <td className="p-4 text-slate-900">Sep 12, 2024</td>
                                   <td className="p-4 text-slate-600">Memory Clip</td>
                                   <td className="p-4 text-slate-900">$16.99</td>
                                   <td className="p-4"><span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-bold">Paid</span></td>
                                   <td className="p-4 text-blue-600 cursor-pointer hover:underline font-medium">Invoice</td>
                                 </tr>
                               </tbody>
                             </table>
                           </div>
                       )}

                       {billingSection === 'methods' && (
                           <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                             <div className="grid gap-4">
                                {mockPaymentMethods.map(method => (
                                    <div key={method.id} className="border border-slate-200 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white hover:border-slate-300 transition-colors group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-10 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-200 relative overflow-hidden">
                                                {/* Visual card representation */}
                                                <div className="absolute inset-0 bg-slate-100"></div>
                                                <div className="relative z-10 flex gap-1 opacity-80">
                                                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80 -ml-1.5"></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="font-semibold text-slate-900 text-sm">{method.type} ending in {method.last4}</p>
                                                    {method.isDefault && <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Default</span>}
                                                </div>
                                                <p className="text-slate-500 text-xs mt-0.5">Expires {method.expiry}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 sm:gap-4 pl-18 sm:pl-0">
                                            {!method.isDefault && (
                                                <button className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors">Set Default</button>
                                            )}
                                            <button className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors">Edit</button>
                                            {!method.isDefault && (
                                                <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Remove">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                             </div>

                             <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 font-medium hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50 transition-all flex items-center justify-center gap-2 group">
                                <div className="w-6 h-6 rounded-full bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                                    <Plus className="w-4 h-4 group-hover:text-blue-600" />
                                </div>
                                <span>Add New Payment Method</span>
                             </button>
                           </div>
                       )}
                    </div>
                  )}

                  {accountSubTab === 'plan' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
                        <div>
                            <h3 className="font-semibold text-slate-900 text-lg mb-4">Current Subscription</h3>
                            
                            {/* Active Plan Card */}
                            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <CreditCard className="w-32 h-32" />
                                </div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="bg-emerald-500 text-emerald-950 text-xs font-bold px-2 py-1 rounded">Active</span>
                                        <span className="text-white/60 text-sm">Renews Nov 24, 2024</span>
                                    </div>
                                    <h2 className="text-2xl font-serif mb-1">Memory Pack Monthly</h2>
                                    <p className="text-slate-300 text-sm mb-6">Unlimited drafts, priority processing, 4K exports.</p>
                                    
                                    <div className="flex items-end gap-1 mb-6">
                                        <span className="text-3xl font-bold">$24.99</span>
                                        <span className="text-sm text-slate-300 mb-1">/ month</span>
                                    </div>
                                    
                                    <div className="flex items-center gap-4">
                                         <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                                             <div className="w-2 h-2 rounded-full bg-white"></div>
                                             <span className="text-sm font-medium">Visa ending in 4242</span>
                                         </div>
                                         <button onClick={() => { setAccountSubTab('billing'); setBillingSection('methods'); }} className="text-sm hover:text-white text-white/70 hover:underline transition-colors">Update method</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="border border-slate-100 rounded-xl p-6 hover:border-slate-300 transition-colors">
                                <h4 className="font-semibold text-slate-900 mb-2">Billing History</h4>
                                <p className="text-sm text-slate-500 mb-4">View past invoices and payment details.</p>
                                <button onClick={() => setAccountSubTab('billing')} className="text-blue-600 text-sm font-medium hover:underline">View History</button>
                            </div>
                            <div className="border border-slate-100 rounded-xl p-6 hover:border-slate-300 transition-colors">
                                <h4 className="font-semibold text-slate-900 mb-2">Cancel Subscription</h4>
                                <p className="text-sm text-slate-500 mb-4">Pause or cancel your plan at any time.</p>
                                <button className="text-red-600 text-sm font-medium hover:underline">Cancel Plan</button>
                            </div>
                        </div>
                    </div>
                  )}

                  {accountSubTab === 'security' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
                       <div>
                          <h3 className="font-semibold text-slate-900 text-lg mb-6">Password & Security</h3>
                          <form onSubmit={handlePasswordUpdate} className="max-w-md space-y-5">
                             <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase">Current Password</label>
                                <div className="relative">
                                    <input 
                                        type={showCurrentPass ? "text" : "password"} 
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-slate-200" 
                                    />
                                    <button type="button" onClick={() => setShowCurrentPass(!showCurrentPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                                        {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                             </div>
                             
                             <div className="pt-2 space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase">New Password</label>
                                <div className="relative">
                                    <input 
                                        type={showNewPass ? "text" : "password"} 
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-slate-200" 
                                        placeholder="Min. 8 characters"
                                    />
                                    <button type="button" onClick={() => setShowNewPass(!showNewPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                                        {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                             </div>
                             
                             <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase">Confirm New Password</label>
                                <input 
                                    type={showNewPass ? "text" : "password"} 
                                    value={confirmNewPassword}
                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    className={`w-full p-3 bg-slate-50 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-slate-200 ${confirmNewPassword && newPassword !== confirmNewPassword ? 'border-red-300' : 'border-slate-200'}`} 
                                />
                             </div>

                             <div className="pt-2">
                                 <button 
                                    type="submit" 
                                    disabled={!currentPassword || !newPassword || newPassword !== confirmNewPassword}
                                    className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-slate-800 shadow-lg shadow-slate-900/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {passwordSaved ? <><Check className="w-4 h-4" /> Updated</> : "Update Password"}
                                </button>
                             </div>
                          </form>
                       </div>
                       
                       <div className="pt-8 border-t border-slate-100">
                          <h4 className="font-semibold text-slate-900 mb-4">Two-Factor Authentication</h4>
                          <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl bg-slate-50">
                              <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-slate-200 text-slate-400">
                                      <Shield className="w-5 h-5" />
                                  </div>
                                  <div>
                                      <p className="text-sm font-semibold text-slate-900">Text Message (SMS)</p>
                                      <p className="text-xs text-slate-500">Use your mobile phone to receive security codes.</p>
                                  </div>
                              </div>
                              <button className="text-blue-600 text-sm font-medium hover:underline">Enable</button>
                          </div>
                       </div>
                    </div>
                  )}
               </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 text-slate-300 hidden md:flex flex-col h-screen fixed left-0 top-0 z-50 shadow-xl">
         <div className="p-8 flex justify-center border-b border-white/10">
            <button onClick={onHome} className="hover:opacity-80 transition-opacity" title="Return Home">
                <img src={logoSrc} alt="Solim Logo" className="h-20 w-auto object-contain brightness-0 invert opacity-90" />
            </button>
         </div>
         
         <nav className="flex-grow px-4 space-y-2 mt-8">
            <button 
              onClick={() => setActiveTab('memories')}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${activeTab === 'memories' ? 'bg-white/10 text-white font-medium shadow-inner' : 'hover:bg-white/5 hover:text-white'}`}
            >
              <ImageIcon className="w-5 h-5" />
              Memories
            </button>
            <button 
              onClick={() => setActiveTab('drafts')}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${activeTab === 'drafts' ? 'bg-white/10 text-white font-medium shadow-inner' : 'hover:bg-white/5 hover:text-white'}`}
            >
              <FileText className="w-5 h-5" />
              Drafts
            </button>
            <button 
              onClick={() => setActiveTab('account')}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${activeTab === 'account' ? 'bg-white/10 text-white font-medium shadow-inner' : 'hover:bg-white/5 hover:text-white'}`}
            >
              <User className="w-5 h-5" />
              Account
            </button>
         </nav>

         <div className="p-6 border-t border-white/10">
            <div className="flex items-center gap-3 mb-6 px-2">
              <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold border border-slate-600">
                JD
              </div>
              <div className="overflow-hidden">
                <p className="text-white text-sm font-medium truncate">John Doe</p>
                <p className="text-xs text-slate-400 truncate">john.doe@example.com</p>
              </div>
            </div>
            <button 
              onClick={onLogout}
              className="w-full flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm px-2"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
         </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow md:ml-72 min-h-screen p-6 md:p-12 pb-24 relative">
         {/* Mobile Header */}
         <div className="md:hidden relative flex justify-center items-center mb-10 mt-2">
            <button onClick={onHome} className="transition-opacity hover:opacity-80">
                <img src={logoSrc} alt="Solim Logo" className="h-20 w-auto" />
            </button>
            <button onClick={onLogout} className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-500 p-2 hover:bg-slate-100 rounded-full transition-colors">
                <LogOut className="w-6 h-6" />
            </button>
         </div>

         {/* Mobile Nav Tabs */}
         <div className="md:hidden flex gap-2 overflow-x-auto pb-4 mb-6">
            {['memories', 'drafts', 'account'].map(t => (
               <button
                key={t}
                onClick={() => setActiveTab(t as any)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${activeTab === t ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-600'}`}
               >
                 {t.charAt(0).toUpperCase() + t.slice(1)}
               </button>
            ))}
         </div>

         {renderContent()}

         {/* Chat Widget */}
         <div className="fixed bottom-8 right-8 z-50">
            {isChatOpen && (
              <div className="absolute bottom-16 right-0 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in slide-in-from-bottom-4 duration-300 origin-bottom-right flex flex-col max-h-[500px]">
                <div className="bg-slate-900 p-4 flex justify-between items-center">
                   <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                      <span className="text-white font-medium text-sm">Solim Support</span>
                   </div>
                   <button onClick={() => setIsChatOpen(false)} className="text-white/60 hover:text-white"><X className="w-4 h-4" /></button>
                </div>
                
                <div className="flex-grow p-4 bg-slate-50 overflow-y-auto h-80 space-y-4">
                   {chatHistory.map((msg, i) => (
                     <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-xl text-sm ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white border border-slate-100 text-slate-700 rounded-bl-none shadow-sm'}`}>
                           {msg.text}
                        </div>
                     </div>
                   ))}
                </div>

                <div className="p-3 bg-white border-t border-slate-100">
                   <form onSubmit={handleSendMessage} className="relative">
                      <input 
                        type="text" 
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-full pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-blue-300 focus:bg-white transition-all"
                      />
                      <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-slate-900 rounded-full text-white hover:bg-slate-800 transition-colors">
                        <Send className="w-3.5 h-3.5" />
                      </button>
                   </form>
                </div>
              </div>
            )}
            
            <button 
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="w-14 h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-full shadow-lg shadow-slate-900/30 flex items-center justify-center transition-transform hover:scale-105"
            >
               {isChatOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
            </button>
         </div>
      </main>
    </div>
  );
};

export default Dashboard;